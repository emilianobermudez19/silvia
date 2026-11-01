import { useState, useRef, useEffect } from "react";
import { Send, Stethoscope, AlertTriangle, CheckCircle, Info, UserRound, Microscope, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  detectTriage,
  detectContext,
  etiquetasContexto,
  getAlfredResponse,
  CONTEXTO_VACIO,
  type TriageLevel,
  type ModoLenguaje,
  type ContextoSalud,
} from "@/lib/data";

interface Message {
  id: string;
  role: "alfred" | "user";
  text: string;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "alfred",
    text: "¡Hola! Soy Alfred, tu asistente de salud. Puedo ayudarte a entender síntomas, buscar medicamentos genéricos y orientarte sobre plantas medicinales. ¿En qué te puedo ayudar hoy?",
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: "2",
    role: "user",
    text: "Mi mamá tiene fiebre desde ayer y no baja con paracetamol",
    timestamp: new Date(Date.now() - 90000),
  },
  {
    id: "3",
    role: "alfred",
    text: "Entiendo tu preocupación. Si la fiebre lleva más de 24 horas sin bajar con paracetamol, es recomendable que un médico la revise pronto. Mientras tanto, asegúrate de que tome suficiente agua y descanse. ¿Tiene otros síntomas como tos, dolor de garganta o escalofríos?",
    timestamp: new Date(Date.now() - 60000),
  },
];

const QUICK_REPLIES = [
  "Tengo fiebre",
  "Me duele la cabeza",
  "Para niño de 5 años",
  "Buscar genérico barato",
];

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
        <Stethoscope size={14} className="text-primary-foreground" />
      </div>
      <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-muted-foreground"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TriageBanner({ level }: { level: TriageLevel }) {
  const config = {
    rojo: {
      bg: "bg-red-500",
      text: "EMERGENCIA — Llama al 911 ahora",
      icon: <AlertTriangle size={16} className="text-white flex-shrink-0" />,
    },
    amarillo: {
      bg: "bg-amber-400",
      text: "Atención recomendada — consulta pronto a un médico",
      icon: <Info size={16} className="text-amber-900 flex-shrink-0" />,
    },
    verde: {
      bg: "bg-emerald-500",
      text: "Todo bien — Alfred está listo para ayudarte",
      icon: <CheckCircle size={16} className="text-white flex-shrink-0" />,
    },
  };
  const c = config[level];
  return (
    <motion.div
      layout
      className={`${c.bg} px-4 py-2 flex items-center gap-2`}
      data-testid="triage-banner"
    >
      {c.icon}
      <span className={`text-xs font-semibold ${level === "amarillo" ? "text-amber-900" : "text-white"}`}>
        {c.text}
      </span>
    </motion.div>
  );
}

