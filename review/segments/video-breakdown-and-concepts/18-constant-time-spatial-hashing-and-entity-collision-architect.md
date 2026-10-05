---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Systematic Decomposition of Core Architectural Concepts"
lines: 140-148
findings: []
---

# Constant-Time Spatial Hashing and Entity Collision Architecture

> Parent section: **Systematic Decomposition of Core Architectural Concepts**


Bounding-box collision detection between multiple mobile entities presents a common performance bottleneck in action games1. Testing ![][image4] dynamic actors against ![][image5] environment tiles yields algorithmic complexity of ![][image6], which quickly overburdens a 3.58 MHz processor1.  
Inkbox avoids this bottleneck by treating the uncompressed level data in Bank \$7F as a spatial hash grid1. Because the dungeon floor is stored as a contiguous 192×168 array, checking terrain collision under an entity at coordinate ![][image7] requires calculating a direct memory address:  
![][image8]  
Because the playfield width is fixed at 192 tiles, this multiplication reduces to simple bitwise operations:  
![][image9]  
The CPU checks the byte at the calculated address in constant time (![][image2]) to determine terrain properties (such as walls, open ground, or hazards)1. For entity-to-entity checks, the engine processes bounding boxes only for actors currently within the camera viewport, updating off-screen enemies via lightweight state timers1.

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
