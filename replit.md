# Alfred Salud

Asistente médico con IA para México que resuelve la falta de acceso médico mediante inteligencia artificial multimodal.

## Run & Operate

- `cd artifacts/alfred-salud && streamlit run app.py --server.port 8080` — run Alfred Salud (port 8080)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- Required env: `AI_INTEGRATIONS_OPENAI_BASE_URL`, `AI_INTEGRATIONS_OPENAI_API_KEY` — Replit AI proxy (auto-provisioned)

## Stack

- **Frontend/Backend:** Python 3 + Streamlit (port 8080)
- **AI:** OpenAI Python SDK via Replit AI Integrations proxy (no user key needed)
  - Chat/Triage: `gpt-5-mini` (cost-efficient)
  - Vision/OCR: `gpt-5.4` (best multimodal)
- **RAG/Search:** Keyword-scored JSON catalog search (lightweight, no API needed for embeddings)
- **Data:** Simulated Catálogo de Medicamentos Genéricos MX + Guía de Herbolaria UNAM
- Node.js API: Express 5 + Drizzle ORM (existing, unused by Alfred Salud)

## Where things live

- `artifacts/alfred-salud/app.py` — Main Streamlit app (all tabs/features)
- `artifacts/alfred-salud/vector_store.py` — Keyword-based RAG over JSON catalogs
- `artifacts/alfred-salud/triage.py` — Red flag detection logic (ROJO/AMARILLO/VERDE)
- `artifacts/alfred-salud/token_counter.py` — Token counting decorator + cost estimator
- `artifacts/alfred-salud/data/medicamentos_genericos.json` — 15 drug records
- `artifacts/alfred-salud/data/herbolaria_unam.json` — 15 herbal medicine records

## Architecture decisions

- Keyword RAG over JSON (not ChromaDB/FAISS) for zero-latency startup and no embedding API cost
- Replit AI proxy used directly via Python openai SDK with custom base_url — no user API key needed
- Token budget: auto-shrinks max_completion_tokens after 5000 cumulative tokens (cost control)
- Triage runs locally (no API call) via regex keyword matching before any LLM call
- gpt-5.4 only for vision/OCR; gpt-5-mini for all text to minimize cost

## Product

- **💬 Consulta:** Chat multimodal con Alfred — detección de emergencias, sustitución de genéricos, herbolaria
- **📷 OCR Recetas:** Foto de receta → explicación de posología + genéricos sugeridos
- **💊 Medicamentos:** Catálogo de genéricos con precios MXN, búsqueda por nombre comercial
- **🌿 Herbolaria:** Guía UNAM de plantas medicinales mexicanas con interacciones farmacológicas
- **⏰ Recordatorios:** Dashboard de tomas con horarios, revisión de interacciones entre medicamentos

## User preferences

- App en español mexicano
- No requiere API key del usuario — usa Replit AI Integrations
- Respuestas concisas (máx 300 palabras) para ahorro de tokens

## Gotchas

- Port 5000 is taken by api-server; Alfred Salud runs on 8080
- AI_INTEGRATIONS_OPENAI_BASE_URL must be set (auto by Replit AI setup)
- Embeddings API is NOT supported by Replit proxy — use local keyword search instead
- `gpt-5-mini` and `gpt-5.4` are the model names in the Replit proxy

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
