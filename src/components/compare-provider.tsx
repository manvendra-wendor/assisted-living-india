"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, GitCompareArrows, X } from "lucide-react";
import { properties } from "@/lib/data";
import { toggleComparison } from "@/lib/compare";

interface CompareContextValue {
  ids: string[];
  toggle: (id: string) => void;
  contains: (id: string) => boolean;
  clear: () => void;
  atLimit: boolean;
}

const CompareContext = createContext<CompareContextValue | null>(null);
const storageKey = "ali-compare";

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const interacted = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem(storageKey) || "[]") as string[];
        if (!interacted.current) setIds(stored.filter((id) => properties.some((property) => property.id === id)).slice(0, 3));
      } catch { if (!interacted.current) setIds([]); }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(storageKey, JSON.stringify(ids));
  }, [ids, ready]);

  const toggle = useCallback((id: string) => { interacted.current = true; setReady(true); setIds((current) => toggleComparison(current, id)); }, []);
  const clear = useCallback(() => { interacted.current = true; setReady(true); setIds([]); }, []);
  const value = useMemo(() => ({ ids, toggle, contains: (id: string) => ids.includes(id), clear, atLimit: ids.length >= 3 }), [clear, ids, toggle]);

  return <CompareContext.Provider value={value}>{children}<CompareBar /></CompareContext.Provider>;
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used within CompareProvider");
  return context;
}

export function CompareToggle({ id, compact = false }: { id: string; compact?: boolean }) {
  const { contains, toggle, atLimit } = useCompare();
  const selected = contains(id);
  return (
    <button
      type="button"
      className={`compare-toggle ${selected ? "selected" : ""} ${compact ? "compact" : ""}`}
      onClick={() => toggle(id)}
      disabled={!selected && atLimit}
      title={!selected && atLimit ? "You can compare up to three residences" : undefined}
    >
      {selected ? <Check size={compact ? 15 : 17} /> : <GitCompareArrows size={compact ? 15 : 17} />}
      {selected ? "Added" : "Compare"}
    </button>
  );
}

function CompareBar() {
  const { ids, toggle, clear } = useCompare();
  if (!ids.length) return null;
  const selected = ids.map((id) => properties.find((property) => property.id === id)).filter(Boolean);
  return (
    <aside className="compare-bar" aria-live="polite">
      <div className="compare-bar-inner">
        <div className="compare-title"><GitCompareArrows size={18} /><span><strong>Compare residences</strong><small>{ids.length} of 3 selected</small></span></div>
        <div className="compare-chips">
          {selected.map((property) => property && (
            <button key={property.id} onClick={() => toggle(property.id)}>{property.name}<X size={13} /></button>
          ))}
        </div>
        <div className="compare-actions"><button onClick={clear}>Clear</button><Link className="button button-small button-gold" href={`/compare?ids=${ids.join(",")}`}>Compare now <ArrowRight size={15} /></Link></div>
      </div>
    </aside>
  );
}
