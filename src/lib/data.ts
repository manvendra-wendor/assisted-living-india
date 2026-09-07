import type {
  Article,
  Availability,
  CareType,
  CareTypeSlug,
  City,
  FacilityKey,
  JobRole,
  Property,
  ReviewPreview,
} from "@/lib/types";

export const siteConfig = {
  name: "Assisted Living India",
  shortName: "ALI",
  description:
    "Compare premium assisted living, independent living, dementia care and senior communities across India.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export const editorialImages = {
  hero: "https://images.pexels.com/photos/14769676/pexels-photo-14769676.jpeg?auto=compress&cs=tinysrgb&w=2200",
  conversation: "https://images.pexels.com/photos/14769676/pexels-photo-14769676.jpeg?auto=compress&cs=tinysrgb&w=1400",
  familyGarden: "https://images.pexels.com/photos/18394078/pexels-photo-18394078/free-photo-of-grandparents-with-boy.jpeg?auto=compress&cs=tinysrgb&w=1600",
  movingHome: "https://images.pexels.com/photos/14769675/pexels-photo-14769675.jpeg?auto=compress&cs=tinysrgb&w=1600",
  everydayLife: "https://images.pexels.com/photos/14769678/pexels-photo-14769678.jpeg?auto=compress&cs=tinysrgb&w=1600",
  celebration: "https://images.pexels.com/photos/32083132/pexels-photo-32083132/free-photo-of-senior-couple-celebrating-at-a-birthday-party.jpeg?auto=compress&cs=tinysrgb&w=1600",
  bookstore: "https://images.pexels.com/photos/38444088/pexels-photo-38444088/free-photo-of-joyful-elderly-couple-shopping-together.jpeg?auto=compress&cs=tinysrgb&w=1600",
};

export const facilities: Array<{
  key: FacilityKey;
  label: string;
  shortLabel: string;
  description: string;
}> = [
  { key: "nutrition", label: "Geriatric diet & nutrition", shortLabel: "Geriatric nutrition", description: "Age-sensitive meal planning and dietary support." },
  { key: "medical", label: "24×7 medical care assistance", shortLabel: "24×7 medical assistance", description: "Round-the-clock help with health and emergency needs." },
  { key: "holistic", label: "Special holistic & assisted care", shortLabel: "Holistic care", description: "Individual routines supporting physical and emotional wellbeing." },
  { key: "caregivers", label: "Trained personal caregivers", shortLabel: "Personal caregivers", description: "Support with activities of daily living from trained carers." },
  { key: "rehabilitation", label: "Rehabilitation", shortLabel: "Rehabilitation", description: "Physiotherapy and recovery support where offered." },
  { key: "dementia", label: "Dementia & Alzheimer’s care", shortLabel: "Dementia care", description: "Structured memory support in a safer environment." },
  { key: "post-operative", label: "Post-operative care", shortLabel: "Post-operative care", description: "Supervised recovery following hospital discharge." },
  { key: "parkinsons", label: "Parkinson’s care", shortLabel: "Parkinson’s care", description: "Mobility, medication and daily-living support." },
];

export const careTypes: CareType[] = [
  {
    slug: "assisted-living",
    name: "Assisted living",
    eyebrow: "Everyday support, more independence",
    description: "Personal support, meals, medication assistance and a safer daily routine.",
    longDescription: "Assisted living is suited to older adults who value independence but benefit from help with personal care, medication routines, mobility, meals or housekeeping.",
  },
  {
    slug: "independent-living",
    name: "Independent living",
    eyebrow: "Community without compromise",
    description: "Private senior residences with hospitality, security and social connection.",
    longDescription: "Independent senior communities combine private homes with managed services, maintenance, wellness programmes and opportunities to build an active social life.",
  },
  {
    slug: "luxury-senior-living",
    name: "Luxury senior living",
    eyebrow: "Refined, reassuring residences",
    description: "Premium residences with high-touch hospitality and wellness amenities.",
    longDescription: "Luxury senior living prioritises spacious accommodation, attentive hospitality, thoughtful dining and curated wellness while maintaining access to support when needed.",
  },
  {
    slug: "dementia-care",
    name: "Dementia care",
    eyebrow: "Specialist memory support",
    description: "Structured memory care for people living with dementia or Alzheimer’s.",
    longDescription: "Dementia care—often searched for as memory care—uses predictable routines, trained teams and thoughtful environments to support safety, dignity and meaningful engagement.",
  },
  {
    slug: "post-operative-care",
    name: "Post-operative care",
    eyebrow: "A supported route home",
    description: "Short-stay nursing, rehabilitation and recovery after hospital discharge.",
    longDescription: "Post-operative care can bridge the gap between hospital and home with medication support, nursing oversight, rehabilitation and assistance with daily activities.",
  },
  {
    slug: "rehabilitation",
    name: "Rehabilitation",
    eyebrow: "Recover strength and confidence",
    description: "Goal-led physiotherapy and supported recovery for older adults.",
    longDescription: "Senior rehabilitation combines physiotherapy, occupational support and everyday assistance around an individual recovery plan.",
  },
];

