export interface Medicamento {
  id: string;
  compuesto_activo: string;
  marcas_comerciales: string[];
  categoria: string;
  formas: string[];
  indicaciones: string;
  dosis_adulto: string;
  dosis_pediatrica: string;
  contraindicaciones: string;
  precio_aproximado_mxn: number;
}

export interface Hierba {
  id: string;
  nombre_comun: string;
  nombre_cientifico: string;
  familia: string;
  usos_tradicionales: string;
  preparacion: string;
  contraindicaciones: string;
  interacciones_medicamentosas: string;
  disponibilidad: string;
}

export const MEDICAMENTOS: Medicamento[] = [
  { id: "med001", compuesto_activo: "Paracetamol", marcas_comerciales: ["Tylenol", "Tempra", "Feverall", "Panadol"], categoria: "Analgésico / Antipirético", formas: ["Tabletas 500mg", "Tabletas 1g", "Jarabe 120mg/5ml", "Supositorios"], indicaciones: "Fiebre, dolor leve a moderado, cefalea, dolor muscular, dolor dental", dosis_adulto: "500mg–1g cada 6–8 horas, máximo 4g/día", dosis_pediatrica: "10–15 mg/kg cada 4–6 horas", contraindicaciones: "Insuficiencia hepática grave, alergia al paracetamol", precio_aproximado_mxn: 25 },
  { id: "med002", compuesto_activo: "Ibuprofeno", marcas_comerciales: ["Advil", "Motrin", "Brufen", "Ibupirac"], categoria: "AINE - Antiinflamatorio No Esteroideo", formas: ["Tabletas 200mg", "Tabletas 400mg", "Tabletas 600mg", "Suspensión 100mg/5ml"], indicaciones: "Dolor, fiebre, inflamación, artritis, dismenorrea, dolor de espalda", dosis_adulto: "200–400mg cada 4–6 horas, máximo 1.2g/día", dosis_pediatrica: "5–10 mg/kg cada 6–8 horas", contraindicaciones: "Úlcera péptica activa, insuficiencia renal grave, embarazo tercer trimestre", precio_aproximado_mxn: 30 },
  { id: "med003", compuesto_activo: "Amoxicilina", marcas_comerciales: ["Amoxil", "Trimox", "Biomox"], categoria: "Antibiótico Betalactámico", formas: ["Cápsulas 250mg", "Cápsulas 500mg", "Suspensión 125mg/5ml", "Suspensión 250mg/5ml"], indicaciones: "Infecciones bacterianas del tracto respiratorio, urinario, otitis, sinusitis, faringitis estreptocócica", dosis_adulto: "250–500mg cada 8 horas por 7–10 días", dosis_pediatrica: "25–45 mg/kg/día dividido cada 8–12 horas", contraindicaciones: "Alergia a penicilinas, mononucleosis infecciosa", precio_aproximado_mxn: 80 },
  { id: "med004", compuesto_activo: "Metformina", marcas_comerciales: ["Glucophage", "Fortamet", "Glumetza"], categoria: "Antidiabético - Biguanida", formas: ["Tabletas 500mg", "Tabletas 850mg", "Tabletas 1000mg"], indicaciones: "Diabetes mellitus tipo 2, síndrome de ovario poliquístico", dosis_adulto: "500mg 2–3 veces al día con alimentos, ajustar gradualmente", dosis_pediatrica: "No recomendado menores de 10 años", contraindicaciones: "Insuficiencia renal, insuficiencia hepática, alcoholismo, ICC", precio_aproximado_mxn: 45 },
  { id: "med005", compuesto_activo: "Omeprazol", marcas_comerciales: ["Prilosec", "Losec", "Zegerid"], categoria: "Inhibidor de Bomba de Protones", formas: ["Cápsulas 20mg", "Cápsulas 40mg", "Tabletas 10mg"], indicaciones: "ERGE, úlcera péptica, síndrome de Zollinger-Ellison, gastritis, protección gástrica con AINEs", dosis_adulto: "20–40mg una vez al día en ayunas", dosis_pediatrica: "0.7–3.5 mg/kg/día", contraindicaciones: "Hipersensibilidad al fármaco, uso con rilpivirina", precio_aproximado_mxn: 50 },
  { id: "med006", compuesto_activo: "Losartán", marcas_comerciales: ["Cozaar", "Hyzaar"], categoria: "Antihipertensivo - ARA II", formas: ["Tabletas 25mg", "Tabletas 50mg", "Tabletas 100mg"], indicaciones: "Hipertensión arterial, nefropatía diabética, insuficiencia cardíaca", dosis_adulto: "25–100mg una vez al día", dosis_pediatrica: "0.7 mg/kg/día (máx 50mg)", contraindicaciones: "Embarazo, hipercalemia, estenosis bilateral de arterias renales", precio_aproximado_mxn: 55 },
  { id: "med007", compuesto_activo: "Atorvastatina", marcas_comerciales: ["Lipitor", "Torvast", "Sortis"], categoria: "Hipolipemiante - Estatina", formas: ["Tabletas 10mg", "Tabletas 20mg", "Tabletas 40mg", "Tabletas 80mg"], indicaciones: "Hipercolesterolemia, dislipidemia mixta, prevención cardiovascular", dosis_adulto: "10–80mg una vez al día", dosis_pediatrica: "Uso limitado en mayores de 10 años con dislipidemia familiar", contraindicaciones: "Enfermedad hepática activa, embarazo, lactancia", precio_aproximado_mxn: 60 },
  { id: "med008", compuesto_activo: "Ciprofloxacino", marcas_comerciales: ["Cipro", "Ciproxin", "Proquin"], categoria: "Antibiótico - Fluoroquinolona", formas: ["Tabletas 250mg", "Tabletas 500mg", "Tabletas 750mg", "Solución IV"], indicaciones: "ITU, infecciones gastrointestinales, infecciones respiratorias, ántrax", dosis_adulto: "250–750mg cada 12 horas", dosis_pediatrica: "No recomendado en menores", contraindicaciones: "Menores de 18 años, embarazo, lactancia, epilepsia", precio_aproximado_mxn: 70 },
  { id: "med009", compuesto_activo: "Salbutamol", marcas_comerciales: ["Ventolin", "ProAir", "Proventil"], categoria: "Broncodilatador - Beta2 Agonista", formas: ["Inhalador 100mcg/dosis", "Jarabe 2mg/5ml", "Solución nebulización"], indicaciones: "Asma bronquial, EPOC, broncoespasmo", dosis_adulto: "100–200mcg (1–2 inhalaciones) cada 4–6 horas según necesidad", dosis_pediatrica: "100mcg (1 inhalación) cada 4–6 horas", contraindicaciones: "Hipertiroidismo no controlado, taquiarritmias", precio_aproximado_mxn: 90 },
  { id: "med010", compuesto_activo: "Loratadina", marcas_comerciales: ["Claritin", "Alavert", "Clarityne"], categoria: "Antihistamínico - No Sedante", formas: ["Tabletas 10mg", "Jarabe 5mg/5ml"], indicaciones: "Rinitis alérgica, urticaria, reacciones alérgicas leves", dosis_adulto: "10mg una vez al día", dosis_pediatrica: "5mg una vez al día (2–6 años); 10mg una vez al día (mayores de 6)", contraindicaciones: "Hipersensibilidad al fármaco", precio_aproximado_mxn: 35 },
  { id: "med011", compuesto_activo: "Diclofenaco", marcas_comerciales: ["Voltaren", "Cataflam", "Zipsor"], categoria: "AINE - Antiinflamatorio", formas: ["Tabletas 50mg", "Tabletas 75mg", "Gel tópico 1%", "Inyectable"], indicaciones: "Artritis, dolor musculoesquelético, dismenorrea, migraña", dosis_adulto: "50mg 2–3 veces al día con alimentos", dosis_pediatrica: "1–3 mg/kg/día (uso restringido)", contraindicaciones: "Úlcera péptica, insuficiencia renal o hepática grave, embarazo tercer trimestre", precio_aproximado_mxn: 40 },
  { id: "med012", compuesto_activo: "Metronidazol", marcas_comerciales: ["Flagyl", "Metrogel", "Noritate"], categoria: "Antibiótico / Antiprotozoario", formas: ["Tabletas 250mg", "Tabletas 500mg", "Óvulos 500mg", "Gel vaginal"], indicaciones: "Infecciones por anaerobios, vaginosis bacteriana, tricomoniasis, amebiasis, giardiasis", dosis_adulto: "500mg cada 8 horas por 7 días", dosis_pediatrica: "7.5 mg/kg cada 8 horas", contraindicaciones: "Primer trimestre del embarazo, hipersensibilidad", precio_aproximado_mxn: 35 },
  { id: "med013", compuesto_activo: "Azitromicina", marcas_comerciales: ["Zithromax", "Zmax", "AzaSite"], categoria: "Antibiótico Macrólido", formas: ["Tabletas 250mg", "Tabletas 500mg", "Polvo para suspensión 200mg/5ml"], indicaciones: "Neumonía comunitaria, faringitis, sinusitis, infecciones cutáneas, ITS", dosis_adulto: "500mg día 1, luego 250mg días 2–5", dosis_pediatrica: "10 mg/kg día 1, luego 5 mg/kg días 2–5", contraindicaciones: "Arritmias cardíacas, prolongación QT, hipersensibilidad a macrólidos", precio_aproximado_mxn: 95 },
  { id: "med014", compuesto_activo: "Clonazepam", marcas_comerciales: ["Klonopin", "Rivotril"], categoria: "Benzodiazepina / Antiepiléptico", formas: ["Tabletas 0.5mg", "Tabletas 1mg", "Tabletas 2mg", "Gotas"], indicaciones: "Epilepsia, trastorno de pánico, ansiedad (uso controlado)", dosis_adulto: "0.25–0.5mg dos veces al día, ajustar gradualmente", dosis_pediatrica: "0.01–0.03 mg/kg/día en 2–3 dosis", contraindicaciones: "Glaucoma de ángulo cerrado, insuficiencia hepática grave, miastenia gravis", precio_aproximado_mxn: 65 },
  { id: "med015", compuesto_activo: "Hidroclorotiazida", marcas_comerciales: ["Microzide", "HydroDIURIL"], categoria: "Diurético Tiazídico", formas: ["Tabletas 12.5mg", "Tabletas 25mg", "Tabletas 50mg"], indicaciones: "Hipertensión arterial, edema, insuficiencia cardíaca congestiva", dosis_adulto: "12.5–50mg una vez al día", dosis_pediatrica: "1–2 mg/kg/día en 2 dosis", contraindicaciones: "Anuria, hipersensibilidad a sulfamidas, hipocalemia", precio_aproximado_mxn: 30 },
];

