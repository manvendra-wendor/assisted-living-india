import Link from "next/link";
import { Building2, ClipboardList, LayoutDashboard, MessageSquareText, ShieldCheck, UserRoundCheck } from "lucide-react";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/leads", label: "Leads", icon: UserRoundCheck },
  { href: "/admin/reviews", label: "Reviews", icon: MessageSquareText },
  { href: "/admin/listings", label: "Listing submissions", icon: ClipboardList },
  { href: "/admin/claims", label: "Ownership claims", icon: ShieldCheck },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return <div className="dashboard-layout"><aside className="dashboard-nav"><h2>Directory admin</h2><nav>{links.map(({ href, label, icon: Icon }) => <Link href={href} key={href}><Icon size={15} style={{ verticalAlign: "middle", marginRight: 8 }} />{label}</Link>)}</nav></aside><section className="dashboard-main">{children}</section></div>;
}