export const cities: City[] = [
  {
    slug: "delhi-ncr",
    name: "Delhi NCR",
    region: "Delhi, Gurgaon, Noida & Faridabad",
    state: "Delhi NCR",
    shortDescription: "Premium care close to leading hospitals and family neighbourhoods.",
    description: "Delhi NCR has India’s widest range of premium senior living models, from urban care homes in Gurgaon to spacious retirement communities around Noida and Faridabad.",
    neighbourhoods: ["Gurgaon", "South Delhi", "Noida", "Faridabad"],
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=82",
  },
  {
    slug: "mumbai",
    name: "Mumbai",
    region: "Mumbai Metropolitan Region",
    state: "Maharashtra",
    shortDescription: "Connected care residences across Mumbai and its quieter outskirts.",
    description: "Mumbai’s senior care options range from centrally located assisted residences to greener, lower-density communities across the metropolitan region.",
    neighbourhoods: ["Powai", "Thane", "Navi Mumbai", "Western Suburbs"],
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=82",
  },
  {
    slug: "dehradun",
    name: "Dehradun",
    region: "Dehradun & Mussoorie foothills",
    state: "Uttarakhand",
    shortDescription: "Green foothill living with a calmer pace and regional hospital access.",
    description: "Dehradun is emerging as a sought-after retirement and assisted-living destination for families looking for cleaner air, lower-density neighbourhoods and access to North India.",
    neighbourhoods: ["Rajpur Road", "Sahastradhara", "Clement Town", "Mussoorie Road"],
    image: "https://images.pexels.com/photos/35472467/pexels-photo-35472467/free-photo-of-forest-research-institute-facade-in-dehradun.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    slug: "bengaluru",
    name: "Bengaluru",
    region: "Bengaluru Urban",
    state: "Karnataka",
    shortDescription: "A mature senior-living ecosystem with year-round temperate weather.",
    description: "Bengaluru combines a strong healthcare network with established retirement communities, assisted living homes and specialist transition care.",
    neighbourhoods: ["Whitefield", "Sarjapur", "Hebbal", "Bannerghatta"],
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=82",
  },
  {
    slug: "pune",
    name: "Pune",
    region: "Pune Metropolitan Region",
    state: "Maharashtra",
    shortDescription: "Calmer neighbourhoods, good hospitals and established senior communities.",
    description: "Pune’s climate, healthcare access and residential character make it a popular choice for independent and assisted senior living.",
    neighbourhoods: ["Baner", "Kharadi", "Pimpri-Chinchwad", "Talegaon"],
    image: "https://images.unsplash.com/photo-1572782252655-9c8771392601?auto=format&fit=crop&w=1200&q=82",
  },
  {
    slug: "chennai",
    name: "Chennai",
    region: "Chennai Metropolitan Area",
    state: "Tamil Nadu",
    shortDescription: "Deep care expertise paired with strong clinical infrastructure.",
    description: "Chennai is home to a well-developed continuum of senior care, including independent communities, assisted living and specialist medical recovery homes.",
    neighbourhoods: ["OMR", "ECR", "Porur", "Anna Nagar"],
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=82",
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    region: "Hyderabad Metropolitan Region",
    state: "Telangana",
    shortDescription: "Modern residential communities with strong hospital connectivity.",
    description: "Hyderabad offers spacious senior communities and assisted care residences near major hospitals, particularly across its western growth corridor.",
    neighbourhoods: ["Kondapur", "Kokapet", "Secunderabad", "Shamirpet"],
    image: "https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=1200&q=82",
  },
  {
    slug: "kolkata",
    name: "Kolkata",
    region: "Kolkata Metropolitan Area",
    state: "West Bengal",
    shortDescription: "Compassionate, culturally familiar care in and around the city.",
    description: "Kolkata’s premium eldercare landscape includes urban assisted homes, continuing-care residences and quieter communities on the city’s edges.",
    neighbourhoods: ["New Town", "Salt Lake", "Tollygunge", "Howrah"],
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=82",
  },
  {
    slug: "chandigarh-tricity",
    name: "Chandigarh Tricity",
    region: "Chandigarh, Mohali & Panchkula",
    state: "Chandigarh",
    shortDescription: "Green, planned neighbourhoods with easy regional access.",
    description: "Chandigarh Tricity’s planned layout, greener environment and healthcare access make it attractive for premium retirement and supported living.",
    neighbourhoods: ["Chandigarh", "Mohali", "Panchkula", "Zirakpur"],
    image: "https://images.unsplash.com/photo-1627894485200-8fbdc7b3fb78?auto=format&fit=crop&w=1200&q=82",
  },
];

