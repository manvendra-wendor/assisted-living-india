import type { Metadata } from "next";
import { AdminShell } from "@/components/admin-shell";
import { getAdminContext } from "@/lib/admin";

export const metadata: Metadata = { title: "Directory Admin", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await getAdminContext();
  return <AdminShell>{children}</AdminShell>;
}