export const HIERBAS: Hierba[] = [
  { id: "herb001", nombre_comun: "Manzanilla", nombre_cientifico: "Matricaria chamomilla", familia: "Asteraceae", usos_tradicionales: "Cólicos intestinales, gastritis, ansiedad leve, insomnio, conjuntivitis, inflamación de mucosas, dolor menstrual", preparacion: "Infusión: 1–2 cucharaditas de flores secas en 250ml agua caliente, reposar 10 min. 3 tazas al día.", contraindicaciones: "Alergia a plantas de la familia Asteraceae (girasol, crisantemo). Embarazo en dosis altas.", interacciones_medicamentosas: "Potencia anticoagulantes (warfarina, aspirina). Puede aumentar efecto de sedantes.", disponibilidad: "Alta — tianguis, mercados, tiendas naturistas" },
  { id: "herb002", nombre_comun: "Sábila", nombre_cientifico: "Aloe barbadensis miller", familia: "Xanthorrhoeaceae", usos_tradicionales: "Quemaduras leves, heridas superficiales, irritación de piel, estreñimiento, gastritis, úlceras", preparacion: "Tópico: gel puro del interior de la hoja. Oral: 100–200ml de gel fresco en ayunas para gastritis.", contraindicaciones: "Látex oral contraindicado en embarazo, menstruación, hemorroides, colitis. No ingerir látex amarillo.", interacciones_medicamentosas: "Látex puede potenciar diuréticos y laxantes. Puede alterar absorción de medicamentos orales.", disponibilidad: "Muy alta — se cultiva en casi todos los hogares mexicanos" },
  { id: "herb003", nombre_comun: "Epazote", nombre_cientifico: "Dysphania ambrosioides", familia: "Amaranthaceae", usos_tradicionales: "Parásitos intestinales (áscaris, amibas), cólicos, gases, diarrea, menstruación irregular", preparacion: "Decocción: 30g de planta fresca en 1L agua, hervir 10 min. Tomar ½ taza en ayunas por 3 días.", contraindicaciones: "Embarazo (abortivo en dosis altas). Niños menores de 2 años. Insuficiencia hepática o renal.", interacciones_medicamentosas: "No combinar con antiparasitarios farmacológicos sin indicación médica.", disponibilidad: "Alta — mercados de abarrotes y tianguis" },
  { id: "herb004", nombre_comun: "Gordolobo", nombre_cientifico: "Verbascum thapsus", familia: "Scrophulariaceae", usos_tradicionales: "Tos, catarro, bronquitis, asma leve, dolor de garganta, expectorante", preparacion: "Infusión: 2 cucharadas de flores o hojas en 250ml agua caliente. Tomar 3–4 veces al día con miel.", contraindicaciones: "Ninguna conocida en dosis normales. Precaución en embarazo.", interacciones_medicamentosas: "Puede potenciar ligeramente antidiabéticos orales.", disponibilidad: "Alta — mercados de hierbas medicinales" },
  { id: "herb005", nombre_comun: "Hierbabuena", nombre_cientifico: "Mentha spicata", familia: "Lamiaceae", usos_tradicionales: "Náuseas, indigestión, dolor de cabeza, cólicos, gases, síndrome de intestino irritable, resfriado", preparacion: "Infusión: 1 cucharadita de hojas frescas o secas en 200ml agua caliente. 2–3 tazas al día.", contraindicaciones: "Reflujo gastroesofágico (relaja esfínter esofágico). No aplicar aceite esencial en cara de niños pequeños.", interacciones_medicamentosas: "Puede inhibir CYP3A4, afectando metabolismo de algunos medicamentos. Potencia antiácidos.", disponibilidad: "Muy alta — jardines, mercados, supermercados" },
  { id: "herb006", nombre_comun: "Nopal", nombre_cientifico: "Opuntia ficus-indica", familia: "Cactaceae", usos_tradicionales: "Control glucemia en diabetes tipo 2, colesterol, estreñimiento, gastritis, inflamación", preparacion: "Jugo fresco: 100–200ml en ayunas. Crudo en ensalada. Cápsulas de polvo seco disponibles.", contraindicaciones: "Diarrea activa. Puede reducir absorción de algunos medicamentos si se toma simultáneamente.", interacciones_medicamentosas: "IMPORTANTE: Puede potenciar hipoglucemiantes orales e insulina. Monitorear glucosa.", disponibilidad: "Muy alta — alimento cotidiano en México" },
  { id: "herb007", nombre_comun: "Ajo", nombre_cientifico: "Allium sativum", familia: "Amaryllidaceae", usos_tradicionales: "Hipertensión leve, colesterol, infecciones respiratorias, antimicrobiano, antifúngico", preparacion: "Crudo: 1–2 dientes al día en ayunas. Decocción: 3 dientes en 1L agua, hervir 10 min.", contraindicaciones: "Úlcera péptica activa. Antes de cirugía (efecto anticoagulante).", interacciones_medicamentosas: "IMPORTANTE: Potencia anticoagulantes (warfarina, heparina). Puede reducir eficacia de saquinavir (VIH).", disponibilidad: "Muy alta — cocina mexicana cotidiana" },
  { id: "herb008", nombre_comun: "Tila", nombre_cientifico: "Tilia mexicana", familia: "Malvaceae", usos_tradicionales: "Ansiedad, insomnio, nerviosismo, palpitaciones, hipertensión leve, cefalea tensional", preparacion: "Infusión: 1–2 cucharaditas de flores secas en 200ml agua caliente, 10 min. 1–3 tazas al día.", contraindicaciones: "Hipersensibilidad. Uso prolongado puede afectar el corazón (raro).", interacciones_medicamentosas: "Potencia sedantes, ansiolíticos y antihipertensivos. No combinar con alcohol.", disponibilidad: "Alta — tiendas de herbolaria, mercados" },
  { id: "herb009", nombre_comun: "Cúrcuma", nombre_cientifico: "Curcuma longa", familia: "Zingiberaceae", usos_tradicionales: "Inflamación articular, gastritis, úlceras, hígado graso, dolor crónico, cicatrización", preparacion: "Polvo: 1–3g al día con pimienta negra para mejorar absorción. Infusión con leche ('leche dorada').", contraindicaciones: "Cálculos biliares o vía biliar obstruida. Dosis altas en embarazo.", interacciones_medicamentosas: "Puede potenciar anticoagulantes y antiagregantes. Puede reducir absorción de hierro.", disponibilidad: "Media — supermercados, tiendas naturistas" },
  { id: "herb010", nombre_comun: "Ruda", nombre_cientifico: "Ruta graveolens", familia: "Rutaceae", usos_tradicionales: "Dolor de cabeza, cólicos menstruales, nerviosismo, repelente de insectos", preparacion: "Infusión DÉBIL: 1–2 hojas pequeñas en 200ml agua caliente. Máximo 1 taza al día.", contraindicaciones: "CONTRAINDICADA en embarazo (abortiva). Dosis altas son tóxicas. Fotosensibilizante.", interacciones_medicamentosas: "Fotosensibilización. Puede potenciar anticoagulantes.", disponibilidad: "Alta — se cultiva en jardines y macetas" },
  { id: "herb011", nombre_comun: "Jengibre", nombre_cientifico: "Zingiber officinale", familia: "Zingiberaceae", usos_tradicionales: "Náuseas (embarazo, quimio, mareo), indigestión, resfriado, dolor articular, circulación", preparacion: "Decocción: 2–3 rodajas de raíz fresca en 250ml agua, hervir 5 min. 2–3 tazas al día.", contraindicaciones: "Cálculos biliares. Dosis altas antes de cirugía. Úlcera péptica activa.", interacciones_medicamentosas: "Potencia anticoagulantes y antiagregantes. Puede interactuar con antidiabéticos.", disponibilidad: "Muy alta — cocina y supermercados" },
  { id: "herb012", nombre_comun: "Flor de Jamaica", nombre_cientifico: "Hibiscus sabdariffa", familia: "Malvaceae", usos_tradicionales: "Hipertensión arterial leve, colesterol, infecciones urinarias, antioxidante, diurético", preparacion: "Infusión fría: 10g de flores secas en 1L agua fría 8 horas. Infusión caliente: hervir 5 min.", contraindicaciones: "Hipotensión. Embarazo en dosis altas (efecto uterotónico). Insuficiencia renal.", interacciones_medicamentosas: "IMPORTANTE: Puede potenciar antihipertensivos. Puede afectar niveles de cloroquina.", disponibilidad: "Muy alta — bebida popular en México" },
  { id: "herb013", nombre_comun: "Árnica", nombre_cientifico: "Arnica montana", familia: "Asteraceae", usos_tradicionales: "Golpes, moretones, inflamación muscular y articular, torceduras — USO TÓPICO EXCLUSIVO", preparacion: "Tópico: tintura al 25–35% aplicada en piel íntegra. Compresas frías. NO INGERIR.", contraindicaciones: "USO ORAL TÓXICO. No aplicar en heridas abiertas. Alergia a Asteraceae.", interacciones_medicamentosas: "Tópico puede potenciar anticoagulantes al absorberse. No ingerir.", disponibilidad: "Alta — farmacias, tiendas naturistas" },
  { id: "herb014", nombre_comun: "Prodigiosa", nombre_cientifico: "Brickellia cavanillesii", familia: "Asteraceae", usos_tradicionales: "Diabetes tipo 2, hígado, vesícula, hipertensión leve, indigestión, cólicos", preparacion: "Infusión: 2–3 hojas en 250ml agua caliente. 2–3 tazas al día antes de comidas.", contraindicaciones: "Embarazo. Uso prolongado puede afectar función hepática.", interacciones_medicamentosas: "IMPORTANTE: Potencia hipoglucemiantes. Monitoreo glucémico necesario.", disponibilidad: "Alta — mercados de hierbas en México" },
  { id: "herb015", nombre_comun: "Copalchi", nombre_cientifico: "Hintonia latiflora", familia: "Rubiaceae", usos_tradicionales: "Diabetes tipo 2, paludismo (uso histórico), fiebre, digestión", preparacion: "Decocción de corteza: 10–15g en 1L agua, hervir 20 min. 2–3 tazas al día.", contraindicaciones: "Embarazo. Hipoglucemia. No usar en menores.", interacciones_medicamentosas: "Potencia significativamente hipoglucemiantes orales e insulina. Riesgo de hipoglucemia.", disponibilidad: "Media — tiendas de herbolaria especializadas" },
];

