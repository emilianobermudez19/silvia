import streamlit as st
import os
import json
import base64
import datetime
from PIL import Image
import io

from openai import OpenAI
from triage import evaluar_triage, get_emergency_html
from vector_store import get_context_for_query, buscar_medicamento, buscar_herbolaria, get_all_medicamentos, get_all_herbolaria
from token_counter import count_tokens, get_token_stats, estimate_cost_usd

st.set_page_config(
    page_title="Alfred Salud",
    page_icon="🏥",
    layout="wide",
    initial_sidebar_state="expanded",
)

DISCLAIMER = (
    "⚕️ **Aviso Legal:** Alfred Salud proporciona información orientativa de salud. "
    "**No reemplaza la consulta médica profesional.** En caso de emergencia, llama al **911**. "
    "Ante cualquier duda sobre medicamentos, consulta a tu médico o farmacéutico."
)

SYSTEM_PROMPT = """Eres Alfred Salud, un asistente médico virtual para México. Tu misión es ayudar a personas con acceso limitado a servicios de salud.

REGLAS ABSOLUTAS:
1. SIEMPRE incluye un disclaimer médico al final de cada respuesta crítica.
2. Si detectas señales de emergencia, DETÉN la respuesta de medicación y dirige al 911.
3. Responde en español mexicano, de forma clara y accesible.
4. Para medicamentos, SIEMPRE sugiere genéricos antes que marcas comerciales.
5. Para herbolaria, SIEMPRE menciona interacciones medicamentosas relevantes.
6. Sé conciso: máximo 300 palabras por respuesta, a menos que sea una explicación de receta.
7. No diagnostiques enfermedades — orienta y refiere al médico.

FORMATO:
- Usa markdown con emojis para claridad visual
- Sección de medicamentos genéricos con precios aproximados en MXN
- Sección de alternativas de herbolaria si aplica
- Siempre cierra con el disclaimer

CONTEXTO DE DATOS (catálogos oficiales):
"""


def get_client() -> OpenAI:
    base_url = os.environ.get("AI_INTEGRATIONS_OPENAI_BASE_URL")
    api_key = os.environ.get("AI_INTEGRATIONS_OPENAI_API_KEY", "dummy")
    if base_url:
        return OpenAI(base_url=base_url, api_key=api_key)
    raise RuntimeError("AI_INTEGRATIONS_OPENAI_BASE_URL no configurado.")


def image_to_base64(image: Image.Image) -> str:
    buffer = io.BytesIO()
    image.save(buffer, format="JPEG", quality=85)
    return base64.b64encode(buffer.getvalue()).decode("utf-8")


def call_llm(messages: list[dict], model: str = "gpt-5-mini", max_tokens: int = 600) -> str:
    client = get_client()
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        max_completion_tokens=max_tokens,
    )
    return response.choices[0].message.content or ""


def call_vision(image_b64: str, prompt: str, model: str = "gpt-5.4") -> str:
    client = get_client()
    response = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{image_b64}"},
                    },
                    {"type": "text", "text": prompt},
                ],
            }
        ],
        max_completion_tokens=800,
    )
    return response.choices[0].message.content or ""


def init_session():
    if "messages" not in st.session_state:
        st.session_state.messages = []
    if "recordatorios" not in st.session_state:
        st.session_state.recordatorios = []
    if "token_total" not in st.session_state:
        st.session_state.token_total = 0


def sidebar():
    with st.sidebar:
        st.image("https://img.icons8.com/color/96/caduceus.png", width=60)
        st.title("Alfred Salud")
        st.caption("Asistente médico con IA para México")
        st.divider()

        st.markdown("### 📊 Uso de tokens")
        stats = get_token_stats()
        col1, col2 = st.columns(2)
        col1.metric("Total tokens", st.session_state.get("token_total", 0))
        cost = estimate_cost_usd(st.session_state.get("token_total", 0))
        col2.metric("Costo est.", f"${cost:.4f} USD")

        if st.session_state.get("token_total", 0) > 5000:
            st.warning("⚡ Alto uso de tokens. Las respuestas se están acortando automáticamente.")

        st.divider()
        st.markdown("### 🆘 Emergencias")
        st.error("**911** — Emergencias nacionales")
        st.info("**800-718-3911** — Cruz Roja")
        st.info("**800-623-2323** — IMSS")
        st.divider()
        st.caption(DISCLAIMER)


