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
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://careya.in").replace(/\/+$/, ""),
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

export const carePageDetails: Record<CareTypeSlug, { title: string; image: string; questions: string[]; budget: string; links: { label: string; href: string }[] }> = {
  "assisted-living": { title: "Assisted Living in India: Facilities, Services & Costs", image: editorialImages.everydayLife, questions: ["How much assistance is included with bathing, dressing and mobility?", "Who supports residents at night?", "How are changing care needs assessed?"], budget: "Compare the accommodation fee with the assessed care package, meals, supplies and transport. Ask for the total payable for your parent’s needs.", links: [{ label: "What assisted living means", href: "/blog/what-is-assisted-living" }, { label: "Assisted living costs", href: "/blog/cost-of-assisted-living-in-india" }] },
  "independent-living": { title: "Independent Senior Living & Retirement Homes in India", image: editorialImages.bookstore, questions: ["Is this a rental, purchase or another occupancy arrangement?", "Which maintenance and meal services are included?", "What happens if personal care is needed later?"], budget: "Separate the cost of occupancy from recurring maintenance, dining and optional assistance. Ask about exit terms and refundable deposits.", links: [{ label: "Retirement homes in Bangalore / Bengaluru", href: "/assisted-living/bengaluru" }, { label: "Compare assisted living support", href: "/care/assisted-living" }] },
  "luxury-senior-living": { title: "Luxury Old Age Homes & Premium Senior Living in India", image: editorialImages.familyGarden, questions: ["Which hospitality services are included in the monthly fee?", "Is personal care available on site or arranged separately?", "Can the residence meet both partners’ needs?"], budget: "For a family planning ₹1–2 lakh per month, ask each operator what that budget covers after care, therapies and one-time charges. This is a planning budget, not a confirmed market tariff.", links: [{ label: "Luxury retirement homes in Mumbai", href: "/assisted-living/mumbai" }, { label: "Compare the full monthly cost", href: "/blog/cost-of-assisted-living-in-india" }] },
  "dementia-care": { title: "Dementia Care Homes & Memory Care in India", image: editorialImages.conversation, questions: ["What dementia-specific training do carers receive?", "How are personal routines and communication preferences recorded?", "What supervision and support are available overnight?"], budget: "Request an assessment-based quote covering supervision, personal care, consumables and clinical appointments. Compare the same support needs across providers.", links: [{ label: "Dementia care homes in Mumbai", href: "/care/dementia-care/mumbai" }, { label: "Dementia care at home or a care home?", href: "/blog/dementia-care-at-home-vs-care-home" }, { label: "Questions for a dementia care plan", href: "/blog/dementia-care-questions-for-families" }] },
  "post-operative-care": { title: "Post-operative Care & Recovery Stays in India", image: editorialImages.movingHome, questions: ["Can the team follow the hospital’s written discharge instructions?", "Who handles nursing needs and follow-up appointments?", "How are the goals for returning home agreed?"], budget: "Ask about the minimum stay, nursing and therapy charges, supplies and the cost of extending the stay. Confirm what is included before hospital discharge.", links: [{ label: "Hospital discharge checklist", href: "/blog/post-operative-care-after-discharge" }, { label: "Understand rehabilitation options", href: "/blog/rehabilitation-meaning-and-types" }] },
  rehabilitation: { title: "Senior & Geriatric Rehabilitation Centres in India", image: editorialImages.everydayLife, questions: ["Which therapists will assess and support your parent?", "How many sessions are included and who reviews progress?", "Is specialist stroke or neurological support actually available?"], budget: "Separate room fees from therapy sessions, nursing, equipment and personal assistance. Confirm the programme and current prices after a clinical assessment.", links: [{ label: "Rehabilitation meaning and types", href: "/blog/rehabilitation-meaning-and-types" }, { label: "Stroke rehabilitation", href: "/blog/stroke-rehabilitation-care-guide" }, { label: "Neuro rehabilitation for seniors", href: "/blog/neuro-rehabilitation-for-seniors" }] },
};

export const localCarePages = [{
  careSlug: "dementia-care" as CareTypeSlug, citySlug: "mumbai", name: "Mumbai",
  title: "Dementia Care Homes in Mumbai | Memory Care Options",
  description: "Compare dementia care home profiles in Mumbai, questions about memory care, night support and fees, with clear sourcing and verification status.",
  introduction: "Explore dementia care homes across the Mumbai metropolitan region. Start with your parent’s assessed needs, then compare daily routines, night supervision, family access and the complete care estimate.",
  sections: [
    { heading: "Choose a practical part of Mumbai", paragraphs: ["Compare the actual journey from family homes and the treating hospital to each residence. An address in Thane or Navi Mumbai can involve a different travel commitment from Powai or the western suburbs. Check the location on a map and test the journey at the time relatives are likely to visit."] },
    { heading: "Make language and routines part of the shortlist", paragraphs: ["Ask whether the regular carers can communicate in the languages your parent uses comfortably. Discuss familiar meals, daily rituals, visiting patterns and how the team records these preferences. Request a tour during an ordinary part of the day, with time to speak to the care team."] },
    { heading: "Ask for a complete dementia-care estimate", paragraphs: ["Request a written quote after assessment. Compare the room, personal assistance, night supervision, consumables, transport and outside clinical appointments separately. The preview records below do not establish current fees, vacancies or specialist capabilities."] },
  ],
}];

export const cities: City[] = [
  {
    slug: "gurgaon",
    name: "Gurgaon",
    region: "Gurugram, Haryana",
    state: "Haryana",
    shortDescription: "Premium assisted care close to hospitals, family hubs and Delhi airport.",
    description: "Gurgaon is a leading premium eldercare market for Delhi NCR families and NRIs, with urban care homes, dementia support and emerging senior residences near major private hospitals.",
    neighbourhoods: ["Golf Course Road", "DLF Phase 1", "Sector 43", "Sohna Road"],
    image: "https://images.pexels.com/photos/7104646/pexels-photo-7104646.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    slug: "noida",
    name: "Noida",
    region: "Noida & Greater Noida",
    state: "Uttar Pradesh",
    shortDescription: "Planned senior communities with easy Delhi NCR access.",
    description: "Noida combines planned residential sectors with access to Delhi NCR hospitals, making it useful for families comparing independent senior living and continuing-care residences.",
    neighbourhoods: ["Sector 150", "Noida Expressway", "Greater Noida", "Sector 93"],
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=82",
  },
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
    slug: "coimbatore",
    name: "Coimbatore",
    region: "Coimbatore",
    state: "Tamil Nadu",
    shortDescription: "Calmer South Indian senior communities with medical access.",
    description: "Coimbatore is an established retirement and senior-care destination with quieter neighbourhoods, hospital access and several South India-focused operators.",
    neighbourhoods: ["Saravanampatti", "Saibaba Colony", "Kovaipudur", "Avinashi Road"],
    image: "https://images.unsplash.com/photo-1602524206684-31293f9c3182?auto=format&fit=crop&w=1200&q=82",
  },
  {
    slug: "kochi",
    name: "Kochi",
    region: "Kochi Metropolitan Area",
    state: "Kerala",
    shortDescription: "Kerala senior care with strong hospital connectivity.",
    description: "Kochi is useful for families looking for Kerala-based assisted care, transition care and home-linked senior support close to established hospitals.",
    neighbourhoods: ["Kakkanad", "Edappally", "Vyttila", "Tripunithura"],
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=82",
  },
  {
    slug: "hosur",
    name: "Hosur",
    region: "Hosur",
    state: "Tamil Nadu",
    shortDescription: "Quiet senior communities near Bengaluru.",
    description: "Hosur gives families a quieter alternative near Bengaluru, with emerging senior communities and easier access to South Bengaluru and Tamil Nadu.",
    neighbourhoods: ["Bagalur Road", "Denkanikottai Road", "Hosur Town", "Bengaluru border"],
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=82",
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
  {
    slug: "bhiwadi",
    name: "Bhiwadi",
    region: "Bhiwadi, Delhi NCR",
    state: "Rajasthan",
    shortDescription: "Large senior communities within reach of Gurgaon and Delhi NCR.",
    description: "Bhiwadi is a recognised senior-living cluster for Delhi NCR families, especially for larger retirement communities and age-friendly housing formats.",
    neighbourhoods: ["Alwar Bypass Road", "Sector 39", "Thada Village", "Delhi-Jaipur corridor"],
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=82",
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    region: "Jaipur",
    state: "Rajasthan",
    shortDescription: "Planned retirement living in a major North Indian city.",
    description: "Jaipur appears in the organised senior-living market through established retirement-community operators and appeals to families seeking North Indian access with a slower pace.",
    neighbourhoods: ["Kalwar Road", "Vaishali Nagar", "Jagatpura", "Ajmer Road"],
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=82",
  },
];

