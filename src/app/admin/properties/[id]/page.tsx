import { notFound } from "next/navigation";
import { saveProperty } from "@/app/actions";
import { getAdminContext } from "@/lib/admin";
import { cities, properties } from "@/lib/data";

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { preview, admin } = await getAdminContext();
  let property: Record<string, unknown> | null = null;
  if (preview) property = properties.find((item) => item.id === id) as unknown as Record<string, unknown> || null;
  else if (admin) { const { data } = await admin.from("properties").select("*").eq("id", id).maybeSingle(); property = data; }
  if (!property) notFound();
  return <><span className="eyebrow">Property management</span><h1>Edit {String(property.name)}</h1><div className="form-card"><form action={saveProperty}><input type="hidden" name="id" value={String(property.id)} /><div className="form-grid"><Field name="name" label="Property name" value={property.name} required /><Field name="slug" label="URL slug" value={property.slug} required /><div className="form-field"><label htmlFor="cityId">City</label><select name="cityId" id="cityId" required defaultValue={String(property.city_id || property.citySlug || "")}><option value="" disabled>Choose city</option>{cities.map((city) => <option value={city.slug} key={city.slug}>{city.name}</option>)}</select></div><Field name="locality" label="Locality" value={property.locality} /><div className="form-field form-field-full"><label htmlFor="summary">Short summary</label><textarea id="summary" name="summary" defaultValue={String(property.summary || "")} /></div><div className="form-field form-field-full"><label htmlFor="description">Full description</label><textarea id="description" name="description" defaultValue={String(property.description || "")} /></div><Field name="priceFrom" label="Monthly price from (INR)" type="number" value={property.price_from || property.priceFrom} /><Field name="priceNote" label="Pricing note" value={property.price_note || property.priceNote} /><div className="form-field"><label htmlFor="status">Publication status</label><select id="status" name="status" defaultValue={String(property.status || "draft")}><option value="draft">Draft</option><option value="pending">Pending</option><option value="published">Published</option><option value="rejected">Rejected</option></select></div><Field name="sourceLabel" label="Source label" value={property.source_label} /><Field name="sourceUrl" label="Source URL" type="url" value={property.source_url} /></div><button className="button button-gold" type="submit">Save changes</button></form></div></>;
}

function Field({ name, label, value, type = "text", required = false }: { name: string; label: string; value?: unknown; type?: string; required?: boolean }) { return <div className="form-field"><label htmlFor={name}>{label}</label><input id={name} name={name} type={type} defaultValue={String(value || "")} required={required} /></div>; }
