# *Ascent Stage Abort Capability & Tsiolkovsky Derivation*

- Unit: `technical-architecture-u25`
- Source: [`sources/technical-architecture.md`](../../sources/technical-architecture.md)
- Characters: `16616:17625`
- Lines: `146:149`
- Purposes: claim-review, learning
- Excerpt SHA-256: `30ec97ca2e6a185fcb8de653b498ae96cdd5a83f5e46fb8f9a347132092f676c`

This unit preserves the complete source passage about *Ascent Stage Abort Capability & Tsiolkovsky Derivation*.

## Claims

### `technical-architecture-u25-c01`

In catastrophic descent scenarios, the pilot can trigger an Ascent Stage Abort.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: logical-analysis, calculation.

Evidence needed: Specify inputs, invariants, and failure conditions, then test the proposed design against them.

Assumptions:
- The game rules, resources, and system behavior follow the stated design. (`explicit`)

### `technical-architecture-u25-c02`

The ascent stage dry mass is 4,850 lbs with 5,187 lbs of fuel, operating at an engine exhaust velocity ( \$V\_e\$ ) of \$10{,}000\\text{ ft/s}\$ .

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: logical-analysis, calculation.

Evidence needed: Specify inputs, invariants, and failure conditions, then test the proposed design against them.

Assumptions:
- The game rules, resources, and system behavior follow the stated design. (`explicit`)

### `technical-architecture-u25-c03`

To achieve safe lunar orbit, the craft must attain \$5{,}512\\text{ ft/s}\$ orbital velocity.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: logical-analysis, calculation.

Evidence needed: Specify inputs, invariants, and failure conditions, then test the proposed design against them.

Assumptions:
- The game rules, resources, and system behavior follow the stated design. (`explicit`)

## Learning goals

### `technical-architecture-u25-g01`: Claim analysis

Calculate the abort delta-v margin with the displayed Tsiolkovsky equation and masses.

Prerequisites: Algebra, Source evaluation

Claim dependencies: `technical-architecture-u25-c01`, `technical-architecture-u25-c02`, `technical-architecture-u25-c03`

## Exact source excerpt

###### *Ascent Stage Abort Capability & Tsiolkovsky Derivation*

In catastrophic descent scenarios, the pilot can trigger an Ascent Stage Abort. The ascent stage dry mass is 4,850 lbs with 5,187 lbs of fuel, operating at an engine exhaust velocity ( \$V\_e\$ ) of  \$10{,}000\\text{ ft/s}\$ . To achieve safe lunar orbit, the craft must attain  \$5{,}512\\text{ ft/s}\$  orbital velocity. Applying Tsiolkovsky's rocket equation:\$\$\\Delta v \= V\_e \\ln\\left(\\frac{m\_0}{m\_1}\\right) \= V\_e \\ln\\left(\\frac{m\_{\\text{dry}} \+ m\_{\\text{fuel}}}{m\_{\\text{dry}}}\\right)\$\$\$\$\\Delta v \= 10{,}000 \\cdot \\ln\\left(\\frac{4{,}850 \+ 5{,}187}{4{,}850}\\right) \= 10{,}000 \\cdot \\ln(2.0695) \\approx 7{,}273\\text{ ft/s}\$\$Because the available  \$\\Delta v\$  ( \$7{,}273\\text{ ft/s}\$ ) comfortably exceeds the required insertion velocity ( \$5{,}512\\text{ ft/s}\$ ), the abort system guarantees orbital capture, proving mathematically to the player that aborting is a viable survival state.
