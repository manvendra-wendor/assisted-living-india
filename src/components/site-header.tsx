import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { Logo } from "@/components/logo";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container nav-row">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/browse">Find a residence</Link>
          <Link href="/care/assisted-living">Types of care</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/blog">Guides</Link>
        </nav>
        <div className="nav-actions">
          <Link className="nav-provider" href="/list-your-property">For providers</Link>
          <Link className="button button-small nav-phone" href="/concierge"><Phone size={15} /> Speak to an advisor</Link>
          <details className="mobile-menu">
            <summary aria-label="Open menu"><Menu size={22} /></summary>
            <nav>
              <Link href="/browse">Find a residence</Link>
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
