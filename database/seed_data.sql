USE thepetalmuse;
GO

PRINT 'Seeding Categories...';
EXEC sp_UpsertCategory 
    @Id = N'cat-01',
    @Slug = N'magazine',
    @Name = N'Editorial Keepsake Magazines & Mini Magazines',
    @ShortTitle = N'Editorial Keepsake Magazines',
    @Subtitle = N'',
    @Description = N'Custom-designed high-fashion bridal and couple story mini magazines. Available in 4 dedicated editions: Wedding Edition, Engagement Edition, Milestone Anniversary Edition, and Baby Arrival Edition. Styled with couture editorial typography, vows, photo spreads, and velvet ribbon spine binding.',
    @ImageUrl = N'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
    @Badge = N'Signature Craft',
    @DisplayOrder = 1,
    @IsActive = 1;
EXEC sp_UpsertCategory 
    @Id = N'cat-02',
    @Slug = N'bouquets',
    @Name = N'Bespoke Artisanal & Bridal Bouquets',
    @ShortTitle = N'Bespoke Artisanal',
    @Subtitle = N'',
    @Description = N'Handcrafted couture bridal bouquets for ceremonies, pre-wedding rituals, and anniversary milestones, alongside hand-tied poetic stem selections wrapped in archival parchment and bound with imported raw silk velvet ribbons.',
    @ImageUrl = N'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1200&q=85',
    @Badge = N'Bridal Classic',
    @DisplayOrder = 2,
    @IsActive = 1;
EXEC sp_UpsertCategory 
    @Id = N'cat-03',
    @Slug = N'photo-frames',
    @Name = N'Botanical & Baby Footprint Frames',
    @ShortTitle = N'Botanical',
    @Subtitle = N'',
    @Description = N'Treasured photographs and newborn baby footprints encased with genuine pressed garden roses, white larkspur, and delicate ferns. Sealed between double glass with solid teakwood, antique brass, or white lacquer borders.',
    @ImageUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
    @Badge = N'Newborn & Heirloom',
    @DisplayOrder = 3,
    @IsActive = 1;
EXEC sp_UpsertCategory 
    @Id = N'cat-04',
    @Slug = N'chocolate-bouquets',
    @Name = N'Artisan Chocolate Bouquets',
    @ShortTitle = N'Artisan Chocolate Bouquets',
    @Subtitle = N'',
    @Description = N'Gourmet Swiss and Belgian chocolate truffles (Ferrero Rocher, Lindt Lindor, artisan pralines) sculpted into blossoming floral arrangements wrapped in coffee-toned archival paper.',
    @ImageUrl = N'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1200&q=85',
    @Badge = N'Sweet Indulgence',
    @DisplayOrder = 4,
    @IsActive = 1;
EXEC sp_UpsertCategory 
    @Id = N'cat-05',
    @Slug = N'hamper-boxes',
    @Name = N'Three-Part Luxury Hampers (Men, Women & Dry Fruits)',
    @ShortTitle = N'Three-Part Luxury Hampers (Men, Women',
    @Subtitle = N'',
    @Description = N'Our signature rigid keepsake velvet hamper boxes are curated into three distinct collections: Men''s Luxury Grooming & Valet, Women''s Indulgent Pampering & Preserved Blooms, and Royal Festive Dry Fruits with stuffed Medjool dates and organic honey.',
    @ImageUrl = N'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85',
    @Badge = N'VIP Luxury',
    @DisplayOrder = 5,
    @IsActive = 1;
EXEC sp_UpsertCategory 
    @Id = N'cat-06',
    @Slug = N'pipe-cleaner-frames',
    @Name = N'Handmade Pipe Cleaner Bouquets, Keychains & Frames',
    @ShortTitle = N'Handmade Pipe Cleaner Bouquets, Keychains',
    @Subtitle = N'',
    @Description = N'Everlasting fuzzy velvet chenille blooms sculpted by hand into vibrant bouquets that never wilt, adorable floral keychains for handbags, charming cloche accents for kitchen and dining tables, and 3D shadowbox frames.',
    @ImageUrl = N'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85',
    @Badge = N'Handcrafted Art',
    @DisplayOrder = 6,
    @IsActive = 1;
EXEC sp_UpsertCategory 
    @Id = N'cat-07',
    @Slug = N'desk-decor',
    @Name = N'Atelier Botanical Desk Decor',
    @ShortTitle = N'Atelier Botanical Desk Decor',
    @Subtitle = N'',
    @Description = N'Miniature botanical glass cloches, preserved floral resin paperweights, and ceramic ikebana vessels crafted to bring daily calm and artistic inspiration to workspaces.',
    @ImageUrl = N'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=1200&q=85',
    @Badge = N'Workspace Muse',
    @DisplayOrder = 7,
    @IsActive = 1;