export const directoryLocations = ["gurgaon", "delhi-ncr", "mumbai", "dehradun", "chennai", "pune", "bengaluru", "hyderabad", "coimbatore", "kochi", "kolkata", "bhiwadi", "jaipur", "chandigarh-tricity"]
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
];

export const getLocationCitySlugs = (slug: string) => (
  slug === "delhi-ncr" ? ["delhi-ncr", "gurgaon", "noida", "bhiwadi"] : [slug]
);

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

const operatorGalleries: Record<string, string[]> = {
  epoch: [
    "https://d394n47j9kf644.cloudfront.net/experience-img1.png",
    "https://d394n47j9kf644.cloudfront.net/experience-img2.png",
    "https://d394n47j9kf644.cloudfront.net/experience-img3.png",
  ],
  aurum: [
    "https://aurumliving.b-cdn.net/wp-content/uploads/2026/05/Aurumliving-1.webp",
    "https://aurumliving.b-cdn.net/wp-content/uploads/2026/06/Medical-Care-at-the-Core-1024x1024.webp",
    "https://aurumliving.b-cdn.net/wp-content/uploads/2026/05/clear-your-doubts-aurum-v2.jpg.webp",
  ],
  antara: [
    "https://d3cit1div2ht9e.cloudfront.net/ba613ab2-5936-463b-b362-7708ca4b3778-1771002364903.jpg",
    "https://d3cit1div2ht9e.cloudfront.net/static/uploads/91d95319-e49d-4844-910e-11bc937cff93-1721365608557.png",
  ],
  athulya: [
    "https://cdn.athulyaseniorcare.net/images/e43f4e5b61b5f943e608d678f21748f98afbc411-4528x1882.jpg",
  ],
  kitesBengaluru: [
    "https://kitesseniorcare.com/wp-content/uploads/2023/08/Kites-bengaluru-banner-1920X728.jpg",
    "https://kitesseniorcare.com/wp-content/uploads/2024/12/1-1-21.jpg",
    "https://kitesseniorcare.com/wp-content/uploads/2024/12/2-1-28.jpg",
  ],
  kitesChennai: [
    "https://kitesseniorcare.com/wp-content/uploads/2023/08/Kites-Chennai-banner-1920X728-2.jpg",
    "https://kitesseniorcare.com/wp-content/uploads/2024/12/chennai-1-13.jpg",
    "https://kitesseniorcare.com/wp-content/uploads/2024/12/cheannai-2-15.jpg",
  ],
  kitesCoimbatore: [
    "https://kitesseniorcare.com/wp-content/uploads/2025/02/Coimbatore-web-banner-1920-x-850px.jpg",
    "https://kitesseniorcare.com/wp-content/uploads/2025/04/coimbatore_gallery_b.jpg",
    "https://kitesseniorcare.com/wp-content/uploads/2025/04/coimbatore_gallery_d.jpg",
  ],
  kites: [
    "https://kitesseniorcare.com/wp-content/uploads/2025/05/Doc-new.webp",
    "https://kitesseniorcare.com/wp-content/uploads/2023/04/Specialised-Care-Center.webp",
    "https://kitesseniorcare.com/wp-content/uploads/2025/05/Staff-scaled-6-new-1.webp",
  ],
  vedaanta: [
    "https://www.vedaanta.com/img/features-health-wellness.jpg",
    "https://www.vedaanta.com/img/features-recreational-amenities.jpg",
    "https://www.vedaanta.com/img/format-integrated-township.jpg",
  ],
  ashiana: [
    "https://ashianaseniorliving.com/images/indias1.jpg",
    "https://ashianaseniorliving.com/images/Green-Space.jpg",
    "https://ashianaseniorliving.com/images/Care-Homes.jpg",
  ],
  ashianaHousing: [
    "https://www.ashianahousing.com/assets/images/ashiana-vatsalya-homepage-banner-desktop.webp",
    "https://www.ashianahousing.com/assets/images/advik-category-page-desktop.webp",
    "https://www.ashianahousing.com/assets/images/amodh-category-page-desktop.webp",
  ],
  jagriti: [
    "https://www.jagritidham.com/wp-content/uploads/2023/12/photo_gallery5.webp",
    "https://www.jagritidham.com/wp-content/uploads/2023/12/photo_gallery7.webp",
    "https://www.jagritidham.com/wp-content/uploads/2023/11/Wellness-Services.webp",
  ],
  covaicare: [
    "https://www.covaicare.com/assets/img/covaihomebanner.jpeg",
  ],
  travancore: [
    "https://travancorefoundation.org/wp-content/uploads/2026/07/campus-aerial.webp",
    "https://travancorefoundation.org/wp-content/themes/travancore-foundation-theme-v2-1/assets/images/life-balcony.webp",
    "https://travancorefoundation.org/wp-content/themes/travancore-foundation-theme-v2-1/assets/images/life-dining.webp",
  ],
  nema: [
    "https://static.wixstatic.com/media/494bd0_166abeba824f4cfc93dfd7507006e056~mv2.jpg/v1/crop/x_1057,y_0,w_2494,h_3072/fill/w_281,h_347,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/DSC03951_JPG.jpg",
    "https://static.wixstatic.com/media/494bd0_8a987097a7ee4ecba8fa80bf8d7d7a2e~mv2.jpg/v1/crop/x_1057,y_0,w_2494,h_3072/fill/w_281,h_347,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/DSC04008_JPG.jpg",
    "https://static.wixstatic.com/media/494bd0_96a8c94ba26d4e8e89f1adef7fb54558~mv2.jpg/v1/crop/x_0,y_412,w_3072,h_3784/fill/w_281,h_347,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/DSC03956_JPG.jpg",
  ],
};

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

type PropertySeed = {
  name: string;
  citySlug: string;
  locality: string;
  address?: string;
  summary: string;
  careTypes: CareTypeSlug[];
  availableFacilities?: FacilityKey[];
  amenities?: string[];
  roomTypes?: string[];
  stayTypes?: string[];
  priceFrom?: number | null;
  priceNote?: string;
  officialWebsiteUrl: string;
  sourceLabel: string;
  sourceUrl: string;
  image?: string;
  gallery?: string[];
  googleRating?: number;
  googleReviewCount?: number;
  googleMapsUrl?: string;
  featured?: boolean;
};

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const sourceCheckedAt = "2026-09-09";