export const directoryLocations = ["delhi-ncr", "mumbai", "dehradun", "chennai", "pune", "bengaluru", "hyderabad", "kolkata", "chandigarh-tricity"]
  .map((slug) => cities.find((city) => city.slug === slug))
  .filter((city): city is City => Boolean(city))
  .map((city) => ({ ...city, name: city.slug === "delhi-ncr" ? "Gurgaon & Delhi NCR" : city.name }));

const defaultLocationSeo = (name: string) => ({
  seoTitle: `Assisted Living in ${name} – Compare Senior Care`,
  seoDescription: `Compare assisted living in ${name}, including care services, room options, indicative monthly prices and verified listing status.`,
  secondaryKeywords: [`senior living in ${name}`, `retirement homes in ${name}`],
  marketSummary: `Families comparing senior living in ${name} should look beyond accommodation and ask how personal care, night support, nutrition, medication assistance and emergencies are managed.`,
  costContext: "Monthly fees depend on room type, caregiver support, nursing needs and therapies. Ask for an assessment-based, all-inclusive estimate before comparing providers.",
});

const locationSeo: Record<string, ReturnType<typeof defaultLocationSeo>> = {
  chennai: {
    seoTitle: "Assisted Living in Chennai – Compare Facilities & Costs",
    seoDescription: "Compare assisted living in Chennai, care facilities, monthly costs, rooms and support across OMR, ECR, Porur and Anna Nagar.",
    secondaryKeywords: ["assisted living Chennai", "old age home monthly cost in Chennai"],
    marketSummary: "Chennai has one of India’s most developed eldercare markets, with assisted living, memory care, rehabilitation and hospital-linked recovery options across OMR, ECR, Porur and established central neighbourhoods.",
    costContext: "For Chennai, compare the base room fee with personal-care hours, nursing, physiotherapy, continence supplies and special diets. The lowest headline fee may not reflect the typical monthly bill.",
  },
  mumbai: {
    seoTitle: "Assisted Living in Mumbai – Premium & Luxury Options",
    seoDescription: "Compare assisted living and luxury retirement homes in Mumbai, Thane and Navi Mumbai by care, rooms, monthly price and verification status.",
    secondaryKeywords: ["assisted living Mumbai", "luxury retirement homes in Mumbai"],
    marketSummary: "Mumbai families often compare central access with the larger rooms and quieter settings available in Thane and Navi Mumbai. Travel time for family and hospital transfer routes deserve equal weight.",
    costContext: "Mumbai-region pricing varies sharply by micro-market, room size and staffing. Request separate figures for accommodation, personal care, nursing, therapies and deposits.",
  },
  dehradun: {
    seoTitle: "Assisted Living in Dehradun – Compare Senior Homes",
    seoDescription: "Explore assisted living, retirement homes and premium senior living in Dehradun with care, room, pricing and hospital-access guidance.",
    secondaryKeywords: ["assisted living in Dehradun", "retirement homes Dehradun"],
    marketSummary: "Dehradun appeals to older adults who prefer a greener foothill setting and a less hurried daily rhythm. Families should still verify emergency response, specialist access and travel logistics from Delhi NCR.",
    costContext: "Ask whether transport to hospitals, visiting-doctor support, physiotherapy and higher-dependency care are included or billed separately.",
  },
  bengaluru: {
    seoTitle: "Senior Living in Bangalore – Assisted & Retirement Homes",
    seoDescription: "Compare senior living in Bangalore (Bengaluru), assisted living and retirement homes by locality, monthly price, care and facilities.",
    secondaryKeywords: ["senior living Bangalore", "retirement homes in Bangalore"],
    marketSummary: "Bengaluru’s established senior-living ecosystem spans independent communities, assisted residences and transition care. Use both clinical access and family travel time to narrow the city’s wide geography.",
    costContext: "Compare maintenance-led independent living separately from care-led monthly fees. Ask how charges change when personal or nursing support increases.",
  },
  pune: {
    seoTitle: "Assisted Living in Pune – Compare Senior Residences",
    seoDescription: "Compare assisted living in Pune, including senior residences, facilities, indicative monthly prices and care across popular neighbourhoods.",
    secondaryKeywords: ["assisted living Pune", "senior living Pune"],
    marketSummary: "Pune is popular for its residential character, healthcare network and access from Mumbai. Options range from urban assisted homes to larger senior communities on the metropolitan edge.",
    costContext: "Clarify whether the quoted fee includes meals, housekeeping, personal care, nursing oversight, physiotherapy and transport for appointments.",
  },
  "delhi-ncr": {
    seoTitle: "Retirement Homes in Delhi NCR – Compare Assisted Living",
    seoDescription: "Compare retirement homes and assisted living across Delhi NCR, including Gurgaon, Noida and Faridabad, with care and pricing guidance.",
    secondaryKeywords: ["retirement homes in Delhi", "assisted living Delhi NCR"],
    marketSummary: "Delhi NCR offers the widest mix of urban care homes and larger retirement communities. Compare Gurgaon separately when proximity to the airport, corporate hubs and private hospitals matters.",
    costContext: "NCR fees vary by locality and dependency level. Ask for a single monthly illustration that includes likely personal-care and medical-support add-ons.",
  },
  gurgaon: {
    seoTitle: "Assisted Living in Gurgaon – Compare Premium Elder Care",
    seoDescription: "Compare assisted living in Gurgaon by medical support, caregivers, rooms, monthly fees and location near leading Gurugram hospitals.",
    secondaryKeywords: ["assisted living in Gurgaon", "senior living Gurgaon", "retirement homes Gurgaon"],
    marketSummary: "Gurgaon is a leading premium eldercare market for Delhi NCR families and non-resident Indians. Its strongest advantage is proximity to major private hospitals, the airport and family neighbourhoods across Gurugram.",
    costContext: "Premium Gurgaon pricing often reflects location, private rooms and staffing. Ask for written inclusions covering personal care, nursing, medication support, emergency transport and therapies.",
  },
};

