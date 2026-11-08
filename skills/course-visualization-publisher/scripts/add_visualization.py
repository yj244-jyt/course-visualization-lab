#!/usr/bin/env python3
"""Add or replace one Course Visualization Lab catalog entry."""

from __future__ import annotations

import argparse
import json
import re
from datetime import date
from pathlib import Path


SLUG_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--catalog", type=Path, required=True)
    parser.add_argument("--slug", required=True)
    parser.add_argument("--title", required=True)
    parser.add_argument("--description", required=True)
    parser.add_argument("--course", required=True)
    parser.add_argument("--topic", action="append", dest="topics", required=True)
    parser.add_argument("--created", default=date.today().isoformat())
    return parser.parse_args()


def validate(args: argparse.Namespace) -> None:
    if not SLUG_PATTERN.fullmatch(args.slug):
        raise SystemExit("slug must use lowercase ASCII kebab-case")
    try:
        date.fromisoformat(args.created)
    except ValueError as exc:
        raise SystemExit("created must use YYYY-MM-DD") from exc
    if any(not value.strip() for value in [args.title, args.description, args.course, *args.topics]):
        raise SystemExit("title, description, course, and topics must be non-empty")


def main() -> None:
    args = parse_args()
    validate(args)
    entries = json.loads(args.catalog.read_text(encoding="utf-8")) if args.catalog.exists() else []
    if not isinstance(entries, list):
        raise SystemExit("catalog root must be a JSON array")

    entry = {
        "slug": args.slug,
        "title": args.title.strip(),
        "description": args.description.strip(),
        "course": args.course.strip(),
        "topics": [topic.strip() for topic in args.topics],
        "path": f"visualizations/{args.slug}/",
        "created": args.created,
    }

    entries = [item for item in entries if item.get("slug") != args.slug]
    entries.append(entry)
    entries.sort(key=lambda item: (item.get("created", ""), item.get("title", "")), reverse=True)
    args.catalog.parent.mkdir(parents=True, exist_ok=True)
    args.catalog.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Updated {args.catalog} with {args.slug}")


if __name__ == "__main__":
    main()
