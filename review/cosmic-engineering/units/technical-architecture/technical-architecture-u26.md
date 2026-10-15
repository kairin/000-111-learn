# *Emergency Control Dynamics & 10 FPS Game Loop State Logic*

- Unit: `technical-architecture-u26`
- Source: [`sources/technical-architecture.md`](../../sources/technical-architecture.md)
- Characters: `17625:19666`
- Lines: `150:177`
- Purposes: claim-review, learning
- Excerpt SHA-256: `65e7a2c7f1771ead44ff0bc43d6d4a27281569c2df1282f4fb8d7258fcf7f890`

This unit preserves the complete source passage about *Emergency Control Dynamics & 10 FPS Game Loop State Logic*.

## Claims

### `technical-architecture-u26-c01`

The real-time game loop operates at 10 FPS ( \$0.1\\text{s}\$ tick intervals \$h \= 0.1\$ ).

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `technical-architecture-u26-c02`

When downward velocity \$v\_y \\ge 400\\text{ ft/s}\$ , vertical engine thrust increases at \$10\\text{ lbs/s}\$ per \$0.1\\text{s}\$ tick ( \$100\\text{ lbs/s}^2\$ ), enabling rapid thrust buildup.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `technical-architecture-u26-c03`

When vertical thrust exceeds \$30\\text{ lbs/s}\$ , thrust decreases at \$5\\text{ lbs/s}\$ per \$0.1\\text{s}\$ tick ( \$50\\text{ lbs/s}^2\$ ) to allow power reduction during touchdown.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

## Learning goals

### `technical-architecture-u26-g01`: Claim analysis

Implement the stated high-speed and high-thrust branches in a 10 FPS control loop.

Prerequisites: Algebra, Source evaluation

Claim dependencies: `technical-architecture-u26-c01`, `technical-architecture-u26-c02`, `technical-architecture-u26-c03`

## Exact source excerpt

###### *Emergency Control Dynamics & 10 FPS Game Loop State Logic*

The real-time game loop operates at 10 FPS ( \$0.1\\text{s}\$  tick intervals  \$h \= 0.1\$ ). During each tick, hardware inputs are polled, thruster state variables updated, vehicle mass recalculated, and Euler state integration applied.  
       \[ 0.1s Tick Starts: Poll Control Port / Hardware Input \]  
                                  |  
               \+------------------+------------------+  
               |                                     |  
    v\_y \>= 400 ft/s?                      Thrust \> 30 lbs/s?  
    ├── YES: High-Speed Emergency Mode    ├── YES: High-Thrust Reduction Mode  
    │   (Thrust \+10 lbs/s per tick)       │   (Thrust \-5 lbs/s per tick)  
    └── NO: Standard Mode                 └── NO: Standard Mode  
        (Thrust \+1 lb/s per tick)             (Thrust \-1 lb/s per tick)  
               |                                     |  
               \+------------------+------------------+  
                                  |  
       \[ Mass Update: m(t \+ dt) \= m(t) \- (Thrust\_y \+ |Thrust\_x|) \* dt \]  
                                  |  
       \[ Euler Integration Step: \]  
       \[ v\_y(t \+ dt) \= v\_y(t) \+ dt \* (g\_lunar \- Thrust\_y / m(t)) \]  
       \[ v\_x(t \+ dt) \= v\_x(t) \+ dt \* (Thrust\_x / m(t)) \]  
       \[ y(t \+ dt)   \= y(t)   \- dt \* v\_y(t \+ dt) \]  
       \[ x(t \+ dt)   \= x(t)   \+ dt \* v\_x(t \+ dt) \]  
                                  |  
       \[ Render Display Buffer & Update UI Metrics \]

* **High-Speed Emergency Mode:**  When downward velocity  \$v\_y \\ge 400\\text{ ft/s}\$ , vertical engine thrust increases at  \$10\\text{ lbs/s}\$  per  \$0.1\\text{s}\$  tick ( \$100\\text{ lbs/s}^2\$ ), enabling rapid thrust buildup.  
* **High-Thrust Reduction Mode:**  When vertical thrust exceeds  \$30\\text{ lbs/s}\$ , thrust decreases at  \$5\\text{ lbs/s}\$  per  \$0.1\\text{s}\$  tick ( \$50\\text{ lbs/s}^2\$ ) to allow power reduction during touchdown.
