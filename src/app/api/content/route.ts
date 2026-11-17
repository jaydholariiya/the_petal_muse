import { NextResponse } from 'next/server';
import { runSql } from '@/lib/serverDb';
import { SITE_CONTENT } from '@/content/site';
import { CATALOG_WORKS, CatalogWorkItem } from '@/content/catalogWorks';
import { getContentCache, setContentCache } from '@/lib/contentCache';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const cacheHeader = req.headers.get('cache-control') || '';
    const forceFresh = searchParams.get('fresh') === '1' || cacheHeader.includes('no-cache') || cacheHeader.includes('no-store');

    const cached = getContentCache();
    if (!forceFresh && cached) {
      return NextResponse.json(cached);
    }

    // Run queries in parallel via Promise.all instead of slow sequential loops
    const [categories, rawWorks, rawMedia, rawReels, rawReviews, rawSettings] = await Promise.all([
      runSql('EXEC sp_GetCategories').catch(() => []),
      runSql('EXEC sp_GetCatalogWorks @OnlyActive = 1').catch(() => []),
      runSql('SELECT WorkId, MediaType, MediaUrl, DisplayOrder FROM WorkMedia ORDER BY DisplayOrder ASC').catch(() => []),
      runSql('EXEC sp_GetInstagramReels @OnlyActive = 1').catch(() => []),
      runSql('EXEC sp_GetCustomerReviews').catch(() => []),
      runSql('EXEC sp_GetSiteSettings').catch(() => []),
    ]);

    // Format works grouped by category
    const worksByCategory: Record<string, CatalogWorkItem[]> = {};

    if (rawWorks.length > 0) {
      // Group fetched works
      const dbGrouped: Record<string, CatalogWorkItem[]> = {};

      for (const w of rawWorks) {
        const catId = w.CategoryId;
        if (!dbGrouped[catId]) dbGrouped[catId] = [];

        // Find work media
        const workMediaItems = rawMedia.filter((m) => m.WorkId === w.Id);
        const imgUrls = workMediaItems
          .filter((m) => m.MediaType === 'image')
          .map((m) => m.MediaUrl);

        const vidItem = workMediaItems.find((m) => m.MediaType === 'video');
        const videoUrl = vidItem?.MediaUrl || '/works/videos/jensi-reel-01.mp4';

        const cover = w.CoverImage || w.CoverImageUrl || imgUrls[0] || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85';

        // Ensure 5 image slots
        const images: [string, string, string, string, string] = [
          imgUrls[0] || cover,
          imgUrls[1] || imgUrls[0] || cover,
          imgUrls[2] || imgUrls[0] || cover,
          imgUrls[3] || imgUrls[0] || cover,
          imgUrls[4] || imgUrls[0] || cover,
        ];

        dbGrouped[catId].push({
          id: w.Id,
          categoryId: w.CategoryId,
          categoryName: w.Title,
          title: w.Title,
          tagline: w.ShortDescription || w.Description || w.Title,
          badge: w.Badge || undefined,
          coverImage: cover,
          images,
          videoUrl,
          description: w.Description || w.FullStory || w.ShortDescription || 'Bespoke handcrafted creation sculpted petal by petal.',
          customizationOptions: [
            'Bespoke hand-calligraphed message card included',
            'Choice of fresh or eternal preserved Ecuadorian blooms',
            'Custom color palette customized for your occasion',
            'Luxury satin ribbon or wax-sealed packaging',
          ],
          suitableOccasions: ['Weddings', 'Anniversaries', 'Birthdays', 'Grand Celebrations'],
          specifications: [
            { label: 'Craftsmanship', value: '100% Handcrafted by Jensi Dholariya' },
            { label: 'Origin', value: 'The Petal Muse Atelier, Gujarat' },
            { label: 'Dimensions', value: w.Dimensions || 'Custom Atelier Sizing' },
            { label: 'Lead Time', value: w.LeadTime || '2-4 Days Handcrafting' },
          ],
        });
      }

      // Initialize all 15 categories with their database works (or empty array if deleted)
      for (let i = 1; i <= 15; i++) {
        const catId = `cat-${i.toString().padStart(2, '0')}`;
        worksByCategory[catId] = dbGrouped[catId] || [];
      }
    } else {
      Object.assign(worksByCategory, CATALOG_WORKS);
    }

    // Format Categories
    const formattedCategories = categories.length > 0
      ? categories.map((c) => ({
        id: c.Id,
        name: c.Name,
        slug: c.Slug,
        shortTagline: c.ShortTitle || c.Subtitle || '',
        description: c.Description || '',
        imageUrl: c.ImageUrl || 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1200&q=85',
        badge: c.Badge || undefined,
        customizationOptions: ['Customizable color palette', 'Wax seal & ribbon choice'],
        suitableOccasions: ['Weddings', 'Anniversaries', 'Birthdays'],
        popularPairing: 'Artisanal Bouquet + Keepsake Card',
        sampleItems: [],
      }))
      : SITE_CONTENT.productCategories;

    // Format Reels
    const formattedReels = rawReels.length > 0
      ? rawReels.map((r) => ({
        id: r.Id,
        title: r.Title,
        caption: r.Caption || '',
        videoUrl: r.VideoUrl || undefined,
        posterUrl: r.PosterUrl || r.CoverImageUrl || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
        duration: r.Duration || '0:30',
        instagramUrl: r.InstagramUrl || SITE_CONTENT.brand.instagramUrl,
      }))
      : SITE_CONTENT.reels;

    // Format Reviews
    const formattedReviews = rawReviews.length > 0
      ? rawReviews.map((rev) => ({
        id: rev.Id,
        name: rev.Author,
        location: rev.City || 'Gujarat, India',
        occasion: rev.Occasion || 'Celebration Milestone',
        giftedItem: 'Bespoke Atelier Creation',
        rating: rev.Rating || 5,
        quote: rev.ReviewText,
        photoUrl: rev.PhotoUrl || 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
        verified: rev.IsVerified !== false,
        date: 'Recent Patron',
      }))
      : SITE_CONTENT.customerReviewsSection.reviews;

    // Format Settings
    const settingsMap: Record<string, string> = {};
    for (const s of rawSettings) {
      if (s.SettingKey) settingsMap[s.SettingKey] = s.SettingValue;
    }

    const responseData = {
      success: true,
      message: 'Content retrieved successfully.',
      data: {
        categories: formattedCategories,
        catalogWorks: worksByCategory,
        reels: formattedReels,
        reviews: formattedReviews,
        settings: settingsMap,
      },
    };

    setContentCache(responseData);

    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message || 'Error fetching dynamic content',
      data: {
        categories: SITE_CONTENT.productCategories,
        catalogWorks: CATALOG_WORKS,
        reels: SITE_CONTENT.reels,
        reviews: SITE_CONTENT.customerReviewsSection.reviews,
        settings: {},
      },
    });
  }
}

