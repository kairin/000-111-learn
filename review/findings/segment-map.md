# Map: document parts and review findings

The script `segments/split_documents.py` writes this file. It shows where the review findings are in the document parts. It shows the groups of findings, the findings in more than one part, and the parts that nobody challenged yet.

## `Assembly Language Video Breakdown.md`

- Document parts: **10**. Parts with findings: **8**. Parts that nobody challenged yet: **2**.
- Findings about the full document: none
- Findings in more than one part: D05-C1 in parts 01+03+06+07+08+09, D05-m11 in parts 01+05+06+07, D05-M9 in parts 02+08, D05-m10 in parts 03+05, D05-M6 in parts 05+06
- Findings outside every part: none

| Part | Title | Critical | Total | IDs |
|---|---|---|---|---|
| 01 | Foundational Overview and Historical Evolution | 1 | 6 | D05-C1, D05-M1, D05-M2, D05-m1, D05-m11, D05-m12 |
| 02 | Instruction Set Architecture Heterogeneity and Modern Computing Domains |  | 3 | D05-M9, D05-m2, D05-m3 |
| 03 | Memory Layout and Sectional Topology in Assembly Programs | 1 | 5 | D05-C1, D05-M3, D05-M8, D05-m4, D05-m10 |
| 04 | Execution Flow Analysis: 64-Bit Linux System Programming |  |  |  |
| 05 | Data Allocation and Relative Addressing Mechanics |  | 3 | D05-M6, D05-m10, D05-m11 |
| 06 | Hardware Register Utilization and Parameter Staging | 1 | 5 | D05-C1, D05-M6, D05-m5, D05-m6, D05-m11 |
| 07 | Control Flow Termination and Fault Prevention | 1 | 5 | D05-C1, D05-M4, D05-M5, D05-m7, D05-m11 |
| 08 | Toolchain Orchestration: Binary Generation via Assembler and Linker | 1 | 4 | D05-C1, D05-M9, D05-m8, D05-m9 |
| 09 | Systemic Implications: Microarchitecture, Security, and Future Paradigms | 2 | 3 | D05-C1, D05-C2, D05-M7 |
| 10 | Works cited |  |  |  |

## `Assembly-Fortran-Comparison.md`

- Document parts: **22**. Parts with findings: **15**. Parts that nobody challenged yet: **7**.
- Findings about the full document: none
- Findings in more than one part: D01-C3 in parts 02+04+21, D01-M5 in parts 02+04+07, D01-m6 in parts 05+11, D01-M7 in parts 08+10, D01-C1 in parts 15+16+17, D01-M9 in parts 15+17
- Findings outside every part: none

| Part | Title | Critical | Total | IDs |
|---|---|---|---|---|
| 01 | Introduction and framing |  |  |  |
| 02 | Execution Timelines and Attainable Milestones | 1 | 2 | D01-C3, D01-M5 |
| 03 | Assembly: Reading Fluency Versus Authoring Competence |  | 1 | D01-m5 |
| 04 | Modern Fortran: Rapid Transition to Production Capability | 1 | 3 | D01-C3, D01-M1, D01-M5 |
| 05 | Pedagogical Yield: Hardware Literacy Versus Mathematical Computing Abstractions |  | 1 | D01-m6 |
| 06 | The Architectural Literacy of Assembly |  | 1 | D01-m1 |
| 07 | The Numerical Mastery of Modern Fortran |  | 5 | D01-M2, D01-M3, D01-M4, D01-M5, D01-m2 |
| 08 | Toolchain Complexity, Developer Ergonomics, and Ecosystem Modernization |  | 2 | D01-M6, D01-M7 |
| 09 | The Assembly Environment: Fragmented and Unforgiving |  |  |  |
| 10 | The Modern Fortran Renaissance: Modernized and Accessible |  | 1 | D01-M7 |
| 11 | Architectural Set Selection: The Prerequisite Choice for Assembly |  | 1 | D01-m6 |
| 12 | The Pragmatic Utility of x86-64 |  |  |  |
| 13 | The Structural Elegance of RISC-V |  | 1 | D01-m3 |
| 14 | The Contemporary Dominance of AArch64 |  | 1 | D01-m4 |
| 15 | Labor Market Realities, Economic Returns, and Industry Demand | 1 | 3 | D01-C1, D01-M8, D01-M9 |
| 16 | The Assembly Market: Security, Firmware, and Binary Analysis | 1 | 1 | D01-C1 |
| 17 | The Fortran Market: High-Performance Computing and Legacy Infrastructure | 2 | 3 | D01-C1, D01-C2, D01-M9 |
| 18 | Strategic Decision Framework and Selection Criteria |  |  |  |
| 19 | Criteria for Selecting Assembly Language |  |  |  |
| 20 | Criteria for Selecting Modern Fortran |  |  |  |
| 21 | Conclusions | 1 | 1 | D01-C3 |
| 22 | Works cited |  |  |  |

