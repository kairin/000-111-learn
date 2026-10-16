#!/usr/bin/env python3
"""Validate catalogs and build the cosmic-engineering review set."""

from __future__ import annotations

import argparse
import base64
import hashlib
import json
import re
import shutil
import struct
from collections import defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "catalog"
UNITS = ROOT / "units"
ASSETS = ROOT / "assets"


def read_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def line_at(text: str, offset: int) -> int:
    return text.count("\n", 0, offset) + 1


def expected_lines(text: str, start: int, end: int) -> tuple[int, int]:
    return line_at(text, start), line_at(text, end - 1)


def check_range(label: str, item: dict, text: str, outer: dict | None = None) -> None:
    start = item["start_char"]
    end = item["end_char"]
    if not 0 <= start < end <= len(text):
        raise ValueError(f"{label}: invalid character range {start}:{end}")
    if outer and not outer["start_char"] <= start < end <= outer["end_char"]:
        raise ValueError(f"{label}: range is outside its unit")
    lines = expected_lines(text, start, end)
    recorded = (item["start_line"], item["end_line"])
    if lines != recorded:
        raise ValueError(f"{label}: line range {recorded} must be {lines}")


def catalog_paths() -> list[Path]:
    return sorted(path for path in CATALOG.glob("*.json") if not path.name.startswith("_") and path.name != "schema.json")


def load_and_validate() -> tuple[list[dict], dict[str, dict], dict[str, dict], dict[str, dict]]:
    manifest = read_json(ROOT / "manifest.json")
    documents = {item["id"]: item for item in manifest["documents"]}
    catalogs: list[dict] = []
    units: dict[str, dict] = {}
    claims: dict[str, dict] = {}
    goals: dict[str, dict] = {}

    actual_ids = {path.stem for path in catalog_paths()}
    if actual_ids != set(documents):
        raise ValueError(f"catalog IDs {sorted(actual_ids)} do not match manifest IDs {sorted(documents)}")

    for path in catalog_paths():
        catalog = read_json(path)
        source_id = catalog["source_id"]
        if source_id != path.stem:
            raise ValueError(f"{path}: source_id does not match the file name")
        if catalog["source"] != documents[source_id]["imported_file"]:
            raise ValueError(f"{path}: source path does not match the manifest")
        source_path = ROOT / catalog["source"]
        source_bytes = source_path.read_bytes()
        text = source_bytes.decode("utf-8")
        document = documents[source_id]
        if sha256_bytes(source_bytes) != document["sha256"]:
            raise ValueError(f"{source_path}: SHA-256 mismatch")
        if len(source_bytes) != document["bytes"] or len(text) != document["characters"]:
            raise ValueError(f"{source_path}: size mismatch")

        cursor = 0
        for unit in catalog["units"]:
            unit_id = unit["id"]
            if unit_id in units:
                raise ValueError(f"duplicate unit ID: {unit_id}")
            source_range = unit["source_range"]
            check_range(unit_id, source_range, text)
            if source_range["start_char"] != cursor:
                raise ValueError(f"{unit_id}: gap or overlap at character {cursor}")
            cursor = source_range["end_char"]
            purposes = set(unit["purposes"])
            if "claim-review" in purposes and not unit["claims"]:
                raise ValueError(f"{unit_id}: claim-review unit has no claims")
            if "learning" in purposes and not unit["learning_goals"]:
                raise ValueError(f"{unit_id}: learning unit has no learning goals")
            if "context" in purposes and not unit.get("context_reason"):
                raise ValueError(f"{unit_id}: context unit has no context reason")
            if purposes == {"context"} and (unit["claims"] or unit["learning_goals"]):
                raise ValueError(f"{unit_id}: context-only unit has claims or learning goals")
            if purposes == {"context"} and source_range["end_char"] - source_range["start_char"] > 400 and unit_id != "astrophysics-kernels-u17":
                raise ValueError(f"{unit_id}: context-only unit is too long for a structural heading")
            unit["_source_id"] = source_id
            unit["_source"] = catalog["source"]
            units[unit_id] = unit

            for claim in unit["claims"]:
                claim_id = claim["id"]
                if claim_id in claims:
                    raise ValueError(f"duplicate claim ID: {claim_id}")
                if claim["proposition"].startswith("The source states:"):
                    raise ValueError(f"{claim_id}: rewrite the excerpt as an independent proposition")
                if claim["proposition"].startswith("The document claims that"):
                    raise ValueError(f"{claim_id}: rewrite the excerpt as an independent proposition")
                if len(claim["proposition"]) > 600:
                    raise ValueError(f"{claim_id}: proposition is too broad ({len(claim['proposition'])} characters)")
                if claim["proposition"].rstrip().endswith((":", "\\")):
                    raise ValueError(f"{claim_id}: proposition ends as an incomplete fragment")
                if claim["verification"]["evidence_needed"] == "Trace the exact source statement to a versioned primary source or reproduce the stated result.":
                    raise ValueError(f"{claim_id}: replace the generic evidence request")
                check_range(claim_id, claim["source_range"], text, source_range)
                if claim["status"] != "unchecked":
                    raise ValueError(f"{claim_id}: only unchecked status is permitted")
                for citation in claim["citation_markers"]:
                    check_range(f"{claim_id} citation", citation["source_range"], text, source_range)
                    citation_text = text[citation["source_range"]["start_char"]:citation["source_range"]["end_char"]]
                    if citation_text != citation["marker"]:
                        raise ValueError(f"{claim_id}: citation marker does not match its exact source range")
                claim["_unit_id"] = unit_id
                claim["_source_id"] = source_id
                claims[claim_id] = claim

            for goal in unit["learning_goals"]:
                goal_id = goal["id"]
                if goal_id in goals:
                    raise ValueError(f"duplicate learning-goal ID: {goal_id}")
                if goal["goal"].startswith("Explain the evidence, model conditions, and limits for"):
                    raise ValueError(f"{goal_id}: replace the generated learning-goal template")
                generic_goal_starts = (
                    "State the model inputs, calculate the claimed output",
                    "Compute a simulation step from the stated mass",
                    "Map a numerical kernel to its language boundary",
                    "Use the rocket equation and dust model",
                    "Extract the measurable assertion in",
                    "Analyze the specific claim set in",
                    "Analyze the assumptions and validation needs for",
                    "Identify the quantitative inputs and testable conclusion in",
                )
                if goal["goal"].startswith(generic_goal_starts):
                    raise ValueError(f"{goal_id}: replace the generic learning-goal template")
                goal["_unit_id"] = unit_id
                goal["_source_id"] = source_id
                goals[goal_id] = goal

        if cursor != len(text):
            raise ValueError(f"{source_id}: catalog stops at {cursor} of {len(text)} characters")
        catalogs.append(catalog)

    for goal_id, goal in goals.items():
        for claim_id in goal["claim_dependencies"]:
            if claim_id not in claims:
                raise ValueError(f"{goal_id}: unknown claim dependency {claim_id}")
    for claim_id, claim in claims.items():
        for target in claim.get("target_claims", []):
            if target not in claims:
                raise ValueError(f"{claim_id}: unknown target claim {target}")
    return catalogs, units, claims, goals