const galleryForSeed = (seed: PropertySeed, index: number) => {
  if (seed.gallery) return seed.gallery;
  if (seed.officialWebsiteUrl.includes("epocheldercare")) {
    if (seed.name.includes("Vermeer")) return ["https://d394n47j9kf644.cloudfront.net/veermeer.jpg", ...operatorGalleries.epoch];
    if (seed.name.includes("Frida")) return ["https://d394n47j9kf644.cloudfront.net/Frida%20front.jpg", ...operatorGalleries.epoch];
    if (seed.name.includes("Vincent")) return ["https://d394n47j9kf644.cloudfront.net/Vincent%20house.jpg", ...operatorGalleries.epoch];
    if (seed.name.includes("Gustav")) return ["https://d394n47j9kf644.cloudfront.net/Gustav_house_png_e2d7a3c9e5.png?16227229.700000048", ...operatorGalleries.epoch];
    if (seed.name.includes("Monet")) return ["https://epochwebsite2026.s3.ap-south-1.amazonaws.com/balewadi_house_9fb9ed82b4.webp", ...operatorGalleries.epoch];
    if (seed.name.includes("Picasso")) return ["https://d394n47j9kf644.cloudfront.net/picasso_image_1_1_2137e4733e.webp", ...operatorGalleries.epoch];
    return operatorGalleries.epoch;
  }
  if (seed.officialWebsiteUrl.includes("aurumliving")) return operatorGalleries.aurum;
  if (seed.officialWebsiteUrl.includes("antaraseniorcare")) return operatorGalleries.antara;
  if (seed.officialWebsiteUrl.includes("athulya")) return operatorGalleries.athulya;
  if (seed.sourceUrl.includes("location-bengaluru")) return operatorGalleries.kitesBengaluru;
  if (seed.sourceUrl.includes("location-chennai")) return operatorGalleries.kitesChennai;
  if (seed.sourceUrl.includes("location-coimbatore")) return operatorGalleries.kitesCoimbatore;
  if (seed.officialWebsiteUrl.includes("kitesseniorcare")) return operatorGalleries.kites;
  if (seed.officialWebsiteUrl.includes("vedaanta")) return operatorGalleries.vedaanta;
  if (seed.officialWebsiteUrl.includes("ashianaseniorliving")) return operatorGalleries.ashiana;
  if (seed.officialWebsiteUrl.includes("ashianahousing")) return operatorGalleries.ashianaHousing;
  if (seed.officialWebsiteUrl.includes("jagritidham")) return operatorGalleries.jagriti;
  if (seed.officialWebsiteUrl.includes("covaicare")) return operatorGalleries.covaicare;
  if (seed.officialWebsiteUrl.includes("travancorefoundation")) return operatorGalleries.travancore;
  if (seed.officialWebsiteUrl.includes("nemacare")) return operatorGalleries.nema;
  return [propertyImages[index % propertyImages.length], propertyImages[(index + 1) % propertyImages.length], propertyImages[(index + 2) % propertyImages.length]];
};

