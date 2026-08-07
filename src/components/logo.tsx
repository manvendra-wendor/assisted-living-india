import Link from "next/link";
import { Sprout } from "lucide-react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link className={`logo ${light ? "logo-light" : ""}`} href="/" aria-label="Assisted Living India home">
      <span className="logo-mark"><Sprout size={20} strokeWidth={1.8} /></span>
      <span><strong>Assisted Living</strong><small>INDIA</small></span>
    </Link>
  );
}
