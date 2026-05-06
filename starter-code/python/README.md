# Todo App — Python Starter

The starter code for **Labs 00–04** of the GitHub Copilot Katas, in Python.

## Requirements

- Python 3.10+
- [`uv`](https://docs.astral.sh/uv/) (recommended) — or use `python -m venv` + `pip`

## Run

With `uv`:

```bash
cd starter-code/python
uv venv
uv pip install -r requirements.txt
uv run src/main.py   # serves http://localhost:3000
```

Without `uv`:

```bash
cd starter-code/python
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python src/main.py
```

Then open <http://localhost:3000> in your browser.

## What's here

```
python/
├── src/
│   ├── main.py          # Flask app (entry point)
│   ├── todo.py          # empty — you'll implement Todo in Lab 01
│   └── todo_list.py     # empty — you'll implement TodoList in Lab 01
└── requirements.txt
```

## Tests

```bash
pytest                   # you'll add tests in Lab 03
```

Head back to [Lab 00](../../labs/00-getting-started.md) to begin.
