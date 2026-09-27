---
source: ../Assembly-Fortran-Comparison.md
document: "Comparative Strategic Analysis of Assembly and Modern Fortran: Pedagogical Yield, Toolchain Friction, and Industry Trajectories"
kind: section-lead
parent: ""
lines: 96-109
findings: [D01-m6]
---

# Architectural Set Selection: The Prerequisite Choice for Assembly

A developer who commits to learning assembly language must immediately resolve an architectural choice that does not exist in standardized high-level languages: selecting the target Instruction Set Architecture (ISA). Assembly is not a single unified language, but a family of low-level notations that map to specific hardware architectures2.

                 Instruction Set Architecture (ISA) Tradeoffs

  x86-64 Architecture                   AArch64 (ARM 64-bit)                  RISC-V Architecture  
  \-------------------                   \--------------------                  \-------------------  
\- CISC Philosophy                     \- Modern RISC Architecture            \- Open Standard Modular RISC  
\- Variable Encodings (1–15 Bytes)     \- Fixed 32-bit Encodings              \- Minimal \~40 Instruction Base  
\- Dominant Enterprise / Desktop       \- Dominant Mobile / Apple / Cloud     \- Clean Academic Design  
\- Decades of Architectural Baggage    \- Strict Load/Store Memory Model      \- Missing Arithmetic Flags  
\- Essential for Vulnerability Audits  \- High Contemporary Deployment        \- Specialized Emulation Setup

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D01-m6 | minor | DOC | open | L30–44, L100–108 | The ASCII diagrams render with escaped `\[` and `\-` characters. This is cosmetic. |

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