def extract_image() -> dict:
    text = (ROOT / "sources" / "astrophysics-kernels.md").read_text(encoding="utf-8")
    match = re.search(r"^\[image1\]: <data:image/png;base64,([A-Za-z0-9+/=]+)>$", text, re.MULTILINE)
    if not match:
        raise ValueError("the image1 PNG data URI was not found")
    data = base64.b64decode(match.group(1), validate=True)
    if not data.startswith(b"\x89PNG\r\n\x1a\n"):
        raise ValueError("image1 is not a PNG file")
    width, height = struct.unpack(">II", data[16:24])
    ASSETS.mkdir(parents=True, exist_ok=True)
    output = ASSETS / "phantom-grape.png"
    output.write_bytes(data)
    info = {
        "id": "image1",
        "source": "sources/astrophysics-kernels.md",
        "source_reference": "![Image][image1]",
        "source_definition_preserved": True,
        "file": "assets/phantom-grape.png",
        "media_type": "image/png",
        "width": width,
        "height": height,
        "bytes": len(data),
        "sha256": sha256_bytes(data),
        "description": "A labeled routing diagram connects spatial decomposition, three numerical solvers, an array buffer, AVX-512 lanes, reciprocal square root, and a force-and-jerk accumulator.",
        "evidence_status": "The diagram repeats source claims. It is not independent evidence.",
    }
    (ASSETS / "manifest.json").write_text(json.dumps({"assets": [info]}, indent=2) + "\n", encoding="utf-8")
    return info