EXEC sp_UpsertCategory 
    @Id = N'cat-08',
    @Slug = N'mobile-covers',
    @Name = N'Real Pressed Flower Mobile Covers',
    @ShortTitle = N'Real Pressed Flower Mobile Covers',
    @Subtitle = N'',
    @Description = N'Ultra-clear drop-resistant phone cases embedded with real garden petals, golden foil flakes, and delicate ferns encased in crystal resin. Each case is a 1-of-1 botanical original.',
    @ImageUrl = N'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=85',
    @Badge = N'Wearable Nature',
    @DisplayOrder = 8,
    @IsActive = 1;
EXEC sp_UpsertCategory 
    @Id = N'cat-09',
    @Slug = N'vintage-frames',
    @Name = N'Antique Vintage Botanical Frames',
    @ShortTitle = N'Antique Vintage Botanical Frames',
    @Subtitle = N'',
    @Description = N'Sourced antique-finish ornate brass and baroque frames featuring dried heirloom garden roses, larkspur, and pressed foliage. Evoking Victorian glasshouse elegance.',
    @ImageUrl = N'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=85',
    @Badge = N'Nostalgic Art',
    @DisplayOrder = 9,
    @IsActive = 1;
EXEC sp_UpsertCategory 
    @Id = N'cat-10',
    @Slug = N'glitter-frames',
    @Name = N'Luminous Glitter Frames',
    @ShortTitle = N'Luminous Glitter Frames',
    @Subtitle = N'',
    @Description = N'Sensory shadowbox frames filled with shimmering floating glitter particles, crystal glass chips, and vibrant preserved blooms that catch the sunlight with enchanting radiance.',
    @ImageUrl = N'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85',
    @Badge = N'Radiant Shimmer',
    @DisplayOrder = 10,
    @IsActive = 1;
EXEC sp_UpsertCategory 
    @Id = N'cat-11',
    @Slug = N'decorative-baskets',
    @Name = N'Artisanal Decorative Flower Baskets',
    @ShortTitle = N'Artisanal Decorative Flower Baskets',
    @Subtitle = N'',
    @Description = N'Hand-woven willow, rattan, and seagrass baskets artfully arranged with loose, breathing meadow blooms, trailing eucalyptus, and silk ribbon tails. Perfect for grand tables and ceremonies.',
    @ImageUrl = N'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=85',
    @Badge = N'Rustic Elegance',
    @DisplayOrder = 11,
    @IsActive = 1;
EXEC sp_UpsertCategory 
    @Id = N'cat-12',
    @Slug = N'flower-cards',
    @Name = N'Handmade Flower Cards, Polaroid Prints & Ring Albums',
    @ShortTitle = N'Handmade Flower Cards, Polaroid Prints',
    @Subtitle = N'',
    @Description = N'Preserve memories in physical, touchable art: custom printed vintage Polaroid photos, ring-bound keepsake Polaroid photo albums with pressed botanicals, and heavyweight handmade deckle-edge pressed flower cards.',
    @ImageUrl = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
    @Badge = N'Pure Sentiment',
    @DisplayOrder = 12,
    @IsActive = 1;
EXEC sp_UpsertCategory 
    @Id = N'cat-13',
    @Slug = N'combo-gifts',
    @Name = N'Customized Combo Gift Suites',
    @ShortTitle = N'Customized Combo Gift Suites',
    @Subtitle = N'',
    @Description = N'Multi-layered curation combining 3 to 5 atelier creations into a cohesive gift suite—such as matching photo frame, signature bouquet, scented soy candle, and confectionery.',
    @ImageUrl = N'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=85',
    @Badge = N'Ultimate Curation',
    @DisplayOrder = 13,
    @IsActive = 1;
EXEC sp_UpsertCategory 
    @Id = N'cat-14',
    @Slug = N'chocolate-arrangements',
    @Name = N'Deluxe Chocolate Floral Arrangements',
    @ShortTitle = N'Deluxe Chocolate Floral Arrangements',
    @Subtitle = N'',
    @Description = N'Lavish confectionery displays presenting tiers of imported truffles nestled among fresh Ecuadorian roses and hydrangeas inside velvet-lined circular or hexagonal atelier boxes.',
    @ImageUrl = N'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=85',
    @Badge = N'Sensory Delight',
    @DisplayOrder = 14,
    @IsActive = 1;
EXEC sp_UpsertCategory 
    @Id = N'cat-15',
    @Slug = N'celebration-cards',
    @Name = N'Archival Celebration & Milestone Cards',
    @ShortTitle = N'Archival Celebration',
    @Subtitle = N'',
    @Description = N'Statement-sized celebration cards crafted from archival linen paper, layered parchment, hot-foil stamping, and sealed with authentic botanical wax seals.',
    @ImageUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
    @Badge = N'Statement Stationery',
    @DisplayOrder = 15,
    @IsActive = 1;