export type TriageLevel = "rojo" | "amarillo" | "verde";
export type ModoLenguaje = "paciente" | "doctor";

export interface ContextoSalud {
  menstruando: boolean;
  embarazada: boolean;
  problemasHigado: boolean;
  problemasRinon: boolean;
  esNino: boolean;
  tomaAnticoagulantes: boolean;
  diabetica: boolean;
  hipertensa: boolean;
  ulcera: boolean;
}

export const CONTEXTO_VACIO: ContextoSalud = {
  menstruando: false,
  embarazada: false,
  problemasHigado: false,
  problemasRinon: false,
  esNino: false,
  tomaAnticoagulantes: false,
  diabetica: false,
  hipertensa: false,
  ulcera: false,
};

export function detectContext(textos: string[]): ContextoSalud {
  const full = textos.join(" ").toLowerCase();
  return {
    menstruando:
      full.includes("dias") || full.includes("días") || full.includes("regla") ||
      full.includes("menstruacion") || full.includes("menstruación") ||
      full.includes("periodo") || full.includes("período") || full.includes("sangrado") ||
      full.includes("menstrua"),
    embarazada:
      full.includes("embarazada") || full.includes("embarazo") || full.includes("gestante") ||
      full.includes("gestacion") || full.includes("gestación") || full.includes("bebe en camino") ||
      full.includes("bebé en camino"),
    problemasHigado:
      full.includes("higado") || full.includes("hígado") || full.includes("hepatitis") ||
      full.includes("cirrosis") || full.includes("hepatico") || full.includes("hepático"),
    problemasRinon:
      full.includes("rinon") || full.includes("riñon") || full.includes("riñones") ||
      full.includes("renal") || full.includes("dialisis") || full.includes("diálisis"),
    esNino:
      full.includes("niño") || full.includes("niña") || full.includes("hijo") ||
      full.includes("hija") || full.includes("bebe") || full.includes("bebé") ||
      full.includes("infantil") || full.includes("pediatrico") || full.includes("pediátrico") ||
      /\d+ (año|años|mes|meses) de edad/.test(full) ||
      /niño de \d+/.test(full) || /bebé de \d+/.test(full),
    tomaAnticoagulantes:
      full.includes("warfarina") || full.includes("heparina") || full.includes("anticoagulante") ||
      full.includes("coumadin") || full.includes("xarelto") || full.includes("eliquis"),
    diabetica:
      full.includes("diabetica") || full.includes("diabética") || full.includes("diabetico") ||
      full.includes("diabético") || full.includes("diabetes") || full.includes("insulina"),
    hipertensa:
      full.includes("hipertension") || full.includes("hipertensión") || full.includes("presion alta") ||
      full.includes("presión alta") || full.includes("hipertensa") || full.includes("hipertenso"),
    ulcera:
      full.includes("ulcera") || full.includes("úlcera") || full.includes("gastritis") ||
      full.includes("estomago delicado") || full.includes("estómago delicado"),
  };
}