## `Assembly-Versus-Fortran-Comparison.md`

- Document parts: **20**. Parts with findings: **16**. Parts that nobody challenged yet: **4**.
- Findings about the full document: D02-M10
- Findings in more than one part: D02-C2 in parts 02+06, D02-M3 in parts 02+04, D02-m5 in parts 02+07, D02-C4 in parts 03+04+11+17, D02-M4 in parts 03+04, D02-C1 in parts 05+08+18, D02-M5 in parts 05+06+10+17, D02-C3 in parts 12+16+18, D02-M6 in parts 16+17+18+19
- Findings outside every part: none

| Part | Title | Critical | Total | IDs |
|---|---|---|---|---|
| 01 | Introduction and framing |  |  |  |
| 02 | The Retro-Engineering Paradigm: 1980s–1990s Hardware Ceilings | 1 | 4 | D02-C2, D02-M2, D02-M3, D02-m5 |
| 03 | 90-Day Execution Timelines and Attainable Milestones | 2 | 4 | D02-C4, D02-C5, D02-M4, D02-m4 |
| 04 | Assembly: Direct Hardware Authorship | 1 | 4 | D02-C4, D02-M1, D02-M3, D02-M4 |
| 05 | Fortran: The Engine of Pure Mathematical Simulation | 1 | 2 | D02-C1, D02-M5 |
| 06 | Technical Architecture: Low-Level Optimization vs. Simulation Power | 1 | 3 | D02-C2, D02-M5, D02-M7 |
| 07 | The Assembly Advantage: Conquering the 80s/90s Hardware Bottlenecks |  | 1 | D02-m5 |
| 08 | The Fortran Advantage: Simulation Depth and Procedural Complexity | 1 | 1 | D02-C1 |
| 09 | Designing for the Modern Player Under Vintage Constraints |  |  |  |
| 10 | 1. Responsiveness and Input Latency |  | 1 | D02-M5 |
| 11 | 2. Smooth Frame Pacing and Visual Fluidity | 1 | 2 | D02-C4, D02-m1 |
| 12 | 3. Emergent Simulation and Procedural Depth | 1 | 1 | D02-C3 |
| 13 | Toolchains and Environment Setup |  |  |  |
| 14 | Assembly Retro Toolchain |  | 2 | D02-M8, D02-m3 |
| 15 | Fortran Retro Toolchain |  | 2 | D02-M9, D02-m2 |
| 16 | The Definitive Verdict: Which Language Should You Learn? | 1 | 2 | D02-C3, D02-M6 |
| 17 | Choose Assembly If: | 1 | 3 | D02-C4, D02-M5, D02-M6 |
| 18 | Choose Fortran If: | 2 | 3 | D02-C1, D02-C3, D02-M6 |
| 19 | Recommended Strategy for the Remaining Months |  | 1 | D02-M6 |
| 20 | Works cited |  |  |  |

## `Fortran Video Breakdown.md`

- Document parts: **13**. Parts with findings: **13**. Parts that nobody challenged yet: **0**.
- Findings about the full document: none
- Findings in more than one part: D07-C1 in parts 01+02+03+04+05+06+07+08+09+10+11+12+13, D07-m2 in parts 02+09, D07-C3 in parts 03+11, D07-C2 in parts 10+12
- Findings outside every part: none

