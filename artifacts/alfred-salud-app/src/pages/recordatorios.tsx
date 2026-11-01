import { useState } from "react";
import { Plus, Clock, Bell, BellOff, Trash2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Recordatorio {
  id: string;
  medicamento: string;
  dosis: string;
  horarios: string[];
  activo: boolean;
  color: string;
}

const INITIAL_RECORDATORIOS: Recordatorio[] = [
  { id: "r1", medicamento: "Metformina", dosis: "500mg", horarios: ["8:00 AM", "8:00 PM"], activo: true, color: "bg-teal-500" },
  { id: "r2", medicamento: "Losartán", dosis: "50mg", horarios: ["7:00 AM"], activo: true, color: "bg-rose-500" },
  { id: "r3", medicamento: "Omeprazol", dosis: "20mg", horarios: ["antes del desayuno"], activo: true, color: "bg-purple-500" },
  { id: "r4", medicamento: "Atorvastatina", dosis: "20mg", horarios: ["10:00 PM"], activo: false, color: "bg-emerald-500" },
];

const COLORS = ["bg-teal-500", "bg-rose-500", "bg-purple-500", "bg-emerald-500", "bg-amber-500", "bg-blue-500", "bg-indigo-500"];

function getNextDose(horarios: string[]): string {
  if (horarios.length === 0) return "—";
  return `Próxima: ${horarios[0]}`;
}

export function RecordatoriosPage() {
  const [recordatorios, setRecordatorios] = useState<Recordatorio[]>(INITIAL_RECORDATORIOS);
  const [showForm, setShowForm] = useState(false);
  const [newMed, setNewMed] = useState("");
  const [newDosis, setNewDosis] = useState("");
  const [newHorario, setNewHorario] = useState("");
  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);

  function toggleActivo(id: string) {
    setRecordatorios((prev) =>
      prev.map((r) => (r.id === id ? { ...r, activo: !r.activo } : r))
    );
  }

  function deleteRecordatorio(id: string) {
    setRecordatorios((prev) => prev.filter((r) => r.id !== id));
  }

  function addRecordatorio() {
    if (!newMed.trim() || !newHorario.trim()) return;
    const nuevo: Recordatorio = {
      id: Date.now().toString(),
      medicamento: newMed.trim(),
      dosis: newDosis.trim() || "—",
      horarios: [newHorario.trim()],
      activo: true,
      color: COLORS[recordatorios.length % COLORS.length],
    };
    setRecordatorios((prev) => [...prev, nuevo]);
    setNewMed("");
    setNewDosis("");
    setNewHorario("");
    setShowForm(false);
    setSavedFeedback(nuevo.id);
    setTimeout(() => setSavedFeedback(null), 2000);
  }

  const activos = recordatorios.filter((r) => r.activo).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="font-bold text-foreground text-base">Recordatorios</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{activos} medicamentos activos</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center transition-transform active:scale-90"
          data-testid="button-add-recordatorio"
        >
          <Plus size={16} className="text-primary-foreground" />
        </button>
      </div>

      {/* Summary pills */}
      <div className="px-4 py-3 flex gap-2 flex-shrink-0">
        <div className="flex-1 bg-card border border-border rounded-xl px-3 py-2.5 text-center">
          <p className="text-lg font-bold text-primary">{activos}</p>
          <p className="text-[10px] text-muted-foreground">Activos</p>
        </div>
        <div className="flex-1 bg-card border border-border rounded-xl px-3 py-2.5 text-center">
          <p className="text-lg font-bold text-foreground">{recordatorios.length}</p>
          <p className="text-[10px] text-muted-foreground">Total</p>
        </div>
        <div className="flex-1 bg-card border border-border rounded-xl px-3 py-2.5 text-center">
          <p className="text-lg font-bold text-foreground">
            {recordatorios.reduce((acc, r) => acc + r.horarios.length, 0)}
          </p>
          <p className="text-[10px] text-muted-foreground">Tomas/día</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-4">
        {/* Add form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
                <h3 className="font-semibold text-sm text-foreground">Nuevo recordatorio</h3>
                <input
                  value={newMed}
                  onChange={(e) => setNewMed(e.target.value)}
                  placeholder="Nombre del medicamento"
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-muted-foreground"
                  data-testid="input-medicamento-nombre"
                />
                <input
                  value={newDosis}
                  onChange={(e) => setNewDosis(e.target.value)}
                  placeholder="Dosis (ej. 500mg)"
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-muted-foreground"
                  data-testid="input-medicamento-dosis"
                />
                <input
                  value={newHorario}
                  onChange={(e) => setNewHorario(e.target.value)}
                  placeholder="Horario (ej. 8:00 AM)"
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-muted-foreground"
                  data-testid="input-medicamento-horario"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-2.5 border border-border rounded-xl text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
                    data-testid="button-cancel-recordatorio"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={addRecordatorio}
                    disabled={!newMed.trim() || !newHorario.trim()}
                    className="flex-1 py-2.5 bg-primary rounded-xl text-sm text-primary-foreground disabled:opacity-40 transition-opacity"
                    data-testid="button-save-recordatorio"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cards */}
        <AnimatePresence>
          {recordatorios.map((r) => (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`bg-card border border-border rounded-2xl overflow-hidden ${!r.activo ? "opacity-60" : ""}`}
              data-testid={`card-recordatorio-${r.id}`}
            >
              <div className="flex items-stretch">
                <div className={`w-1.5 ${r.color} flex-shrink-0`} />
                <div className="flex-1 px-4 py-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm leading-tight">{r.medicamento}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{r.dosis}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {r.horarios.map((h) => (
                          <span
                            key={h}
                            className="inline-flex items-center gap-1 text-[10px] bg-muted/50 border border-border/60 rounded-full px-2 py-0.5 text-muted-foreground"
                          >
                            <Clock size={9} />
                            {h}
                          </span>
                        ))}
                      </div>
                      {r.activo && (
                        <p className="text-[10px] text-primary mt-1.5 font-medium">{getNextDose(r.horarios)}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <AnimatePresence>
                        {savedFeedback === r.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
                          >
                            <Check size={12} className="text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <button
                        onClick={() => toggleActivo(r.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          r.activo ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        }`}
                        data-testid={`button-toggle-${r.id}`}
                      >
                        {r.activo ? <Bell size={14} /> : <BellOff size={14} />}
                      </button>
                      <button
                        onClick={() => deleteRecordatorio(r.id)}
                        className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        data-testid={`button-delete-${r.id}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {recordatorios.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Clock size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Sin recordatorios</p>
            <p className="text-xs mt-1">Toca el botón + para agregar uno</p>
          </div>
        )}
      </div>
    </div>
  );
}