PRINT 'Seeding Catalog Works...';
EXEC sp_UpsertCatalogWork
      @Id = N'mag-01',
      @CategoryId = N'cat-01',
      @Title = N'The Petal Muse Luxury Bridal Edition',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'An 8-page glossy couture magazine narrating your entire wedding journey. Designed with high-fashion typography, ceremony timeline, vows, and high-definition photography.',
      @Badge = N'Signature Couture',
      @CoverImage = N'/works/magazines/The Petal Muse Luxury Cover.png',
      @WorkOrder = 1,
      @Tags = N'',
      @IsSignature = 1,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-01',
          @MediaType = 'image',
          @MediaUrl = N'/works/magazines/The Petal Muse Luxury Cover.png',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'mag-01',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'mag-02',
      @CategoryId = N'cat-01',
      @Title = N'The Floral Memory Collection',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Chronicles your relationship milestones from first date to proposal. Interspersed with pressed botanical petal motifs and emotional personal letters.',
      @Badge = N'Patron Favorite',
      @CoverImage = N'/works/magazines/The Petal Muse_ A Floral Memory Collection.png',
      @WorkOrder = 2,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-02',
          @MediaType = 'image',
          @MediaUrl = N'/works/magazines/The Petal Muse_ A Floral Memory Collection.png',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'mag-02',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'mag-03',
      @CategoryId = N'cat-01',
      @Title = N'Blooms That Stay - Keepsake Story',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'A tribute to eternal love featuring couple portraits framed in floral graphics, private handwritten vows, and emotional bridal morning reflections.',
      @Badge = N'Bridal Heirloom',
      @CoverImage = N'/works/magazines/The Petal Muse_ Blooms That Stay.png',
      @WorkOrder = 3,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-03',
          @MediaType = 'image',
          @MediaUrl = N'/works/magazines/The Petal Muse_ Blooms That Stay.png',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'mag-03',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'mag-04',
      @CategoryId = N'cat-01',
      @Title = N'Botanical Elegance Magazine',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Organic, nature-inspired magazine with botanical borders and floral graphics intertwined with couple photography. Subtle, poetic, and everlasting.',
      @Badge = N'Artisanal Edition',
      @CoverImage = N'/works/magazines/The Petal Muse_ Botanical Elegance.png',
      @WorkOrder = 4,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-04',
          @MediaType = 'image',
          @MediaUrl = N'/works/magazines/The Petal Muse_ Botanical Elegance.png',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-04',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-04',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-04',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-04',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'mag-04',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'mag-05',
      @CategoryId = N'cat-01',
      @Title = N'The Petal Muse Creating Beauty',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Our signature editorial cover layout styled after international high-fashion periodicals. Gives your love story the glamour and permanence of Vogue.',
      @Badge = N'Atelier Classic',
      @CoverImage = N'/works/magazines/The Petal Muse_ Creating Beauty.png',
      @WorkOrder = 5,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-05',
          @MediaType = 'image',
          @MediaUrl = N'/works/magazines/The Petal Muse_ Creating Beauty.png',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-05',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-05',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-05',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-05',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'mag-05',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'mag-06',
      @CategoryId = N'cat-01',
      @Title = N'The Petal Muse Magazine Cover (Wedding Edition)',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Dedicated to the complete wedding ceremony, featuring bride & groom portraits, rituals, family blessings, and eternal wedding vows.',
      @Badge = N'Wedding Edition',
      @CoverImage = N'/works/magazines/The Petal Muse Magazine Cover.png',
      @WorkOrder = 6,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-06',
          @MediaType = 'image',
          @MediaUrl = N'/works/magazines/The Petal Muse Magazine Cover.png',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-06',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-06',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-06',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-06',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'mag-06',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'mag-07',
      @CategoryId = N'cat-01',
      @Title = N'The Petal Muse Elegant Floral Cover',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'A soft pastel aesthetic edition highlighting romantic photography with warm coffee, blush, and caramel botanicals woven into the page architecture.',
      @Badge = N'Floral Elegance',
      @CoverImage = N'/works/magazines/The Petal Muse_ Elegant Floral Cover.png',
      @WorkOrder = 7,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-07',
          @MediaType = 'image',
          @MediaUrl = N'/works/magazines/The Petal Muse_ Elegant Floral Cover.png',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-07',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-07',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-07',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-07',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'mag-07',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'mag-08',
      @CategoryId = N'cat-01',
      @Title = N'The Petal Muse Luxury Floral Magazine',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'The peak of editorial grandeur. Luxurious dark typography, gold foil stamping, and double-page cinematic wedding photography spreads.',
      @Badge = N'VIP Edition',
      @CoverImage = N'/works/magazines/The Petal Muse_ Luxury Floral Magazine Cover.png',
      @WorkOrder = 8,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-08',
          @MediaType = 'image',
          @MediaUrl = N'/works/magazines/The Petal Muse_ Luxury Floral Magazine Cover.png',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-08',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-08',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-08',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-08',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'mag-08',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'mag-09',
      @CategoryId = N'cat-01',
      @Title = N'A Curated Floral Magazine Edition',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Clean Swiss typography, generous negative space, and curated photography creating an art gallery feel for contemporary couples.',
      @Badge = N'Minimalist Modern',
      @CoverImage = N'/works/magazines/The Petal Muse_ A Curated Floral Magazine.png',
      @WorkOrder = 9,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-09',
          @MediaType = 'image',
          @MediaUrl = N'/works/magazines/The Petal Muse_ A Curated Floral Magazine.png',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-09',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-09',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-09',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-09',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'mag-09',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'mag-10',
      @CategoryId = N'cat-01',
      @Title = N'The Petal Muse A Botanical Magazine Cover',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'A botanical anthology dedicated to celebrating love like a flourishing garden. Features pressed flower scans, poems, and candid couple joy.',
      @Badge = N'Heirloom Edition',
      @CoverImage = N'/works/magazines/The Petal Muse_ A Botanical Magazine Cover.png',
      @WorkOrder = 10,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-10',
          @MediaType = 'image',
          @MediaUrl = N'/works/magazines/The Petal Muse_ A Botanical Magazine Cover.png',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-10',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-10',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-10',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-10',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'mag-10',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'mag-11',
      @CategoryId = N'cat-01',
      @Title = N'The Petal Muse Elegant Floral Magazine Cover',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Richly detailed typography, fine art photo reproduction, and bespoke styling make this edition a conversation piece on any coffee table.',
      @Badge = N'Fine Art Series',
      @CoverImage = N'/works/magazines/The Petal Muse_ Elegant Floral Magazine Cover.png',
      @WorkOrder = 11,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-11',
          @MediaType = 'image',
          @MediaUrl = N'/works/magazines/The Petal Muse_ Elegant Floral Magazine Cover.png',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-11',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-11',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-11',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-11',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'mag-11',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'mag-12',
      @CategoryId = N'cat-01',
      @Title = N'The Baby Milestone Edition Mini Magazine',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Dedicated to the arrival of your little one. Features baby birth time, weight, footprint scan, ultrasound picture, maternity shoot memories, and parents'' letters.',
      @Badge = N'Newborn Keepsake',
      @CoverImage = N'/works/magazines/The Petal Muse Magazine Cover (1).png',
      @WorkOrder = 12,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-12',
          @MediaType = 'image',
          @MediaUrl = N'/works/magazines/The Petal Muse Magazine Cover (1).png',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-12',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-12',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-12',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'mag-12',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'mag-12',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'bq-01',
      @CategoryId = N'cat-02',
      @Title = N'The Couture Heirloom Bridal Wedding Bouquet',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Crafted exclusively for wedding ceremonies and bridal portraits. Hand-tied garden roses, trailing sweet peas, and butterfly ranunculus bound in imported raw silk ribbon with a heated botanical wax crest.',
      @Badge = N'Bridal Atelier Masterpiece',
      @CoverImage = N'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 1,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'bq-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'bq-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'bq-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'bq-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'bq-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'bq-01',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/atelier-reel-02.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'bq-02',
      @CategoryId = N'cat-02',
      @Title = N'Pastel Meadow Reverie Bouquet',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'An airy, romantic bouquet evocative of a sunlit English garden. Wrapped in archival coffee-toned parchment and finished with delicate deckle-edge notes.',
      @Badge = N'Romantic Favorite',
      @CoverImage = N'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 2,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'bq-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'bq-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'bq-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'bq-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'bq-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'bq-02',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/atelier-reel-02.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'bq-03',
      @CategoryId = N'cat-02',
      @Title = N'Velvet Dawn Scarlet Rose Cascade',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Velvety scarlet garden roses paired with toffee carnations, dried eucalyptus, and dark chocolate wrapping. The ultimate dramatic statement of passion.',
      @Badge = N'Classic Romance',
      @CoverImage = N'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 3,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'bq-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'bq-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'bq-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'bq-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'bq-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'bq-03',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/atelier-reel-02.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'bq-04',
      @CategoryId = N'cat-02',
      @Title = N'The Preserved Everlasting Floral Cloud',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'100% natural blooms preserved at their peak bloom through organic botanical dehydration. Retains natural softness, scent, and beauty for over 3 years without water.',
      @Badge = N'Everlasting Heirloom',
      @CoverImage = N'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 4,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'bq-04',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'bq-04',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'bq-04',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'bq-04',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'bq-04',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'bq-04',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/atelier-reel-02.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'frm-01',
      @CategoryId = N'cat-03',
      @Title = N'The Newborn Baby Footprint Botanical Frame',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Preserve the fleeting miracle of your baby''s earliest days. Your newborn baby''s authentic clay or ink footprint is surrounded by pressed baby''s breath, miniature rosebuds, and gilded gold birth statistics (date, time, weight).',
      @Badge = N'Newborn Keepsake Favorite',
      @CoverImage = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 1,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'frm-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'frm-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'frm-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'frm-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'frm-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'frm-01',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'frm-02',
      @CategoryId = N'cat-03',
      @Title = N'The Floating Double-Glass Couple Wedding Frame',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Suspends your cherished couple photograph weightlessly between two panes of museum glass, enveloped by hand-pressed flowers that will remain vibrant for decades.',
      @Badge = N'Heirloom Keepsake',
      @CoverImage = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 2,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'frm-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'frm-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'frm-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'frm-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'frm-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'frm-02',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'frm-03',
      @CategoryId = N'cat-03',
      @Title = N'The Minimalist Pressed Fern & Larkspur Brass Frame',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Handcrafted brass frame sealed with lead-free solder. Houses delicate pressed ferns, white larkspur florets, and gold foil text with timeless botanical clarity.',
      @Badge = N'Modern Botanical',
      @CoverImage = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 3,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'frm-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'frm-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'frm-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'frm-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'frm-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'frm-03',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'choc-01',
      @CategoryId = N'cat-04',
      @Title = N'The 24-Ferrero Golden Bloom Bouquet',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'24 imported golden Ferrero Rocher truffles sculpted into floral stems, intertwined with fresh red garden roses and wrapped in matte espresso archival paper.',
      @Badge = N'Sweet Bestseller',
      @CoverImage = N'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 1,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'choc-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'choc-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'choc-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'choc-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'choc-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'choc-01',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/atelier-reel-02.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'choc-02',
      @CategoryId = N'cat-04',
      @Title = N'Lindt Swiss Truffle & Blush Peony Bouquet',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'An irresistible pairing of smooth melting Swiss Lindt Lindor truffles and sweet-scented blush roses wrapped in butter-cream parchment.',
      @Badge = N'Gourmet Luxury',
      @CoverImage = N'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 2,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'choc-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'choc-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'choc-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'choc-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'choc-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'choc-02',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/atelier-reel-02.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'hmp-01',
      @CategoryId = N'cat-05',
      @Title = N'Men''s Luxury Grooming & Cologne Hamper',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Designed specifically for the discerning man. Housed in a rigid midnight emerald velvet box with gilded calligraphy, featuring artisan grooming essentials, luxury cologne, dark hazelnut pralines, and a wax-sealed card.',
      @Badge = N'Men''s Executive Suite',
      @CoverImage = N'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 1,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'hmp-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'hmp-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'hmp-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'hmp-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'hmp-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'hmp-01',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'hmp-02',
      @CategoryId = N'cat-05',
      @Title = N'Women''s Indulgent Pampering & Rose Hamper',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'An indulgent sensory spa experience. Scented hand-poured soy candle with rose notes, French lavender bath salts, pure mulberry silk eye mask and scrunchie, preserved floral bouquet, and gourmet chocolates.',
      @Badge = N'Women''s Luxury Suite',
      @CoverImage = N'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 2,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'hmp-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'hmp-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'hmp-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'hmp-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'hmp-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'hmp-02',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'hmp-03',
      @CategoryId = N'cat-05',
      @Title = N'Royal Festive Afghan Dry Fruit & Gold Hamper',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'The royal gifting tradition elevated. Features 6 compartments of premium Afghan dry fruits: jumbo Mamra almonds, green Iranian pistachios, cashew nuts, walnut halves, stuffed Medjool dates with pistachios, and pure saffron raw honey.',
      @Badge = N'Royal Festive Reserve',
      @CoverImage = N'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 3,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'hmp-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'hmp-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'hmp-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'hmp-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'hmp-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'hmp-03',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'pipe-01',
      @CategoryId = N'cat-06',
      @Title = N'Everlasting Pipe Cleaner Tulip & Daisy Bouquet',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Soft, fuzzy, joyful velvet chenille flowers hand-coiled petal by petal into permanent, vibrant bouquets. They never wilt, require zero water, and remain forever cheerful on desks and shelves.',
      @Badge = N'Viral Studio Favorite',
      @CoverImage = N'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 1,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'pipe-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'pipe-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'pipe-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'pipe-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'pipe-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'pipe-01',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'pipe-02',
      @CategoryId = N'cat-06',
      @Title = N'Handmade Floral Chenille Keychains & Bag Charms',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Miniature handcrafted pipe cleaner flower keychains designed to clip onto handbags, backpacks, and car keys. Sturdy gold clasp with delicate bell and ribbon accent.',
      @Badge = N'Cute Daily Companion',
      @CoverImage = N'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 2,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'pipe-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'pipe-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'pipe-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'pipe-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'pipe-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'pipe-02',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'pipe-03',
      @CategoryId = N'cat-06',
      @Title = N'Kitchen & Dining Counter Chenille Floral Cloche',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'A delightful glass cloche dome resting on a turned walnut wooden base, displaying hand-coiled pipe cleaner sunflowers and wildflowers. Perfect for kitchen counter islands and breakfast nooks.',
      @Badge = N'Kitchen & Home Joy',
      @CoverImage = N'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 3,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'pipe-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'pipe-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'pipe-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'pipe-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'pipe-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'pipe-03',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'desk-01',
      @CategoryId = N'cat-07',
      @Title = N'The Enchanted Glass Botanical Cloche',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Miniature botanical fairy tale encased in blown glass. Preserved everlasting florals remain colorful and fresh forever without sunlight or water, bringing grounding calm to work desks.',
      @Badge = N'Workspace Muse',
      @CoverImage = N'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 1,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'desk-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'desk-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'desk-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'desk-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'desk-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'desk-01',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/atelier-reel-02.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'desk-02',
      @CategoryId = N'cat-07',
      @Title = N'Crystal Floral Resin Cube Paperweight & Ikebana Dish',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Precision-cast optical crystal resin cube embedding genuine buttercups, ferns, and floating gold leaf. Functions as a weighty desk paperweight and meditation piece.',
      @Badge = N'Artisan Sculpture',
      @CoverImage = N'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 2,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'desk-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'desk-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'desk-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'desk-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'desk-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'desk-02',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'mob-01',
      @CategoryId = N'cat-08',
      @Title = N'Golden Ranunculus & Wild Fern Crystal Case',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Every case is a 1-of-1 botanical original. Real garden petals, ferns, and genuine 24k gold leaf flakes are embedded in yellowing-resistant crystal epoxy resin with shockproof sides.',
      @Badge = N'Wearable Art',
      @CoverImage = N'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 1,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mob-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mob-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'mob-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'mob-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'mob-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'mob-01',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'mob-02',
      @CategoryId = N'cat-08',
      @Title = N'Botanical Queen Anne''s Lace & Larkspur Case',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Delicate lace florets floating alongside pastel purple larkspur petals, finished with silver leaf flakes and edge-to-edge camera protection bezel.',
      @Badge = N'Couture Case',
      @CoverImage = N'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 2,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mob-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'mob-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'mob-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'mob-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'mob-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'mob-02',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/atelier-reel-02.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'vnt-01',
      @CategoryId = N'cat-09',
      @Title = N'The Baroque Gilded Heirloom Rose Frame',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Sourced antique-finish ornate brass and baroque frames featuring dried heirloom garden roses, larkspur, and pressed foliage evoking Victorian glasshouse elegance.',
      @Badge = N'Nostalgic Antique',
      @CoverImage = N'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 1,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'vnt-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'vnt-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'vnt-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'vnt-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'vnt-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'vnt-01',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'vnt-02',
      @CategoryId = N'cat-09',
      @Title = N'Victorian Herbarium Pressed Botanical Specimen Frame',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Authentic pressed botanical specimens with aged handwritten calligraphy naming the genus, location, and commemorative couple date, encased in hinged antique brass.',
      @Badge = N'Archival History',
      @CoverImage = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 2,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'vnt-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'vnt-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'vnt-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'vnt-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'vnt-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'vnt-02',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/atelier-reel-02.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'glt-01',
      @CategoryId = N'cat-10',
      @Title = N'Floating Rose Gold Shimmer Fairy Light Frame',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Shadowbox frames filled with shimmering floating glitter particles and crystal glass chips that catch sunlight and warm fairy light illumination with magical radiance.',
      @Badge = N'Radiant Shimmer',
      @CoverImage = N'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 1,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'glt-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'glt-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'glt-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'glt-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'glt-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'glt-01',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'glt-02',
      @CategoryId = N'cat-10',
      @Title = N'Luminous Starlight Shadowbox with Fairy Lights',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Atmospheric shadowbox integrating micro-LED lights behind floating crystal chips and dried peach blooms, creating a gentle romantic nightlight for bedrooms.',
      @Badge = N'Sensory Glow',
      @CoverImage = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 2,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'glt-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'glt-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'glt-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'glt-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'glt-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'glt-02',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/atelier-reel-02.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'bsk-01',
      @CategoryId = N'cat-11',
      @Title = N'The Provençal Handwoven Meadow Basket',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Hand-woven natural willow basket filled with chamomile, garden roses, and trailing eucalyptus, accompanied by a wooden monogram tag and silk ribbon tails.',
      @Badge = N'Rustic Luxury',
      @CoverImage = N'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 1,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'bsk-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'bsk-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'bsk-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'bsk-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'bsk-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'bsk-01',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/atelier-reel-02.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'bsk-02',
      @CategoryId = N'cat-11',
      @Title = N'The Bridal Morning Ceremony Welcome Basket',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Designed for bridal suites and wedding hospitality: includes fresh garden blossoms, artisanal sweet treats, and custom wedding guest welcome itinerary in calligraphy.',
      @Badge = N'Bridal Special',
      @CoverImage = N'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 2,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'bsk-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'bsk-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'bsk-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'bsk-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'bsk-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'bsk-02',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'crd-01',
      @CategoryId = N'cat-12',
      @Title = N'The Milestone Polaroid Ring-Bound Album',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'A vintage-style ring-binder album housing 20 to 40 retro Polaroid photo prints adorned with pressed garden petals, handwritten date captions, and raw silk ribbon tie closures.',
      @Badge = N'Sentimental Keepsake',
      @CoverImage = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 1,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'crd-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'crd-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'crd-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'crd-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'crd-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'crd-01',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'crd-02',
      @CategoryId = N'cat-12',
      @Title = N'Deckle-Edge Pressed Flower Wax-Sealed Card',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Raw torn cotton deckle-edge paper adorned with genuinely pressed ranunculus, pansies, and baby''s breath petals. Finished with hand-lettered ink calligraphy and melted botanical wax seal.',
      @Badge = N'Pure Sentiment',
      @CoverImage = N'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 2,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'crd-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'crd-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'crd-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'crd-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'crd-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'crd-02',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'crd-03',
      @CategoryId = N'cat-12',
      @Title = N'Bespoke Retro Polaroid Keepsake Prints',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'A curated bundle of 20 vintage Polaroid-style photo prints with handwritten dates and memories, bundled with pressed flowers and tied in soft raw silk ribbon.',
      @Badge = N'Nostalgic Prints',
      @CoverImage = N'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 3,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'crd-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'crd-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'crd-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'crd-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'crd-03',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'crd-03',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/atelier-reel-02.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'cmb-01',
      @CategoryId = N'cat-13',
      @Title = N'The Sovereign Romance Suite',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'A multi-layered curation combining a floral bouquet, double-glass photo frame with your portrait, imported Swiss chocolates, and a handwritten card into one unforgettable presentation.',
      @Badge = N'Ultimate Curation',
      @CoverImage = N'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 1,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'cmb-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'cmb-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'cmb-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'cmb-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'cmb-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'cmb-01',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'cmb-02',
      @CategoryId = N'cat-13',
      @Title = N'The Editorial Keepsake & Floral Symphony Suite',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Combines your custom-designed couple love story magazine with a matching handcrafted everlasting bouquet and gourmet Belgian truffles inside an embossed presentation box.',
      @Badge = N'Best Seller Suite',
      @CoverImage = N'https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 2,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'cmb-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'cmb-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'cmb-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'cmb-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'cmb-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'cmb-02',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/atelier-reel-02.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'charr-01',
      @CategoryId = N'cat-14',
      @Title = N'The 36-Piece Velvet Rose & Truffle Tower',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Lavish confectionery display presenting tiers of imported truffles nestled among fresh Ecuadorian roses and hydrangeas inside velvet-lined circular atelier boxes.',
      @Badge = N'Sensory Delight',
      @CoverImage = N'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 1,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'charr-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'charr-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'charr-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'charr-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'charr-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'charr-01',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/atelier-reel-02.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'charr-02',
      @CategoryId = N'cat-14',
      @Title = N'The Heart-Shaped Velvet Praline & Blush Rose Medley',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'A two-tier heart-shaped velvet box revealing 24 imported Swiss chocolate truffles below and an everlasting arrangement of Ecuadorian blush garden roses above.',
      @Badge = N'Romantic Grandeur',
      @CoverImage = N'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 2,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'charr-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'charr-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'charr-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'charr-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'charr-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'charr-02',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'cel-01',
      @CategoryId = N'cat-15',
      @Title = N'The Gilded 25th Silver & Gold Milestone Card Folio',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Statement-sized presentation card crafted from archival linen paper, layered vellum parchment, hot-foil stamping, and sealed with authentic botanical wax seals.',
      @Badge = N'Statement Stationery',
      @CoverImage = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 1,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'cel-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'cel-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'cel-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'cel-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'cel-01',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'cel-01',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/jensi-reel-01.mp4',
        @DisplayOrder = 99;