| Part | Title | Critical | Total | IDs |
|---|---|---|---|---|
| 01 | Historical Genesis and the Optimizing Compiler Paradigm | 1 | 4 | D07-C1, D07-M6, D07-m7, D07-m10 |
| 02 | Electromechanical Constraints: Punch Cards, Fixed Form, and Typography | 1 | 4 | D07-C1, D07-M4, D07-m1, D07-m2 |
| 03 | Technical Evaluation of Video Content and Syntactic Mechanics | 2 | 2 | D07-C1, D07-C3 |
| 04 | Program Initialization and Source Extensions | 1 | 2 | D07-C1, D07-M5 |
| 05 | Implicit Typing Rules and the implicit none Anomaly | 1 | 5 | D07-C1, D07-m3, D07-m4, D07-m9, D07-m11 |
| 06 | Data Types and Stream Output | 1 | 2 | D07-C1, D07-m5 |
| 07 | Memory Architecture: Static Matrices to Modern Pointers | 1 | 2 | D07-C1, D07-M8 |
| 08 | Control Flow and Procedural Modularity | 1 | 2 | D07-C1, D07-M7 |
| 09 | Comparative Architectural Evolution | 1 | 6 | D07-C1, D07-M1, D07-M2, D07-m2, D07-m6, D07-m8 |
| 10 | The Mechanics of Numerical Supremacy in High-Performance Computing | 2 | 3 | D07-C1, D07-C2, D07-M3 |
| 11 | Critical Assessment of Rapid Micro-Pedagogy | 2 | 2 | D07-C1, D07-C3 |
| 12 | Conclusion | 2 | 2 | D07-C1, D07-C2 |
| 13 | Works cited | 1 | 1 | D07-C1 |

## `YouTube Video Breakdown.md`

- Document parts: **15**. Parts with findings: **12**. Parts that nobody challenged yet: **3**.
- Findings about the full document: none
- Findings in more than one part: D09-m6 in parts 01+06+07+08+09+10+11, D09-C3 in parts 03+11, D09-M8 in parts 03+11, D09-M4 in parts 04+13, D09-m3 in parts 05+09, D09-C1 in parts 06+11, D09-M1 in parts 06+07+14
- Findings outside every part: none

| Part | Title | Critical | Total | IDs |
|---|---|---|---|---|
| 01 | Benchmark Design and Experimental Protocol |  | 4 | D09-M2, D09-M3, D09-m6, D09-m7 |
| 02 | Architectural Foundations of the Contending Languages |  |  |  |
| 03 | COBOL: Business Data Processing and Record Orientation | 1 | 2 | D09-C3, D09-M8 |
| 04 | Fortran: Mathematical Array Translation and Vectorization |  | 3 | D09-M4, D09-M5, D09-M10 |
| 05 | C++: Zero-Overhead Abstractions and Systems Control |  | 2 | D09-m3, D09-m4 |
| 06 | Empirical Results and Quantitative Comparison | 2 | 4 | D09-C1, D09-C4, D09-M1, D09-m6 |
| 07 | Analysis of Compiler Variations in Fortran | 1 | 6 | D09-C2, D09-M1, D09-M6, D09-m1, D09-m5, D09-m6 |
| 08 | Memory Hierarchy Dynamics and Compiler Code Generation |  | 1 | D09-m6 |
| 09 | Cache Subsystem Locality: 1-Bit vs. 8-Bit Storage |  | 3 | D09-M7, D09-m3, D09-m6 |
| 10 | Object-Oriented Abstraction Costs |  | 2 | D09-M9, D09-m6 |
| 11 | Structural Bottlenecks in the COBOL Execution Model | 2 | 5 | D09-C1, D09-C3, D09-M8, D09-m2, D09-m6 |
| 12 | Broader Systems Engineering Implications |  |  |  |
| 13 | The Limits of Algorithmic Microbenchmarks |  | 1 | D09-M4 |
| 14 | Compiler Infrastructure Over Linguistic Inception |  | 1 | D09-M1 |
| 15 | Works cited |  |  |  |

## `YouTube Video Content Analysis.md`

- Document parts: **9**. Parts with findings: **8**. Parts that nobody challenged yet: **1**.
- Findings about the full document: none
- Findings in more than one part: D11-M7 in parts 01+03+06+08, D11-m4 in parts 02+06, D11-C1 in parts 03+05+08, D11-C2 in parts 04+07+08, D11-M2 in parts 05+06, D11-m5 in parts 06+07
- Findings outside every part: none

