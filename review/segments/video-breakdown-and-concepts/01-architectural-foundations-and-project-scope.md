---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: section-lead
parent: ""
lines: 3-8
findings: []
---

# Architectural Foundations and Project Scope

Targeting fourth-generation console architectures presents distinct engineering challenges, primarily arising from the platform's non-uniform memory maps, rigid hardware line buffers, and asynchronous co-processing subsystems1. In the technical documentary *"It Took Every SNES Hardware Trick To Make My Game"*, software engineer and retrocomputing specialist Inkbox deconstructs the two-year bare-metal development of *〇 Star* (*Zero Star*), an original top-down dungeon crawler designed for native execution on the Super Nintendo Entertainment System (SNES)1. Unlike contemporary retro-styled projects that rely on high-level languages like C or compiled development environments that introduce runtime overhead and unoptimized binary footprints, *Zero Star* was authored entirely in hand-assembled 65c816 and SPC700 machine instructions1.  
The primary objective was to deliver a responsive, procedurally generated action RPG contained entirely within a 129-kilobyte ROM image, executed on historical hardware without relying on auxiliary expansion coprocessors such as the Super FX or SA-1 chips1. The underlying hardware platform, released in 1990, is governed by a Ricoh 5A22 central processing unit running at a maximum clock frequency of 3.58 MHz, paired with 128 kB of Work RAM (WRAM), 64 kB of Video RAM (VRAM), and an isolated 64 kB Audio RAM (ARAM) subsystem1.  
The documentary covers game design post-mortem analysis and bare-metal systems engineering, demonstrating how hardware quirks and CRT raster timings can be harnessed to bypass the physical constraints of vintage computing silicon1. The physical realization of the project was supported by custom background pixel art by Hornests, an original soundtrack by Dr. Matt, and open-hardware physical cartridge board implementations developed by Mouse Bite Labs1.

---

## Review findings for this part

_Pass 1 found nothing in this part. This does not mean that the part is correct. Nobody challenged it yet._

---

## Review worksheet

### 1. Goal of this part
_What does this part try to show, or help the reader decide?_

### 2. Key claims to test
| # | Claim | Evidence given (citation / data) | Verifiable? |
|---|-------|----------------------------------|-------------|
| 1 |       |                                  |             |

### 3. Adversarial review
- **Strongest counter-argument:**
- **Unsupported, overstated, or outdated claims:**
- **Source quality (primary vs. blog/forum/marketing):**
- **Omissions / what a skeptic would ask:**
- **Internal consistency with other segments:**

### 4. Evaluation
- **Does the segment achieve its goal?** (Yes / Partly / No)
- **Confidence:** (High / Medium / Low)
- **Required fixes:**
