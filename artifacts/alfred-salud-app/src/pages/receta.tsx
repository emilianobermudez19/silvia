import { useState } from "react";
import { Camera, FileText, RefreshCw, CheckCircle, ArrowRight, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GenericoSugerido {
  marca: string;
  generico: string;
  precio: number;
  dosis: string;
  instruccion: string;
}

const DEMO_RECETA: GenericoSugerido[] = [
  {
    marca: "Glucophage 500mg",
    generico: "Metformina 500mg",
    precio: 45,
    dosis: "1 tableta con el desayuno y 1 con la cena",
    instruccion: "Tomar con alimentos para reducir malestares estomacales. No partir las tabletas de liberación prolongada.",
  },
  {
    marca: "Cozaar 50mg",
    generico: "Losartán 50mg",
    precio: 55,
    dosis: "1 tableta cada mañana",
    instruccion: "Tomar a la misma hora todos los días, con o sin alimentos. No dejes de tomarlo aunque te sientas bien.",
  },
  {
    marca: "Prilosec 20mg",
    generico: "Omeprazol 20mg",
    precio: 50,
    dosis: "1 cápsula en ayunas, 30 minutos antes del desayuno",
    instruccion: "Tragar la cápsula entera, sin masticar. Si olvidas una dosis, tómala en cuanto recuerdes.",
  },
];

type Estado = "idle" | "scanning" | "done";

export function RecetaPage() {
  const [estado, setEstado] = useState<Estado>("idle");

  function iniciarDemo() {
    setEstado("scanning");
    setTimeout(() => setEstado("done"), 2200);
  }

  function reiniciar() {
    setEstado("idle");
  }

  const totalMarca = DEMO_RECETA.reduce((acc, g) => acc + g.precio * 2.5, 0);
  const totalGenerico = DEMO_RECETA.reduce((acc, g) => acc + g.precio, 0);
  const ahorro = Math.round(totalMarca - totalGenerico);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex-shrink-0">
        <h1 className="font-bold text-foreground text-base">Leer Receta</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Foto de tu receta en lenguaje simple</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {estado === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full px-6 py-8 text-center"
            >
              <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
                <Camera size={40} className="text-primary" />
              </div>
              <h2 className="font-bold text-foreground text-lg mb-2">Fotografía tu receta</h2>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                Toma una foto de tu receta médica y Alfred te explicará cada medicamento en lenguaje simple, con opciones de genéricos más económicos.
              </p>

              <div className="w-full space-y-3 mb-8">
                <button
                  className="w-full flex items-center gap-3 bg-primary text-primary-foreground rounded-2xl px-5 py-4 font-semibold text-sm active:scale-[0.98] transition-transform"
                  data-testid="button-tomar-foto"
                  onClick={iniciarDemo}
                >
                  <Camera size={20} />
                  <span>Tomar foto de receta</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 bg-card border border-border text-foreground rounded-2xl px-5 py-4 font-medium text-sm active:scale-[0.98] transition-transform"
                  data-testid="button-subir-foto"
                  onClick={iniciarDemo}
                >
                  <FileText size={20} />
                  <span>Subir imagen de la galería</span>
                </button>
              </div>

              <button
                onClick={iniciarDemo}
                className="text-sm text-primary underline underline-offset-2"
                data-testid="button-demo"
              >
                Ver demo con receta de ejemplo
              </button>

              <div className="mt-8 bg-muted/40 border border-border rounded-2xl px-4 py-3 text-left w-full">
                <p className="text-xs font-semibold text-foreground mb-2">¿Qué hace Alfred?</p>
                <ul className="space-y-1.5">
                  {[
                    "Identifica cada medicamento",
                    "Explica para qué sirve cada uno",
                    "Busca genéricos más baratos",
                    "Te dice cómo tomarlo correctamente",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle size={12} className="text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {estado === "scanning" && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full px-6 text-center"
            >
              <motion.div
                className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <RefreshCw size={32} className="text-primary animate-spin" />
              </motion.div>
              <h2 className="font-bold text-foreground text-base mb-2">Analizando receta...</h2>
              <p className="text-sm text-muted-foreground">Alfred está leyendo tu receta y buscando genéricos disponibles en México</p>
            </motion.div>
          )}

          {estado === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-4 space-y-4"
            >
              {/* Savings banner */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3.5 flex items-center gap-3"
                data-testid="savings-banner"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <DollarSign size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-800">Ahorras ~${ahorro} MXN</p>
                  <p className="text-xs text-emerald-700">usando genéricos en lugar de marcas</p>
                </div>
              </motion.div>

              <h2 className="font-bold text-foreground text-sm px-1">Medicamentos en tu receta</h2>

              {DEMO_RECETA.map((item, i) => (
                <motion.div
                  key={item.marca}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-4"
                  data-testid={`card-receta-${i}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Recetado</p>
                      <p className="font-semibold text-foreground text-sm">{item.marca}</p>
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground mt-3 flex-shrink-0" />
                    <div className="text-right">
                      <p className="text-xs text-primary font-medium">Genérico disponible</p>
                      <p className="font-semibold text-foreground text-sm">{item.generico}</p>
                      <p className="text-xs text-emerald-600 font-bold mt-0.5">~${item.precio} MXN</p>
                    </div>
                  </div>
                  <div className="bg-muted/40 rounded-xl px-3 py-2.5 space-y-1.5">
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Cómo tomarlo</p>
                      <p className="text-xs text-foreground mt-0.5">{item.dosis}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Importante saber</p>
                      <p className="text-xs text-foreground mt-0.5">{item.instruccion}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              <button
                onClick={reiniciar}
                className="w-full py-3 border border-border rounded-2xl text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
                data-testid="button-nueva-receta"
              >
                Analizar otra receta
              </button>

              <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
                <p className="text-xs text-amber-800">
                  Los precios son aproximados. Siempre confirma con tu farmacéutico que el genérico es adecuado para tu tratamiento.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