| Part | Title | Critical | Total | IDs |
|---|---|---|---|---|
| 01 | Architectural Context and Historical Provenance |  | 4 | D11-M7, D11-m1, D11-m2, D11-m8 |
| 02 | Algorithmic Framework and Execution Criteria |  | 3 | D11-M1, D11-m3, D11-m4 |
| 03 | Comparative Systems Analysis: Ada, Pascal, and Delphi Implementations | 1 | 4 | D11-C1, D11-M5, D11-M7, D11-m7 |
| 04 | Compiler Code Generation and Safety Mechanics in Ada | 1 | 2 | D11-C2, D11-M3 |
| 05 | The Pascal and Delphi Memory Management Models | 1 | 3 | D11-C1, D11-M2, D11-M6 |
| 06 | Cross-Paradigm Performance Dynamics Across the Systems Spectrum | 1 | 7 | D11-C3, D11-M2, D11-M4, D11-M7, D11-m4, D11-m5, D11-m6 |
| 07 | Systematic Implications for Modern Software Engineering | 1 | 2 | D11-C2, D11-m5 |
| 08 | Conclusions | 2 | 3 | D11-C1, D11-C2, D11-M7 |
| 09 | Works cited |  |  |  |

## `assembly_language_architectural_explorer.html`

- Document parts: **6**. Parts with findings: **6**. Parts that nobody challenged yet: **0**.
- Findings about the full document: none
- Findings in more than one part: D06-m9 in parts 01+03+04+05, D06-m10 in parts 03+05
- Findings outside every part: D06-C1, D06-M5, D06-m1, D06-m12

| Part | Title | Critical | Total | IDs |
|---|---|---|---|---|
| 01 | Summary strip (no heading) |  | 1 | D06-m9 |
| 02 | Instruction Set Architecture (ISA) Heterogeneity & Paradigms | 1 | 5 | D06-C2, D06-M3, D06-m2, D06-m6, D06-m7 |
| 03 | Virtual Memory Layout & Sectional Topology |  | 5 | D06-M4, D06-M6, D06-m8, D06-m9, D06-m10 |
| 04 | 64-Bit Linux Execution Flow & Register State Machine |  | 4 | D06-M1, D06-M2, D06-m3, D06-m9 |
| 05 | Binary Toolchain Orchestration & Object File Linking | 1 | 6 | D06-C3, D06-m4, D06-m5, D06-m9, D06-m10, D06-m11 |
| 06 | Systemic Implications: Security, Microarchitecture & High Performance |  | 1 | D06-M7 |

## `assembly_vs_fortran_learning_advisor.html`

- Document parts: **7**. Parts with findings: **4**. Parts that nobody challenged yet: **3**.
- Findings about the full document: D03-M4
- Findings in more than one part: none
- Findings outside every part: D03-m1, D03-m2

| Part | Title | Critical | Total | IDs |
|---|---|---|---|---|
| 01 | Which language should you learn for the rest of the year? |  |  |  |
| 02 | Interactive Recommendation Engine | 2 | 4 | D03-C1, D03-C2, D03-M3, D03-m3 |
| 03 | 12-Week Acquisition Roadmap & Milestones |  | 2 | D03-M1, D03-M2 |
| 04 | Pedagogical Yield: Mental Models & Core Dividends |  |  |  |
| 05 | Labor Market Realities & Toolchain Ecosystem | 2 | 3 | D03-C3, D03-C4, D03-m5 |
| 06 | Instruction Set Architecture (ISA) Tradeoff Matrix |  | 1 | D03-m4 |
| 07 | Ready to Start Your 90-Day Learning Track? |  |  |  |

## `fortran_technical_deconstruction.html`

- Document parts: **6**. Parts with findings: **6**. Parts that nobody challenged yet: **0**.
- Findings about the full document: none
- Findings in more than one part: D08-C3 in parts 01+05, D08-M1 in parts 01+03, D08-M2 in parts 01+03, D08-M3 in parts 01+05, D08-M4 in parts 01+05, D08-m8 in parts 02+04, D08-m9 in parts 05+06
- Findings outside every part: D08-M8, D08-m1, D08-m2

| Part | Title | Critical | Total | IDs |
|---|---|---|---|---|
| 01 | Section 1: Historical Genesis & The Optimizing Compiler Paradigm | 2 | 8 | D08-C1, D08-C3, D08-M1, D08-M2, D08-M3, D08-M4, D08-m3, D08-m4 |
| 02 | Section 2: Electromechanical Constraints & Fixed Source Form |  | 5 | D08-M7, D08-m5, D08-m6, D08-m7, D08-m8 |
| 03 | Section 3: Video Code Deconstruction & Interactive Compiler Simulator | 1 | 3 | D08-C2, D08-M1, D08-M2 |
| 04 | Section 4: Comparative Architectural Evolution |  | 2 | D08-M6, D08-m8 |
| 05 | Section 5: High-Performance Computing & Memory Aliasing Supremacy | 1 | 5 | D08-C3, D08-M3, D08-M4, D08-M5, D08-m9 |
| 06 | Section 6: Evaluation of Rapid Micro-Pedagogy |  | 1 | D08-m9 |