export function etiquetasContexto(ctx: ContextoSalud): string[] {
  const etiquetas: string[] = [];
  if (ctx.menstruando) etiquetas.push("en tus días");
  if (ctx.embarazada) etiquetas.push("embarazada");
  if (ctx.problemasHigado) etiquetas.push("problema de hígado");
  if (ctx.problemasRinon) etiquetas.push("problema de riñón");
  if (ctx.esNino) etiquetas.push("es un menor");
  if (ctx.tomaAnticoagulantes) etiquetas.push("toma anticoagulantes");
  if (ctx.diabetica) etiquetas.push("diabetes");
  if (ctx.hipertensa) etiquetas.push("hipertensión");
  if (ctx.ulcera) etiquetas.push("úlcera / gastritis");
  return etiquetas;
}

export function detectTriage(text: string): TriageLevel {
  const lower = text.toLowerCase();
  const rojoKeywords = ["no puedo respirar", "no respiro", "dolor en el pecho", "dolor de pecho", "convulsion", "convulsión", "desmayo", "desmayé", "sangrado abundante", "no me despierta", "inconsciente", "ataque al corazon", "ataque al corazón", "infarto"];
  const amarilloKeywords = ["fiebre", "vómito", "vomito", "diarrea", "dolor fuerte", "mucho dolor", "no mejora", "me duele mucho", "no baja", "sin mejorar"];
  for (const kw of rojoKeywords) { if (lower.includes(kw)) return "rojo"; }
  for (const kw of amarilloKeywords) { if (lower.includes(kw)) return "amarillo"; }
  return "verde";
}

