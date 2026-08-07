import { Search } from "lucide-react";
import { careTypes, directoryLocations } from "@/lib/data";

export function SearchBox({ compact = false, defaultCity = "", defaultCare = "" }: { compact?: boolean; defaultCity?: string; defaultCare?: string }) {
  return (
    <form className={`search-box ${compact ? "search-box-compact" : ""}`} action="/directory">
      <label>
        <span>Where are you looking?</span>
        <select name="city" defaultValue={defaultCity} aria-label="Choose a city">
          <option value="">All locations</option>
          {directoryLocations.map((city) => <option key={city.slug} value={city.slug}>{city.name}</option>)}
        </select>
      </label>
      <label>
        <span>What care is needed?</span>
        <select name="care" defaultValue={defaultCare} aria-label="Choose a care type">
          <option value="">All types of care</option>
          {careTypes.map((care) => <option key={care.slug} value={care.slug}>{care.name}</option>)}
        </select>
      </label>
      <button className="button button-gold" type="submit"><Search size={18} /> Search residences</button>
    </form>
  );
}
