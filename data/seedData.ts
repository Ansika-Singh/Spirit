export interface Artisan {
  id: string;
  name: string;
  age: number;
  craft: string;
  category: "weaving" | "pottery" | "metal" | "wood" | "painting";
  cluster: string;
  state: string;
  generation: string;
  phone: string;
  whatsapp: string;
  avatar: string;
  bannerImage: string;
  storyQuote: string;
  fullStory: string;
  giTag: string;
  rating: number;
  totalSales: number;
  fairPriceMultiplier: number; // e.g. 2.4x vs middleman price
  coopMember: string;
  voiceNoteUrl?: string;
  awards: string[];
}

export interface CraftProduct {
  id: string;
  artisanId: string;
  artisanName: string;
  cluster: string;
  title: string;
  category: "weaving" | "pottery" | "metal" | "wood" | "painting";
  craftTechnique: string;
  price: number;
  traderMarketPrice: number; // What middlemen sell it for
  costBreakdown: {
    rawMaterials: number;
    laborHours: number;
    hourlyWage: number;
    culturalHeritageMargin: number;
    packagingAndTransport: number;
  };
  minWholesalePrice: number;
  productionDays: number;
  maxMonthlyCapacity: number;
  images: string[];
  description: string;
  dimensions: string;
  materials: string[];
  careInstructions: string;
  inStock: number;
  provenanceHash: string;
  verifiedGi: boolean;
  craftPointsAwarded: number;
  storySnippet: string;
  approvalStatus: "approved" | "pending_whatsapp" | "draft";
}