EXEC sp_UpsertCatalogWork
      @Id = N'cel-02',
      @CategoryId = N'cat-15',
      @Title = N'Vellum & Deckle-Edge Wedding Vows Folio',
      @Slug = N'',
      @Price = N'',
      @PriceNumber = 0,
      @Description = N'Dedicated double-fold ceremony vow cards crafted with translucent Italian vellum bound with gold metallic thread, holding genuinely pressed larkspur petals and hand-lettered vows.',
      @Badge = N'Vows Keepsake',
      @CoverImage = N'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=85',
      @WorkOrder = 2,
      @Tags = N'',
      @IsSignature = 0,
      @IsActive = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'cel-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 1;
EXEC sp_AddWorkMedia
          @WorkId = N'cel-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 2;
EXEC sp_AddWorkMedia
          @WorkId = N'cel-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 3;
EXEC sp_AddWorkMedia
          @WorkId = N'cel-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 4;
EXEC sp_AddWorkMedia
          @WorkId = N'cel-02',
          @MediaType = 'image',
          @MediaUrl = N'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
          @DisplayOrder = 5;
EXEC sp_AddWorkMedia
        @WorkId = N'cel-02',
        @MediaType = 'video',
        @MediaUrl = N'/works/videos/atelier-reel-02.mp4',
        @DisplayOrder = 99;

