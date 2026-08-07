import { redirect } from "next/navigation";
import { createSupabaseAdminClient, getCurrentProfile, isSupabaseConfigured } from "@/lib/supabase/server";

export async function getAdminContext() {
  if (!isSupabaseConfigured()) return { preview: true, admin: null };
  const account = await getCurrentProfile();
  if (!account) redirect("/login");
  if (account.profile?.role !== "admin") redirect("/");
  return { preview: false, admin: createSupabaseAdminClient() };
}
