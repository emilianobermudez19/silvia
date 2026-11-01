import { useState } from "react";
import { Search, ChevronDown, ChevronUp, AlertTriangle, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HIERBAS, type Hierba } from "@/lib/data";

const DISPONIBILIDAD_COLOR: Record<string, string> = {
  "Muy alta": "bg-emerald-100 text-emerald-800",
  "Alta": "bg-green-100 text-green-800",
  "Media": "bg-amber-100 text-amber-800",
};

function getDisponibilidadLevel(d: string): string {
  if (d.startsWith("Muy alta")) return "Muy alta";
  if (d.startsWith("Alta")) return "Alta";
  return "Media";
}

function HierbaCard({ hierba }: { hierba: Hierba }) {
  const [open, setOpen] = useState(false);
  const nivel = getDisponibilidadLevel(hierba.disponibilidad);
  const colorClass = DISPONIBILIDAD_COLOR[nivel] ?? "bg-muted text-muted-foreground";
  const hasWarning = hierba.interacciones_medicamentosas.toUpperCase().includes("IMPORTANTE");

  return (
    <motion.div
      layout
      className="bg-card border border-border rounded-2xl overflow-hidden"
      data-testid={`card-hierba-${hierba.id}`}
    >
      <button
        className="w-full px-4 py-3.5 flex items-start gap-3 text-left hover:bg-muted/30 transition-colors"
        onClick={() => setOpen(!open)}
        data-testid={`button-expand-hierba-${hierba.id}`}
      >
        <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Leaf size={16} className="text-emerald-700" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-foreground text-sm">{hierba.nombre_comun}</span>
            {hasWarning && (
              <AlertTriangle size={13} className="text-amber-500 flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 italic">{hierba.nombre_cientifico}</p>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{hierba.usos_tradicionales}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${colorClass}`}>
            {nivel}
          </span>
          {open ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-border/50 pt-3 space-y-3">
              <HerbDetailRow label="Usos tradicionales" value={hierba.usos_tradicionales} />
              <HerbDetailRow label="Cómo prepararlo" value={hierba.preparacion} highlight />
              <HerbDetailRow label="Familia botánica" value={`${hierba.familia}`} />
              <HerbDetailRow label="Dónde conseguirlo" value={hierba.disponibilidad} />
              {hierba.contraindicaciones && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
                  <p className="text-[10px] font-semibold text-amber-700 uppercase tracking-wide mb-1">Contraindicaciones</p>
                  <p className="text-xs text-amber-900 leading-relaxed">{hierba.contraindicaciones}</p>
                </div>
              )}
              {hierba.interacciones_medicamentosas && (
                <div className={`rounded-xl px-3 py-2.5 border ${hasWarning ? "bg-red-50 border-red-200" : "bg-muted/40 border-border"}`}>
                  <p className={`text-[10px] font-semibold uppercase tracking-wide mb-1 ${hasWarning ? "text-red-700" : "text-muted-foreground"}`}>
                    Interacciones con medicamentos
                  </p>
                  <p className={`text-xs leading-relaxed ${hasWarning ? "text-red-900" : "text-foreground"}`}>
                    {hierba.interacciones_medicamentosas}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function HerbDetailRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={highlight ? "bg-emerald-50/60 border border-emerald-100 rounded-xl px-3 py-2.5" : ""}>
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="text-xs text-foreground leading-relaxed mt-0.5">{value}</p>
    </div>
  );
}

export function HerbolariaPage() {
  const [query, setQuery] = useState("");

  const filtered = HIERBAS.filter((h) => {
    const q = query.toLowerCase();
    return (
      h.nombre_comun.toLowerCase().includes(q) ||
      h.nombre_cientifico.toLowerCase().includes(q) ||
      h.usos_tradicionales.toLowerCase().includes(q) ||
      h.familia.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex-shrink-0">
        <h1 className="font-bold text-foreground text-base">Herbolaria Mexicana</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Guía UNAM de plantas medicinales</p>
      </div>

      {/* Search */}
      <div className="px-4 py-3 bg-background border-b border-border flex-shrink-0">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre o uso..."
            className="w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground"
            data-testid="input-search-herbolaria"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">{filtered.length} plantas encontradas</p>
      </div>

      {/* Info banner */}
      <div className="mx-4 mt-3 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 flex gap-2 items-start flex-shrink-0">
        <Leaf size={13} className="text-emerald-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-emerald-800">
          La herbolaria no reemplaza la atención médica. Siempre consulta con tu médico antes de combinar plantas con medicamentos.
        </p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        <AnimatePresence>
          {filtered.map((h) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <HierbaCard hierba={h} />
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No se encontraron plantas</p>
            <p className="text-xs mt-1">Intenta con otro nombre o uso</p>
          </div>
        )}
      </div>
    </div>
  );
}