export const locationPages = [
  ...cities.map((city) => ({
    slug: city.slug,
    name: city.name,
    parentCitySlug: city.slug,
    region: city.region,
    description: city.description,
    neighbourhoods: city.neighbourhoods,
    image: city.image,
    ...(locationSeo[city.slug] ?? defaultLocationSeo(city.name)),
  })),
  {
    slug: "gurgaon",
    name: "Gurgaon",
    parentCitySlug: "delhi-ncr",
    region: "Gurugram, Haryana",
    description: "Gurgaon has become a major hub for premium assisted living and specialist eldercare, with convenient access to families across Delhi NCR and leading multi-speciality hospitals.",
    neighbourhoods: ["Golf Course Road", "Sohna Road", "Dwarka Expressway", "New Gurgaon"],
    image: "https://images.pexels.com/photos/7104646/pexels-photo-7104646.jpeg?auto=compress&cs=tinysrgb&w=1400",
    ...locationSeo.gurgaon,
  },
];

export const popularLocations = ["gurgaon", "mumbai", "dehradun", "chennai", "pune", "bengaluru", "delhi-ncr", "hyderabad"]
  .map((slug) => locationPages.find((location) => location.slug === slug))
  .filter((location): location is (typeof locationPages)[number] => Boolean(location));

const propertyImages = [
  editorialImages.conversation,
  editorialImages.movingHome,
  editorialImages.everydayLife,
  editorialImages.bookstore,
  editorialImages.celebration,
  editorialImages.familyGarden,
];

const baseFacilities: Record<FacilityKey, Availability> = {
  nutrition: "available",
  medical: "available",
  holistic: "available",
  caregivers: "available",
  rehabilitation: "on-request",
  dementia: "on-request",
  "post-operative": "on-request",
  parkinsons: "on-request",
};