def tab_chat():
    st.header("💬 Consulta con Alfred")
    st.caption("Pregunta sobre síntomas, medicamentos, dosis o alternativas naturales.")

    triage_placeholder = st.empty()

    for msg in st.session_state.messages:
        with st.chat_message(msg["role"]):
            st.markdown(msg["content"])

    if prompt := st.chat_input("¿En qué puedo ayudarte hoy?"):
        triage_result = evaluar_triage(prompt)

        if triage_result.requiere_emergencia:
            triage_placeholder.markdown(get_emergency_html(), unsafe_allow_html=True)
            st.error(triage_result.mensaje)
            st.session_state.messages.append({"role": "user", "content": prompt})
            st.session_state.messages.append({
                "role": "assistant",
                "content": (
                    "🚨 **EMERGENCIA DETECTADA**\n\n"
                    f"{triage_result.mensaje}\n\n"
                    "**Llama al 911 ahora mismo. No te automediques.**\n\n"
                    f"Señales detectadas: {', '.join(triage_result.banderas_rojas)}"
                ),
            })
            st.rerun()
            return

        if triage_result.requiere_medico_pronto:
            st.warning(triage_result.mensaje)

        context = get_context_for_query(prompt)
        tokens_in = count_tokens(prompt + context)
        st.session_state.token_total = st.session_state.get("token_total", 0) + tokens_in

        max_tokens = 400 if st.session_state.token_total > 5000 else 600

        system_with_context = SYSTEM_PROMPT + "\n" + context if context else SYSTEM_PROMPT

        messages_for_api = [
            {"role": "system", "content": system_with_context}
        ] + [
            {"role": m["role"], "content": m["content"]}
            for m in st.session_state.messages[-8:]
        ] + [{"role": "user", "content": prompt}]

        st.session_state.messages.append({"role": "user", "content": prompt})

        with st.chat_message("user"):
            st.markdown(prompt)

        with st.chat_message("assistant"):
            with st.spinner("Alfred está pensando..."):
                try:
                    response = call_llm(messages_for_api, max_tokens=max_tokens)
                    tokens_out = count_tokens(response)
                    st.session_state.token_total += tokens_out
                    st.markdown(response)
                    st.caption(f"_Tokens usados: {tokens_in + tokens_out} | {DISCLAIMER[:80]}..._")
                    st.session_state.messages.append({"role": "assistant", "content": response})
                except Exception as e:
                    err = f"❌ Error al conectar con el servicio de IA: {e}"
                    st.error(err)
                    st.session_state.messages.append({"role": "assistant", "content": err})

    if st.session_state.messages:
        if st.button("🗑️ Limpiar conversación", use_container_width=True):
            st.session_state.messages = []
            st.rerun()


