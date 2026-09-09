"use client";

import { HeartHandshake } from "lucide-react";
import { usePathname } from "next/navigation";
import { PricingTrigger } from "@/components/pricing-modal";

export function StickyLeadCta() {
  const pathname = usePathname();
  if (pathname === "/" || pathname.startsWith("/admin") || pathname === "/login" || pathname.startsWith("/auth") || pathname === "/concierge" || pathname === "/list-your-property") return null;
  return <div className="sticky-lead-cta" role="region" aria-label="Get senior care guidance">
    <div><HeartHandshake size={18} /><span><strong>Need help choosing care?</strong><small>Tell us where in India you are looking.</small></span></div>
    <PricingTrigger className="button sticky-lead-button">Get my shortlist</PricingTrigger>
  </div>;
}
