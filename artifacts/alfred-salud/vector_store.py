import json
import os
import re
from pathlib import Path
from typing import Optional

DATA_DIR = Path(__file__).parent / "data"

_medicamentos: list[dict] = []
_herbolaria: list[dict] = []
_loaded = False


def _load_data() -> None:
    global _medicamentos, _herbolaria, _loaded
    if _loaded:
        return
    med_path = DATA_DIR / "medicamentos_genericos.json"
    herb_path = DATA_DIR / "herbolaria_unam.json"
    if med_path.exists():
        with open(med_path, encoding="utf-8") as f:
            _medicamentos = json.load(f)
    if herb_path.exists():
        with open(herb_path, encoding="utf-8") as f:
            _herbolaria = json.load(f)
    _loaded = True


def _score_match(query: str, item: dict, fields: list[str]) -> float:
    query_lower = query.lower()
    words = re.split(r"\W+", query_lower)
    score = 0.0
    for field in fields:
        val = str(item.get(field, "")).lower()
        for word in words:
            if len(word) < 3:
                continue
            if word in val:
                score += 2.0
            elif any(word in token for token in val.split()):
                score += 0.5
    return score


def buscar_medicamento(query: str, top_k: int = 3) -> list[dict]:
    _load_data()
    fields = [
        "compuesto_activo",
        "marcas_comerciales",
        "indicaciones",
        "categoria",
    ]
    scored = []
    for med in _medicamentos:
        s = _score_match(query, med, fields)
        if isinstance(med.get("marcas_comerciales"), list):
            for brand in med["marcas_comerciales"]:
                if query.lower() in brand.lower():
                    s += 5.0
        if s > 0:
            scored.append((s, med))
    scored.sort(key=lambda x: x[0], reverse=True)
    return [item for _, item in scored[:top_k]]


def buscar_herbolaria(query: str, top_k: int = 3) -> list[dict]:
    _load_data()
    fields = [
        "nombre_comun",
        "nombre_cientifico",
        "usos_tradicionales",
        "equivalente_farmacologico",
    ]
    scored = []
    for herb in _herbolaria:
        s = _score_match(query, herb, fields)
        if s > 0:
            scored.append((s, herb))
    scored.sort(key=lambda x: x[0], reverse=True)
    return [item for _, item in scored[:top_k]]


def get_context_for_query(query: str) -> str:
    _load_data()
    meds = buscar_medicamento(query, top_k=2)
    herbs = buscar_herbolaria(query, top_k=2)

    context_parts = []

    if meds:
        context_parts.append("=== MEDICAMENTOS GENÉRICOS RELEVANTES ===")
        for m in meds:
            brands = ", ".join(m.get("marcas_comerciales", []))
            context_parts.append(
                f"- Compuesto: {m['compuesto_activo']} | Marcas: {brands}\n"
                f"  Categoría: {m['categoria']}\n"
                f"  Indicaciones: {m['indicaciones']}\n"
                f"  Dosis adulto: {m.get('dosis_adulto', 'N/D')}\n"
                f"  Contraindicaciones: {m.get('contraindicaciones', 'N/D')}\n"
                f"  Precio aprox.: ${m.get('precio_aproximado_mxn', '?')} MXN"
            )

    if herbs:
        context_parts.append("=== HERBOLARIA MEXICANA (UNAM) ===")
        for h in herbs:
            context_parts.append(
                f"- {h['nombre_comun']} ({h['nombre_cientifico']})\n"
                f"  Usos: {h['usos_tradicionales']}\n"
                f"  Preparación: {h['preparacion']}\n"
                f"  Contraindicaciones: {h['contraindicaciones']}\n"
                f"  Interacciones: {h['interacciones_medicamentosas']}"
            )

    return "\n".join(context_parts) if context_parts else ""


def get_all_medicamentos() -> list[dict]:
    _load_data()
    return _medicamentos


def get_all_herbolaria() -> list[dict]:
    _load_data()
    return _herbolaria