PRINT 'Seeding Instagram Reels...';
EXEC sp_UpsertInstagramReel
    @Id = N'reel-01',
    @Title = N'Sculpting the Cloud Installation',
    @Caption = N'From raw stems to an ethereal suspended dream. Sound on for the studio whispers.',
    @VideoUrl = N'https://www.instagram.com/the.petalmusee/',
    @CoverImageUrl = N'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=85',
    @ViewsDisplay = N'0:24',
    @LikesDisplay = N'Instagram Reel',
    @DisplayOrder = 1,
    @IsActive = 1;
EXEC sp_UpsertInstagramReel
    @Id = N'reel-02',
    @Title = N'Dawn Stem Selection',
    @Caption = N'Hand-picking each ranunculus and heirloom garden rose for this weekend''s bridal suite.',
    @VideoUrl = N'https://www.instagram.com/the.petalmusee/',
    @CoverImageUrl = N'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=85',
    @ViewsDisplay = N'0:31',
    @LikesDisplay = N'Instagram Reel',
    @DisplayOrder = 2,
    @IsActive = 1;
EXEC sp_UpsertInstagramReel
    @Id = N'reel-03',
    @Title = N'The Art of the Tablescape',
    @Caption = N'Harmonizing ceramic textures, tapered beeswax candles, and loose blooming stems.',
    @VideoUrl = N'https://www.instagram.com/the.petalmusee/',
    @CoverImageUrl = N'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=85',
    @ViewsDisplay = N'0:19',
    @LikesDisplay = N'Instagram Reel',
    @DisplayOrder = 3,
    @IsActive = 1;
