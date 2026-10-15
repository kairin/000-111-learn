# Cosmic engineering source review

This review set contains five imported documents. It divides their content into claim-review units and learning units.

The source files keep their original bytes. The portal paths use a read-only FUSE mount, so the imported copies remain in this project.

All claim statuses are `unchecked`. A citation marker or a review statement does not verify a claim.

## Review indexes

- [Claim index](claims.md)
- [Learning areas](learning-areas.md)
- [Cross-document relationships](relationships.json)
- [Decomposition plan](PLAN.md)
- [Source provenance](manifest.json)
- [Unresolved imported markers](unresolved-markers.json)
- [Extracted image metadata](assets/manifest.json)

## Data layout

- `sources/` contains the unchanged imported documents.
- `catalog/` contains the content decisions and exact source ranges.
- `units/` contains generated review units with exact source excerpts.
- `assets/` contains the decoded PNG and its hash. The original data URI stays in its source file.
- `legacy-heading-scaffold/` contains the superseded blank heading split for traceability.

The ranges use zero-based Unicode code-point offsets. The end offset is not part of the range. Line numbers start at one and include both endpoints.

## Build and check

Run the builder after a catalog change:

```bash
python3 review/cosmic-engineering/tools/build.py
python3 review/cosmic-engineering/tools/build.py --check
```

The checker tests source hashes, full coverage, exact line ranges, claim links, learning dependencies, and relationships.