const listingNames: Record<string, Array<[string, string]>> = {
  "delhi-ncr": [["Amaltas Care Residence", "Gurgaon"], ["The Neem Courtyard", "Noida"], ["Saanjh Senior Suites", "Faridabad"]],
  mumbai: [["Harbour View Senior Living", "Powai"], ["Aarambh Care House", "Thane"], ["Palm Grove Residences", "Navi Mumbai"]],
  dehradun: [["Doon Valley Assisted Living", "Rajpur Road"], ["Aaranya Senior Residences", "Sahastradhara"], ["Mussoorie View Care Suites", "Mussoorie Road"]],
  bengaluru: [["Mango Tree Assisted Living", "Whitefield"], ["The Courtyard at Sarjapur", "Sarjapur"], ["Nila Senior Residences", "Hebbal"]],
  pune: [["Gulmohar Senior House", "Baner"], ["Anandvan Care Suites", "Kharadi"], ["The Verandah Residences", "Talegaon"]],
  chennai: [["Marigold Assisted Living", "Anna Nagar"], ["Kaveri Senior Suites", "OMR"], ["The Banyan Coast", "ECR"]],
  hyderabad: [["Deccan Grove Care Home", "Kondapur"], ["Aarunya Senior Residences", "Kokapet"], ["Sukoon Care Suites", "Secunderabad"]],
  kolkata: [["Shantiniket Senior House", "New Town"], ["The Adda Residences", "Salt Lake"], ["Aparajita Care Court", "Tollygunge"]],
  "chandigarh-tricity": [["Rose Garden Senior Living", "Chandigarh"], ["Sukhna Care Residence", "Panchkula"], ["The Tricity Courtyard", "Mohali"]],
};

const careTypeSets: CareTypeSlug[][] = [
  ["assisted-living", "dementia-care"],
  ["independent-living", "luxury-senior-living"],
  ["assisted-living", "post-operative-care", "rehabilitation"],
];

export const properties: Property[] = cities.flatMap((city, cityIndex) =>
  listingNames[city.slug].map(([name, locality], itemIndex) => {
    const index = cityIndex * 3 + itemIndex;
    const dementiaFocused = itemIndex === 0;
    const rehabFocused = itemIndex === 2;
    return {
      id: `property-${String(index + 1).padStart(2, "0")}`,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      name,
      citySlug: city.slug,
      locality,
      state: city.state,
      address: `${locality}, ${city.region}`,
      summary: `${itemIndex === 1 ? "A hospitality-led senior community" : "A warm, professionally supported residence"} in ${locality}, designed around comfort, dignity and everyday connection.`,
      description: `${name} is an editorial preview profile created to demonstrate how families can evaluate senior care in ${city.name}. Its layout, services and pricing must be confirmed directly with the operator before making a care decision.`,
      careTypes: careTypeSets[itemIndex],
      facilities: {
        ...baseFacilities,
        rehabilitation: rehabFocused ? "available" : "on-request",
        dementia: dementiaFocused ? "available" : "on-request",
        "post-operative": rehabFocused ? "available" : "on-request",
        parkinsons: itemIndex !== 1 ? "available" : "on-request",
      },
      amenities: itemIndex === 1
        ? ["All-day dining", "Landscaped gardens", "Housekeeping", "Wellness studio", "Community lounge"]
        : ["Dietitian-planned meals", "Emergency response", "Activity programme", "Housekeeping", "Family visiting lounge"],
      roomTypes: itemIndex === 1 ? ["One-bedroom residence", "Two-bedroom residence"] : ["Private suite", "Companion room"],
      stayTypes: itemIndex === 1 ? ["Long-term"] : ["Long-term", "Short-stay", "Respite"],
      priceFrom: itemIndex === 0 ? 85000 + cityIndex * 2500 : itemIndex === 1 ? 125000 + cityIndex * 5000 : null,
      priceNote: itemIndex === 2 ? "Assessment-based pricing" : "Indicative monthly starting price; confirm inclusions",
      rating: Number((4.2 + ((index * 7) % 7) / 10).toFixed(1)),
      reviewCount: 0,
      verified: false,
      claimed: false,
      featured: itemIndex === 0 && cityIndex < 6,
      image: propertyImages[index % propertyImages.length],
      gallery: [propertyImages[index % propertyImages.length], propertyImages[(index + 1) % propertyImages.length], propertyImages[(index + 2) % propertyImages.length]],
      source: { label: "Editorial preview profile", url: "/editorial-policy", checkedAt: "2026-08-08" },
      lastUpdated: "2026-08-08",
    } satisfies Property;
  }),
);

