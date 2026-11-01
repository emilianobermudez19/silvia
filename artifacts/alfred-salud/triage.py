from dataclasses import dataclass

@dataclass
class TriageResult:
    nivel: str
    banderas_rojas: list[str]
    mensaje: str
    requiere_emergencia: bool
    requiere_medico_pronto: bool
    puede_autocuidado: bool

BANDERAS_ROJAS = [
    "dolor en el pecho",
    "dolor pecho",
    "infarto",
    "no puedo respirar",
    "dificultad para respirar",
    "no respira",
    "me ahogo",
    "falta de aire",
    "pérdida del conocimiento",
    "me desmayé",
    "desmayo",
    "convulsión",
    "convulsiones",
    "ataque epiléptico",
    "derrame cerebral",
    "embolia",
    "cara caída",
    "brazo dormido",
    "no puedo hablar",
    "no articula palabras",
    "parálisis",
    "sangrado abundante",
    "hemorragia",
    "sangro mucho",
    "vómito con sangre",
    "heces con sangre",
    "sangre en heces",
    "orina con sangre",
    "herida profunda",
    "quemadura grave",
    "quemadura extensa",
    "reacción alérgica grave",
    "anafilaxis",
    "cara hinchada",
    "garganta cerrada",
    "labios morados",
    "labios azules",
    "uñas azules",
    "cianosis",
    "envenenamiento",
    "intoxicación",
    "sobredosis",
    "tomé demasiado",
    "trauma craneal",
    "golpe en la cabeza",
    "caída de altura",
    "accidente de tráfico",
    "accidente de carro",
    "atropellado",
    "temperatura mayor de 40",
    "fiebre de 40",
    "fiebre muy alta",
    "cuello rígido",
    "meningitis",
    "abdomen rígido",
    "abdomen duro como tabla",
    "dolor abdominal muy intenso",
    "dolor abdominal agudo",
    "pensamiento suicida",
    "quiero quitarme la vida",
    "me quiero matar",
    "suicidio",
    "crisis hipertensiva",
    "presión muy alta",
    "200 de presión",
    "parto prematuro",
    "bebé no se mueve",
    "eclampsia",
    "niño no responde",
    "niño inconsciente",
    "glucosa muy baja",
    "hipoglucemia severa",
    "glucosa de 40",
]

BANDERAS_AMARILLAS = [
    "fiebre alta",
    "temperatura 39",
    "temperatura de 38",
    "infección grave",
    "herida infectada",
    "pus en la herida",
    "dolor muy intenso",
    "vómito persistente",
    "diarrea con sangre",
    "deshidratación",
    "no puedo comer",
    "no puede comer",
    "no puedo dormir",
    "presión alta",
    "glucosa alta",
    "azúcar alta",
    "glucosa elevada",
    "niño con fiebre alta",
    "bebé con fiebre",
    "embarazada con dolor",
    "mayor de 65 con",
    "adulto mayor",
    "dolor que no cede",
    "más de 3 días de",
    "lleva semanas",
    "síntomas empeoran",
    "dificultad para tragar",
    "no puedo tragar",
    "orina muy oscura",
    "orina café",
    "ictericia",
    "coloración amarilla",
    "piel amarilla",
    "ojo amarillo",
]

def evaluar_triage(texto: str) -> TriageResult:
    texto_lower = texto.lower()

    banderas_encontradas_rojas = [
        b for b in BANDERAS_ROJAS if b in texto_lower
    ]
    banderas_encontradas_amarillas = [
        b for b in BANDERAS_AMARILLAS if b in texto_lower
    ]

    if banderas_encontradas_rojas:
        return TriageResult(
            nivel="ROJO - EMERGENCIA",
            banderas_rojas=banderas_encontradas_rojas,
            mensaje=(
                "🚨 **EMERGENCIA MÉDICA DETECTADA**\n\n"
                "Los síntomas descritos pueden ser de riesgo vital. "
                "**No intentes automedicarte.** Busca atención de emergencias de inmediato."
            ),
            requiere_emergencia=True,
            requiere_medico_pronto=False,
            puede_autocuidado=False,
        )
    elif banderas_encontradas_amarillas:
        return TriageResult(
            nivel="AMARILLO - ATENCIÓN MÉDICA PRONTA",
            banderas_rojas=banderas_encontradas_amarillas,
            mensaje=(
                "⚠️ **Se recomienda atención médica en las próximas 24 horas**\n\n"
                "Los síntomas descritos requieren evaluación profesional. "
                "La información proporcionada es orientativa y no reemplaza una consulta médica."
            ),
            requiere_emergencia=False,
            requiere_medico_pronto=True,
            puede_autocuidado=False,
        )
    else:
        return TriageResult(
            nivel="VERDE - Autocuidado posible",
            banderas_rojas=[],
            mensaje=(
                "✅ No se detectaron señales de alarma inmediata. "
                "Puedes continuar con la consulta. Recuerda que esta información es orientativa."
            ),
            requiere_emergencia=False,
            requiere_medico_pronto=False,
            puede_autocuidado=True,
        )

def get_emergency_html() -> str:
    return """
    <div style="background:#ff4444;color:white;padding:20px;border-radius:12px;text-align:center;margin:10px 0;">
        <h2>🚨 EMERGENCIA MÉDICA</h2>
        <p style="font-size:1.2em;">Llama al <strong>911</strong> ahora mismo</p>
        <p>Número de Emergencias México: <strong>911</strong></p>
        <p>Cruz Roja: <strong>800-718-3911</strong></p>
        <p>IMSS: <strong>01-800-623-2323</strong></p>
    </div>
    """
