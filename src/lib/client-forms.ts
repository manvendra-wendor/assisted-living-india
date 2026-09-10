"use client";

export type ClientFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string[]>;
};

export const initialClientFormState: ClientFormState = { status: "idle", message: "" };

export async function submitClientForm(endpoint: string, form: HTMLFormElement): Promise<ClientFormState> {
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries()) as Record<string, FormDataEntryValue>;
  const searchParams = new URLSearchParams(window.location.search);

  payload.sourceUrl ||= window.location.href;
  payload.utmSource ||= searchParams.get("utm_source") || "";
  payload.utmMedium ||= searchParams.get("utm_medium") || "";
  payload.utmCampaign ||= searchParams.get("utm_campaign") || "";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => null) as ClientFormState | null;
    if (result?.status) return result;
    return {
      status: response.ok ? "success" : "error",
      message: response.ok ? "Thank you. We will reach out soon." : "We could not save your request. Please try again.",
    };
  } catch {
    return { status: "error", message: "Network issue. Please check your connection and try again." };
  }
}