EXEC sp_UpsertInstagramReel
    @Id = N'reel-04',
    @Title = N'Wrapping with Intention',
    @Caption = N'Our signature wrapping ritual: archival coffee paper, wax seal, and silk velvet ribbons.',
    @VideoUrl = N'https://www.instagram.com/the.petalmusee/',
    @CoverImageUrl = N'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=85',
    @ViewsDisplay = N'0:28',
    @LikesDisplay = N'Instagram Reel',
    @DisplayOrder = 4,
    @IsActive = 1;

PRINT 'Seeding Customer Reviews...';

PRINT 'Seeding Site Settings...';
EXEC sp_UpsertSiteSetting @SettingKey = 'brand_name', @SettingValue = N'THE PETAL MUSE', @SectionName = 'Brand';
EXEC sp_UpsertSiteSetting @SettingKey = 'brand_owner', @SettingValue = N'Jensi Dholariya', @SectionName = 'Brand';
EXEC sp_UpsertSiteSetting @SettingKey = 'brand_role', @SettingValue = N'Founder & Creative Director', @SectionName = 'Brand';
EXEC sp_UpsertSiteSetting @SettingKey = 'brand_instagram', @SettingValue = N'https://www.instagram.com/the.petalmusee/', @SectionName = 'Brand';
EXEC sp_UpsertSiteSetting @SettingKey = 'brand_whatsapp', @SettingValue = N'', @SectionName = 'Contact';
