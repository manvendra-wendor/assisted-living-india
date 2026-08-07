import Link from "next/link";
import { HeartHandshake, Menu, Phone } from "lucide-react";
import { Logo } from "@/components/logo";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="announcement">
        <HeartHandshake size={15} /> Independent guidance for your family’s next chapter
      </div>
      <div className="container nav-row">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/directory">Find a residence</Link>
          <Link href="/care/assisted-living">Types of care</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/blog">Guides</Link>
        </nav>
        <div className="nav-actions">
          <Link className="nav-phone" href="/concierge"><Phone size={16} /> Speak to an advisor</Link>
          <Link className="button button-small" href="/list-your-property">List your property</Link>
          <details className="mobile-menu">
            <summary aria-label="Open menu"><Menu size={22} /></summary>
            <nav>
              <Link href="/directory">Find a residence</Link>
              <Link href="/care/assisted-living">Types of care</Link>
              <Link href="/compare">Compare residences</Link>
              <Link href="/blog">Guides & advice</Link>
              <Link href="/concierge">Speak to an advisor</Link>
              <Link href="/login">Sign in</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
