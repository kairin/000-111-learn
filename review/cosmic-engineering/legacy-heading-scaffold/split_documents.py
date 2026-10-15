#!/usr/bin/env python3
"""Generate topic parts and review worksheets from preserved source files."""
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
AREAS = {
    'numerical-methods': ('Numerical methods', 'integrat|euler|runge|hermite|symplectic|numerical|kernel|n-body|regularization'),
    'assembly-fortran': ('Assembly and Fortran', 'assembly|fortran|simd|vector|memory|compiler|interop|register'),
    'simulation-design': ('Simulation design', 'game|simulation|architecture|handoff|telemetry|control|learning|pedagog'),
    'relativity-propulsion': ('Relativity and propulsion', 'relativ|propulsion|rocket|sail|ramjet|acceleration|fuel'),
    'space-environment': ('Space environment', 'dust|medium|shield|ablation|collision|hazard|bremsstrahlung'),
    'cosmology-expansion': ('Cosmology and expansion', 'fermi|galax|cosmolog|replicat|colon|dyson|mercury|swarm|expansion|paradox'),
    'exotic-physics': ('Exotic physics', 'black hole|kugelblitz|hawking|warp|energy condition|supersymmetry|einstein|adm|bssn|tetrad'),
    'evidence-methods': ('Evidence and research methods', 'source|cited|review|assessment|reproducib|uncertainty|publication|test|unsupported'),
}


def boundaries(text):
    """Find headings outside code fences, including the flattened guide."""
    points = {0}
    fenced = False
    offset = 0
    for line in text.splitlines(keepends=True):
        if re.match(r'^\s*(```|~~~)', line):
            fenced = not fenced
        if not fenced and re.match(r'^#{1,6}\s', line):
            points.add(offset)
        offset += len(line)
    points.update(m.start() for m in re.finditer(r'(?:\\#){4,6}\s', text))
    return sorted(points) + [len(text)]


def main():
    records = []
    documents = []
    index = ['# Cosmic engineering research', '',
             'Five imported documents supply topic parts for claim review and candidate learning areas.', '',
             'All claims remain unchecked. The imported review also needs an independent evidence check.', '',
             'Source files retain their original bytes. The names prevent collisions with older research files.', '',
             'Parts retain the source text. Character ranges use zero-based offsets and exclude the end position.', '',
             'The flattened guide uses escaped heading markers. Its parts retain those markers.', '',
             'Learning areas are proposals. They do not change the current lessons or game plan.', '',
             '## Topic parts', '', '| Part | Source topic | Learning areas |', '|---|---|---|']
    for source in sorted((ROOT / 'sources').glob('*.md')):
        text = source.read_bytes().decode('utf-8')
        points = boundaries(text)
        chunks = [text[a:b] for a, b in zip(points, points[1:])]
        assert ''.join(chunks) == text
        documents.append({'file': str(source.relative_to(ROOT)), 'sha256': hashlib.sha256(source.read_bytes()).hexdigest(), 'parts': len(chunks)})
        for number, (start, end, chunk) in enumerate(zip(points, points[1:], chunks), 1):
            part_id = f'{source.stem}-{number:02}'
            # Long inline headings contain body text. Use a short topic excerpt.
            title = re.sub(r'^(?:#|\\#)+\s*', '', chunk.strip().splitlines()[0])
            title = re.sub(r'!\[.*?\]\[.*?\]', '', title).replace('**', '').replace('\\.', '.')
            title = re.sub(r'[\[\]()`<>|]', '', title)[:100].strip()
            context = title.lower()
            areas = [key for key, (_, pattern) in AREAS.items() if re.search(pattern, context)] or ['evidence-methods']
            part = ROOT / 'parts' / f'{part_id}.md'
            part.parent.mkdir(exist_ok=True)
            part.write_text(chunk, encoding='utf-8')
            worksheet = ROOT / 'worksheets' / f'{part_id}.md'
            worksheet.parent.mkdir(exist_ok=True)
            if not worksheet.exists():
                worksheet.write_text(f'''# Claim review: {part_id}

Status: unchecked

[Source part](../parts/{part_id}.md)

Record one testable claim per row. Separate facts, estimates, proposals, and value judgments.

| Claim | Type | Source location | Primary evidence | Calculation or test | Result | Limits |
|---|---|---|---|---|---|---|
| | | | | | unchecked | |

A citation in a source document does not establish a claim.
Record inaccessible citations and missing context in the limits column.

## Learning proposal

- Prerequisites:
- Learning goal:
- Assembly exercise:
- Fortran exercise:
- Expected result:
- Evidence needed before lesson use:
''', encoding='utf-8')
            record = {'id': part_id, 'source': str(source.relative_to(ROOT)), 'title_excerpt': title,
                      'start_char': start, 'end_char': end, 'start_line': text.count('\n', 0, start)+1,
                      'end_line': text.count('\n', 0, max(start, end-1))+1,
                      'part': str(part.relative_to(ROOT)), 'worksheet': str(worksheet.relative_to(ROOT)),
                      'candidate_learning_areas': areas}
            records.append(record)
            index.append(f'| [{part_id}](worksheets/{part_id}.md) | [{title.replace("|", "/")}](parts/{part_id}.md) | {", ".join(AREAS[a][0] for a in areas)} |')
    index += ['', '## Candidate learning areas', '', '[Learning area index](learning-areas.md)', '',
              '## Regenerate the parts', '', '`python3 review/cosmic-engineering/split_documents.py`', '',
              'The script replaces parts and indexes. It preserves existing worksheets.', '']
    (ROOT / 'README.md').write_text('\n'.join(index))
    (ROOT / 'manifest.json').write_text(json.dumps({'documents': documents, 'parts': records}, indent=2)+'\n')
    learning = ['# Candidate learning areas', '', 'Topic links suggest lesson material. Examine each claim before lesson use.', '',
                'Each worksheet has fields for prerequisites, goals, exercises, and expected results.', '']
    for key, (name, _) in AREAS.items():
        learning += [f'## {name}', '']
        learning += [f'- [{r["id"]}](worksheets/{r["id"]}.md)' for r in records if key in r['candidate_learning_areas']]
        learning += ['']
    (ROOT / 'learning-areas.md').write_text('\n'.join(learning))
    print(f'{len(documents)} documents, {len(records)} parts. Exact source coverage checked.')


if __name__ == '__main__':
    main()