def tab_ocr():
    st.header("📷 OCR de Recetas y Medicamentos")
    st.caption("Sube una foto de tu receta médica o de una caja de medicamento para que Alfred la interprete.")

    col1, col2 = st.columns([1, 1])

    with col1:
        uploaded = st.file_uploader(
            "Selecciona una imagen",
            type=["jpg", "jpeg", "png", "webp"],
            help="Foto de receta médica, caja de medicamento o etiqueta farmacéutica",
        )
        tipo = st.selectbox(
            "¿Qué deseas analizar?",
            ["Receta médica — explicar posología", "Caja de medicamento — buscar genérico", "Foto de síntoma visual"],
        )

    with col2:
        if uploaded:
            image = Image.open(uploaded)
            st.image(image, caption="Imagen cargada", use_container_width=True)

    if uploaded and st.button("🔍 Analizar imagen", type="primary", use_container_width=True):
        image = Image.open(uploaded)
        b64 = image_to_base64(image)

        prompts = {
            "Receta médica — explicar posología": (
                "Esta es una foto de una receta médica. Por favor:\n"
                "1. Extrae todos los medicamentos prescritos (aunque la letra sea difícil)\n"
                "2. Para cada uno indica: nombre, dosis, frecuencia y duración\n"
                "3. Explica en lenguaje simple para qué sirve cada uno\n"
                "4. Sugiere el genérico equivalente más económico disponible en México\n"
                "5. Menciona precauciones importantes de cada medicamento\n"
                "Responde en español y usa formato estructurado. "
                + DISCLAIMER
            ),
            "Caja de medicamento — buscar genérico": (
                "Esta es una foto de una caja o empaque de medicamento. Por favor:\n"
                "1. Identifica el nombre comercial y el compuesto activo\n"
                "2. Sugiere 2-3 alternativas genéricas equivalentes disponibles en México con precio aproximado\n"
                "3. Explica brevemente para qué sirve y cómo se toma\n"
                "4. Menciona contraindicaciones principales\n"
                "Responde en español y usa formato estructurado. "
                + DISCLAIMER
            ),
            "Foto de síntoma visual": (
                "Esta es una foto de un síntoma físico visible. Por favor:\n"
                "1. Describe objetivamente lo que observas\n"
                "2. Menciona posibles condiciones que podrían explicarlo (sin diagnosticar)\n"
                "3. Indica si requiere atención médica urgente, pronta o puede manejarse en casa\n"
                "4. Sugiere primeros auxilios o cuidados básicos si aplica\n"
                "IMPORTANTE: No hagas diagnósticos definitivos. Siempre recomienda consulta médica.\n"
                + DISCLAIMER
            ),
        }

        with st.spinner("Analizando imagen con IA..."):
            try:
                triage_text = tipo
                triage_result = evaluar_triage(triage_text)

                result = call_vision(b64, prompts[tipo])
                tokens_used = count_tokens(prompts[tipo] + result)
                st.session_state.token_total = st.session_state.get("token_total", 0) + tokens_used

                st.success("✅ Análisis completado")
                st.markdown("---")
                st.markdown(result)
                st.caption(f"_Tokens usados en este análisis: {tokens_used}_")
                st.warning(DISCLAIMER)

            except Exception as e:
                st.error(f"❌ Error al analizar la imagen: {e}")
    elif not uploaded:
        st.info("👆 Sube una imagen para comenzar el análisis")


def tab_medicamentos():
    st.header("💊 Buscador de Medicamentos Genéricos")
    st.caption("Busca por nombre comercial o compuesto activo para encontrar alternativas económicas.")

    query = st.text_input("🔍 Busca un medicamento", placeholder="Ej: Tylenol, ibuprofeno, antibiótico para infección...")

    col1, col2 = st.columns([1, 1])
    with col1:
        if query:
            resultados = buscar_medicamento(query, top_k=5)
            if resultados:
                st.success(f"✅ {len(resultados)} resultado(s) encontrado(s)")
                for med in resultados:
                    with st.expander(f"💊 {med['compuesto_activo']} — {med['categoria']}", expanded=True):
                        brands = ", ".join(med.get("marcas_comerciales", []))
                        st.markdown(f"**Marcas comerciales:** {brands}")
                        st.markdown(f"**Indicaciones:** {med['indicaciones']}")
                        st.markdown(f"**Dosis adulto:** {med.get('dosis_adulto', 'N/D')}")
                        st.markdown(f"**Dosis pediátrica:** {med.get('dosis_pediatrica', 'N/D')}")
                        st.markdown(f"**Contraindicaciones:** {med.get('contraindicaciones', 'N/D')}")
                        precio = med.get("precio_aproximado_mxn")
                        if precio:
                            st.success(f"💰 Precio genérico aprox.: **${precio} MXN**")

                        if st.button(f"🤖 Consultar con Alfred sobre {med['compuesto_activo']}", key=f"btn_{med['id']}"):
                            herb_alts = buscar_herbolaria(med["indicaciones"], top_k=2)
                            herb_context = ""
                            if herb_alts:
                                herb_context = "\n\nAlternativas de herbolaria mexicana relacionadas:\n"
                                for h in herb_alts:
                                    herb_context += f"- {h['nombre_comun']}: {h['usos_tradicionales'][:100]}...\n"

                            prompt_ai = (
                                f"El usuario pregunta sobre {med['compuesto_activo']}. "
                                f"Explica sus usos, cómo tomarlo correctamente, y menciona {len(herb_alts)} alternativas naturales si las hay. "
                                f"{herb_context}"
                            )
                            with st.spinner("Consultando con Alfred..."):
                                try:
                                    resp = call_llm([
                                        {"role": "system", "content": SYSTEM_PROMPT},
                                        {"role": "user", "content": prompt_ai},
                                    ])
                                    st.markdown(resp)
                                except Exception as e:
                                    st.error(f"Error: {e}")
            else:
                st.warning("No se encontraron coincidencias. Intenta con el compuesto activo o una indicación.")

                with st.spinner("Consultando en catálogo ampliado..."):
                    try:
                        resp = call_llm([
                            {"role": "system", "content": SYSTEM_PROMPT + "\n" + get_context_for_query(query)},
                            {"role": "user", "content": f"¿Cuál es el genérico equivalente a {query} en México?"},
                        ])
                        st.markdown(resp)
                    except Exception as e:
                        st.error(f"Error: {e}")

    with col2:
        st.markdown("#### 📋 Catálogo completo")
        todos = get_all_medicamentos()
        for med in todos:
            brands = ", ".join(med.get("marcas_comerciales", [])[:2])
            st.markdown(f"• **{med['compuesto_activo']}** ({brands}) — ${med.get('precio_aproximado_mxn', '?')} MXN")

    st.warning(DISCLAIMER)


