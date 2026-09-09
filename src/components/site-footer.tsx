import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/logo";
import { careTypes, popularLocations } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-intro">
          <Logo light />
          <p>Clear, compassionate guidance for families comparing premium senior care across India.</p>
          <Link className="footer-contact" href="mailto:hello@careya.in"><Mail size={17} /> hello@careya.in</Link>
          <span className="footer-contact"><MapPin size={17} /> Serving families across India</span>
        </div>
        <div>
          <h3>Popular locations</h3>
          <ul>{popularLocations.slice(0, 6).map((city) => <li key={city.slug}><Link href={`/assisted-living/${city.slug}`}>{city.name}</Link></li>)}</ul>
        </div>
        <div>
          <h3>Explore care</h3>
          <ul>{careTypes.slice(0, 6).map((care) => <li key={care.slug}><Link href={`/care/${care.slug}`}>{care.name}</Link></li>)}</ul>
        </div>
        <div>
          <h3>For families</h3>
          <ul>
            <li><Link href="/compare">Compare residences</Link></li>
            <li><Link href="/concierge">Free concierge</Link></li>
            <li><Link href="/blog">Care guides</Link></li>
            <li><Link href="/review-guidelines">Review guidelines</Link></li>
            <li><Link href="/login">Sign in <ArrowUpRight size={13} /></Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Careya. Information is guidance, not medical advice.</p>
        <div><Link href="/careers">Careers</Link><Link href="/editorial-policy">Editorial policy</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
      </div>
    </footer>
  );
}
