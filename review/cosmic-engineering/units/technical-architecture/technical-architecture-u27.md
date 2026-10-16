# Telemetry Dynamics and Mission Control Signal Latency

- Unit: `technical-architecture-u27`
- Source: [`sources/technical-architecture.md`](../../sources/technical-architecture.md)
- Characters: `19666:20470`
- Lines: `178:181`
- Purposes: claim-review, learning
- Excerpt SHA-256: `d5520c59313cbc86744aaaf7327e7d778ac0e854f2e533ee48d124c3ff4cc73b`

This unit preserves the complete source passage about Telemetry Dynamics and Mission Control Signal Latency.

## Claims

### `technical-architecture-u27-c01`

The telemetry model assigns 1.3 s to Earth-to-Moon propagation, 4.0 s to ground analysis, and 1.3 s to the return transmission.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation.

Evidence needed: Add the three stated delay components and compare the result with 6.6 s.

Assumptions:
- The fixed propagation and processing delays apply to each command cycle. (`explicit`)

### `technical-architecture-u27-c02`

The three delay components give a total command latency of 6.6 s.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation.

Evidence needed: Verify 1.3 + 4.0 + 1.3 = 6.6 seconds.

Assumptions:
- The command follows the stated round-trip sequence. (`explicit`)

### `technical-architecture-u27-c03`

The design requires players to calculate burn vectors in advance because guidance arrives after the modeled delay.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: logical-analysis, reproduction.

Evidence needed: Test whether the interface exposes enough state to predict a safe command 6.6 seconds ahead.

Assumptions:
- The telemetry delay is active during manual piloting. (`explicit`)

## Learning goals

### `technical-architecture-u27-g01`: Lunar flight simulation

Build a command timeline from the three delay components, then calculate a burn command that accounts for the 6.6-second latency.

Prerequisites: Kinematics, Numerical integration

Claim dependencies: `technical-architecture-u27-c01`, `technical-architecture-u27-c02`, `technical-architecture-u27-c03`

## Exact source excerpt

##### Telemetry Dynamics and Mission Control Signal Latency

During manual lunar descent, telemetry sent to ground control and returned to the cockpit incurs light-speed propagation and ground analysis delays:\$\$\\text{Earth-to-Moon Signal Time} \= 1.3\\text{ seconds}\$\$   \$\$\\text{Ground Control Analysis Time} \= 4.0\\text{ seconds}\$\$   \$\$\\text{Moon-to-Earth Signal Time} \= 1.3\\text{ seconds}\$\$   \$\$\\mathbf{\\text{Total Telemetry Latency Round-Trip}} \= \\mathbf{6.6\\text{ seconds}}\$\$Because guidance messages arrive 6.6 seconds after telemetry measurement, pilots cannot execute real-time reactive steering based on Mission Control commands. Instead, players must perform predictive piloting—calculating burn vectors seconds in advance to avoid surface impact or fuel starvation.