def tab_herbolaria():
    st.header("🌿 Herbolaria Mexicana — Guía UNAM")
    st.caption("Remedios tradicionales mexicanos con evidencia científica. Siempre consulta interacciones con tus medicamentos.")

    query = st.text_input("🔍 Busca un remedio o condición", placeholder="Ej: diabetes, tos, ansiedad, dolor de estómago...")

    col1, col2 = st.columns([3, 2])

    with col1:
        if query:
            resultados = buscar_herbolaria(query, top_k=5)
            if resultados:
                for herb in resultados:
                    with st.expander(f"🌿 {herb['nombre_comun']} ({herb['nombre_cientifico']})", expanded=True):
                        st.markdown(f"**Usos tradicionales:** {herb['usos_tradicionales']}")
                        st.markdown(f"**Preparación:** {herb['preparacion']}")
                        st.markdown(f"**Principios activos:** {herb.get('principios_activos', 'N/D')}")
                        st.markdown(f"**Equivalente farmacológico aprox.:** {herb.get('equivalente_farmacologico', 'N/D')}")
                        st.markdown(f"**Disponibilidad:** {herb.get('disponibilidad', 'N/D')}")

                        if herb.get("contraindicaciones"):
                            st.error(f"⚠️ **Contraindicaciones:** {herb['contraindicaciones']}")
                        if herb.get("interacciones_medicamentosas"):
                            st.warning(f"💊 **Interacciones:** {herb['interacciones_medicamentosas']}")
            else:
                st.info("No se encontró en la guía. Consultando con Alfred...")
                try:
                    resp = call_llm([
                        {"role": "system", "content": SYSTEM_PROMPT},
                        {"role": "user", "content": f"¿Qué remedios de herbolaria mexicana pueden ayudar con {query}? Menciona disponibilidad e interacciones."},
                    ])
                    st.markdown(resp)
                except Exception as e:
                    st.error(f"Error: {e}")
        else:
            st.markdown("### 📖 Plantas medicinales en catálogo")
            todas = get_all_herbolaria()
            for i in range(0, len(todas), 3):
                cols = st.columns(3)
                for j, col in enumerate(cols):
                    if i + j < len(todas):
                        h = todas[i + j]
                        with col:
                            st.info(f"🌿 **{h['nombre_comun']}**\n\n{h['usos_tradicionales'][:80]}...")

    with col2:
        st.markdown("#### 🔬 Análisis de desabasto")
        st.caption("Si no encuentras un medicamento, Alfred sugiere alternativas herbales.")
        med_faltante = st.text_input("Medicamento no disponible:", placeholder="Ej: metformina, ibuprofeno...")
        if med_faltante and st.button("🌿 Buscar alternativa natural", type="primary"):
            meds = buscar_medicamento(med_faltante, top_k=1)
            context = ""
            if meds:
                context = f"El medicamento buscado es {meds[0]['compuesto_activo']} indicado para: {meds[0]['indicaciones']}."
            with st.spinner("Buscando alternativas..."):
                try:
                    resp = call_llm([
                        {"role": "system", "content": SYSTEM_PROMPT + "\n" + get_context_for_query(med_faltante)},
                        {"role": "user", "content": f"{context} El paciente no puede conseguir este medicamento. ¿Qué alternativas de herbolaria mexicana existen? Incluye disponibilidad, preparación e interacciones. IMPORTANTE: Menciona claramente que no reemplazan la prescripción médica."},
                    ])
                    st.markdown(resp)
                except Exception as e:
                    st.error(f"Error: {e}")

    st.warning(DISCLAIMER)


