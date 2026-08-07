"use client";

import { useActionState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { sendMagicLink } from "@/app/actions";
import { initialActionState } from "@/lib/validation";

export function AuthForm() {
  const [state, action, pending] = useActionState(sendMagicLink, initialActionState);
  return <>
    <a className="button button-ghost" style={{ width: "100%" }} href="/auth/google">Continue with Google</a>
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0", color: "var(--muted)", fontSize: ".67rem" }}><span style={{ height: 1, background: "var(--line)", flex: 1 }} />OR USE EMAIL<span style={{ height: 1, background: "var(--line)", flex: 1 }} /></div>
    <form action={action}><div className="form-field"><label htmlFor="login-email">Email address</label><input id="login-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></div>{state.status !== "idle" && <p className={`form-status ${state.status === "error" ? "error" : ""}`}>{state.message}</p>}<button className="button" style={{ width: "100%", marginTop: 14 }} disabled={pending} type="submit"><Mail size={16} />{pending ? "Sending…" : "Email me a secure link"}<ArrowRight size={15} /></button></form>
  </>;
}