const guideImages = [
  editorialImages.everydayLife,
  editorialImages.conversation,
  editorialImages.bookstore,
  editorialImages.movingHome,
];

const cityArticles: Article[] = cities.map((city) => ({
  slug: `assisted-living-in-${city.slug}`,
  title: `7 things to compare when choosing assisted living in ${city.name}`,
  excerpt: `A practical, local checklist for comparing care, monthly fees, rooms and medical support in ${city.name}.`,
  category: "City guide",
  citySlug: city.slug,
  publishedAt: "2026-08-08",
  readTime: "7 min read",
  image: city.image,
  sections: [
    {
      heading: `Understanding the options in ${city.name}`,
      paragraphs: [city.description, `Start with the level of support needed today, then ask how the residence can respond if care needs change. Location matters, but continuity of care matters more.`],
    },
    {
      heading: "What to compare on every visit",
      paragraphs: ["A premium lobby is not a substitute for a strong care system. Ask for specifics and request that important commitments are documented."],
      bullets: ["Caregiver coverage during nights and weekends", "Emergency escalation and hospital-transfer protocol", "Meal flexibility and clinical nutrition support", "Monthly inclusions and likely add-on charges", "Family updates, visiting hours and trial-stay options"],
    },
    {
      heading: "Building a shortlist",
      paragraphs: [`Compare residences across ${city.neighbourhoods.join(", ")} based on travel time for family, hospital access and the resident’s preferred daily rhythm. Tour at least two options and include the older adult in the decision wherever possible.`],
    },
  ],
}));

