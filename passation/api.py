"""
Appel d'un agent RAGFlow via l'API compatible OpenAI.

Prérequis :
    pip install openai

Variables d'environnement :
    RAGFLOW_BASE_URL  ex: https://ragflow.example.com  (ou http://localhost)
    RAGFLOW_API_KEY   User settings > API > API KEY
    RAGFLOW_AGENT_ID  ID de l'agent (URL de l'agent dans RAGFlow, ou bouton "Embed")
"""

import os
import sys

from openai import OpenAI

BASE_URL = os.environ.get("RAGFLOW_BASE_URL", "http://localhost").rstrip("/")
API_KEY = os.environ["RAGFLOW_API_KEY"]
AGENT_ID = os.environ["RAGFLOW_AGENT_ID"]

# Le SDK OpenAI ajoute automatiquement /chat/completions
client = OpenAI(
    api_key=API_KEY,
    base_url=f"{BASE_URL}/api/v1/agents_openai/{AGENT_ID}",
)


def ask(question: str, history: list[dict] | None = None, stream: bool = True) -> str:
    messages = (history or []) + [{"role": "user", "content": question}]

    response = client.chat.completions.create(
        model="model",  # ignoré par RAGFlow, mais champ obligatoire
        messages=messages,
        stream=stream,
    )

    if not stream:
        return response.choices[0].message.content

    answer = ""
    for chunk in response:
        if not chunk.choices:
            continue
        delta = chunk.choices[0].delta.content or ""
        print(delta, end="", flush=True)
        answer += delta
    print()
    return answer


if __name__ == "__main__":
    question = " ".join(sys.argv[1:]) or "Bonjour, que peux-tu faire ?"
    ask(question)