def record_opaque_markers() -> dict:
    pattern = re.compile(r"\\\[span\\_[0-9]+\\\]\((?:start|end)\\_span\)")
    records: list[dict] = []
    for source_path in sorted((ROOT / "sources").glob("*.md")):
        text = source_path.read_text(encoding="utf-8")
        for match in pattern.finditer(text):
            start = match.start()
            end = match.end()
            records.append({
                "source": str(source_path.relative_to(ROOT)),
                "marker": match.group(0),
                "start_char": start,
                "end_char": end,
                "start_line": line_at(text, start),
                "end_line": line_at(text, end - 1),
                "resolution": "unresolved-opaque-token",
            })
    ledger = {
        "description": "These imported tokens have no local citation target. The source bytes remain unchanged.",
        "occurrences": len(records),
        "unique_markers": len({item["marker"] for item in records}),
        "markers": records,
    }
    (ROOT / "unresolved-markers.json").write_text(json.dumps(ledger, indent=2) + "\n", encoding="utf-8")
    return ledger


def safe_heading(text: str) -> str:
    return text.replace("\n", " ").strip()


def render_units(catalogs: list[dict]) -> None:
    if UNITS.exists():
        shutil.rmtree(UNITS)
    UNITS.mkdir(parents=True)
    for catalog in catalogs:
        source_id = catalog["source_id"]
        source_text = (ROOT / catalog["source"]).read_text(encoding="utf-8")
        source_dir = UNITS / source_id
        source_dir.mkdir()
        for unit in catalog["units"]:
            source_range = unit["source_range"]
            excerpt = source_text[source_range["start_char"]:source_range["end_char"]]
            lines = [
                f"# {safe_heading(unit['title'])}",
                "",
                f"- Unit: `{unit['id']}`",
                f"- Source: [`{catalog['source']}`](../../{catalog['source']})",
                f"- Characters: `{source_range['start_char']}:{source_range['end_char']}`",
                f"- Lines: `{source_range['start_line']}:{source_range['end_line']}`",
                f"- Purposes: {', '.join(unit['purposes'])}",
                f"- Excerpt SHA-256: `{sha256_bytes(excerpt.encode('utf-8'))}`",
                "",
                unit["summary"],
            ]
            if unit.get("context_reason"):
                lines.extend(["", f"Context: {unit['context_reason']}"])
            if "![Image][image1]" in excerpt:
                lines.extend(["", "## Rendered source image", "", "![Imported Phantom-GRAPE pipeline diagram](../../assets/phantom-grape.png)", "", "The source data URI remains unchanged in the exact excerpt and source file."])
            if unit["claims"]:
                lines.extend(["", "## Claims"])
                for claim in unit["claims"]:
                    methods = ", ".join(claim["verification"]["methods"])
                    lines.extend([
                        "",
                        f"### `{claim['id']}`",
                        "",
                        claim["proposition"],
                        "",
                        f"Type: `{claim['type']}`. Status: `{claim['status']}`. Priority: `{claim['verification']['priority']}`.",
                        "",
                        f"Review methods: {methods}.",
                        "",
                        f"Evidence needed: {claim['verification']['evidence_needed']}",
                    ])
                    if claim["assumptions"]:
                        lines.extend(["", "Assumptions:"])
                        lines.extend(f"- {item['text']} (`{item['basis']}`)" for item in claim["assumptions"])
                    if claim["citation_markers"]:
                        lines.extend(["", "Citation markers:"])
                        lines.extend(f"- `{item['marker']}`: `{item['resolution']}`" for item in claim["citation_markers"])
                    if claim.get("target_claims"):
                        lines.extend(["", "Review targets:"])
                        lines.extend(f"- `{target}`" for target in claim["target_claims"])
            if unit["learning_goals"]:
                lines.extend(["", "## Learning goals"])
                for goal in unit["learning_goals"]:
                    lines.extend([
                        "",
                        f"### `{goal['id']}`: {goal['area']}",
                        "",
                        goal["goal"],
                        "",
                        "Prerequisites: " + (", ".join(goal["prerequisites"]) or "None stated."),
                        "",
                        "Claim dependencies: " + (", ".join(f"`{item}`" for item in goal["claim_dependencies"]) or "None."),
                    ])
            lines.extend(["", "## Exact source excerpt", "", excerpt])
            output = source_dir / f"{unit['id']}.md"
            output.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")