const guides: Article[] = [
  {
    slug: "cost-of-assisted-living-in-india",
    title: "What does assisted living cost in India?",
    excerpt: "A practical framework for comparing monthly fees, care add-ons, deposits and the costs families often overlook.",
    category: "Costs & planning",
    publishedAt: "2026-08-05",
    readTime: "9 min read",
    image: guideImages[0],
    sections: [
      { heading: "Why assisted living costs vary", paragraphs: ["Location, room type, staffing intensity and clinical support all affect monthly pricing. A lower base fee may exclude personal care, consumables or specialist nursing."], bullets: ["Accommodation and housekeeping", "Meals and dietary plans", "Personal-care hours", "Nursing or doctor visits", "Physiotherapy and consumables"] },
      { heading: "Ask for an all-in monthly estimate", paragraphs: ["Share an honest care assessment and request a written INR estimate covering a typical month. Ask which events trigger a price review, whether deposits are refundable and what happens if care needs increase."] },
      { heading: "Compare like with like", paragraphs: ["Separate accommodation-led retirement living from care-led assisted living. Two similar room prices can produce very different monthly totals once night support, nursing, therapies and supplies are included."], bullets: ["Base residence fee", "Assessed care package", "Clinical and therapy add-ons", "One-time deposit or community fee", "Transport and emergency charges"] },
    ],
  },
  {
    slug: "how-to-choose-assisted-living",
    title: "How to choose assisted living for a parent",
    excerpt: "A calm, evidence-led checklist for families making a sensitive decision—often from another city or country.",
    category: "Family guide",
    publishedAt: "2026-08-03",
    readTime: "10 min read",
    image: guideImages[1],
    sections: [
      { heading: "Begin with the person, not the property", paragraphs: ["Document current routines, clinical needs, mobility, food preferences, language, social interests and non-negotiables. This makes tours more focused and respectful."] },
      { heading: "Look beneath the brochure", paragraphs: ["Visit during an ordinary afternoon. Observe how team members speak with residents and whether residents can make everyday choices."], bullets: ["Ask about staff training and turnover", "Review emergency and medication processes", "Taste a meal", "Speak with more than one family", "Understand complaint escalation"] },
    ],
  },
  {
    slug: "dementia-care-questions-for-families",
    title: "Dementia care: 12 questions families should ask",
    excerpt: "From staff training to environment design, the questions that reveal how memory care works day to day.",
    category: "Dementia care",
    publishedAt: "2026-07-29",
    readTime: "8 min read",
    image: guideImages[2],
    sections: [
      { heading: "Consistency creates reassurance", paragraphs: ["Strong memory care is built around familiar routines, careful communication and a team that understands the person’s life history."], bullets: ["Who develops and reviews the care plan?", "How are distress and changed behaviour supported?", "What dementia-specific training is required?", "How are families kept informed?", "How is the environment secured without feeling restrictive?"] },
      { heading: "Match support to the individual", paragraphs: ["A diagnosis alone does not describe a person’s needs. Discuss sleep, mobility, communication, continence, eating and medication in detail before admission."] },
    ],
  },
  {
    slug: "post-operative-care-after-discharge",
    title: "Planning post-operative care after hospital discharge",
    excerpt: "How to evaluate a short-stay recovery residence, coordinate handover and prepare for a safer return home.",
    category: "Recovery",
    publishedAt: "2026-07-25",
    readTime: "7 min read",
    image: guideImages[3],
    sections: [
      { heading: "Plan the handover before discharge", paragraphs: ["The care residence should receive medication, wound-care, mobility, diet and follow-up instructions from the treating team. Clarify who can respond if symptoms change."], bullets: ["Written discharge summary", "Medication reconciliation", "Therapy goals", "Follow-up appointments", "Emergency contacts"] },
      { heading: "Define the goal of the stay", paragraphs: ["Agree what a successful transition home looks like and how progress will be measured. Recovery timelines vary, so review the plan rather than relying on a fixed number of days."] },
    ],
  },
  {
    slug: "assisted-living-vs-nursing-home",
    title: "Assisted living vs nursing home: what is the difference?",
    excerpt: "A plain-English comparison of independence, daily support, nursing intensity, living environment and typical family decisions in India.",
    category: "Care comparison",
    publishedAt: "2026-08-08",
    readTime: "8 min read",
    image: editorialImages.conversation,
    sections: [
      { heading: "The short answer", paragraphs: ["Assisted living is usually designed for older adults who want a residential setting and need help with daily activities. A nursing home is generally intended for people who need more continuous nursing oversight or higher-dependency support. Provider models and terminology vary across India, so families should verify the actual staffing and licence position rather than relying on the label alone."] },
      { heading: "Compare the level of support", paragraphs: ["The right setting depends on the person’s current needs, likely changes and clinical risk."], bullets: ["Help with bathing, dressing and mobility", "Medication assistance and nursing availability", "Night-time supervision", "Rehabilitation or wound care", "Dementia-related safety and behaviour support"] },
      { heading: "Questions to take to an assessment", paragraphs: ["Ask who is on site overnight, how emergencies are escalated, which needs would make the residence unsuitable and how pricing changes if dependency increases."] },
    ],
  },
  {
    slug: "what-is-assisted-living",
    title: "What is assisted living? An India-focused guide",
    excerpt: "Understand what assisted living means, who it may suit, what services are commonly included and what families should verify in India.",
    category: "Assisted living 101",
    publishedAt: "2026-08-08",
    readTime: "7 min read",
    image: editorialImages.everydayLife,
    sections: [
      { heading: "Assisted living, simply explained", paragraphs: ["Assisted living combines a place to live with help for everyday activities such as bathing, dressing, mobility, meals, medication routines and housekeeping. It aims to preserve independence while making daily life safer and more manageable."] },
      { heading: "What may be included", paragraphs: ["Packages differ between providers, so request written inclusions."], bullets: ["Private or companion accommodation", "Meals and geriatric nutrition support", "Trained caregivers", "24×7 emergency assistance", "Activities and housekeeping", "Medication and appointment coordination"] },
      { heading: "Who might consider it", paragraphs: ["It may suit an older adult who is no longer comfortable living alone, needs regular help with daily activities or would benefit from a supported routine and social environment. A qualified assessment should guide suitability."] },
    ],
  },
  {
    slug: "geriatric-diet-and-nutrition-in-assisted-living",
    title: "Geriatric diet and nutrition in assisted living",
    excerpt: "What families should ask about dietitian reviews, familiar Indian meals, texture modification, diabetes and individual food preferences.",
    category: "Nutrition & wellbeing",
    publishedAt: "2026-08-08",
    readTime: "7 min read",
    image: editorialImages.celebration,
    sections: [
      { heading: "Nutrition is part of care", paragraphs: ["Older adults may need support with appetite, hydration, swallowing, diabetes, kidney health or medication-related food restrictions. A strong programme starts with an individual assessment rather than a single ‘senior menu’."] },
      { heading: "What to ask the residence", paragraphs: ["Families should understand who plans menus and how preferences are recorded."], bullets: ["Is a dietitian involved in assessments and reviews?", "Can the kitchen provide familiar regional Indian meals?", "How are texture-modified meals prepared and presented?", "How are weight, hydration and appetite changes escalated?", "Are therapeutic diets included or charged separately?"] },
      { heading: "Keep food culturally familiar", paragraphs: ["Nutrition works best when it respects lifelong habits, language, faith, meal timing and favourite foods. Ask to taste a normal meal and speak with the person responsible for menu planning."] },
    ],
  },
];

