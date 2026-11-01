import functools
import time
from typing import Callable, Any
import tiktoken

_token_log: list[dict] = []

def count_tokens(text: str, model: str = "gpt-4o-mini") -> int:
    try:
        enc = tiktoken.encoding_for_model(model)
    except KeyError:
        enc = tiktoken.get_encoding("cl100k_base")
    return len(enc.encode(text))

def token_tracker(func: Callable) -> Callable:
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start

        prompt_text = ""
        if args:
            for arg in args:
                if isinstance(arg, (str, list)):
                    prompt_text += str(arg)
        if kwargs:
            for v in kwargs.values():
                if isinstance(v, (str, list)):
                    prompt_text += str(v)

        tokens_used = count_tokens(prompt_text)
        entry = {
            "function": func.__name__,
            "tokens_input": tokens_used,
            "elapsed_s": round(elapsed, 2),
            "timestamp": time.strftime("%H:%M:%S"),
        }
        _token_log.append(entry)

        if tokens_used > 2000:
            entry["warning"] = f"⚠️ {tokens_used} tokens usados — considera acortar el contexto"

        return result
    return wrapper

def get_token_stats() -> dict:
    if not _token_log:
        return {"total_calls": 0, "total_tokens": 0, "log": []}
    total = sum(e["tokens_input"] for e in _token_log)
    return {
        "total_calls": len(_token_log),
        "total_tokens": total,
        "avg_tokens": round(total / len(_token_log), 1),
        "log": _token_log[-10:],
    }

def estimate_cost_usd(tokens: int, model: str = "gpt-4o-mini") -> float:
    rates = {
        "gpt-4o-mini": 0.00015 / 1000,
        "gpt-4o": 0.005 / 1000,
        "gpt-5-mini": 0.00015 / 1000,
        "gpt-5.4": 0.005 / 1000,
    }
    rate = rates.get(model, 0.00015 / 1000)
    return round(tokens * rate, 6)