export const ARTISANS: Artisan[] = [
  {
    id: "art-001",
    name: "Devji Kaka Vankar",
    age: 58,
    craft: "Kutch Bhujodi Weaving",
    category: "weaving",
    cluster: "Bhujodi Village, Kutch",
    state: "Gujarat",
    generation: "7th Generation Weaver",
    phone: "+91 98250 41239",
    whatsapp: "+91 98250 41239",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    bannerImage: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&q=80",
    storyQuote: "Every warp thread is a prayer for rain; every weft is the rhythm of our ancestors' songs.",
    fullStory: "Devji learned pit-loom weaving at age twelve under his grandfather's watchful eyes. Using organic desi Kala cotton and indigenous sheep wool dyed with natural indigo and madder root, he weaves intricate extra-weft geometric motifs that depict desert wildlife and water reservoirs.",
    giTag: "GI-GUJ-2013-KUTCH-WEAVING",
    rating: 4.9,
    totalSales: 342,
    fairPriceMultiplier: 2.8,
    coopMember: "Khamir Artisan Collective",
    awards: ["National Handicrafts Master Award 2018", "UNESCO Craft Seal 2021"]
  },
  {
    id: "art-002",
    name: "Leela Bai Kumhar",
    age: 49,
    craft: "Jaipur Traditional Blue Pottery",
    category: "pottery",
    cluster: "Kot Jewar, Jaipur",
    state: "Rajasthan",
    generation: "4th Generation Ceramist",
    phone: "+91 94140 88214",
    whatsapp: "+91 94140 88214",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    bannerImage: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80",
    storyQuote: "We don't use clay from the river. Our body is ground quartz, glass, fuller's earth and gum.",
    fullStory: "Unlike conventional terracotta, Jaipur Blue Pottery uses an Egyptian faience dough composed of quartz powder, recycled scrap glass, Multani mitti, and natural Katira gum. Fired once at precise low temperatures, Leela hand-brushes cobalt blue and turquoise motifs inspired by Persian garden birds and Persian lotus petals.",
    giTag: "GI-RAJ-2008-BLUE-POTTERY",
    rating: 4.8,
    totalSales: 512,
    fairPriceMultiplier: 2.5,
    coopMember: "Rajasthan Hastshilp Samiti",
    awards: ["State Craft Excellence Trophy 2019"]
  },
  {
    id: "art-003",
    name: "Budhram Muria",
    age: 52,
    craft: "Bastar Dhokra Bell-Metal Casting",
    category: "metal",
    cluster: "Kondagaon, Bastar",
    state: "Chhattisgarh",
    generation: "Ancient Lost-Wax Tribal Lineage",
    phone: "+91 91790 33810",
    whatsapp: "+91 91790 33810",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bannerImage: "https://images.unsplash.com/photo-1569074187119-c87815b476da?auto=format&fit=crop&w=1200&q=80",
    storyQuote: "No two Dhokra figures can ever be identical. When the bronze pours in, the beeswax wax model perishes forever.",
    fullStory: "Employing the 4,000-year-old lost-wax technique dating back to the Dancing Girl of Mohenjo-Daro, Budhram builds clay cores enveloped in fine beeswax filaments before encasing them in river mud and pouring molten bell-metal over a subterranean coal pit.",
    giTag: "GI-CHH-2008-BASTAR-DHOKRA",
    rating: 4.95,
    totalSales: 219,
    fairPriceMultiplier: 3.1,
    coopMember: "Bastar Tribal Crafts Federation",
    awards: ["Shilp Guru Nominee 2024", "National Merit Certificate 2015"]
  },
  {
    id: "art-004",
    name: "Syed Nooruddin",
    age: 44,
    craft: "Channapatna Lacquer Woodcraft",
    category: "wood",
    cluster: "Toy Town, Ramanagara",
    state: "Karnataka",
    generation: "5th Generation Lathe Master",
    phone: "+91 98450 67312",
    whatsapp: "+91 98450 67312",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bannerImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
    storyQuote: "We color with natural turmeric, kumkum and acacia gum while the wood spins hot on the lathe.",
    fullStory: "Tracing its origin to Tipu Sultan's invite to Persian artisans, Channapatna toycraft uses seasoned Ivory Wood (Wrightia tinctoria). Syed shapes each curved bead on high-speed foot-powered and electric lathes, sealing the surfaces with non-toxic vegetal vegetable dyes mixed with melted shellac.",
    giTag: "GI-KAR-2006-CHANNAPATNA-TOYS",
    rating: 4.85,
    totalSales: 680,
    fairPriceMultiplier: 2.3,
    coopMember: "Channapatna Handicrafts Cooperative Society",
    awards: ["Export Excellence Council 2022"]
  },
  {
    id: "art-005",
    name: "Mahasundari Devi Jha",
    age: 63,
    craft: "Madhubani Kachni & Bharni Painting",
    category: "painting",
    cluster: "Ranti, Madhubani",
    state: "Bihar",
    generation: "Generational Mithila Matriarch",
    phone: "+91 94310 55198",
    whatsapp: "+91 94310 55198",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bannerImage: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=1200&q=80",
    storyQuote: "The bamboo nib and cotton swab remember stories when human tongues forget them.",
    fullStory: "Inherited from courtyard ritual traditions on handmade cow-dung washed paper, Mahasundari paints mythic epics, Kohbar wedding emblems, and sacred flora. Colors are extracted from crushed aparajita petals, turmeric, soot, and peepal bark without chemical binders.",
    giTag: "GI-BIH-2007-MADHUBANI-PAINTING",
    rating: 4.98,
    totalSales: 184,
    fairPriceMultiplier: 3.4,
    coopMember: "Mithila Gramin Vikas Mandal",
    awards: ["Padma Shri Nominee", "State Merit Award 2012"]
  }
];