def tab_recordatorios():
    st.header("⏰ Recordatorios de Medicamentos")
    st.caption("Organiza tus tomas diarias y recibe un resumen de tu pauta farmacológica.")

    col1, col2 = st.columns([1, 1])

    with col1:
        st.subheader("➕ Agregar recordatorio")
        with st.form("add_reminder"):
            med_name = st.text_input("Medicamento", placeholder="Ej: Metformina 500mg")
            dosis = st.text_input("Dosis", placeholder="Ej: 1 tableta")
            frecuencia = st.selectbox(
                "Frecuencia",
                ["Cada 8 horas", "Cada 12 horas", "Cada 24 horas (una vez al día)",
                 "Dos veces al día", "Tres veces al día", "Con el desayuno",
                 "Con el desayuno y la cena", "Antes de dormir", "Según necesidad"],
            )
            hora_inicio = st.time_input("Primera toma del día")
            con_comida = st.checkbox("Tomar con alimentos")
            notas = st.text_area("Notas adicionales", placeholder="Ej: Tomar con el estómago lleno...")
            duracion = st.number_input("Duración del tratamiento (días)", min_value=1, max_value=365, value=7)
            submitted = st.form_submit_button("💾 Guardar recordatorio", type="primary", use_container_width=True)

            if submitted and med_name:
                reminder = {
                    "id": len(st.session_state.recordatorios),
                    "medicamento": med_name,
                    "dosis": dosis,
                    "frecuencia": frecuencia,
                    "hora_inicio": str(hora_inicio),
                    "con_comida": con_comida,
                    "notas": notas,
                    "duracion_dias": duracion,
                    "fecha_inicio": datetime.date.today().isoformat(),
                    "activo": True,
                }
                st.session_state.recordatorios.append(reminder)
                st.success(f"✅ Recordatorio para {med_name} guardado.")
                st.rerun()

    with col2:
        st.subheader("📋 Mis medicamentos activos")

        if not st.session_state.recordatorios:
            st.info("No tienes recordatorios aún. Agrega tu primer medicamento.")
        else:
            activos = [r for r in st.session_state.recordatorios if r.get("activo")]
            if not activos:
                st.info("No hay medicamentos activos.")
            else:
                for r in activos:
                    with st.expander(f"💊 {r['medicamento']} — {r['frecuencia']}", expanded=True):
                        st.markdown(f"**Dosis:** {r['dosis']}")
                        st.markdown(f"**Hora inicio:** {r['hora_inicio']}")
                        st.markdown(f"**Con alimentos:** {'Sí' if r['con_comida'] else 'No'}")
                        st.markdown(f"**Duración:** {r['duracion_dias']} días desde {r['fecha_inicio']}")
                        if r.get("notas"):
                            st.markdown(f"**Notas:** {r['notas']}")

                        c1, c2 = st.columns(2)
                        with c1:
                            if st.button("🗑️ Eliminar", key=f"del_{r['id']}", use_container_width=True):
                                r["activo"] = False
                                st.rerun()
                        with c2:
                            if st.button("🤖 Preguntar a Alfred", key=f"ask_{r['id']}", use_container_width=True):
                                with st.spinner("Consultando..."):
                                    try:
                                        resp = call_llm([
                                            {"role": "system", "content": SYSTEM_PROMPT + "\n" + get_context_for_query(r["medicamento"])},
                                            {"role": "user", "content": f"Estoy tomando {r['medicamento']} {r['dosis']} con frecuencia '{r['frecuencia']}'. ¿Algo importante que deba saber? ¿Interacciones? ¿Precauciones?"},
                                        ])
                                        st.markdown(resp)
                                    except Exception as e:
                                        st.error(f"Error: {e}")

            if len(activos) > 1 and st.button("📊 Revisar interacciones entre todos mis medicamentos", type="primary", use_container_width=True):
                lista_meds = ", ".join([r["medicamento"] for r in activos])
                with st.spinner("Analizando interacciones..."):
                    try:
                        resp = call_llm([
                            {"role": "system", "content": SYSTEM_PROMPT},
                            {"role": "user", "content": f"Estoy tomando los siguientes medicamentos: {lista_meds}. ¿Hay interacciones importantes entre ellos? ¿Alguna combinación que deba evitar o tomar con precaución?"},
                        ], max_tokens=700)
                        st.markdown(resp)
                    except Exception as e:
                        st.error(f"Error: {e}")

    st.warning(DISCLAIMER)