export const articles: Article[] = [...guides, ...cityArticles];

export const previewReviews: ReviewPreview[] = [
  { id: "review-1", author: "Meera S.", relation: "Daughter of a resident", rating: 5, title: "The questions that helped us decide", body: "The team explained the daily routine and escalation process clearly. We appreciated being encouraged to visit more than once before deciding.", createdAt: "18 July 2026" },
  { id: "review-2", author: "Rohan K.", relation: "Son of a resident", rating: 4, title: "A reassuring transition", body: "The first fortnight required adjustment, but regular family updates made the transition easier for everyone.", createdAt: "02 July 2026" },
];

export function getCity(slug: string) {
  return cities.find((city) => city.slug === slug);
}

export function getCareType(slug: string) {
  return careTypes.find((careType) => careType.slug === slug);
}

export function getProperty(slug: string) {
  return properties.find((property) => property.slug === slug);
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function formatPrice(price: number | null) {
  if (price === null) return "Price on request";
  return `₹${new Intl.NumberFormat("en-IN").format(price)}/month`;
}

export function availabilityLabel(value: Availability) {
  if (value === "available") return "Available";
  if (value === "on-request") return "Ask provider";
  return "Not listed";
}

export const careersEmail = "hello@assistedlivingindia.com";

export const openRoles: JobRole[] = [
  {
    slug: "family-care-advisor",
    title: "Family Care Advisor",
    team: "Concierge",
    location: "Gurgaon or remote (India)",
    commitment: "Full-time",
    summary: "Speak with families weighing a move for a parent, help them frame the right questions and build an unbiased shortlist.",
    focus: ["Run first conversations with warmth and zero pressure", "Translate clinical needs into practical care requirements", "Hand families a shortlist they can defend to a sibling"],
  },
  {
    slug: "editorial-researcher",
    title: "Editorial Researcher, Senior Care",
    team: "Editorial",
    location: "Remote (India)",
    commitment: "Full-time",
    summary: "Verify what residences actually offer, document the sourcing behind every claim and keep profiles honest as facilities change.",
    focus: ["Check care claims against primary sources", "Record sourcing and verification dates on each profile", "Flag anything a family could reasonably misread"],
  },
  {
    slug: "partnerships-manager",
    title: "Partnerships Manager, Residences",
    team: "Growth",
    location: "Mumbai or Bengaluru",
    commitment: "Full-time",
    summary: "Bring quality operators onto the directory and hold the line on what they must disclose before a profile goes live.",
    focus: ["Onboard residences across priority cities", "Collect evidence for care and pricing claims", "Keep commercial interest out of editorial judgement"],
  },
  {
    slug: "product-engineer",
    title: "Product Engineer",
    team: "Engineering",
    location: "Remote (India)",
    commitment: "Full-time",
    summary: "Build the comparison, search and profile surfaces families rely on — with Next.js, TypeScript and Supabase.",
    focus: ["Ship comparison and directory features end to end", "Treat performance and accessibility as requirements", "Work directly with editorial on how data is modelled"],
  },
  {
    slug: "content-seo-associate",
    title: "Content & SEO Associate",
    team: "Editorial",
    location: "Remote (India)",
    commitment: "Full-time",
    summary: "Own the city and care guides that families find first, and make sure each one answers the question it promises to answer.",
    focus: ["Plan guides around real family search intent", "Keep location and care pages distinct, not duplicated", "Measure whether a page actually resolved the question"],
  },
  {
    slug: "operations-associate",
    title: "Operations Associate",
    team: "Operations",
    location: "Gurgaon",
    commitment: "Full-time",
    summary: "Keep enquiries, reviews and provider submissions moving, and protect the review process from anything that would distort it.",
    focus: ["Moderate reviews against published guidelines", "Track enquiries through to a family outcome", "Spot process gaps before families feel them"],
  },
];
