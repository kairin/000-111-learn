# Publication chronology review

- Unit: `adversarial-research-review-u08`
- Source: [`sources/adversarial-research-review.md`](../../sources/adversarial-research-review.md)
- Characters: `44912:48400`
- Lines: `276:299`
- Purposes: claim-review, learning
- Excerpt SHA-256: `f0afe5efad7d6ac89af65ae7c79a529ceaeedee37b55158bf7a45969f3ccaf44`

Focused review of publication chronology review.

## Claims

### `adversarial-research-review-u08-c01`

Chronology shows the source mixes results from different maturity levels.

Type: `historical`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, reproduction.

Evidence needed: Verify dates and scope.

Assumptions:
- The cited review evidence applies to the source configuration. (`inferred`)

Review targets:
- `astrophysics-kernels-u16-c01`

## Learning goals

### `adversarial-research-review-u08-g01`: Technical claim review

Evaluate evidence and limits for publication chronology review.

Prerequisites: Source evaluation

Claim dependencies: `adversarial-research-review-u08-c01`

## Exact source excerpt

## Publication timeline, argument structure and primary sources

The chronology helps explain several errors: the uploaded document often combines conclusions from papers separated by decades as if they described a single modern software stack or settled physical theory.

| Date | Publication/development | Relevance to the uploaded claims |
|---|---|---|
| **1990** | Andrews & Zubrin, magnetic sails | Establishes solar-wind/ISM momentum exchange and explicitly identifies relativistic ISM drag as useful braking. citeturn19search1 |
| **1994** | Alcubierre warp metric | Establishes the classic moving-bubble construction and its exotic-matter problem. |
| **1999** | Chambers, hybrid symplectic integrator | Primary basis for Mercury's Hamiltonian switching, encounter treatment and \(r_{\rm crit}\) discussion. citeturn16view3turn12view7 |
| **2000** | Dehnen, momentum-conserving tree code | Introduces symmetric mutual cell–cell interactions and exact linear-momentum conservation in the approximate force calculation. citeturn17academia47 |
| **2002** | Dehnen, hierarchical \(O(N)\) force algorithm | Stronger basis for the gyrfalcON \(O(N)\)-class description. citeturn17search13 |
| **2012** | Einstein Toolkit adds McLachlan CCZ4 | Supports the document's historical CCZ4 claim. citeturn13search9 |
| **2015** | Wang et al., NBODY6++GPU | Demonstrates heterogeneous million-body direct \(N\)-body simulation. citeturn17search2 |
| **2017** | Hoang et al., relativistic spacecraft–ISM interactions | Shows that realistic damage includes tracks, erosion, melting and dust cratering rather than just bulk heating. citeturn19academia46 |
| **2017** | Kipping, relativistic light sails | Supplies an exact energy–momentum treatment that exposes the uploaded sail-energy error. citeturn11view6 |
| **2019** | Kodama & Ishiyama, AVX2 Phantom-GRAPE extension | Documents detailed AVX2 force kernels while treating AVX-512 performance as estimated. citeturn18search0 |
| **2021** | Bobrick & Martire physical-warp taxonomy | Broadens the discussion of positive-energy/sub-luminal warp geometries; does not by itself turn them into practical propulsion systems. citeturn5search6 |
| **2022** | Santiago, Schuster & Visser | Shows why preferred-observer positive density is insufficient and derives generic energy-condition problems in their warp-drive framework. citeturn15view3 |
| **2022** | Schattschneider & Jackson revisit Fishback | Finds severe magnetic-scoop engineering constraints and lower cutoff speeds. citeturn19search7 |
| **2024** | Helmerich et al., Warp Factory | Peer-reviewed metric/stress-energy numerical analysis framework. citeturn2search4 |
| **2024** | Fuchs et al., constant-velocity physical warp solution | Peer-reviewed subluminal, constant-velocity positive-ADM-mass construction satisfying energy conditions. citeturn15view0 |
| **2026** | warpax observer-robust analysis | Highlights all-observer tests, wall-restricted Type-I/IV structure and large discrepancies with preferred-frame diagnostics. citeturn16view1turn14view3 |
| **2026** | Radiative warp-shell steering manuscript | Derives the \(-\dot m\ge3m|\alpha|\) radiative control law while explicitly documenting major scope limitations. citeturn15view4turn16view0 |
| **2026** | Einstein Toolkit Hypatia | Illustrates why the document's Carpet/McLachlan-centric picture is no longer the full current Toolkit architecture. citeturn13search1