def tab_triage():
    st.header("🩺 Triaje Preventivo")
    st.caption("Describe tus síntomas y Alfred evalúa si necesitas atención urgente.")

    sintomas = st.text_area(
        "Describe tus síntomas con detalle:",
        placeholder="Ej: Llevo 3 días con fiebre de 38.5°C, dolor de garganta y tos seca...",
        height=150,
    )

    edad = st.number_input("Edad del paciente:", min_value=0, max_value=120, value=30)
    embarazo = st.checkbox("¿Embarazada?")
    condiciones = st.multiselect(
        "Condiciones preexistentes:",
        ["Diabetes", "Hipertensión", "Asma/EPOC", "Cardiopatía", "Insuficiencia renal", "Inmunosupresión", "Ninguna"],
        default=["Ninguna"],
    )

    if sintomas and st.button("🔍 Evaluar síntomas", type="primary", use_container_width=True):
        triage_result = evaluar_triage(sintomas)

        if triage_result.requiere_emergencia:
            st.markdown(get_emergency_html(), unsafe_allow_html=True)
            st.error(triage_result.mensaje)
            for bf in triage_result.banderas_rojas:
                st.error(f"🚨 Señal detectada: **{bf}**")
        elif triage_result.requiere_medico_pronto:
            st.warning(triage_result.mensaje)
            for bf in triage_result.banderas_rojas:
                st.warning(f"⚠️ Factor de alerta: **{bf}**")
        else:
            st.success(triage_result.mensaje)

        if not triage_result.requiere_emergencia:
            context_extra = ""
            if embarazo:
                context_extra += " La paciente está embarazada."
            if "Ninguna" not in condiciones:
                context_extra += f" Tiene las siguientes condiciones: {', '.join(condiciones)}."

            with st.spinner("Alfred está evaluando..."):
                try:
                    resp = call_llm([
                        {"role": "system", "content": SYSTEM_PROMPT + "\n" + get_context_for_query(sintomas)},
                        {"role": "user", "content": (
                            f"Paciente de {edad} años.{context_extra} "
                            f"Síntomas: {sintomas}\n\n"
                            "Por favor: 1) Evalúa la gravedad, 2) Orienta sobre posibles causas, "
                            "3) Sugiere qué medicamentos de venta libre pueden aliviar los síntomas, "
                            "4) Indica cuándo sería urgente ir al médico."
                        )},
                    ], max_tokens=700)
                    st.markdown(resp)
                except Exception as e:
                    st.error(f"Error: {e}")

    st.warning(DISCLAIMER)


def main():
    init_session()
    sidebar()

    st.markdown(
        f"<div style='background:linear-gradient(90deg,#1a5276,#2980b9);color:white;padding:16px 24px;border-radius:10px;margin-bottom:16px;'>"
        f"<h2 style='margin:0;'>🏥 Alfred Salud</h2>"
        f"<p style='margin:4px 0 0 0;opacity:0.85;'>Asistente médico con IA para México — Acceso a salud para todos</p>"
        f"</div>",
        unsafe_allow_html=True,
    )
    st.caption(DISCLAIMER)

    tab1, tab2, tab3, tab4, tab5 = st.tabs([
        "💬 Consulta",
        "📷 OCR Recetas",
        "💊 Medicamentos",
        "🌿 Herbolaria",
        "⏰ Recordatorios",
    ])

    with tab1:
        tab_chat()
    with tab2:
        tab_ocr()
    with tab3:
        tab_medicamentos()
    with tab4:
        tab_herbolaria()
    with tab5:
        tab_recordatorios()

    st.divider()
    st.markdown(
        f"<p style='text-align:center;color:gray;font-size:0.75em;'>"
        f"⚕️ {DISCLAIMER}"
        f"</p>",
        unsafe_allow_html=True,
    )


if __name__ == "__main__":
    main()
