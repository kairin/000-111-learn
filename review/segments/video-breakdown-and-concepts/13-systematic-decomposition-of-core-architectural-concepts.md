---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: section-lead
parent: ""
lines: 65-96
findings: []
---

# Systematic Decomposition of Core Architectural Concepts

\================================================================================  
          SNES MEMORY AND CO-PROCESSOR BUS WORKLOAD DISTRIBUTION  
\================================================================================

 \[ MAIN PROCESSING DOMAIN \]  
       Ricoh 5A22 CPU (65c816 @ 3.58 MHz)  
             |  
             \+---\> Bank \$7E: System State, Stack, Entity Arrays (64 kB)  
             \+---\> Bank \$7F: Uncompressed Procedural Map Array (63 kB)  
             |  
             \+---\> Direct DMA / HDMA Configuration Pipeline

 \[ DISPLAY PROCESSING DOMAIN \]  
       Dual PPUs (PPU1 / PPU2) & 64 kB Video RAM  
             |  
             \+---\> Background Layer 1: 4bpp Dynamic Playfield Terrain  
             \+---\> Background Layer 2: 4bpp Static Packed BCD HUD  
             \+---\> Background Layer 3: 2bpp Parallax Mountains (HDMA Scrolled)  
             \+---\> Object Attribute Memory: 128 Sprites (Max 32 / Scanline)  
             \+---\> Hardwired Color Math: Real-Time Screen Blending / Inversion

 \[ INDEPENDENT AUDIO DOMAIN \]  
       Sony SPC700 Subsystem (1.024 MHz) & 64 kB Audio RAM  
             |  
             \+---\> 4-Port Bidirectional I/O Interface (\$2140-\$2143)  
             \+---\> 16-bit DSP with 8 Hardware Voices:  
                     \* Channels 0-4: Polyphonic Musical Playback (BRR)  
                     \* Channels 5-7: Dynamic Priority Sound Effects  
\================================================================================

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
