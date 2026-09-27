---
source: ../YouTube Video Breakdown.md
document: "Performance Analysis and Architectural Breakdown: C++ vs. Fortran vs. COBOL (Dave's Garage Episode 04)"
kind: subsection
parent: "Memory Hierarchy Dynamics and Compiler Code Generation"
lines: 63-69
video: https://www.youtube.com/watch?v=yYcHWGxtRQo
findings: [D09-M7, D09-m3, D09-m6]
---

# Cache Subsystem Locality: 1-Bit vs. 8-Bit Storage

> **Source video:** [What's the FASTEST Computer Language? C++ vs Fortran vs Cobol: E04](https://www.youtube.com/watch?v=yYcHWGxtRQo) (Dave's Garage, 15:17) · [at 10:05](https://www.youtube.com/watch?v=yYcHWGxtRQo&t=605s). The video says only that the Fortran array holds bits. It does not compare bit and byte speed.

> Parent section: **Memory Hierarchy Dynamics and Compiler Code Generation**


The memory footprint of the sieve determines where the working dataset resides within the central processing unit's memory architecture6. When screening odd numbers up to ![][image19], an implementation requires ![][image20] logical flags7:  
In a 1-bit implementation, ![][image20] bits translate to ![][image21] (approximately ![][image22])7. On modern x86-64 microarchitectures featuring ![][image23] to ![][image24] of L1 data cache and ![][image25] to ![][image26] of L2 cache per core, this dataset fits into the low-latency L2 cache, with portions residing continuously in L16. Consequently, memory access latency remains within single-digit CPU clock cycles, preventing stalls in the execution pipeline6.  
In an 8-bit implementation, storing each flag as a dedicated byte expands the memory requirement to ![][image27] (approximately ![][image28])7. This footprint exceeds the capacity of the L1 data cache and consumes nearly the entire L2 cache, inducing regular cache line evictions and increasing dependency on the higher-latency L3 cache6.  
Although bit-packed storage necessitates additional CPU instructions to perform bitwise shifting, masking, and address calculation, modern superscalar processors execute these operations within single-cycle arithmetic logic units (ALUs)6. The instruction-level parallelism of modern cores ensures that the mathematical cost of masking bits is negligible compared to the significant memory-stall penalties incurred when fetching byte arrays from lower-tier cache layers or system RAM6. In Fortran benchmarks, storing primality status inside 64-bit integer arrays via bit manipulation yielded an approximate ![][image29] throughput increase over native logical byte arrays, demonstrating that cache spatial locality is a dominant factor in algorithm execution speed7.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D09-M7 | major | VIDEO KNOW VERIFY | verify | L66-68 | _Claim:_ Bit storage is faster than byte storage because of the cache. The Fortran bit version gives about 50% more throughput than byte arrays. _Problem:_ The video does not test or discuss this. The machine in the video is a Threadripper, but the document uses generic cache sizes. In the Primes project, some fast solutions use bytes, not bits, so the cache argument is not always true. The "50%" comes from the forum thread [7]. The fetched thread says the gain is over the best "bitfield" results, not over byte arrays. |
| D09-m3 | minor | DOC | open | L27, L66 | _Claim:_ C++ keeps working data "entirely within the processor's highest-speed cache lines". _Problem:_ L66 says that the 61 KB bit array spills out of the 32 to 48 KB L1 cache. The two sentences contradict each other. |
| D09-m6 | minor | DOC | open | L6-7, L33-77 | _Claim:_ Numbers shown as images. _Problem:_ All key numbers are images of formulas. A screen reader cannot read them. A reader cannot search or copy them. |

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
