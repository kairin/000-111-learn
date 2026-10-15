# The Anti-Magic Imperative

- Unit: `technical-architecture-u04`
- Source: [`sources/technical-architecture.md`](../../sources/technical-architecture.md)
- Characters: `1206:2575`
- Lines: `9:16`
- Purposes: claim-review, learning
- Excerpt SHA-256: `c5526889d5af3715d92d2f70c3b117811e5b84f6e17606283dea42e0fb29b9d5`

This unit preserves the complete source passage about The Anti-Magic Imperative.

## Claims

### `technical-architecture-u04-c01`

Every in-game interaction must balance mass, energy, momentum, and computational overhead.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: logical-analysis, calculation.

Evidence needed: Specify inputs, invariants, and failure conditions, then test the proposed design against them.

Assumptions:
- The game rules, resources, and system behavior follow the stated design. (`explicit`)

### `technical-architecture-u04-c02`

Reaction mass is finite.

Type: `empirical`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, independent-source.

Evidence needed: Find a primary source and an independent source that test the stated physical or historical assertion.

Assumptions:
- The stated physical setting, measurement conditions, and scope apply. (`explicit`)

### `technical-architecture-u04-c03`

Spacecraft acceleration and terminal velocity are bounded by propellant energy density ( \$\\eta\$ ), specific impulse ( \$I\_{sp}/c\$ ), and structural dry mass ratios.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `technical-architecture-u04-c04`

Work requires raw energy input, and waste heat generation requires explicit thermodynamic radiator structures, surface dissipation calculations, and material thermal limits.

Type: `empirical`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, independent-source.

Evidence needed: Find a primary source and an independent source that test the stated physical or historical assertion.

Assumptions:
- The stated physical setting, measurement conditions, and scope apply. (`explicit`)

## Learning goals

### `technical-architecture-u04-g01`: Claim analysis

Convert each prohibited game shortcut into a mass, energy, momentum, or latency constraint.

Prerequisites: Algebra, Source evaluation

Claim dependencies: `technical-architecture-u04-c01`, `technical-architecture-u04-c02`, `technical-architecture-u04-c03`, `technical-architecture-u04-c04`

## Exact source excerpt

##### The Anti-Magic Imperative

The engine strictly prohibits "magical" game mechanics, explicitly forbidding instantaneous resource generation, faster-than-light (FTL) shortcuts, arbitrary health/energy pools, or infinite reaction mass. Every in-game interaction must balance mass, energy, momentum, and computational overhead. Adherence to physical conservation laws forces player collectives to face realistic resource costs and engineering constraints:

* **Mass-Energy Equivalence and Fuel Budgeting:**  Reaction mass is finite. Spacecraft acceleration and terminal velocity are bounded by propellant energy density ( \$\\eta\$ ), specific impulse ( \$I\_{sp}/c\$ ), and structural dry mass ratios.  
* **Thermodynamic Realism:**  Work requires raw energy input, and waste heat generation requires explicit thermodynamic radiator structures, surface dissipation calculations, and material thermal limits.  
* **Deterministic Signal Delays:**  Spatial communication cannot bypass the speed of light ( \$c\$ ). Telemetry and command instructions propagate at  \$c\$ , fundamentally re-architecting command-and-control loops across interplanetary and interstellar distances.By enforcing these absolute physical ceilings, resource management ceases to be an arbitrary timer system and becomes a direct exercise in structural, thermodynamic, and systems engineering.
