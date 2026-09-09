import type { Metadata } from "next";
import Image from "next/image";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = { title: "Sign In", description: "Sign in to submit and track reviews on Careya.", alternates: { canonical: "/login" }, robots: { index: false, follow: true } };

export default function LoginPage() {
  return <div className="split-page"><aside className="split-page-aside"><Image src="https://images.unsplash.com/photo-1544725121-be3bf52e2dc8?auto=format&fit=crop&w=1300&q=86" alt="An older couple enjoying time together" fill sizes="(max-width: 760px) 100vw, 40vw" /><div><span className="eyebrow">Your family account</span><h1>Share experience. Help another family.</h1><p>Sign in securely to submit genuine reviews and follow their editorial status.</p></div></aside><section className="split-page-main"><div className="form-card"><span className="eyebrow">Welcome</span><h2>Sign in or create an account</h2><p>No password to remember. Use Google or receive a secure one-time link by email.</p><div style={{ marginTop: 28 }}><AuthForm /></div><p className="turnstile-note" style={{ marginTop: 22 }}>By continuing, you agree to our terms and privacy policy.</p></div></section></div>;
}