const realListingSeeds: PropertySeed[] = [
  { name: "Epoch Vermeer House", citySlug: "gurgaon", locality: "DLF Phase 1", summary: "Epoch Elder Care home in Gurugram for assisted living, dementia care and mobility support.", careTypes: ["assisted-living", "dementia-care"], availableFacilities: ["nutrition", "medical", "caregivers", "dementia", "parkinsons"], officialWebsiteUrl: "https://www.epocheldercare.com/", sourceLabel: "Epoch Elder Care website", sourceUrl: "https://www.epocheldercare.com/", googleRating: 4.4, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Epoch+Elder+Care+Vermeer+House+Gurugram", featured: true },
  { name: "Epoch Frida House", citySlug: "gurgaon", locality: "Sector 40", summary: "Epoch care home in Gurugram positioned for seniors needing personalised support, including dementia care.", careTypes: ["assisted-living", "dementia-care"], availableFacilities: ["nutrition", "medical", "caregivers", "dementia", "parkinsons"], officialWebsiteUrl: "https://www.epocheldercare.com/", sourceLabel: "Epoch Elder Care website", sourceUrl: "https://www.epocheldercare.com/", googleRating: 4.8, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Epoch+Elder+Care+Frida+House+Sector+40+Gurugram" },
  { name: "Epoch Vincent House", citySlug: "gurgaon", locality: "Sector 39", summary: "Supervised Epoch elder-care home in Gurugram for long-term and short-stay supported living.", careTypes: ["assisted-living", "post-operative-care", "rehabilitation"], availableFacilities: ["nutrition", "medical", "caregivers", "rehabilitation", "post-operative"], officialWebsiteUrl: "https://www.epocheldercare.com/", sourceLabel: "Epoch Elder Care website", sourceUrl: "https://www.epocheldercare.com/", googleRating: 4.5, googleReviewCount: 125, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Epoch+Elder+Care+Vincent+House+Sector+39+Gurugram" },
  { name: "Epoch Gustav House", citySlug: "gurgaon", locality: "Sector 51", summary: "Epoch care home in central Gurugram, listed by the operator with senior care and healthcare access.", careTypes: ["assisted-living", "dementia-care"], availableFacilities: ["nutrition", "medical", "caregivers", "dementia", "holistic"], officialWebsiteUrl: "https://www.epocheldercare.com/", sourceLabel: "Epoch Elder Care website", sourceUrl: "https://www.epocheldercare.com/", googleRating: 4.2, googleReviewCount: 5, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Epoch+Elder+Care+Gustav+House+Sector+51+Gurugram" },
  { name: "Epoch Monet House", citySlug: "pune", locality: "Balewadi", summary: "Epoch's Pune care home in Balewadi with dementia, rehabilitation and recreation support mentioned by the operator.", careTypes: ["assisted-living", "dementia-care", "rehabilitation"], availableFacilities: ["nutrition", "medical", "caregivers", "dementia", "rehabilitation"], officialWebsiteUrl: "https://www.epocheldercare.com/", sourceLabel: "Epoch Elder Care website", sourceUrl: "https://www.epocheldercare.com/", googleRating: 4.9, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Epoch+Elder+Care+Monet+House+Balewadi+Pune", featured: true },
  { name: "Epoch Picasso House", citySlug: "pune", locality: "Pune", summary: "Epoch elder-care home in Pune for assisted living and dementia care in a quieter residential setting.", careTypes: ["assisted-living", "dementia-care"], availableFacilities: ["nutrition", "medical", "caregivers", "dementia", "holistic"], officialWebsiteUrl: "https://www.epocheldercare.com/", sourceLabel: "Epoch Elder Care website", sourceUrl: "https://www.epocheldercare.com/", googleRating: 4.0, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Epoch+Picasso+House+Pune" },
  { name: "Aurum Living Gurgaon", citySlug: "gurgaon", locality: "South City 2", address: "Block H1/10, South City 2, Gurugram, Haryana 122018", summary: "Luxury assisted and senior living brand in Gurgaon with medical, dementia, post-operative and Parkinson's care listed by the operator.", careTypes: ["luxury-senior-living", "assisted-living", "dementia-care", "post-operative-care"], availableFacilities: ["nutrition", "medical", "caregivers", "dementia", "post-operative", "parkinsons", "rehabilitation"], officialWebsiteUrl: "https://aurumliving.com/", sourceLabel: "Aurum Living website", sourceUrl: "https://aurumliving.com/", googleRating: 4.3, googleReviewCount: 130, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Aurum+Senior+%26+Assisted+Living+Block+H1%2F10+South+City+2+Gurugram", featured: true },
  { name: "Gracias Living", citySlug: "gurgaon", locality: "Gurgaon", summary: "ASLI-listed assisted-living provider for families comparing premium eldercare in Gurgaon.", careTypes: ["assisted-living", "luxury-senior-living"], availableFacilities: ["nutrition", "medical", "caregivers", "holistic"], priceFrom: 66500, priceNote: "Operator website lists assisted living from ₹66,500 per month for twin sharing; final pricing depends on room type, duration and care level", officialWebsiteUrl: "https://www.graciasliving.com/", sourceLabel: "Gracias Living website and ASLI directory", sourceUrl: "https://graciasliving.com/", image: "https://graciasliving.com/wp-content/uploads/2026/03/hero-banner-img-1.png", gallery: ["https://graciasliving.com/wp-content/uploads/2026/03/hero-banner-img-1.png", "https://graciasliving.com/wp-content/uploads/2026/07/PHOTO-2026-06-27-14-54-34-2.jpg", "https://graciasliving.com/wp-content/uploads/2026/07/PHOTO-2026-06-27-14-54-35.jpg", "https://graciasliving.com/wp-content/uploads/2024/06/Photos-1536x1152.jpeg"], googleRating: 4.9, googleReviewCount: 168, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Gracias+Living+Sector+43+Gurugram" },
  { name: "Antara Dehradun", citySlug: "dehradun", locality: "Dehradun", summary: "Antara senior residence in Dehradun for independent senior living in a managed community.", careTypes: ["independent-living", "luxury-senior-living"], availableFacilities: ["nutrition", "medical", "holistic", "caregivers"], officialWebsiteUrl: "https://www.antaraseniorcare.com/", sourceLabel: "Antara Senior Care website", sourceUrl: "https://www.antaraseniorcare.com/", googleRating: 4.5, googleReviewCount: 210, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Antara+Senior+Living+Dehradun", featured: true },
  { name: "Antara Noida", citySlug: "noida", locality: "Noida", summary: "Antara senior residence in Noida for Delhi NCR families considering premium independent living.", careTypes: ["independent-living", "luxury-senior-living"], availableFacilities: ["nutrition", "medical", "holistic", "caregivers"], officialWebsiteUrl: "https://www.antaraseniorcare.com/", sourceLabel: "Antara Senior Care website", sourceUrl: "https://www.antaraseniorcare.com/", googleRating: 4.5, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Antara+Care+Homes+Sector+66+Noida" },
  { name: "Estate 360 Gurugram", citySlug: "gurgaon", locality: "Gurugram", summary: "Senior residence in Gurugram managed by Antara, useful for families comparing premium NCR communities.", careTypes: ["independent-living", "luxury-senior-living"], availableFacilities: ["nutrition", "medical", "holistic"], officialWebsiteUrl: "https://www.antaraseniorcare.com/", sourceLabel: "Antara Senior Care website", sourceUrl: "https://www.antaraseniorcare.com/", googleRating: 4.8, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Estate+360+Gurugram+Antara" },
  { name: "Estate 361 Gurugram", citySlug: "gurgaon", locality: "Gurugram", summary: "Antara-managed Gurugram senior residence for lifestyle-led senior living in Delhi NCR.", careTypes: ["independent-living", "luxury-senior-living"], availableFacilities: ["nutrition", "medical", "holistic"], officialWebsiteUrl: "https://www.antaraseniorcare.com/", sourceLabel: "Antara Senior Care website", sourceUrl: "https://www.antaraseniorcare.com/", googleRating: 4.8, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Estate+361+Gurugram+Antara" },
  { name: "Antara Care Homes", citySlug: "gurgaon", locality: "DLF Phase 2", summary: "Antara assisted care service for families seeking care homes, transition care and memory-care support.", careTypes: ["assisted-living", "dementia-care", "post-operative-care"], availableFacilities: ["nutrition", "medical", "caregivers", "dementia", "post-operative"], officialWebsiteUrl: "https://www.antaraseniorcare.com/", sourceLabel: "Antara Senior Care website", sourceUrl: "https://www.antaraseniorcare.com/", googleRating: 4.5, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Antara+Care+Homes+DLF+Phase+2+Gurgaon" },
  { name: "Athulya Senior Care Mathikere", citySlug: "bengaluru", locality: "Mathikere", summary: "Athulya Bengaluru unit for assisted living, mind and memory care, transition care and rehabilitation.", careTypes: ["assisted-living", "dementia-care", "rehabilitation", "post-operative-care"], availableFacilities: ["nutrition", "medical", "caregivers", "dementia", "rehabilitation", "post-operative"], officialWebsiteUrl: "https://www.athulyaseniorcare.com/assisted-living/bengaluru", sourceLabel: "Athulya Senior Care Bengaluru page", sourceUrl: "https://www.athulyaseniorcare.com/assisted-living/bengaluru", googleRating: 4.6, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Athulya+Senior+Care+Mathikere+Bengaluru", featured: true },
  { name: "Athulya Senior Care Whitefield", citySlug: "bengaluru", locality: "Whitefield", summary: "Athulya Bengaluru assisted-living facility listed by the operator for senior care and medical oversight.", careTypes: ["assisted-living", "dementia-care", "rehabilitation"], availableFacilities: ["nutrition", "medical", "caregivers", "dementia", "rehabilitation"], officialWebsiteUrl: "https://www.athulyaseniorcare.com/assisted-living/bengaluru", sourceLabel: "Athulya Senior Care Bengaluru page", sourceUrl: "https://www.athulyaseniorcare.com/assisted-living/bengaluru", googleRating: 4.6, googleReviewCount: 24, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Athulya+Senior+Care+Whitefield+Bengaluru" },
  { name: "Athulya Senior Care Kasavanahalli", citySlug: "bengaluru", locality: "Kasavanahalli", summary: "Athulya Bengaluru senior-care unit for assisted living and geriatric care support.", careTypes: ["assisted-living", "dementia-care", "post-operative-care"], availableFacilities: ["nutrition", "medical", "caregivers", "dementia", "post-operative"], officialWebsiteUrl: "https://www.athulyaseniorcare.com/assisted-living/bengaluru", sourceLabel: "Athulya Senior Care Bengaluru page", sourceUrl: "https://www.athulyaseniorcare.com/assisted-living/bengaluru", googleRating: 4.6, googleReviewCount: 205, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Athulya+Senior+Care+Kasavanahalli+Bengaluru" },
  { name: "Athulya Senior Care Chennai", citySlug: "chennai", locality: "Arumbakkam", summary: "Athulya assisted-living and senior-care presence in Chennai with memory, transition and rehabilitation services.", careTypes: ["assisted-living", "dementia-care", "rehabilitation", "post-operative-care"], availableFacilities: ["nutrition", "medical", "caregivers", "dementia", "rehabilitation", "post-operative"], officialWebsiteUrl: "https://www.athulyaseniorcare.com/", sourceLabel: "Athulya Senior Care website", sourceUrl: "https://www.athulyaseniorcare.com/", googleRating: 4.7, googleReviewCount: 51, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Athulya+Assisted+Living+Arumbakkam+Chennai" },
  { name: "Athulya Senior Care Coimbatore", citySlug: "coimbatore", locality: "Thudiyalur", summary: "Athulya senior-care location in Coimbatore for assisted living and related geriatric support.", careTypes: ["assisted-living", "dementia-care", "rehabilitation"], availableFacilities: ["nutrition", "medical", "caregivers", "dementia", "rehabilitation"], officialWebsiteUrl: "https://www.athulyaseniorcare.com/", sourceLabel: "Athulya Senior Care website", sourceUrl: "https://www.athulyaseniorcare.com/", googleRating: 4.6, googleReviewCount: 43, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Athulya+Senior+Care+Thudiyalur+Coimbatore" },
  { name: "Athulya Senior Care Hyderabad", citySlug: "hyderabad", locality: "Kukatpally", summary: "Athulya Hyderabad assisted-living and memory-care facility with rehabilitation and palliative-care services listed by the operator.", careTypes: ["assisted-living", "dementia-care", "rehabilitation", "post-operative-care"], availableFacilities: ["nutrition", "medical", "caregivers", "dementia", "rehabilitation", "post-operative"], officialWebsiteUrl: "https://athulyaliving.com/assisted-living-in-hyderabad.php", sourceLabel: "Athulya Hyderabad page", sourceUrl: "https://athulyaliving.com/assisted-living-in-hyderabad.php", googleRating: 5.0, googleReviewCount: 4, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Athulya+Senior+Care+Kukatpally+Hyderabad" },
  { name: "Athulya Senior Care Kochi", citySlug: "kochi", locality: "Kakkanad", summary: "Athulya senior-care location in Kochi for families comparing Kerala assisted-living and geriatric care options.", careTypes: ["assisted-living", "dementia-care", "rehabilitation"], availableFacilities: ["nutrition", "medical", "caregivers", "dementia", "rehabilitation"], officialWebsiteUrl: "https://www.athulyaseniorcare.com/", sourceLabel: "Athulya Senior Care website", sourceUrl: "https://www.athulyaseniorcare.com/", googleRating: 4.8, googleReviewCount: 60, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Athulya+Assisted+Living+Kakkanad+Kochi" },
  { name: "KITES Senior Care HBR Layout", citySlug: "bengaluru", locality: "HBR Layout", address: "#513 D, 1st Stage, 4th Block, HBR Layout, Nagavara, Bengaluru, Karnataka 560043", summary: "KITES geriatric care centre in Bengaluru for transition and rehab care, palliative care and dementia support.", careTypes: ["rehabilitation", "post-operative-care", "dementia-care", "assisted-living"], availableFacilities: ["medical", "caregivers", "rehabilitation", "post-operative", "dementia", "parkinsons"], officialWebsiteUrl: "https://kitesseniorcare.com/location-bengaluru/", sourceLabel: "KITES Bengaluru page", sourceUrl: "https://kitesseniorcare.com/location-bengaluru/", googleRating: 4.7, googleReviewCount: 320, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=KITES+Senior+Care+HBR+Layout+Bengaluru" },
  { name: "KITES Senior Care Banjara Hills", citySlug: "hyderabad", locality: "Banjara Hills", summary: "KITES Hyderabad geriatric care centre for transition and rehab care, palliative care, dementia support and home-linked services.", careTypes: ["rehabilitation", "post-operative-care", "dementia-care", "assisted-living"], availableFacilities: ["medical", "caregivers", "rehabilitation", "post-operative", "dementia"], officialWebsiteUrl: "https://kitesseniorcare.com/post-surgery-post-hospitalisation-rehab-care-hyderabad/", sourceLabel: "KITES Hyderabad page", sourceUrl: "https://kitesseniorcare.com/post-surgery-post-hospitalisation-rehab-care-hyderabad/", googleRating: 4.6, googleReviewCount: 62, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=KITES+Senior+Care+Banjara+Hills+Hyderabad" },
  { name: "KITES Senior Care Chennai", citySlug: "chennai", locality: "Chennai", summary: "KITES Chennai page lists transition and rehab care, palliative care, dementia support and home-based senior care.", careTypes: ["rehabilitation", "post-operative-care", "dementia-care"], availableFacilities: ["medical", "caregivers", "rehabilitation", "post-operative", "dementia"], officialWebsiteUrl: "https://kitesseniorcare.com/location-chennai/", sourceLabel: "KITES Chennai page", sourceUrl: "https://kitesseniorcare.com/location-chennai/", googleRating: 5.0, googleReviewCount: 20, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ahavaa+KITES+Senior+Care+Chennai" },
  { name: "KITES Senior Care Coimbatore", citySlug: "coimbatore", locality: "Saravanampatti", summary: "KITES Coimbatore page lists transition and rehab care, palliative care and dementia care for seniors.", careTypes: ["rehabilitation", "post-operative-care", "dementia-care"], availableFacilities: ["medical", "caregivers", "rehabilitation", "post-operative", "dementia"], officialWebsiteUrl: "https://kitesseniorcare.com/location-coimbatore/", sourceLabel: "KITES Coimbatore page", sourceUrl: "https://kitesseniorcare.com/location-coimbatore/", googleRating: 5.0, googleReviewCount: 7, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=KITES+Senior+Care+Saravanampatti+Coimbatore" },
  { name: "KITES Senior Care Kochi", citySlug: "kochi", locality: "Kakkanad", summary: "KITES elder-care presence in Kochi for families seeking transition, rehabilitation and geriatric support.", careTypes: ["rehabilitation", "post-operative-care", "assisted-living"], availableFacilities: ["medical", "caregivers", "rehabilitation", "post-operative"], officialWebsiteUrl: "https://kitesseniorcare.com/", sourceLabel: "KITES Senior Care website", sourceUrl: "https://kitesseniorcare.com/", googleRating: 5.0, googleReviewCount: 2, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=KITES+Senior+Care+Kakkanad+Kochi" },
  { name: "Vedaanta Premam", citySlug: "coimbatore", locality: "Coimbatore", summary: "Vedaanta retirement township in Coimbatore with integrated senior living and assisted-care positioning.", careTypes: ["independent-living", "luxury-senior-living", "assisted-living"], availableFacilities: ["nutrition", "medical", "holistic", "caregivers"], officialWebsiteUrl: "https://www.vedaanta.com/", sourceLabel: "Vedaanta website", sourceUrl: "https://www.vedaanta.com/", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Vedaanta+Premam+Coimbatore", featured: true },
  { name: "Vedaanta Anugraham", citySlug: "bengaluru", locality: "Anekal", summary: "Vedaanta Bangalore retirement community listed by the operator for active senior living and assisted-care access.", careTypes: ["independent-living", "luxury-senior-living", "assisted-living"], availableFacilities: ["nutrition", "medical", "holistic", "caregivers"], officialWebsiteUrl: "https://www.vedaanta.com/", sourceLabel: "Vedaanta website", sourceUrl: "https://www.vedaanta.com/", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Vedaanta+Anugraham+Anekal+Bengaluru" },
  { name: "Vedaanta Nandi Retreat", citySlug: "bengaluru", locality: "Nandi Hills", summary: "Vedaanta active retirement community in the Bangalore market with wellness and senior-living services.", careTypes: ["independent-living", "luxury-senior-living"], availableFacilities: ["nutrition", "medical", "holistic"], officialWebsiteUrl: "https://www.vedaanta.com/", sourceLabel: "Vedaanta website", sourceUrl: "https://www.vedaanta.com/", googleRating: 4.3, googleReviewCount: 7, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Vedaanta+Nandi+Retreat+Bengaluru" },
  { name: "Vedaanta Vistara", citySlug: "coimbatore", locality: "Coimbatore", summary: "Vedaanta micro-community in Coimbatore for senior living with personalised services.", careTypes: ["independent-living", "luxury-senior-living"], availableFacilities: ["nutrition", "medical", "holistic"], officialWebsiteUrl: "https://www.vedaanta.com/", sourceLabel: "Vedaanta website", sourceUrl: "https://www.vedaanta.com/", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Vedaanta+Vistara+Coimbatore" },
  { name: "Together Community by Vedaanta", citySlug: "hosur", locality: "Hosur", summary: "Vedaanta special community in Hosur with aided and independent-living support for neurodiverse adults and ageing families.", careTypes: ["independent-living", "assisted-living"], availableFacilities: ["medical", "holistic", "caregivers"], officialWebsiteUrl: "https://www.vedaanta.com/", sourceLabel: "Vedaanta website", sourceUrl: "https://www.vedaanta.com/", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Together+Community+by+Vedaanta+Hosur" },
  { name: "Vedaanta Chennai", citySlug: "chennai", locality: "Chennai", summary: "Vedaanta Chennai senior-living project listed by the operator among its retirement communities.", careTypes: ["independent-living", "luxury-senior-living"], availableFacilities: ["nutrition", "medical", "holistic"], officialWebsiteUrl: "https://www.vedaanta.com/", sourceLabel: "Vedaanta website", sourceUrl: "https://www.vedaanta.com/", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Vedaanta+Senior+Living+Chennai" },
  { name: "Ashiana Advik", citySlug: "bhiwadi", locality: "Alwar Bypass Road", summary: "Ashiana senior-living project in Bhiwadi with age-friendly residences and assisted-care centre positioning.", careTypes: ["independent-living", "luxury-senior-living", "assisted-living"], availableFacilities: ["nutrition", "medical", "holistic", "caregivers"], officialWebsiteUrl: "https://ashianaseniorliving.com/", sourceLabel: "Ashiana Senior Living website", sourceUrl: "https://ashianaseniorliving.com/", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ashiana+Advik+Bhiwadi", featured: true },
  { name: "Ashiana Vatsalya", citySlug: "chennai", locality: "Mahindra World City", summary: "Ashiana senior-living community in Chennai with age-friendly homes, amenities and assisted-care support.", careTypes: ["independent-living", "luxury-senior-living", "assisted-living"], availableFacilities: ["nutrition", "medical", "holistic", "caregivers"], officialWebsiteUrl: "https://ashianaseniorliving.com/", sourceLabel: "Ashiana Senior Living website", sourceUrl: "https://ashianaseniorliving.com/", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ashiana+Vatsalya+Chennai" },
  { name: "Swarang by Ashiana", citySlug: "chennai", locality: "ECR", summary: "Ashiana senior-living community on ECR, Chennai, for families comparing retirement homes and premium senior residences.", careTypes: ["independent-living", "luxury-senior-living"], availableFacilities: ["nutrition", "medical", "holistic"], officialWebsiteUrl: "https://ashianaseniorliving.com/", sourceLabel: "Ashiana Senior Living website", sourceUrl: "https://ashianaseniorliving.com/", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Swarang+by+Ashiana+Chennai" },
  { name: "Ashiana Amodh", citySlug: "pune", locality: "Talegaon", summary: "Ashiana senior-living project in Talegaon, Pune, with age-friendly apartments and managed community amenities.", careTypes: ["independent-living", "luxury-senior-living"], availableFacilities: ["nutrition", "medical", "holistic"], officialWebsiteUrl: "https://ashianaseniorliving.com/", sourceLabel: "Ashiana Senior Living website", sourceUrl: "https://ashianaseniorliving.com/", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ashiana+Amodh+Talegaon+Pune" },
  { name: "Ashiana Utsav Jaipur", citySlug: "jaipur", locality: "Jaipur", summary: "Ashiana senior-living community in Jaipur referenced by the operator's senior-living materials and resident testimonials.", careTypes: ["independent-living", "luxury-senior-living"], availableFacilities: ["nutrition", "medical", "holistic"], officialWebsiteUrl: "https://www.ashianahousing.com/senior-living-india", sourceLabel: "Ashiana Housing senior living page", sourceUrl: "https://www.ashianahousing.com/senior-living-india", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ashiana+Utsav+Jaipur" },
  { name: "Jagriti Dham", citySlug: "kolkata", locality: "Kriparampur", summary: "Kolkata senior-living community listed by ASLI for assisted living and positioned around premium eldercare.", careTypes: ["assisted-living", "independent-living", "luxury-senior-living"], availableFacilities: ["nutrition", "medical", "holistic", "caregivers"], officialWebsiteUrl: "https://www.jagritidham.com/", sourceLabel: "ASLI assisted living directory", sourceUrl: "https://www.asli.org.in/assisted-living/", googleRating: 4.8, googleReviewCount: 84, googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Jagriti+Dham+Kriparampur+Kolkata" },
  { name: "CovaiCare", citySlug: "coimbatore", locality: "Coimbatore", summary: "ASLI-listed senior-care and assisted-living operator in Coimbatore.", careTypes: ["assisted-living", "independent-living"], availableFacilities: ["nutrition", "medical", "caregivers"], officialWebsiteUrl: "https://www.covaicare.com/", sourceLabel: "ASLI assisted living directory", sourceUrl: "https://www.asli.org.in/assisted-living/", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=CovaiCare+Gem+Nirmaalayam+Coimbatore" },
  { name: "Travancore Foundation", citySlug: "kochi", locality: "Kerala", summary: "ASLI-listed assisted-living organisation in Kerala for families comparing care homes and senior support.", careTypes: ["assisted-living"], availableFacilities: ["nutrition", "medical", "caregivers"], officialWebsiteUrl: "https://travancorefoundation.com/", sourceLabel: "ASLI assisted living directory", sourceUrl: "https://www.asli.org.in/assisted-living/", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Travancore+Foundation+Kochi" },
  { name: "Nema Eldercare", citySlug: "mumbai", locality: "Mumbai", summary: "ASLI-listed eldercare organisation in Mumbai for families shortlisting senior-care and assisted-living support.", careTypes: ["assisted-living", "dementia-care"], availableFacilities: ["nutrition", "medical", "caregivers", "dementia"], officialWebsiteUrl: "https://nemacare.com/", sourceLabel: "ASLI assisted living directory", sourceUrl: "https://www.asli.org.in/assisted-living/", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Nema+Eldercare+Mumbai" },
];

export const properties: Property[] = realListingSeeds.map((seed, index) => {
  const city = cities.find((item) => item.slug === seed.citySlug);
  const gallery = galleryForSeed(seed, index);
  const facilitiesForProperty = { ...baseFacilities };
  seed.availableFacilities?.forEach((key) => {
    facilitiesForProperty[key] = "available";
  });

  return {
    id: `property-${String(index + 1).padStart(2, "0")}`,
    slug: slugify(seed.name),
    name: seed.name,
    citySlug: seed.citySlug,
    locality: seed.locality,
    state: city?.state || "India",
    address: seed.address || `${seed.locality}, ${city?.region || "India"}`,
    summary: seed.summary,
    description: `${seed.name} is a source-labelled directory profile based on publicly available operator or association information. Availability, current pricing, medical suitability, exact inclusions and room inventory should be confirmed directly with the operator before making a decision.`,
    careTypes: seed.careTypes,
    facilities: facilitiesForProperty,
    amenities: seed.amenities || ["Senior-friendly setting", "Care assessment on enquiry", "Family visit or call recommended", "Managed services to confirm", "Emergency process to verify"],
    roomTypes: seed.roomTypes || (seed.careTypes.includes("independent-living") ? ["Senior residence", "One-bedroom or two-bedroom options to confirm"] : ["Private room to confirm", "Companion room to confirm"]),
    stayTypes: seed.stayTypes || (seed.careTypes.includes("independent-living") ? ["Long-term"] : ["Long-term", "Short-stay or respite to confirm"]),
    priceFrom: seed.priceFrom ?? null,
    priceNote: seed.priceNote || "Current fees not published in this directory; request an operator quote",
    rating: seed.googleRating ?? null,
    reviewCount: 0,
    googleRating: seed.googleRating,
    googleReviewCount: seed.googleReviewCount,
    googleMapsUrl: seed.googleMapsUrl,
    verified: false,
    claimed: false,
    featured: Boolean(seed.featured),
    image: seed.image || gallery[0],
    gallery,
    officialWebsiteUrl: seed.officialWebsiteUrl,
    source: { label: seed.sourceLabel, url: seed.sourceUrl, checkedAt: sourceCheckedAt },
    lastUpdated: sourceCheckedAt,
  } satisfies Property;
});

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
    title: "Assisted living cost in India: monthly fees and extras",
    excerpt: "A practical framework for comparing monthly fees, care add-ons, deposits and the costs families often overlook.",
    category: "Costs & planning",
    publishedAt: "2026-08-05",
    readTime: "4 min read",
    updatedAt: "2026-09-09",
    summary: "The monthly cost of assisted living depends on the room, location and assessed care needs. Compare the full written quote, including personal assistance, nursing, therapies, consumables and deposits. Current operator-confirmed tariffs are not available in this directory.",
    image: guideImages[0],
    sections: [
      { heading: "Why assisted living costs vary", paragraphs: ["Location, room type, staffing intensity and clinical support all affect monthly pricing. A lower base fee may exclude personal care, consumables or specialist nursing."], bullets: ["Accommodation and housekeeping", "Meals and dietary plans", "Personal-care hours", "Nursing or doctor visits", "Physiotherapy and consumables"] },
      { heading: "Ask for an all-in monthly estimate", paragraphs: ["Share an honest care assessment and request a written INR estimate covering a typical month. Ask which events trigger a price review, whether deposits are refundable and what happens if care needs increase."] },
      { heading: "Compare like with like", paragraphs: ["Separate accommodation-led retirement living from care-led assisted living. Two similar room prices can produce very different monthly totals once night support, nursing, therapies and supplies are included."], bullets: ["Base residence fee", "Assessed care package", "Clinical and therapy add-ons", "One-time deposit or community fee", "Transport and emergency charges"] },
      { heading: "Planning with a ₹1–2 lakh monthly budget", paragraphs: ["If this is your family’s budget, share it with shortlisted providers together with the care assessment. Ask for two figures: the recurring monthly total and the amount due before admission. This budget is an illustration for planning, not a verified average price or a promise of availability."], bullets: ["Ask which services would take the quote above your budget.", "Check whether a dedicated attendant is included or billed separately.", "Confirm how annual increases and reassessments affect charges.", "Request written cancellation, refund and notice terms."] },
      { heading: "Comparing a named provider’s monthly fees", paragraphs: ["For searches such as Athulya Senior Care cost per month, obtain a current quote for the exact branch and care package. A price from another branch, an old brochure or a third-party listing may not apply. We do not currently have an operator-confirmed Athulya tariff to publish."] },
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
    title: "Dementia care plan: 12 questions families should ask",
    updatedAt: "2026-09-09",
    excerpt: "From staff training to environment design, the questions that reveal how memory care works day to day.",
    category: "Dementia care",
    publishedAt: "2026-07-29",
    readTime: "8 min read",
    image: guideImages[2],
    sections: [
      { heading: "Consistency creates reassurance", paragraphs: ["Strong memory care is built around familiar routines, careful communication and a team that understands the person’s life history."], bullets: ["Who develops and reviews the care plan?", "How are distress and changed behaviour supported?", "What dementia-specific training is required?", "How are families kept informed?", "How is the environment secured without feeling restrictive?"] },
      { heading: "Match support to the individual", paragraphs: ["A diagnosis alone does not describe a person’s needs. Discuss sleep, mobility, communication, continence, eating and medication in detail before admission."] },
      { heading: "Seven more questions before admission", paragraphs: ["Use these alongside the five questions above to document the practical arrangements for the stay."], bullets: ["Who is present on site overnight?", "How are food and language preferences recorded?", "Who coordinates appointments with the treating clinician?", "How are medicines received, stored and recorded?", "What happens when a regular carer is absent?", "Which services and supplies cost extra?", "When would the provider recommend a different care setting?"] },
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

const researchGuides: Article[] = [
  {
    slug: "rehabilitation-meaning-and-types",
    title: "Rehabilitation: meaning, types and care settings",
    excerpt: "Understand physical, neurological and geriatric rehabilitation, and compare home, outpatient and residential support for a parent in India.",
    summary: "Rehabilitation helps a person manage difficulties with everyday activities after illness, injury or a change in health. For older adults, the right programme depends on personal goals, clinical needs and the support available at home.",
    category: "Recovery", publishedAt: "2026-09-09", readTime: "4 min read", image: editorialImages.movingHome,
    sections: [
      { heading: "What does rehabilitation mean?", paragraphs: ["Rehabilitation focuses on everyday function and independence. It can involve a team of professionals, adaptations to the home and support for the family. A programme should identify what matters to the person, such as getting dressed or moving around the home.", "In this guide, rehabilitation means physical and functional support for older adults. Search results may also use the word for addiction services or other specialties; check that a centre treats the condition your parent needs help with."] },
      { heading: "Types of rehabilitation to discuss", paragraphs: ["The treating team should recommend the appropriate specialty. These labels can help you organise questions when comparing services."], bullets: ["Geriatric rehabilitation: support centred on an older person’s function and daily routine.", "Neurological rehabilitation: support related to conditions affecting the nervous system.", "Orthopaedic rehabilitation: support after bone, joint or muscle problems, including surgery.", "Cardiac or pulmonary rehabilitation: specialist programmes that require condition-specific clinical assessment."] },
      { heading: "Home, outpatient or residential care?", paragraphs: ["Ask whether your parent can travel for sessions, what help is needed between appointments and who will provide overnight support. For a residential stay, request details of the actual therapy schedule and the care available outside therapy hours. A room with visiting physiotherapy is different from a coordinated specialist programme."] },
      { heading: "Questions before booking a rehabilitation stay", paragraphs: ["Share the discharge summary with the proposed team and request a written assessment before committing."], bullets: ["Who coordinates the programme and reviews progress?", "Which professionals will see my parent, and how often?", "Are sessions individual or shared, and how are missed sessions handled?", "What equipment and assistance are available between sessions?", "What are the discharge goals and arrangements for follow-up at home?"] },
      { heading: "Compare the complete cost", paragraphs: ["Request separate prices for accommodation, personal care, nursing, each therapy discipline, equipment and transport. Ask when the estimate is reviewed and what happens if the stay needs to be extended. This directory does not have confirmed rehabilitation package prices."] },
    ],
    relatedLinks: [{ label: "Compare senior rehabilitation residences", href: "/care/rehabilitation" }, { label: "Stroke rehabilitation guide", href: "/blog/stroke-rehabilitation-care-guide" }, { label: "Planning care after hospital discharge", href: "/blog/post-operative-care-after-discharge" }],
    sources: [{ label: "World Health Organization: rehabilitation", href: "https://www.who.int/news-room/fact-sheets/detail/rehabilitation" }],
  },
  {
    slug: "stroke-rehabilitation-care-guide", title: "Stroke rehabilitation: choosing care after discharge",
    excerpt: "A family guide to comparing stroke rehabilitation centres in India, understanding the care team and planning the transition home.",
    summary: "Stroke rehabilitation is tailored to the abilities affected by a stroke. When choosing a centre, ask the treating team what support is needed, then compare the centre’s staff, therapy plan, nursing coverage and approach to returning home.",
    category: "Recovery", publishedAt: "2026-09-09", readTime: "4 min read", image: editorialImages.conversation,
    sections: [
      { heading: "What can stroke rehabilitation include?", paragraphs: ["Support may include physiotherapy, occupational therapy, and help with speech or swallowing, depending on the person’s assessment. Recovery varies between people. The care plan should reflect the abilities affected and be reviewed with the treating team."] },
      { heading: "Choosing a stroke rehabilitation centre in India", paragraphs: ["Ask the hospital team for the level of care required before comparing residences. A listing that mentions rehabilitation does not establish specialist stroke capability. Send the proposed provider the discharge summary and ask for written confirmation that the team can meet the assessed needs."], bullets: ["Identify the clinician responsible for the programme.", "Confirm which therapists are employed on site and which visit.", "Ask how nursing, transfers and personal care are covered overnight.", "Request the escalation process if the resident’s condition changes."] },
      { heading: "Questions for the first care-plan meeting", paragraphs: ["Bring a short list of everyday priorities agreed with your parent. Ask how progress will be recorded and how the family can participate without taking over the person’s choices."], bullets: ["What are the initial goals and when will you review them?", "How is the schedule adapted when the person is tired?", "Who will explain safe assistance to family members?", "How will the team communicate with the original treating doctor?"] },
      { heading: "What to include in the monthly estimate", paragraphs: ["Ask for a quote based on the assessment, with therapy frequency, nursing, personal care, equipment and consumables listed separately. Confirm charges for appointments outside the centre and any additional escort or ambulance services. Avoid comparing room rates as if they covered the same clinical programme."] },
      { heading: "Preparing to return home", paragraphs: ["Discuss the home environment, family training and ongoing appointments before discharge from the centre. Ask which tasks require assistance and obtain written instructions from the care team. A fixed package duration should not be treated as a promise of recovery."] },
    ],
    relatedLinks: [{ label: "Senior rehabilitation directory", href: "/care/rehabilitation" }, { label: "Understand neuro rehabilitation", href: "/blog/neuro-rehabilitation-for-seniors" }, { label: "Post-operative and transition care", href: "/care/post-operative-care" }],
    sources: [{ label: "NHS: recovery after a stroke", href: "https://www.nhs.uk/conditions/stroke/recovery/" }],
  },
  {
    slug: "neuro-rehabilitation-for-seniors", title: "Neuro rehabilitation for seniors: a family guide",
    excerpt: "Compare neurological rehabilitation programmes, care teams, therapy schedules and residential support for an older parent in India.",
    summary: "Neuro rehabilitation supports people whose daily function is affected by a neurological condition. Families should compare programmes against an individual assessment, including therapy needs, personal assistance and medical oversight.",
    category: "Recovery", publishedAt: "2026-09-09", readTime: "3 min read", image: editorialImages.everydayLife,
    sections: [
      { heading: "What is neuro rehabilitation?", paragraphs: ["Neurological rehabilitation may involve movement, communication and everyday tasks, depending on the condition and the person’s goals. Ask the treating specialist to describe the services required before searching for a centre. Equipment alone does not tell you whether a programme is suitable."] },
      { heading: "What to ask the rehabilitation team", paragraphs: ["Request the names, roles and availability of the professionals who would support your parent. Ask how the team shares updates and who takes responsibility for changing the plan."], bullets: ["Is there experience with the specific condition and level of dependency?", "Which sessions are included in the quoted programme?", "How is assistance provided outside therapy hours?", "Who reviews progress and discusses it with the family?"] },
      { heading: "Comparing centres in Bangalore, Hyderabad and other cities", paragraphs: ["Start with the required care, then consider travel for follow-up appointments and family visits. In a large city, check the actual address and journey to the treating hospital. Ask for an ordinary-day video tour if you are arranging care from abroad, followed by an in-person visit by someone you trust.", "Our general rehabilitation profiles are starting points for enquiries. Specialist neurological capability and current availability must be confirmed with each provider."] },
      { heading: "Document the plan before admission", paragraphs: ["Request the proposed schedule, review dates, complete estimate and conditions for extending or ending the stay. Keep a copy of the hospital handover and agree who receives updates. Ask what would require a transfer to a hospital or another level of care."] },
    ],
    relatedLinks: [{ label: "Compare rehabilitation support", href: "/care/rehabilitation" }, { label: "Stroke rehabilitation checklist", href: "/blog/stroke-rehabilitation-care-guide" }, { label: "Browse Bengaluru residences", href: "/assisted-living/bengaluru" }, { label: "Browse Hyderabad residences", href: "/assisted-living/hyderabad" }],
    sources: [{ label: "World Health Organization: rehabilitation", href: "https://www.who.int/news-room/fact-sheets/detail/rehabilitation" }],
  },
  {
    slug: "dementia-care-at-home-vs-care-home", title: "Dementia care at home or a care home?",
    excerpt: "Compare home care for dementia with residential memory care: daily support, family involvement, overnight coverage and questions about fees.",
    summary: "The choice between dementia care at home and a care home depends on the person’s needs, preferences and available support. Compare who can provide consistent help throughout the day and night, and ask for a professional assessment before deciding.",
    category: "Dementia care", publishedAt: "2026-09-09", readTime: "4 min read", image: editorialImages.familyGarden,
    sections: [
      { heading: "Start with the person’s daily needs", paragraphs: ["Dementia affects people differently and support needs can change over time. Write down the help currently needed with daily activities and discuss changes with the treating professional. Include the person in decisions in a way they can participate in."], bullets: ["Who is available during the day and overnight?", "Which routines, language and relationships are most familiar?", "What support does the family caregiver need?", "Who coordinates appointments and changes to the care plan?"] },
      { heading: "Questions about dementia care at home", paragraphs: ["Ask the agency how it selects and trains carers, provides replacements and communicates with family members. Confirm the hours covered by the package and the response if a carer is absent. A plan that relies on relatives should make those responsibilities explicit so everyone understands the commitment."] },
      { heading: "Questions about a residential memory care home", paragraphs: ["Visit the home and observe a normal routine. Ask about staff continuity, night coverage, individual activities and how preferences are recorded. Discuss how families can stay involved and what happens if the home can no longer meet the person’s needs."] },
      { heading: "Compare the complete cost of both options", paragraphs: ["For home care, include agency hours, backup cover, equipment, meals and family coordination. For a care home, separate the room fee, assessed care, personal supplies, appointments and transport. Request quotes for the same needs and time period; this directory does not publish confirmed dementia-care tariffs."] },
      { heading: "Make a care plan that can be reviewed", paragraphs: ["Agree who keeps the written plan up to date, who receives routine updates and whom to contact when needs change. Record personal preferences alongside the practical arrangements. Review whether the chosen setting continues to work for the person and their carers."] },
    ],
    relatedLinks: [{ label: "Compare dementia care homes in India", href: "/care/dementia-care" }, { label: "Dementia care homes in Mumbai", href: "/care/dementia-care/mumbai" }, { label: "Questions for a memory care visit", href: "/blog/dementia-care-questions-for-families" }],
    sources: [{ label: "World Health Organization: dementia", href: "https://www.who.int/news-room/fact-sheets/detail/dementia" }],
  },
];

export const guideTopics = [
  { id: "starting", label: "Getting started", description: "Understand the choices", categories: ["Family guide", "Assisted living 101", "Care comparison", "Nutrition & wellbeing"], href: "/care/assisted-living" },
  { id: "costs", label: "Costs & planning", description: "Know what to budget", categories: ["Costs & planning"], href: "/blog/cost-of-assisted-living-in-india" },
  { id: "memory", label: "Dementia care", description: "Find the right support", categories: ["Dementia care"], href: "/care/dementia-care" },
  { id: "recovery", label: "Recovery & rehab", description: "Plan the next step", categories: ["Recovery"], href: "/care/rehabilitation" },
  { id: "cities", label: "City guides", description: "Explore closer to home", categories: ["City guide"], href: "/directory" },
];

export const articles: Article[] = [...guides, ...researchGuides, ...cityArticles];

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

export const careersEmail = "careers@careya.in";

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