// ---------------------------------------------------------------------------
// Respuestas con dos modos: paciente (simple) y doctor (técnico)
// + conciencia de contraindicaciones por contexto
// ---------------------------------------------------------------------------

interface Respuestas {
  paciente: string;
  doctor: string;
}

function pick(modo: ModoLenguaje, r: Respuestas): string {
  return modo === "doctor" ? r.doctor : r.paciente;
}

export function getAlfredResponse(
  userMessage: string,
  modo: ModoLenguaje,
  ctx: ContextoSalud
): string {
  const lower = userMessage.toLowerCase();

  // ── DOLOR DE CABEZA ────────────────────────────────────────────────────────
  if (lower.includes("cabeza") || (lower.includes("duele") && lower.includes("cabeza"))) {
    // Menstruando: no recomendar aspirina (antiagregante plaquetario = más sangrado)
    // ni ibuprofeno/diclofenaco a dosis altas si hay sangrado abundante
    if (ctx.menstruando) {
      return pick(modo, {
        paciente:
          "Para el dolor de cabeza estando en tus días, lo más seguro es el paracetamol genérico (~$25 MXN). Evita la aspirina porque adelgaza la sangre y puede hacer que tu flujo sea más abundante. El ibuprofeno en dosis bajas puede usarse para el dolor menstrual, pero si tu sangrado ya es fuerte, mejor quedarte con el paracetamol. Un té de manzanilla o tila también puede ayudar con la tensión.",
        doctor:
          "En contexto de menstruación activa, el analgésico de elección para cefalea es el paracetamol (500–1g c/6–8h), ya que no tiene efecto antiagregante plaquetario. La aspirina está contraindicada relativamente por inhibición de la COX-1 y riesgo de aumentar el sangrado menstrual. Los AINEs (ibuprofeno, diclofenaco) pueden usarse para la dismenorrea pero con cautela si existe menorragia; el AINE de primera línea para dismenorrea es el ácido mefenámico o el naproxeno. La tila (Tilia mexicana) tiene efecto ansiolítico leve útil para cefalea tensional.",
      });
    }
    if (ctx.embarazada) {
      return pick(modo, {
        paciente:
          "Estando embarazada, el único analgésico seguro para el dolor de cabeza es el paracetamol genérico (~$25 MXN) — y solo en la dosis más baja posible. La aspirina y el ibuprofeno están prohibidos en el embarazo. Si el dolor es muy fuerte o viene con visión borrosa e hinchazón, ve al médico de inmediato ya que puede ser preeclampsia.",
        doctor:
          "Durante la gestación, el acetaminofén (paracetamol) es el único analgésico-antipirético de categoría B compatible con el embarazo. Los AINEs (ibuprofeno, naproxeno, diclofenaco) están contraindicados por cierre prematuro del ductus arteriosus y oligohidramnios, especialmente en tercer trimestre. La aspirina en dosis antiinflamatorias también está contraindicada. Ante cefalea intensa con edema y/o alteraciones visuales, descartar preeclampsia urgentemente.",
      });
    }
    if (ctx.problemasRinon) {
      return pick(modo, {
        paciente:
          "Con problemas de riñón, los mejores analgésicos para el dolor de cabeza son el paracetamol genérico (~$25 MXN) — evita el ibuprofeno, naproxeno y aspirina porque estos medicamentos pueden dañar aún más los riñones. El té de hierbabuena también puede aliviar dolores de cabeza leves.",
        doctor:
          "En insuficiencia renal, los AINEs están contraindicados por reducción del flujo renal mediada por prostaglandinas, riesgo de nefrotoxicidad e hipercalemia. El analgésico de elección es el paracetamol (ajustando intervalo en IR grave: c/8h máximo 2g/día). Evitar aspirina por efecto antiagregante y naproxeno. La hierbabuena tiene efecto analgésico leve por mentol sin impacto renal.",
      });
    }
    return pick(modo, {
      paciente:
        "Para el dolor de cabeza, el paracetamol genérico (~$25 MXN) o el ibuprofeno (~$30 MXN) suelen funcionar muy bien. Si el dolor es muy intenso, aparece de repente o va acompañado de visión borrosa o rigidez en el cuello, busca atención médica de inmediato. Un té de menta o tila también puede aliviar dolores leves.",
      doctor:
        "Para cefalea tensional o migraña leve, primera línea: paracetamol 500–1000mg o ibuprofeno 400mg c/6h. En migraña moderada-severa considerar triptanes (sumatriptán). Banderas rojas: cefalea en trueno, rigidez nucal, fiebre alta, déficit neurológico focal — descartar HSA o meningitis. La hierbabuena (mentol) tiene efecto vasomotor y ansiolítico leve.",
    });
  }

  // ── FIEBRE ─────────────────────────────────────────────────────────────────
  if (lower.includes("fiebre") || lower.includes("temperatura") || lower.includes("calentura")) {
    if (ctx.esNino) {
      return pick(modo, {
        paciente:
          "Para la fiebre en niños, el paracetamol pediátrico es el más seguro — la dosis es según el peso, no la edad. Nunca le des aspirina a un niño porque puede causar una enfermedad muy grave llamada síndrome de Reye. El ibuprofeno también sirve para mayores de 6 meses. Si el bebé tiene menos de 3 meses y tiene fiebre, llévalo al médico de inmediato.",
        doctor:
          "Antipirético de primera línea en pediatría: paracetamol 10–15 mg/kg/dosis c/4–6h (máx 4 dosis/24h) o ibuprofeno 5–10 mg/kg c/6–8h en mayores de 6 meses. Aspirina contraindicada en menores de 12 años por riesgo de síndrome de Reye. Fiebre en neonatos (<3 meses) es una emergencia — requiere evaluación urgente para descartar infección bacteriana grave.",
      });
    }
    if (ctx.problemasHigado) {
      return pick(modo, {
        paciente:
          "Con problemas de hígado, el paracetamol debe usarse con mucho cuidado — solo en dosis bajas (máximo 500mg cada 8 horas) y nunca con alcohol. El ibuprofeno tampoco es ideal en dosis altas. Lo mejor es que un médico te indique qué tomar. Mantente muy bien hidratado.",
        doctor:
          "En hepatopatía, el paracetamol puede usarse con cautela a dosis reducidas (máx 2g/día) evitando combinarlo con alcohol o inductores del CYP2E1. Los AINEs están contraindicados en cirrosis avanzada por riesgo de síndrome hepatorrenal. Para fiebre refractaria, la evaluación del hepatólogo es mandatoria.",
      });
    }
    return pick(modo, {
      paciente:
        "La fiebre puede tener muchas causas. Si supera los 38.5°C o dura más de 2 días, es importante que un médico te vea. Mientras tanto, el paracetamol genérico (~$25 MXN) o el ibuprofeno (~$30 MXN) pueden ayudar. Toma mucha agua y descansa.",
      doctor:
        "Fiebre >38.3°C axilar. Primera línea: paracetamol 500–1000mg c/6–8h o ibuprofeno 400mg c/6–8h. Criterios de alarma: fiebre >40°C, duración >72h, rigidez nucal, petequias, alteración del estado de consciencia — requieren evaluación urgente. Hemocultivos si sospecha bacteremia.",
    });
  }

  // ── TOS / RESFRIADO ────────────────────────────────────────────────────────
  if (lower.includes("tos") || lower.includes("resfriado") || lower.includes("catarro") || lower.includes("gripe")) {
    if (ctx.embarazada) {
      return pick(modo, {
        paciente:
          "Estando embarazada, muchos medicamentos para la gripe no son seguros. Lo mejor es: descansar mucho, tomar agua e infusiones de jengibre con miel (seguro en embarazo), miel de abeja para la tos, y paracetamol si hay fiebre. Evita los antigripales de farmacia que combinan varios ingredientes — muchos no están recomendados en el embarazo.",
        doctor:
          "En gestación, evitar descongestionantes (pseudoefedrina, fenilefrina) por riesgo de vasoconstricción placentaria. Los antihistamínicos de primera generación con cautela. Paracetamol es seguro para fiebre y mialgias. Dextrometorfano con precaución en primer trimestre. Medidas no farmacológicas: hidratación, miel, vapor de agua, jengibre (antiemético y antiinflamatorio natural). Oseltamivir es de categoría C, usar solo si influenza confirmada y beneficio supera riesgo.",
      });
    }
    return pick(modo, {
      paciente:
        "Para la tos y el catarro, el gordolobo en té es un remedio tradicional muy efectivo — lo encuentras en cualquier mercado. Mantente bien hidratado, descansa y considera un antigripal genérico si tienes varios síntomas. Si la tos dura más de 2 semanas o toses sangre, ve al médico.",
      doctor:
        "Infección respiratoria alta viral: tratamiento sintomático. Mucolíticos (guaifenesina) para tos productiva, dextrometorfano para tos seca. Los antibióticos no tienen indicación en rinofaringitis viral. Verbascum thapsus (gordolobo) contiene mucílagos y saponinas con efecto expectorante comparable a guaifenesina. Señales de alarma: disnea, SpO2 <94%, fiebre persistente — descartar neumonía.",
    });
  }

  // ── DOLOR GENERAL ──────────────────────────────────────────────────────────
  if (lower.includes("duele") || lower.includes("dolor")) {
    if (ctx.menstruando && (lower.includes("panza") || lower.includes("barriga") || lower.includes("vientre") || lower.includes("colico") || lower.includes("cólico"))) {
      return pick(modo, {
        paciente:
          "Para los cólicos menstruales, el ibuprofeno genérico (~$30 MXN) es el más efectivo porque reduce la inflamación que causa el dolor. Tómalo con comida para no lastimar el estómago. La manzanilla y la hierbabuena en té también ayudan a relajar los espasmos. Una bolsa de agua caliente en el vientre hace mucha diferencia. Evita la aspirina si tu sangrado es abundante.",
        doctor:
          "Dismenorrea primaria: tratamiento de elección son los AINEs por inhibición de la síntesis de prostaglandinas endometriales (PGE2, PGF2α). Ibuprofeno 400mg c/6–8h o naproxeno 500mg c/12h. Iniciar 1–2 días antes del sangrado si es predecible. La aspirina es menos eficaz y aumenta el sangrado por inhibición irreversible de COX-1. Alternativas: antiespasmódicos (butil-escopolamina). Manzanilla: apigenina con efecto antiespasmódico suave.",
      });
    }
    if (ctx.ulcera) {
      return pick(modo, {
        paciente:
          "Con gastritis o úlcera, ten mucho cuidado con los analgésicos. El paracetamol genérico (~$25 MXN) es el más seguro para el dolor. Evita el ibuprofeno, la aspirina y el diclofenaco porque irritan el estómago y pueden empeorar tu úlcera. Si necesitas un antiinflamatorio, pregúntale a tu médico.",
        doctor:
          "En pacientes con úlcera péptica o gastritis severa, los AINEs no selectivos están contraindicados por inhibición de COX-1 gástrica y reducción del moco protector. Primera línea: paracetamol. Si se requiere AINE, usar inhibidor selectivo de COX-2 (celecoxib) con IBP concomitante (omeprazol 20mg). Confirmar erradicación de H. pylori antes de iniciar AINEs crónicos.",
      });
    }
    return pick(modo, {
      paciente:
        "Para dolores leves o moderados, el ibuprofeno genérico (~$30 MXN) o el paracetamol (~$25 MXN) son tus mejores opciones. Tómalos con comida para proteger el estómago. Si el dolor es muy intenso, persistente o en el pecho, ve al médico.",
      doctor:
        "Analgesia escalonada según intensidad (escala EVA). Leve: paracetamol o AINEs. Moderado: agregar tramadol o codeína. Severo: opioides mayores con supervisión. En dolor crónico, descartar causa subyacente. Evitar automedicación prolongada con AINEs por gastropatía, nefrotoxicidad y riesgo cardiovascular.",
    });
  }

  // ── DIABETES ───────────────────────────────────────────────────────────────
  if (lower.includes("diabetes") || lower.includes("glucosa") || lower.includes("azúcar") || lower.includes("azucar")) {
    if (ctx.problemasRinon) {
      return pick(modo, {
        paciente:
          "Con diabetes y problemas de riñón, la Metformina puede estar contraindicada — el médico debe evaluar si la puedes tomar. El nopal y la prodigiosa pueden ayudar como complemento, pero siempre bajo supervisión. Lo más importante es checar tu glucosa regularmente y no saltarte comidas.",
        doctor:
          "Metformina contraindicada con TFG <30 ml/min/1.73m² y usar con precaución entre 30–45. En nefropatía diabética, considerar inhibidores de SGLT-2 (empagliflozina, dapagliflozina) que además tienen efecto nefroprotector, o análogos de GLP-1. Monitoreo estricto de TFG y potasio. Ajuste de dosis insulínica por mayor vida media.",
      });
    }
    return pick(modo, {
      paciente:
        "Para el control de la diabetes tipo 2, la Metformina genérica (~$45 MXN) es muy efectiva y barata. El nopal y la prodigiosa también tienen evidencia como complementos naturales. Lo más importante es no saltarse los medicamentos, checar tu glucosa regularmente y comer a horarios fijos.",
      doctor:
        "Primera línea en DM2: Metformina (biguanida), reduce gluconeogénesis hepática, HbA1c aprox -1.5%. Sin hipoglucemia en monoterapia. Agentes complementarios con evidencia: Opuntia ficus-indica (fibra soluble, reduce glucemia postprandial), Brickellia cavanillesii (prodigiosa, efecto hipoglucemiante por flavonoides). IMPORTANTE: el nopal y la prodigiosa pueden potenciar el efecto hipoglucemiante — monitorear glucemia para evitar hipoglucemia.",
    });
  }

  // ── PRESIÓN ARTERIAL ───────────────────────────────────────────────────────
  if (lower.includes("presion") || lower.includes("presión") || lower.includes("hipertension") || lower.includes("hipertensión") || lower.includes("tension")) {
    return pick(modo, {
      paciente:
        "Para la hipertensión, el Losartán genérico (~$55 MXN) es muy accesible y efectivo. La flor de Jamaica en agua tiene evidencia de bajar la presión levemente. Lo más importante: tomar el medicamento todos los días a la misma hora aunque te sientas bien — dejar de tomarlo puede causar una crisis.",
      doctor:
        "Primera línea en hipertensión: IECA (enalapril) o ARA-II (losartán) especialmente en diabéticos o nefropatía. Calcioantagonistas (amlodipino) como alternativa. Hibiscus sabdariffa tiene evidencia de reducción sistólica de 7–13 mmHg en algunos estudios. Objetivos: <140/90 mmHg en general, <130/80 en diabéticos y enfermedad renal crónica. Monitorear creatinina y potasio con IECA/ARA-II.",
    });
  }

  // ── NÁUSEAS / MALESTAR ESTOMACAL ──────────────────────────────────────────
  if (lower.includes("nausea") || lower.includes("náusea") || lower.includes("vomito") || lower.includes("vómito") || lower.includes("estomago") || lower.includes("estómago")) {
    if (ctx.embarazada) {
      return pick(modo, {
        paciente:
          "Las náuseas del embarazo son muy comunes. El jengibre en té o galletas de jengibre es el remedio más seguro y comprobado. Come pequeñas cantidades frecuentes, evita olores fuertes y descansa. Si el vómito es muy intenso y no puedes retener nada durante más de 24 horas, ve al médico — puede ser hiperémesis gravídica.",
        doctor:
          "Náuseas y vómitos del embarazo (NVE): primera línea no farmacológica — jengibre (Zingiber officinale, gingeroles activos) 250mg 4 veces/día, comparable a metoclopramida en ensayos. Farmacológico: vitamina B6 (piridoxina) 10–25mg c/8h, doxilamina 12.5mg (disponible en México). Metoclopramida en casos moderados. En hiperémesis gravídica (pérdida >5% peso, cetonuria): hospitalización y ondansetrón.",
      });
    }
    return pick(modo, {
      paciente:
        "Para las náuseas y el malestar estomacal, la manzanilla o el jengibre en infusión son remedios muy efectivos. Si hay vómito persistente más de 24 horas, toma suero oral (~$10 MXN) para hidratarte. Si no mejora, ve al médico.",
      doctor:
        "Náuseas/vómitos agudos: antieméticos de primera línea — metoclopramida 10mg c/8h (procinético) o dimenhidrinato 50mg c/6h. Manzanilla (apigenina, bisabolol) y jengibre (gingeroles) tienen efecto antiespasmódico intestinal. En gastroenteritis aguda: rehidratación oral prioritaria sobre antieméticos. Descartar causa quirúrgica en dolor abdominal severo asociado.",
    });
  }

  // ── NIÑOS ─────────────────────────────────────────────────────────────────
  if (ctx.esNino && (lower.includes("niño") || lower.includes("hijo") || lower.includes("bebe") || lower.includes("bebé") || lower.includes("pequeño") || lower.includes("menor"))) {
    return pick(modo, {
      paciente:
        "Para los niños, la dosis siempre se calcula por su peso, no por la edad. El paracetamol pediátrico es el más seguro para fiebre y dolor. Nunca le des aspirina a un menor de 12 años. Para bebés menores de 3 meses con cualquier síntoma, ve al médico sin demora.",
      doctor:
        "Pediatría: dosificación por peso. Paracetamol 10–15 mg/kg/dosis c/4–6h. Ibuprofeno 5–10 mg/kg/dosis c/6–8h (>6 meses). Aspirina contraindicada <12 años (síndrome de Reye). Neonatos febriles (<3 meses): evaluación urgente, sepsis neonatal debe descartarse. Amoxicilina 40mg/kg/día para infecciones bacterianas pediátricas comunes.",
    });
  }

  // ── GENÉRICOS / PRECIO ────────────────────────────────────────────────────
  if (lower.includes("generico") || lower.includes("genérico") || lower.includes("barato") || lower.includes("precio") || lower.includes("económico") || lower.includes("economico")) {
    return pick(modo, {
      paciente:
        "Los medicamentos genéricos tienen exactamente el mismo ingrediente activo que las marcas conocidas — la misma potencia y efecto — pero cuestan hasta un 80% menos. En la pestaña de Medicamentos puedes buscar cualquier nombre de marca y te aparece su equivalente genérico con el precio aproximado.",
      doctor:
        "Los medicamentos genéricos contienen el mismo principio activo, dosis y vía de administración que el innovador. Deben cumplir con estudios de bioequivalencia certificados por COFEPRIS. La sustitución genérica es apropiada para la mayoría de los fármacos. Excepciones donde hay que ser cauteloso: antiepilépticos (levotiroxina, fenitoína, valproato) — índice terapéutico estrecho donde pequeñas variaciones en biodisponibilidad pueden ser clínicamente relevantes.",
    });
  }

  // ── PLANTAS / HERBOLARIA ──────────────────────────────────────────────────
  if (lower.includes("planta") || lower.includes("hierba") || lower.includes("natural") || lower.includes("herbal") || lower.includes("te ") || lower.includes("té ") || lower.includes("remedio")) {
    return pick(modo, {
      paciente:
        "México tiene una tradición herbolaria increíble. En la pestaña de Herbolaria puedes ver 15 plantas con sus usos, cómo prepararlas y advertencias importantes. Ojo: algunas plantas interactúan con medicamentos — siempre revisa antes de combinarlas.",
      doctor:
        "La fitoterapia mexicana tiene respaldo etnofarmacológico sólido. Plantas con mayor evidencia clínica: Hibiscus sabdariffa (antihipertensivo), Opuntia ficus-indica (hipoglucemiante), Zingiber officinale (antiemético), Matricaria chamomilla (antiespasmódico). Interacciones relevantes: ajo + anticoagulantes, nopal + hipoglucemiantes, tila + benzodiacepinas. Siempre preguntar por uso de plantas medicinales en la anamnesis.",
    });
  }

  // ── DEFAULT ───────────────────────────────────────────────────────────────
  return pick(modo, {
    paciente:
      "Gracias por contarme. Para orientarte mejor, ¿puedes decirme más sobre cómo te sientes? ¿Hace cuánto empezó, dónde te duele o molesta, y si tienes fiebre u otros síntomas?",
    doctor:
      "Para una orientación diagnóstica adecuada, necesito más información clínica: tiempo de evolución, características del síntoma (localización, irradiación, factores agravantes/atenuantes), síntomas acompañantes, antecedentes relevantes y medicación actual. ¿Puede ampliar la descripción del cuadro clínico?",
  });
}
