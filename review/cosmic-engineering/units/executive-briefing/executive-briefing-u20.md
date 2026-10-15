# *Mission Control Telemetry and Real-Time Controls*

- Unit: `executive-briefing-u20`
- Source: [`sources/executive-briefing.md`](../../sources/executive-briefing.md)
- Characters: `23071:24730`
- Lines: `187:209`
- Purposes: claim-review, learning
- Excerpt SHA-256: `cb5fe4e4fe6ba2de7456c5494ebc75790be0dc6be1b1bcbfae38f05992fdd433`

This unit preserves the complete source passage about *Mission Control Telemetry and Real-Time Controls*.

## Claims

### `executive-briefing-u20-c01`

The telemetry delay is 6.6 s: 1.3 s outbound, 4.0 s for ground analysis, and 1.3 s for the return.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation.

Evidence needed: Add the components and confirm the displayed total.

Assumptions:
- The command follows the displayed telemetry chain. (`explicit`)

### `executive-briefing-u20-c02`

At descent speeds of at least 400 ft/s, the control mode raises thrust by 10 lbs/s per frame instead of 1 lb/s.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: reproduction.

Evidence needed: Implement the threshold and compare one emergency update with one standard update.

Assumptions:
- The controller uses the stated frame interval and thrust units. (`explicit`)

### `executive-briefing-u20-c03`

When thrust exceeds 30 lbs/s, the control mode reduces it by 5 lbs/s per frame.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: reproduction.

Evidence needed: Test the branch immediately below, at, and above the threshold.

Assumptions:
- The controller interprets the strict greater-than threshold literally. (`explicit`)

### `executive-briefing-u20-c04`

The display design overwrites stale figures through zero-page cursor positioning with POKE 211, POKE 214, and SYS 58640.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: reproduction.

Evidence needed: Run the update on the named target and verify that it overwrites the intended cells without a full-screen redraw.

Assumptions:
- The stated hardware map and landing rules apply. (`explicit`)

### `executive-briefing-u20-c05`

A safe touchdown requires both vertical and horizontal velocity to be no more than 5 ft/s.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: reproduction.

Evidence needed: Test landing outcomes at, below, and above 5 ft/s on both axes.

Assumptions:
- The stated hardware map and landing rules apply. (`explicit`)

## Learning goals

### `executive-briefing-u20-g01`: Lunar flight simulation

Calculate the telemetry delay and test both thrust-control thresholds at their boundary values.

Prerequisites: Kinematics, Numerical integration

Claim dependencies: `executive-briefing-u20-c01`, `executive-briefing-u20-c02`, `executive-briefing-u20-c03`, `executive-briefing-u20-c04`, `executive-briefing-u20-c05`

## Exact source excerpt

###### *Mission Control Telemetry and Real-Time Controls*

                        Apollo Telemetry Signal Delay Chain  
    
  \[Lunar Module Transmits Telemetry\]  
                 |  
                 v (1.3 Seconds \- Speed of Light)  
  \[Mission Control Receives Telemetry\]  
                 |  
                 v (4.0 Seconds \- Ground Control Analysis)  
  \[Correction Guidance Generated\]  
                 |  
                 v (1.3 Seconds \- Speed of Light)  
  \[Lunar Module Receives Message Display\]  
    
  Total Latency \= 1.3s \+ 4.0s \+ 1.3s \= 6.6 Seconds Total Delay

* **Signal Delay Implementation** : To replicate authentic astronaut-ground communications, telemetry processing incorporates a fixed 6.6-second round-trip latency ( \$1.3\\text{ s}\$  Earth-Moon transit \+  \$4.0\\text{ s}\$  Ground Control processing \+  \$1.3\\text{ s}\$  Moon-Earth return).  
* **Control Feedback Modes** :  
* *High-Speed Emergency Mode* : When descent velocity reaches  \$\\ge 400\\text{ ft/s}\$ , vertical thrust increments ramp up at  \$10\\text{ lbs/s}\$  per frame (compared to  \$1\\text{ lb/s}\$  standard).  
* *High-Thrust Reduction Mode* : When thrust exceeds  \$\> 30\\text{ lbs/s}\$ , thrust drops at  \$5\\text{ lbs/s}\$  per frame for rapid power reduction.  
* **Display Optimization** : To eliminate visual artifacts without triggering costly full-screen redraws, memory locations are updated via direct zero-page cursor positioning (POKE 211, X: POKE 214, Y: SYS 58640), overwriting stale figures directly. Touchdown velocity must remain  \$\\le 5\\text{ ft/s}\$  on both vertical and horizontal axes to avoid crashing.
