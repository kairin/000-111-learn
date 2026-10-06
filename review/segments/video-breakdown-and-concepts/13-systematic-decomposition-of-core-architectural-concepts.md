---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: section-lead
parent: ""
lines: 65-96
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D14-C1, D14-C4, D14-C6, D14-M4, D14-M5, D14-M8]
---

# Systematic Decomposition of Core Architectural Concepts

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 09:01](https://www.youtube.com/watch?v=j_2bo7ng65E&t=541s). The video gives the three memories: CPU 128 K, PPU 64 K, APU 64 K. The diagram adds layer, voice and inversion details that the video does not give.

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

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D14-C1 | critical | VIDEO KNOW DOC | open | L27, L58, L84, L111, L117-133, L179 | _Claim:_ HDMA writes register $2111 (BG3HOFS) for mountain parallax in the game, with bands at scanlines 60, 120, 160 and 210 and rates dx*0.25 and dx*0.50. _Problem:_ The video puts the parallax on the title screen, not in the game (34:08). The far mountains sit on layer 3, and the clouds that scroll sit on layer 2 (34:28). At 35:31 Inkbox says that he writes "the background two horizontal scroll register". That register is $210F, not $2111. The table has three bytes per entry: a line count and a two-byte value (35:51). The scanline numbers and the rates in the diagram are not in the video. In the game, the only HDMA scroll effect moves the inventory selection on layer 2 (33:47, 36:31). |
| D14-C4 | critical | VIDEO | open | L43, L62, L94, L162, L183 | _Claim:_ Three "preemptive" sound-effect voices. The driver "preempts lower-priority musical voices and restores them cleanly". _Problem:_ The video says that voices 0 to 4 play music and that the last three voices wait on standby for the CPU (18:18 to 18:38). The CPU tells the APU "which voice channel to run the effect on". At 39:35 object sounds play on a channel "reserved for object sounds", so they do not disturb the player sounds or the music. No voice is taken from the music. |
| D14-C6 | critical | DOC VERIFY | verify | L5-203 (all citations) | _Claim:_ Each sentence cites "1", and the text names the video as the subject. _Problem:_ Source 1 is the techeblog news article, not the video. The video is source 3, and the text cites it only three times together with 1 (L62, L63, L184). The reviewer fetched source 1. It is a short summary that mentions HDMA, mode 1, 128 sprites and five plus three voices. It says nothing about spatial hashing, color math, priority cycling, emulator divergence or compilers. So most citations point to a source that does not hold the claim. A "video breakdown" that cites a news article for the video is not a breakdown of the video. |
| D14-M4 | major | VIDEO | open | L39, L61, L86, L152-157, L182 | _Claim:_ Hit stop is a "single-frame black flash". The engine writes $2132 and enables subtraction in $2131, "inverting the display". The talismans use color math: fire trails, ice "shifts color palettes", gold and peach give "screen-wide color flashes". _Problem:_ The video describes one trick: layer 3 holds black tiles, layer 1 leaves the subscreen, and "add and divide by two" halves the brightness (37:13 to 37:34). That is addition, not subtraction, and no inversion. The same trick darkens the background during hit stop, which pauses the game "for a few frames" (40:37). The four talisman effects are four palette colors of the same cloud animation (42:39). Three talismans spawn new objects (42:59). The video never says that the ice talisman freezes anything or that a screen flashes. |
| D14-M5 | major | VIDEO KNOW | open | L43, L91, L161 | _Claim:_ The APU and CPU communicate through "four 8-bit bidirectional I/O registers". _Problem:_ The four addresses $2140 to $2143 are correct. But the video stresses that these are "eight separate registers" (12:28 to 12:48): four per direction, so a write on one side does not erase the value of the other side. The handshake of the boot ROM ($AA and $BB on ports 0 and 1, address on ports 2 and 3, then $CC, 12:48 to 13:48) is the main content of the audio part, and the document omits it. The "16-bit DSP" label at L92 is not in the video. |
| D14-M8 | major | VIDEO | open | L23, L27, L84, L104, L111, L178 | _Claim:_ In the game, layer 3 holds "distant mountain art" with HDMA parallax. The 16 x 16 tiles on a 32 x 32 tilemap belong to the HDMA setup. _Problem:_ In the game, layer 1 holds the environment and layer 2 the HUD (04:10). Layer 3 holds black tiles for the darkening trick (37:13). The mountains on layer 3 exist only on the title screen (34:28). The 16 x 16 tiles and the 32 x 32 tilemap belong to the scroll engine (04:30), where a 128 x 112 pixel box around the player drives the tile streaming (04:50). |

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
