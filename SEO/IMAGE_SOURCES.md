# Editorial image sources

Checked: 2026-09-07

The people and lifestyle photographs below are licensed stock used to make the MVP feel culturally relevant to Indian families. They are editorial illustrations and must not be presented as photographs of a listed property. Provider-supplied, licensed property photographs should replace them when a listing is claimed.

| Use | Source page |
| --- | --- |
| Homepage hero / illustrative Dehradun foothills residence | AI-generated original stored at `src/app/careya-hero-landscape.jpg`; not a photograph of a listed property |
| Indian family at home | https://www.pexels.com/photo/woman-and-men-sitting-by-table-14769676/ |
| Indian grandparents with grandchild | https://www.pexels.com/photo/grandparents-with-boy-18394078/ |
| Senior Indian couple moving into a home | https://www.pexels.com/photo/woman-and-man-with-box-in-room-14769675/ |
| Senior Indian couple reading together | https://www.pexels.com/photo/woman-and-man-sitting-and-reading-newspaper-14769678/ |
| Indian senior couple at a celebration | https://www.pexels.com/photo/senior-couple-celebrating-at-a-birthday-party-32083132/ |
| Indian senior couple at a bookstore | https://www.pexels.com/photo/joyful-elderly-couple-shopping-together-38444088/ |
| Dehradun / Forest Research Institute | https://www.pexels.com/photo/forest-research-institute-facade-in-dehradun-35472467/ |
| Gurgaon / Gurugram city view | https://www.pexels.com/photo/aerial-view-of-city-buildings-7104646/ |
| Concierge page family-guidance image | https://unsplash.com/photos/1544717305-2782549b5136 |
| List-your-property page residence image | https://unsplash.com/photos/1600566753190-17f0baa2a6c3 |

| Careers page / grandparents with grandchild | https://www.pexels.com/photo/grandparents-with-boy-18394078/ |

Pexels licence: https://www.pexels.com/license/

Unsplash licence: https://unsplash.com/license

## Adding an image

Register the URL in `editorialImages` in `src/lib/data.ts` rather than inlining it in a page, add a row above, and confirm the host is allowed in `next.config.ts` `images.remotePatterns`. Decorative photography takes `alt=""`; an image carrying meaning needs a real description.
