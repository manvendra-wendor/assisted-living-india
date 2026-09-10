"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, Minus, Plus, Share2 } from "lucide-react";
import { PricingTrigger } from "@/components/pricing-modal";
import { availabilityLabel, facilities, getCity, properties } from "@/lib/data";
import { useCompare } from "@/components/compare-provider";

export function ComparisonView({ initialIds = [] }: { initialIds?: string[] }) {
  const [urlIds, setUrlIds] = useState<string[]>(initialIds);
  const { ids: storedIds } = useCompare();
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const ids = new URLSearchParams(window.location.search).get("ids") || "";
      setUrlIds(ids.split(",").filter(Boolean));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
  const ids = (urlIds.length ? urlIds : storedIds).slice(0, 3);
  const selected = ids.map((id) => properties.find((property) => property.id === id)).filter((property): property is NonNullable<typeof property> => Boolean(property));
  if (selected.length < 2) return <div className="comparison-empty"><h2 style={{ color: "var(--forest)" }}>Choose two or three residences</h2><p style={{ color: "var(--muted)" }}>Use the Compare button on directory cards. Your selection stays on this device, and the comparison link can be shared.</p><Link className="button button-gold" href="/browse">Browse residences <Plus size={16} /></Link></div>;
  const countStyle = { "--compare-count": selected.length } as React.CSSProperties;
  const copyLink = async () => { await navigator.clipboard?.writeText(window.location.href); };
  return <>
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 15 }}><button className="button button-ghost button-small" onClick={copyLink}><Share2 size={15} /> Copy share link</button></div>
    <div className="compare-scroll"><div className="compare-table" style={countStyle}>
      <div className="compare-row"><div className="compare-label">Residence</div>{selected.map((property) => <div className="compare-property" key={property.id}><div className="compare-property-image"><Image src={property.image} alt="" fill sizes="300px" /></div><h3>{property.name}</h3><span className="property-location">{property.locality}, {getCity(property.citySlug)?.name}</span><Link className="text-link" style={{ marginTop: 12 }} href={`/properties/${property.slug}`}>View profile</Link></div>)}</div>
      <Row label="Verification" values={selected.map((property) => property.verified ? "Operator verified" : "Unclaimed editorial profile")} />
      <div className="compare-row"><div className="compare-label">Monthly fees</div>{selected.map((property) => <div className="compare-cell" key={property.id}><PricingTrigger propertyId={property.id} propertyName={property.name} city={getCity(property.citySlug)?.name} className="pricing-trigger text-link">Get pricing</PricingTrigger></div>)}</div>
      <Row label="Room types" values={selected.map((property) => property.roomTypes.join(", "))} />
      <Row label="Stay options" values={selected.map((property) => property.stayTypes.join(", "))} />
      {facilities.map((facility) => <Row key={facility.key} label={facility.shortLabel} values={selected.map((property) => availabilityLabel(property.facilities[facility.key]))} availability />)}
      <Row label="Amenities" values={selected.map((property) => property.amenities.join(" · "))} />
      <div className="compare-row"><div className="compare-label">Next step</div>{selected.map((property) => <div key={property.id}><Link className="button button-gold button-small" href={`/properties/${property.slug}#enquire`}>Enquire</Link></div>)}</div>
    </div></div>
  </>;
}

function Row({ label, values, availability = false }: { label: string; values: string[]; availability?: boolean }) {
  return <div className="compare-row"><div className="compare-label">{label}</div>{values.map((value, index) => <div className="compare-cell" key={`${value}-${index}`}>{availability && (value === "Available" ? <Check size={15} color="var(--forest)" style={{ verticalAlign: "middle", marginRight: 6 }} /> : <Minus size={15} color="var(--gold-dark)" style={{ verticalAlign: "middle", marginRight: 6 }} />)}{value}</div>)}</div>;
}