export const PRODUCTS: CraftProduct[] = [
  {
    id: "prod-001",
    artisanId: "art-001",
    artisanName: "Devji Kaka Vankar",
    cluster: "Bhujodi Village, Kutch",
    title: "Hand-Spun Kala Cotton Bhujodi Stole with Indigo Extra-Weft",
    category: "weaving",
    craftTechnique: "Pit-Loom Extra-Weft Motif Interlocking",
    price: 3450,
    traderMarketPrice: 7800,
    costBreakdown: {
      rawMaterials: 950,
      laborHours: 28,
      hourlyWage: 65,
      culturalHeritageMargin: 400,
      packagingAndTransport: 280
    },
    minWholesalePrice: 2400,
    productionDays: 4,
    maxMonthlyCapacity: 18,
    images: [
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Woven entirely on traditional wooden pit-looms using rainwater-fed indigenous Kala Cotton from Kutch. Dyed with genuine cold-vat natural Indigo and lac. The geometric motifs symbolize the water canals of the Rann.",
    dimensions: "200 cm x 70 cm",
    materials: ["100% Indigenous Kala Cotton", "Natural Indigo Plant Extract", "Alum Mordant"],
    careInstructions: "Gentle hand wash in cold water with mild reetha (soapnut) liquid. Dry in shade.",
    inStock: 6,
    provenanceHash: "SPIRIT-BHUJ-KALA-88392-A1",
    verifiedGi: true,
    craftPointsAwarded: 340,
    storySnippet: "Each tassel is rolled and knotted by hand by Devji's daughter-in-law, keeping three generations sustained at one loom.",
    approvalStatus: "approved"
  },
  {
    id: "prod-002",
    artisanId: "art-002",
    artisanName: "Leela Bai Kumhar",
    cluster: "Kot Jewar, Jaipur",
    title: "Hand-Painted Turquoise & Cobalt Faience Vase (12-inch)",
    category: "pottery",
    craftTechnique: "Egyptian Faience Hand-Molding & Glazing",
    price: 1850,
    traderMarketPrice: 4200,
    costBreakdown: {
      rawMaterials: 420,
      laborHours: 14,
      hourlyWage: 65,
      culturalHeritageMargin: 350,
      packagingAndTransport: 170
    },
    minWholesalePrice: 1300,
    productionDays: 3,
    maxMonthlyCapacity: 45,
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Authentic Jaipur Blue Pottery vase shaped from ground quartz stone without clay. Hand-painted using squirrel hair brushes with cobalt oxide and copper oxide glazes.",
    dimensions: "Height: 30 cm | Diameter: 14 cm | Weight: 1.2 kg",
    materials: ["Quartz Powder", "Scrap Glass Cullet", "Fuller's Earth", "Cobalt & Copper Glaze"],
    careInstructions: "Wipe with damp cloth. Decorative interior use; not suitable for holding hot standing liquids.",
    inStock: 12,
    provenanceHash: "SPIRIT-JAIP-BLUE-44102-L2",
    verifiedGi: true,
    craftPointsAwarded: 180,
    storySnippet: "Crafted in Leela's sunlit courtyard where quartz powder is sifted three times through muslin cloth.",
    approvalStatus: "approved"
  },
  {
    id: "prod-003",
    artisanId: "art-003",
    artisanName: "Budhram Muria",
    cluster: "Kondagaon, Bastar",
    title: "Ancestral Bison Horn Dancer - Bastar Lost-Wax Bronze Figurine",
    category: "metal",
    craftTechnique: "Cire Perdue (Lost-Wax) Non-Ferrous Metal Casting",
    price: 4200,
    traderMarketPrice: 9500,
    costBreakdown: {
      rawMaterials: 1100,
      laborHours: 36,
      hourlyWage: 70,
      culturalHeritageMargin: 500,
      packagingAndTransport: 250
    },
    minWholesalePrice: 3100,
    productionDays: 7,
    maxMonthlyCapacity: 8,
    images: [
      "https://images.unsplash.com/photo-1569074187119-c87815b476da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Solid bell-metal cast sculpture depicting the ceremonial Maria Gond Bison Horn dancer. The spiral details and crown are threaded with hand-spun wax filaments before fiery mold destruction.",
    dimensions: "Height: 28 cm | Width: 12 cm | Weight: 2.1 kg",
    materials: ["Recycled Brass & Copper Alloy", "Pure Wild Beeswax", "Bastar Red Anthill Clay"],
    careInstructions: "Dust regularly with soft dry brush. Apply a drop of mustard oil twice a year to preserve antique patina.",
    inStock: 4,
    provenanceHash: "SPIRIT-BAST-DHOK-77192-B3",
    verifiedGi: true,
    craftPointsAwarded: 420,
    storySnippet: "Budhram conducts an earth-blessing ceremony before cracking open each clay mold, freeing the trapped bronze spirit.",
    approvalStatus: "approved"
  },
  {
    id: "prod-004",
    artisanId: "art-004",
    artisanName: "Syed Nooruddin",
    cluster: "Toy Town, Ramanagara",
    title: "Lacquer Hand-Turned Balancing Acrobat Toy Set (Non-Toxic)",
    category: "wood",
    craftTechnique: "Lathe Woodturning & Heat-Friction Lac Coloring",
    price: 980,
    traderMarketPrice: 2200,
    costBreakdown: {
      rawMaterials: 220,
      laborHours: 6,
      hourlyWage: 65,
      culturalHeritageMargin: 200,
      packagingAndTransport: 170
    },
    minWholesalePrice: 650,
    productionDays: 1,
    maxMonthlyCapacity: 120,
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Child-safe kinetic acrobat balancing set. Made from lightweight seasoned Hale wood (Wrightia tinctoria), colored using natural turmeric and indigo lac sticks polished with agave cactus leaves.",
    dimensions: "Base: 18 cm x 6 cm | Acrobat: 12 cm tall",
    materials: ["Seasoned Hale Wood", "Natural Shellac", "Vegetable Turmeric & Lac Dye"],
    careInstructions: "Do not soak in water. Wipe with dry soft cloth. Keep away from direct heaters.",
    inStock: 24,
    provenanceHash: "SPIRIT-CHAN-WOOD-22910-S4",
    verifiedGi: true,
    craftPointsAwarded: 100,
    storySnippet: "Syed's family has practiced woodturning since Tipu Sultan established the Channapatna guild over 200 years ago.",
    approvalStatus: "approved"
  },
  {
    id: "prod-005",
    artisanId: "art-005",
    artisanName: "Mahasundari Devi Jha",
    cluster: "Ranti, Madhubani",
    title: "Tree of Life & Birds of Mithila - Fine Kachni Pen Painting",
    category: "painting",
    craftTechnique: "Freehand Fine-Line Kachni Technique on Handmade Paper",
    price: 5200,
    traderMarketPrice: 12500,
    costBreakdown: {
      rawMaterials: 600,
      laborHours: 42,
      hourlyWage: 80,
      culturalHeritageMargin: 1100,
      packagingAndTransport: 300
    },
    minWholesalePrice: 3800,
    productionDays: 8,
    maxMonthlyCapacity: 6,
    images: [
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Original fine-line monochrome Kachni artwork celebrating the sacred Kadamba tree and peacocks. Rendered entirely with hand-whittled bamboo twigs and organic soot black ink on archival cotton rag paper.",
    dimensions: "56 cm x 76 cm (Unframed Sheet)",
    materials: ["Handmade Rag Paper", "Lamp Soot Carbon Pigment", "Bamboo Twig Pens"],
    careInstructions: "Frame under anti-reflective UV glass. Keep away from humid bathrooms or direct sunlight.",
    inStock: 3,
    provenanceHash: "SPIRIT-MADH-KACH-99120-M5",
    verifiedGi: true,
    craftPointsAwarded: 520,
    storySnippet: "Painted during the auspicious dawn hours while Mahasundari recites Maithili marriage chants.",
    approvalStatus: "approved"
  }
];

export const CRAFT_CLUSTERS = [
  {
    name: "Kutch Craft Corridor",
    state: "Gujarat",
    mainCraft: "Bhujodi Shawls, Ajrakh Blockprint, Rogan Art",
    activeArtisans: 1420,
    avgDirectMarginIncrease: "+185%",
    trendScore: 94,
    status: "Thriving",
    giProtected: true,
    urgentNeed: "Natural Indigo Supply Stabilization"
  },
  {
    name: "Jaipur Blue Pottery Guild",
    state: "Rajasthan",
    mainCraft: "Quartz Faience Ceramics & Architectural Tiles",
    activeArtisans: 680,
    avgDirectMarginIncrease: "+140%",
    trendScore: 89,
    status: "High Demand",
    giProtected: true,
    urgentNeed: "Low-carbon electric kiln co-op upgrades"
  },
  {
    name: "Bastar Tribal Bell-Metal",
    state: "Chhattisgarh",
    mainCraft: "Dhokra Lost-Wax Bronze Sculptures",
    activeArtisans: 490,
    avgDirectMarginIncrease: "+220%",
    trendScore: 91,
    status: "Vulnerable to Middlemen",
    giProtected: true,
    urgentNeed: "Fair scrap bronze pricing & direct export certification"
  },
  {
    name: "Channapatna Toy Cluster",
    state: "Karnataka",
    mainCraft: "Non-Toxic Lacquer Ivory Wood Turning",
    activeArtisans: 1150,
    avgDirectMarginIncrease: "+130%",
    trendScore: 86,
    status: "Expanding Retail",
    giProtected: true,
    urgentNeed: "Sustainable Wrightia tinctoria reforestation"
  },
  {
    name: "Mithila Painting Belt",
    state: "Bihar",
    mainCraft: "Madhubani Kachni, Bharni & Godna Paintings",
    activeArtisans: 2300,
    avgDirectMarginIncrease: "+260%",
    trendScore: 96,
    status: "Surging Global Interest",
    giProtected: true,
    urgentNeed: "Copyright protection & anti-counterfeiting seals"
  }
];
