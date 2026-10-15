# Simulating Complex Physics on Constrained Hardware: Apollo Lunar Lander Case Study

- Unit: `executive-briefing-u17`
- Source: [`sources/executive-briefing.md`](../../sources/executive-briefing.md)
- Characters: `20945:21256`
- Lines: `170:173`
- Purposes: claim-review, learning
- Excerpt SHA-256: `aa57d7999f05a7be354973203197f0e7d9ea7e2ce19dda32e82ed2598bc9de04`

This unit preserves the complete source passage about Simulating Complex Physics on Constrained Hardware: Apollo Lunar Lander Case Study.

Context: This passage gives source structure or transition context without a separately stated testable claim.

## Claims

### `executive-briefing-u17-c01`

The source uses an Apollo lunar-lander simulation to frame optimization under 1 MHz and 64 KB constraints.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: logical-analysis, primary-source.

Evidence needed: Recalculate the stated quantities or compare the stated physical premises with primary evidence.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

## Learning goals

### `executive-briefing-u17-g01`: Constrained simulation

Estimate the update budget of a 1 MHz, 64 KB target and identify which model operations exceed it.

Prerequisites: Computer architecture, Numerical methods

Claim dependencies: `executive-briefing-u17-c01`

## Exact source excerpt

##### Simulating Complex Physics on Constrained Hardware: Apollo Lunar Lander Case Study

Adapting real-time mathematical simulations to legacy 8-bit hardware (e.g., the MOS 6510 running at 1 MHz with 64KB RAM) highlights fundamental software engineering optimizations under severe memory and CPU constraints.