function ModeSwitch({ modo, onChange }: { modo: ModoLenguaje; onChange: (m: ModoLenguaje) => void }) {
  return (
    <div
      className="flex items-center bg-muted/60 rounded-full p-0.5 border border-border gap-0.5"
      data-testid="modo-switch"
    >
      <button
        onClick={() => onChange("paciente")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all ${
          modo === "paciente"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        data-testid="button-modo-paciente"
      >
        <UserRound size={11} />
        Fácil
      </button>
      <button
        onClick={() => onChange("doctor")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all ${
          modo === "doctor"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        data-testid="button-modo-doctor"
      >
        <Microscope size={11} />
        Médico
      </button>
    </div>
  );
}

function ContextoBadges({ ctx, onDismiss }: { ctx: ContextoSalud; onDismiss: () => void }) {
  const etiquetas = etiquetasContexto(ctx);
  if (etiquetas.length === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-amber-50 border-b border-amber-200 px-3 py-2 flex items-center gap-2 flex-wrap"
      data-testid="contexto-badges"
    >
      <Info size={12} className="text-amber-600 flex-shrink-0" />
      <span className="text-[10px] text-amber-700 font-medium">Alfred nota:</span>
      {etiquetas.map((e) => (
        <span key={e} className="text-[10px] bg-amber-200 text-amber-800 rounded-full px-2 py-0.5 font-semibold">
          {e}
        </span>
      ))}
      <button
        onClick={onDismiss}
        className="ml-auto text-amber-500 hover:text-amber-700 transition-colors"
        data-testid="button-dismiss-contexto"
      >
        <X size={12} />
      </button>
    </motion.div>
  );
}

export function ConsultaPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [triage, setTriage] = useState<TriageLevel>("verde");
  const [modo, setModo] = useState<ModoLenguaje>("paciente");
  const [contexto, setContexto] = useState<ContextoSalud>(CONTEXTO_VACIO);
  const [showContexto, setShowContexto] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Re-show context badge whenever context changes
  useEffect(() => {
    const labels = etiquetasContexto(contexto);
    if (labels.length > 0) setShowContexto(true);
  }, [contexto]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const newLevel = detectTriage(trimmed);
    setTriage(newLevel);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => {
      const next = [...prev, userMsg];
      // Recompute context from ALL user messages
      const userTexts = next.filter((m) => m.role === "user").map((m) => m.text);
      const newCtx = detectContext(userTexts);
      setContexto(newCtx);
      return next;
    });

    setInput("");
    setIsTyping(true);

    // Capture current context + mode for the response
    const userTexts = [...messages.filter((m) => m.role === "user").map((m) => m.text), trimmed];
    const currentCtx = detectContext(userTexts);
    const currentModo = modo;

    setTimeout(() => {
      const responseText = getAlfredResponse(trimmed, currentModo, currentCtx);
      const alfredMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "alfred",
        text: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, alfredMsg]);
      setIsTyping(false);
    }, 1200);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  const tieneContexto = etiquetasContexto(contexto).length > 0;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-2.5 flex items-center gap-3 flex-shrink-0">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-sm flex-shrink-0">
          <Stethoscope size={16} className="text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-semibold text-foreground text-sm leading-tight">Alfred</h1>
          <p className="text-[10px] text-muted-foreground">Asistente médico</p>
        </div>
        <ModeSwitch modo={modo} onChange={setModo} />
        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] flex-shrink-0" />
      </div>

      {/* Mode label */}
      <AnimatePresence>
        {modo === "doctor" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-indigo-50 border-b border-indigo-100 px-4 py-1.5 flex items-center gap-2">
              <Microscope size={11} className="text-indigo-500 flex-shrink-0" />
              <span className="text-[10px] text-indigo-700 font-medium">
                Modo médico activado — Alfred usará términos clínicos
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Triage banner */}
      <TriageBanner level={triage} />

      {/* Context badges */}
      <AnimatePresence>
        {tieneContexto && showContexto && (
          <ContextoBadges ctx={contexto} onDismiss={() => setShowContexto(false)} />
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" data-testid="chat-messages">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {msg.role === "alfred" && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mb-0.5">
                  <Stethoscope size={14} className="text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[78%] px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm"
                    : "bg-card border border-border text-foreground rounded-2xl rounded-bl-sm"
                }`}
                data-testid={`message-${msg.role}-${msg.id}`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <TypingIndicator />
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto flex-shrink-0">
        {QUICK_REPLIES.map((reply) => (
          <button
            key={reply}
            onClick={() => sendMessage(reply)}
            disabled={isTyping}
            className="flex-shrink-0 text-xs bg-card border border-border rounded-full px-3 py-1.5 text-muted-foreground hover:text-primary hover:border-primary transition-colors disabled:opacity-50"
            data-testid={`quick-reply-${reply}`}
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="px-4 pb-4 pt-2 flex gap-2 flex-shrink-0 border-t border-border bg-background"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={modo === "doctor" ? "Describa el cuadro clínico..." : "Escribe tu consulta..."}
          disabled={isTyping}
          className="flex-1 bg-card border border-border rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all disabled:opacity-50 placeholder:text-muted-foreground"
          data-testid="input-message"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-opacity active:scale-95"
          data-testid="button-send"
        >
          <Send size={16} className="text-primary-foreground" />
        </button>
      </form>
    </div>
  );
}
