import { useState } from "react";
import { Search, ChevronDown, ChevronUp, Tag, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MEDICAMENTOS, type Medicamento } from "@/lib/data";

const CATEGORIA_COLORS: Record<string, string> = {
  "Analgésico / Antipirético": "bg-amber-100 text-amber-800",
  "AINE - Antiinflamatorio No Esteroideo": "bg-orange-100 text-orange-800",
  "AINE - Antiinflamatorio": "bg-orange-100 text-orange-800",
  "Antibiótico Betalactámico": "bg-blue-100 text-blue-800",
  "Antibiótico - Fluoroquinolona": "bg-blue-100 text-blue-800",
  "Antibiótico Macrólido": "bg-blue-100 text-blue-800",
  "Antibiótico / Antiprotozoario": "bg-blue-100 text-blue-800",
  "Antidiabético - Biguanida": "bg-teal-100 text-teal-800",
  "Inhibidor de Bomba de Protones": "bg-purple-100 text-purple-800",
  "Antihipertensivo - ARA II": "bg-rose-100 text-rose-800",
  "Hipolipemiante - Estatina": "bg-emerald-100 text-emerald-800",
  "Broncodilatador - Beta2 Agonista": "bg-sky-100 text-sky-800",
  "Antihistamínico - No Sedante": "bg-violet-100 text-violet-800",
  "Benzodiazepina / Antiepiléptico": "bg-indigo-100 text-indigo-800",
  "Diurético Tiazídico": "bg-cyan-100 text-cyan-800",
};

function MedCard({ med }: { med: Medicamento }) {
  const [open, setOpen] = useState(false);
  const colorClass = CATEGORIA_COLORS[med.categoria] ?? "bg-muted text-muted-foreground";

  return (
    <motion.div
      layout
      className="bg-card border border-border rounded-2xl overflow-hidden"
      data-testid={`card-medicamento-${med.id}`}
    >
      <button
        className="w-full px-4 py-3.5 flex items-start gap-3 text-left hover:bg-muted/30 transition-colors"
        onClick={() => setOpen(!open)}
        data-testid={`button-expand-${med.id}`}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-foreground text-sm">{med.compuesto_activo}</span>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${colorClass}`}>
              {med.categoria.split(" - ")[0]}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {med.marcas_comerciales.slice(0, 3).join(", ")}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
          <span className="text-sm font-bold text-primary">${med.precio_aproximado_mxn}</span>
          <span className="text-[10px] text-muted-foreground">MXN</span>
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
            <div className="px-4 pb-4 border-t border-border/50 pt-3 space-y-2.5">
              <DetailRow label="Indicaciones" value={med.indicaciones} />
              <DetailRow label="Dosis adulto" value={med.dosis_adulto} />
              <DetailRow label="Dosis pediátrica" value={med.dosis_pediatrica} />
              <DetailRow label="Formas disponibles" value={med.formas.join(", ")} />
              <div className="flex gap-1.5 items-start">
                <AlertCircle size={13} className="text-destructive mt-0.5 flex-shrink-0" />
                <span className="text-xs text-destructive leading-relaxed">{med.contraindicaciones}</span>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {med.marcas_comerciales.map((m) => (
                  <span key={m} className="inline-flex items-center gap-1 text-[10px] bg-muted/50 text-muted-foreground px-2 py-0.5 rounded-full border border-border/60">
                    <Tag size={9} />
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="text-xs text-foreground leading-relaxed mt-0.5">{value}</p>
    </div>
  );
}

export function MedicamentosPage() {
  const [query, setQuery] = useState("");

  const filtered = MEDICAMENTOS.filter((m) => {
    const q = query.toLowerCase();
    return (
      m.compuesto_activo.toLowerCase().includes(q) ||
      m.marcas_comerciales.some((b) => b.toLowerCase().includes(q)) ||
      m.categoria.toLowerCase().includes(q) ||
      m.indicaciones.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex-shrink-0">
        <h1 className="font-bold text-foreground text-base">Medicamentos Genéricos</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Catálogo de principios activos con precios en MXN</p>
      </div>

      {/* Search */}
      <div className="px-4 py-3 bg-background border-b border-border flex-shrink-0">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, marca o síntoma..."
            className="w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground"
            data-testid="input-search-medicamentos"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">{filtered.length} medicamentos encontrados</p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        <AnimatePresence>
          {filtered.map((med) => (
            <motion.div
              key={med.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MedCard med={med} />
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No se encontraron resultados</p>
            <p className="text-xs mt-1">Intenta con otro nombre o síntoma</p>
          </div>
        )}
      </div>
    </div>
  );
}
