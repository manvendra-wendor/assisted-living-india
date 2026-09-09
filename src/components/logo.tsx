import Link from "next/link";
import { Sprout } from "lucide-react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link className={`logo ${light ? "logo-light" : ""}`} href="/" aria-label="Careya home">
      <span className="logo-mark"><Sprout size={20} strokeWidth={1.8} /></span>
      <span><strong>Careya</strong><small>INDIA</small></span>
    </Link>
  );
}