def render_claims(claims: dict[str, dict]) -> None:
    lines = [
        "# Claim index",
        "",
        "Every claim has an unchecked status. A source citation does not verify a claim.",
    ]
    by_source: dict[str, list[dict]] = defaultdict(list)
    for claim in claims.values():
        by_source[claim["_source_id"]].append(claim)
    for source_id in sorted(by_source):
        lines.extend(["", f"## {source_id}"])
        for claim in by_source[source_id]:
            unit_id = claim["_unit_id"]
            lines.extend([
                "",
                f"### [`{claim['id']}`](units/{source_id}/{unit_id}.md#{claim['id']})",
                "",
                claim["proposition"],
                "",
                f"Type: `{claim['type']}`. Priority: `{claim['verification']['priority']}`. Methods: {', '.join(claim['verification']['methods'])}.",
            ])
            if claim.get("target_claims"):
                lines.append("Targets: " + ", ".join(f"`{item}`" for item in claim["target_claims"]) + ".")
    (ROOT / "claims.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def render_learning(goals: dict[str, dict]) -> None:
    lines = [
        "# Learning areas",
        "",
        "These goals come from a content review. Claim dependencies remain unchecked until a separate evidence review completes them.",
    ]
    by_area: dict[str, list[dict]] = defaultdict(list)
    for goal in goals.values():
        by_area[goal["area"]].append(goal)
    for area in sorted(by_area):
        lines.extend(["", f"## {area}"])
        for goal in by_area[area]:
            source_id = goal["_source_id"]
            unit_id = goal["_unit_id"]
            lines.extend([
                "",
                f"### [`{goal['id']}`](units/{source_id}/{unit_id}.md#{goal['id']})",
                "",
                goal["goal"],
                "",
                "Prerequisites: " + (", ".join(goal["prerequisites"]) or "None stated."),
                "",
                "Claim dependencies: " + (", ".join(f"`{item}`" for item in goal["claim_dependencies"]) or "None."),
            ])
    (ROOT / "learning-areas.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def validate_relationships(claims: dict[str, dict]) -> None:
    path = ROOT / "relationships.json"
    relationships = read_json(path)["relationships"]
    seen: set[str] = set()
    valid_types = {"duplicate", "agreement", "qualified-overlap", "critique"}
    for item in relationships:
        if item["id"] in seen:
            raise ValueError(f"duplicate relationship ID: {item['id']}")
        seen.add(item["id"])
        if item["type"] not in valid_types:
            raise ValueError(f"{item['id']}: invalid relationship type")
        if len(item["claims"]) < 2 or any(claim_id not in claims for claim_id in item["claims"]):
            raise ValueError(f"{item['id']}: relationship has an unknown claim")
        if not item["basis"].strip():
            raise ValueError(f"{item['id']}: relationship has no basis")


def write_stats(catalogs: list[dict], claims: dict[str, dict], goals: dict[str, dict], asset: dict, markers: dict) -> None:
    stats = {
        "documents": len(catalogs),
        "units": sum(len(item["units"]) for item in catalogs),
        "claims": len(claims),
        "learning_goals": len(goals),
        "unresolved_marker_occurrences": markers["occurrences"],
        "unresolved_unique_markers": markers["unique_markers"],
        "asset_sha256": asset["sha256"],
    }
    (ROOT / "build-stats.json").write_text(json.dumps(stats, indent=2) + "\n", encoding="utf-8")


def build(check_only: bool) -> None:
    catalogs, _units, claims, goals = load_and_validate()
    validate_relationships(claims)
    if check_only:
        print(f"OK: {len(catalogs)} sources, {sum(len(c['units']) for c in catalogs)} units, {len(claims)} claims, {len(goals)} learning goals")
        return
    asset = extract_image()
    markers = record_opaque_markers()
    render_units(catalogs)
    render_claims(claims)
    render_learning(goals)
    write_stats(catalogs, claims, goals, asset, markers)
    print(f"Built {len(catalogs)} sources, {sum(len(c['units']) for c in catalogs)} units, {len(claims)} claims, {len(goals)} learning goals")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="validate inputs without writing generated files")
    args = parser.parse_args()
    build(args.check)
