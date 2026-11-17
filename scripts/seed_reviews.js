const fs = require('fs');

const reviews = [
  {
    id: 'rev-01',
    author: 'Aarav & Riya Mehta',
    city: 'Surat, Gujarat',
    occasion: '1st Wedding Anniversary',
    rating: 5,
    reviewText: 'I gifted the custom anniversary mini magazine to my husband on our 1st anniversary dinner. He was genuinely speechless! The editorial layout, the vows printed so elegantly, and the wax seal on the velvet spine made it feel like a luxury Vogue issue dedicated entirely to our story. Jensi did an incredible job!',
    photoUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    isVerified: 1,
    displayOrder: 1
  },
  {
    id: 'rev-02',
    author: 'Pooja & Hardik Patel',
    city: 'Ahmedabad, Gujarat',
    occasion: 'Baby Arrival & 1st Milestone',
    rating: 5,
    reviewText: 'We ordered the baby footprint frame with pressed baby\'s breath for our newborn daughter Anya. The gold lettering with her birth time and weight looks ethereal between the floating double glass. It is already hanging in our nursery as our most prized possession.',
    photoUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    isVerified: 1,
    displayOrder: 2
  },
  {
    id: 'rev-03',
    author: 'Kavya & Rohan Shah',
    city: 'Vadodara / Mumbai',
    occasion: 'Milestone Proposal Keepsake',
    rating: 5,
    reviewText: 'For my fiancé, I wanted something beyond ordinary gifts. The vintage ring-bound Polaroid album with dried rose petals pressed on every page made him cry happy tears. 30 of our favorite memories bound in raw silk ribbon. Best keepsake ever!',
    photoUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
    isVerified: 1,
    displayOrder: 3
  },
  {
    id: 'rev-04',
    author: 'Dr. Neha D. & Kunal',
    city: 'Rajkot, Gujarat',
    occasion: 'Royal Festive & Family Surprise',
    rating: 5,
    reviewText: 'We ordered the 3-part hampers for Diwali gifting to our close family. The velvet box texture, the hand-lettered names in gold calligraphy, and the combination of organic Afghan dry fruits and scented candles set a new benchmark for luxury gifting.',
    photoUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    isVerified: 1,
    displayOrder: 4
  },
  {
    id: 'rev-05',
    author: 'Sneha Trivedi',
    city: 'Surat, Gujarat',
    occasion: 'Best Friend\'s Bridal Shower',
    rating: 5,
    reviewText: 'My best friend is obsessed with sunflowers, so I surprised her with the tactile pipe cleaner bouquet and matching keychain for her bridal shower bag. She loves that it will never wilt and looks so delightfully fluffy and cute on her kitchen dining counter!',
    photoUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
    isVerified: 1,
    displayOrder: 5
  },
  {
    id: 'rev-06',
    author: 'Devanshi & Siddharth Joshi',
    city: 'Vadodara, Gujarat',
    occasion: 'Wedding Ceremony & Reception',
    rating: 5,
    reviewText: 'Jensi customized my bridal wedding bouquet to complement my pastel lehenga perfectly. The Ecuadorian garden roses and flowing raw silk ribbon looked breathtaking in our wedding photographs. Everyone at the reception was asking where we got it!',
    photoUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    isVerified: 1,
    displayOrder: 6
  }
];

let sql = '';
reviews.forEach(r => {
  sql += `EXEC sp_UpsertCustomerReview @Id=N'${r.id}', @Author=N'${r.author.replace(/'/g, "''")}', @Occasion=N'${r.occasion.replace(/'/g, "''")}', @City=N'${r.city.replace(/'/g, "''")}', @Rating=${r.rating}, @ReviewText=N'${r.reviewText.replace(/'/g, "''")}', @PhotoUrl=N'${r.photoUrl}', @IsVerified=${r.isVerified}, @DisplayOrder=${r.displayOrder};\n`;
});

fs.writeFileSync('scripts/seed_reviews.sql', sql, 'utf8');
console.log('Updated seed_reviews.sql with 6 reviews');