## `prime_sieve_benchmark_interactive_explorer.html`

- Document parts: **6**. Parts with findings: **6**. Parts that nobody challenged yet: **0**.
- Findings about the full document: none
- Findings in more than one part: D12-M7 in parts 01+02+05, D12-m3 in parts 01+03, D12-C3 in parts 03+04, D12-M9 in parts 03+04
- Findings outside every part: D12-M8, D12-m9

| Part | Title | Critical | Total | IDs |
|---|---|---|---|---|
| 01 | overview |  | 3 | D12-M7, D12-m1, D12-m3 |
| 02 | 1. Algorithmic Framework & Benchmark Harness |  | 3 | D12-M4, D12-M7, D12-m2 |
| 03 | 2. Cross-Paradigm Performance Spectrum | 3 | 6 | D12-C1, D12-C2, D12-C3, D12-M6, D12-M9, D12-m3 |
| 04 | 3. Systems Systems Deep Dive: Ada, Pascal, and Delphi | 2 | 4 | D12-C3, D12-C4, D12-M9, D12-m8 |
| 05 | 4. Micro-Architectural Memory & Cache Simulator |  | 6 | D12-M1, D12-M2, D12-M3, D12-M7, D12-m6, D12-m7 |
| 06 | 5. Engineering Synthesis & Architectural Takeaways |  | 3 | D12-M5, D12-m4, D12-m5 |

## `retro_game_dev_language_advisor.html`

- Document parts: **7**. Parts with findings: **6**. Parts that nobody challenged yet: **1**.
- Findings about the full document: D04-M5
- Findings in more than one part: D04-C3 in parts 03+04
- Findings outside every part: none

| Part | Title | Critical | Total | IDs |
|---|---|---|---|---|
| 01 | Designing Under Vintage Limits for Modern Players |  | 1 | D04-M1 |
| 02 | Retro Game Concept Diagnostic Engine | 1 | 1 | D04-C1 |
| 03 | 90-Day Retro Game Dev Acquisition Track | 2 | 2 | D04-C2, D04-C3 |
| 04 | Satisfying Modern Players Under Vintage Constraints | 1 | 2 | D04-C3, D04-M4 |
| 05 | Retro Game Engine & Genre Suitability Analytics | 2 | 2 | D04-C4, D04-C5 |
| 06 | Retro Toolchain & Emulation Workstation |  | 2 | D04-M2, D04-M3 |
| 07 | Ready to Author Your Retro Engine? |  |  |  |

## `software_drag_race_breakdown.html`

- Document parts: **6**. Parts with findings: **6**. Parts that nobody challenged yet: **0**.
- Findings about the full document: none
- Findings in more than one part: D10-C1 in parts 01+02+04, D10-C2 in parts 01+02+04, D10-M7 in parts 01+05, D10-M8 in parts 01+02+03+04+05+06, D10-m2 in parts 01+03+05, D10-m5 in parts 02+04, D10-m3 in parts 03+04, D10-m6 in parts 04+06
- Findings outside every part: D10-m1

| Part | Title | Critical | Total | IDs |
|---|---|---|---|---|
| 01 | Evaluating Compiled Execution Efficiency | 2 | 6 | D10-C1, D10-C2, D10-M7, D10-M8, D10-m2, D10-m8 |
| 02 | Quantitative Results & Compiler Sensitivity | 3 | 6 | D10-C1, D10-C2, D10-C3, D10-M8, D10-M9, D10-m5 |
| 03 | Memory Hierarchy & Cache Locality Simulator |  | 7 | D10-M1, D10-M2, D10-M3, D10-M8, D10-m2, D10-m3, D10-m4 |
| 04 | Language Paradigm & Architectural Foundations | 2 | 10 | D10-C1, D10-C2, D10-M4, D10-M5, D10-M6, D10-M8, D10-m3, D10-m5, D10-m6, D10-m7 |
| 05 | Benchmark Rules & Faithful Implementation Criteria | 1 | 4 | D10-C4, D10-M7, D10-M8, D10-m2 |
| 06 | Engineering Takeaways: Microbenchmarks vs Reality |  | 2 | D10-M8, D10-m6 |
