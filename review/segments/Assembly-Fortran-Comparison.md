# **Comparative Strategic Analysis of Assembly and Modern Fortran: Pedagogical Yield, Toolchain Friction, and Industry Trajectories**

Allocating a finite window of three months to acquire an idiosyncratic programming language requires evaluating pedagogical dividends, toolchain ergonomics, and industry utility. Assembly and Modern Fortran occupy polar positions in the software abstraction spectrum. Assembly represents the floor of executable software, stripping away compiler abstraction to expose processor architecture, execution mechanics, and microarchitectural behavior1. Modern Fortran sits at a high layer of mathematical abstraction, operating as an array-oriented, natively parallel domain-specific language designed to map numerical linear algebra and differential equations onto high-performance computing (HPC) hardware3. Choosing between these disciplines requires assessing whether the primary objective is systems comprehension and security analysis or scientific computing and large-scale numerical modeling5.

## **Execution Timelines and Attainable Milestones**

The three-month acquisition trajectory differs substantially between Assembly and Modern Fortran due to variations in cognitive load, scope, and execution feedback loops. A dedicated learner committing consistent weekly effort must navigate distinct developmental phases, transitioning from fundamental syntax or instruction semantics to real-world structural fluency.

| Week Interval | Assembly Language Pathway (x86-64 / RISC-V) | Modern Fortran Pathway (Fortran 2008–2023) |
| :---- | :---- | :---- |
| **Weeks 1–4** | Binary representations; CPU register sets; basic arithmetic and logical operations; stack pointer manipulation; AMD64 System V calling conventions2. | Free-form syntax; strong typing; dynamic array allocations; intrinsic mathematical functions; modular code organization; file I/O4. |
| **Weeks 5–8** | Memory addressing modes; control-flow recovery; stack frame preservation; pointer indirection; direct linking of compiled C routines to assembly subroutines7. | User-defined derived types; procedure interfaces; pure functions; OpenMP multithreading pragmas; integration of BLAS and LAPACK linear algebra libraries3. |
| **Weeks 9–12** | Disassembly inspection in Ghidra; binary patching; tracking SIMD vector registers; profiling branch mispredictions and microarchitectural pipeline stalls11. | Native distributed memory scaling via coarrays; do concurrent multi-core execution; build orchestration using the Fortran Package Manager (fpm)3. |
| **Attainable Milestone** | Reading and auditing decompiled binaries, mapping disassembled blocks to high-level code, and identifying micro-optimization bottlenecks11. | Architecting and running an end-to-end, parallelized partial differential equation solver or matrix simulation engine from scratch4. |

### **Assembly: Reading Fluency Versus Authoring Competence**

A foundational reality of learning assembly language is that modern software practitioners rarely author standalone assembly programs; instead, they analyze, optimize, and debug compiler output20. Within a three-month timeframe, mastering the entirety of a CISC instruction set architecture, such as the more than 1,500 instructions comprising x86-64, is unfeasible20. However, acquiring comprehension over a core working set of approximately 40 to 50 fundamental instructions—covering data movement, integer arithmetic, bitwise logic, conditional jumps, and stack operations—is fully attainable within six to eight weeks22.  
By the end of a three-month intensive track, the learner develops the capacity to trace binary execution flow across application binary interface (ABI) boundaries, tracking register states, caller-saved versus callee-saved registers, and base pointer offsets7. Through disassembly tools such as Ghidra or interactive environments like Compiler Explorer, the student learns to correlate high-level imperative control structures with machine-level jump tables, conditional branches, and stack frames1. The learner transitions from viewing the central processing unit as a black box to understanding how high-level language features manifest as physical register allocations, memory dereferences, and cache-line interactions8.

### **Modern Fortran: Rapid Transition to Production Capability**

Modern Fortran, conforming to the ISO Fortran 2008, 2018, and 2023 standards, features a compact, coherent language surface relative to industrial general-purpose languages such as C++ or Rust3. The contemporary language has shed the archaic constraints of fixed-column punch-card formatting, implicit typing conventions, and unstructured control transfers that characterized legacy FORTRAN 773. Because the language syntax directly reflects mathematical linear algebra, a student with basic imperative programming experience can achieve production-level coding capability within three to four weeks4.  
By the end of three months, an engineer working in Modern Fortran progresses beyond simple single-file scripts to building modular, object-oriented scientific libraries9. This includes implementing user-defined derived types with type-bound procedures, managing dynamic multidimensional arrays with automated bounds safety, and deploying native SPMD (Single Program, Multiple Data) parallelism via coarray abstractions without relying on third-party message-passing bindings4. The learner becomes capable of building, profiling, and executing non-trivial mathematical simulations, such as numerical heat conduction or fluid dynamics models, compiled with production toolchains such as GFortran or LLVM Flang12.

## **Pedagogical Yield: Hardware Literacy Versus Mathematical Computing Abstractions**

The intellectual return on investment differs dramatically depending on whether the learner aims to cultivate deep mechanical sympathy with physical computing hardware or master high-level mathematical execution abstractions.

       Pedagogical Divergence: Hardware Transparency vs. Mathematical Abstraction

       \[ASSEMBLY: Architectural Literacy\]        \[FORTRAN: Numerical Engineering\]  
                        |                                       |  
    Exposes Physical Machine State          Abstracts High-Level Equations  
  (Registers, Stack Frames, Byte Layout)   (Native Multidimensional Slicing, Math)  
                        |                                       |  
       Unmasks Compiler Lowering Passes        Enforces Anti-Aliasing Constraints  
   (Branch Trees, Vector Registers, Spills)   (Aggressive SIMD Vectorization Loops)  
                        |                                       |  
       Demystifies System ABI Contracts        Directs Parallel Memory Topologies  
     (System Calls, Interrupts, Linking)     (Coarrays, Teams, SPMD Concurrency)  
                        |                                       |  
                        v                                       v  
         Deep Low-Level System Literacy           Production Scientific Modeling

### **The Architectural Literacy of Assembly**

Studying assembly language demystifies the abstraction layer imposed by high-level compilers and operating systems2. Modern software abstractions obscure the mechanics of cache lines, branch predictors, registers, and memory paging8. Assembly strips these intermediaries away, compelling the programmer to reason directly about the hardware execution cycle2.  
The first core cognitive benefit is the concrete comprehension of memory topology8. Rather than treating variables as ephemeral values floating within lexical scopes, the assembly student confronts their physical reality: as temporary values assigned to hardware registers, transient displacements relative to the stack pointer register, or heap pointers requiring explicit base-plus-index address dereferencing7. Understanding the stack frame layout, function prologues, epilogues, and red zones provides lasting insight into stack overflow vulnerabilities, pointer arithmetic bugs, and data alignment requirements7.  
The second major dividend is transparency into compiler code generation8. By analyzing compiled binaries through disassembly, the developer observes how optimizing compilers transform abstract code11. This includes evaluating loop unrolling, the insertion of vector packed instructions (such as AVX-512 or ARM NEON), the replacement of integer division with modular multiplication invariants, and the elimination of redundant loads17.  
This architectural literacy alters how software is authored in any compiled language, including C, C++, Rust, and Go, allowing engineers to instinctively avoid idioms that trigger register spills, branch mispredictions, or pipeline bubbles17.

### **The Numerical Mastery of Modern Fortran**

Modern Fortran cultivates an entirely different mental model: treating data as structured mathematical fields rather than streams of discrete, unstructured memory bytes4. The language's type system and semantics were engineered specifically to translate mathematical formulas into machine code that executes near theoretical hardware limits4.  
The defining performance mechanism of Fortran is its strict, built-in prohibition against pointer aliasing5. In C and C++, compilers must operate under the defensive assumption that two distinct pointer arguments may point to overlapping regions in memory, which inhibits out-of-order execution, loop transformations, and automated SIMD vectorization unless the developer explicitly decorates parameters with non-standard keywords17.  
Fortran dummy arguments are non-aliasing by specification, providing the compiler with absolute certainty that operations on one array will not mutate another5. This semantic guarantee permits Fortran compilers to emit optimized vector operations out of the box5.  
Furthermore, Fortran treats multidimensional arrays as intrinsic first-class primitives5. A programmer learns to manipulate entire matrices using array-slice notation, index shifting, and array-reduction intrinsics without authoring nested procedural loops4. Contiguous column-major storage layout ensures that multidimensional sweeps access contiguous memory blocks, maximizing cache prefetch efficiency5.  
Through coarray syntax, Fortran introduces SPMD distributed-memory programming directly at the language level4. Instead of marshaling binary buffers through complex MPI function signatures, a Fortran practitioner expresses remote data access across distinct images using intuitive array bracket syntax, bridging high-level algorithmic modeling with distributed supercomputing execution4.

## **Toolchain Complexity, Developer Ergonomics, and Ecosystem Modernization**

Developer experience and toolchain friction are decisive variables within a condensed learning timeline. A language requiring complex configuration or obscure development setups can severely impede momentum.

| Evaluation Metric | Assembly Language Toolchain Ecosystem | Modern Fortran Toolchain Ecosystem |
| :---- | :---- | :---- |
| **Primary Compilers & Translators** | GNU Assembler (as), NASM, Yasm, LLVM Machine Code (llvm-mc)24. | GFortran, Intel Fortran (ifx), LLVM Flang, LFortran13. |
| **Build & Dependency Orchestration** | Raw Makefiles, CMake linker integration, or custom shell automation scripts. | Fortran Package Manager (fpm), CMake, Meson19. |
| **Language Server & IDE Support** | Disjointed; community syntax highlighters; no cross-platform semantic LSP. | Highly integrated; VS Code Modern Fortran extension powered by fortls19. |
| **Interactive Prototyping** | Compiler Explorer (Godbolt) for real-time translation feedback1. | LFortran interactive REPL and Jupyter Notebook integration12. |
| **Diagnostics & Safety Guardrails** | Minimal; assemble-time syntax parsing only; errors manifest as hardware faults18. | Robust; compile-time array checking and runtime flags (-fcheck=all)18. |
| **Platform Portability** | None; strictly coupled to specific target microarchitectures and host ABIs2. | Highly portable; standard ISO code compiles across Linux, macOS, and Windows4. |

### **The Assembly Environment: Fragmented and Unforgiving**

The toolchain for assembly language varies significantly depending on the target architecture and assembler dialect24. On Linux x86-64, setting up the GNU Assembler (as) or NASM requires only standard distribution packages24. However, the development experience remains fragmented:

* Assemblers perform basic tokenization, symbol resolution, and binary encoding, providing zero diagnostic feedback regarding type safety, uninitialized memory usage, or out-of-bounds array access18.  
* Errors surface almost exclusively at runtime in the form of segmentation faults or silent memory corruption, requiring constant reliance on low-level debuggers such as GDB or LLDB18.  
* Learning to read compiler output necessitates auxiliary visualization tooling, most notably Compiler Explorer, while analyzing real-world software binaries requires heavyweight binary analysis frameworks such as Ghidra or IDA Pro11.  
* When studying modern RISC architectures (such as RISC-V or AArch64) on an x86 host machine, developers face the extra friction of cross-compilation toolchains and CPU emulators like QEMU1.

### **The Modern Fortran Renaissance: Modernized and Accessible**

Historically, Fortran development was plagued by fragmented build environments, brittle Makefiles, and platform-specific compiler idiosyncrasies19. Over the past five years, the Fortran-lang community has fundamentally reshaped this ecosystem3:

* Using the Miniforge or Conda packaging infrastructure, an entire Modern Fortran toolchain can be provisioned into an isolated user environment with a single shell command:  
  Bash  
  conda create \--channel conda-forge \--name fortran-dev gfortran fpm fortls fprettify

  This single environment provides the GFortran compiler, the Fortran Package Manager (fpm), the fortls language server, and source formatting utilities without administrative machine permissions27.  
* The emergence of fpm brings the ergonomics of modern build systems like Rust's Cargo to Fortran19. By using a declarative fpm.toml manifest, fpm automatically parses project module dependencies, manages external source repositories, compiles source trees in the correct topological order, and coordinates test suites18.  
* Integration with Visual Studio Code via the Modern Fortran extension and the fortls Language Server Protocol implementation provides rich IDE features, including syntax auto-completion, hover type inspection, jump-to-definition, and inline diagnostic error markers33.  
* The development of LFortran—an LLVM-based interactive compiler—enables exploratory execution in interactive terminal REPLs and Jupyter notebooks, allowing numerical algorithms to be developed with the immediate feedback typical of Python or Julia12.

## **Architectural Set Selection: The Prerequisite Choice for Assembly**

A developer who commits to learning assembly language must immediately resolve an architectural choice that does not exist in standardized high-level languages: selecting the target Instruction Set Architecture (ISA). Assembly is not a single unified language, but a family of low-level notations that map to specific hardware architectures2.

                 Instruction Set Architecture (ISA) Tradeoffs

  x86-64 Architecture                   AArch64 (ARM 64-bit)                  RISC-V Architecture  
  \-------------------                   \--------------------                  \-------------------  
\- CISC Philosophy                     \- Modern RISC Architecture            \- Open Standard Modular RISC  
\- Variable Encodings (1–15 Bytes)     \- Fixed 32-bit Encodings              \- Minimal \~40 Instruction Base  
\- Dominant Enterprise / Desktop       \- Dominant Mobile / Apple / Cloud     \- Clean Academic Design  
\- Decades of Architectural Baggage    \- Strict Load/Store Memory Model      \- Missing Arithmetic Flags  
\- Essential for Vulnerability Audits  \- High Contemporary Deployment        \- Specialized Emulation Setup

### **The Pragmatic Utility of x86-64**

The x86-64 architecture dominates desktop computing and cloud data center server infrastructure2. It remains the primary architecture encountered in binary reverse engineering, malware triage, and closed-source software vulnerability research15.  
However, x86-64 is an accumulative CISC architecture spanning over four decades of legacy backward compatibility35. Its instructions are variable in length, ranging from 1 to 15 bytes, and its instruction encoding rules are intricate35.  
Furthermore, learners must navigate the syntax rift between Intel notation (widely used in reverse engineering and Windows environments) and AT\&T notation (the historical default of Unix GNU assemblers)36. Despite its steep learning curve, x86-64 provides the highest immediate utility for reverse engineering and desktop/server vulnerability analysis36.

### **The Structural Elegance of RISC-V**

RISC-V, originally conceived at UC Berkeley, is an open-standard architecture engineered specifically for clean pedagogical instruction and modular hardware implementation1. Its base integer instruction set (RV32I or RV64I) contains roughly 40 distinct instructions, all encoded in fixed 32-bit words with regular, uniform register fields1.  
RISC-V avoids the legacy architectural clutter of x86-64 and eliminates dedicated condition-code flags in favor of unified compare-and-branch instructions, simplifying processor state reasoning34.  
The primary drawback for a short-term learner is the physical deployment footprint: while RISC-V is expanding rapidly in microcontrollers and research environments, production hardware remains less ubiquitous than x86 or ARM, meaning learners must execute programs inside emulators like QEMU or Spike1.

### **The Contemporary Dominance of AArch64**

AArch64, ARM's 64-bit architecture, represents a pragmatic middle ground2. It powers nearly the entire global mobile ecosystem, modern Apple Silicon, and an increasing share of energy-efficient cloud infrastructure (such as AWS Graviton instances)2.  
AArch64 implements a modern, streamlined RISC load-store architecture with 31 general-purpose 64-bit registers and fixed 32-bit instruction widths, avoiding the accumulated design debt of x86-64 while providing native execution on modern ARM workstations2.  
For a developer operating on modern Apple hardware, AArch64 provides the smoothest path to native, bare-metal assembly experimentation2.

## **Labor Market Realities, Economic Returns, and Industry Demand**

The commercial value proposition of each language reflects distinct sectors of the global engineering economy. Assembly serves security and hardware infrastructure, while Fortran underpins physical simulations and institutional computing.

| Analytical Dimension | Assembly Language Domain | Modern Fortran Domain |
| :---- | :---- | :---- |
| **Core Target Roles** | Malware Reverse Engineer, Security Researcher, Firmware Developer, Kernel Engineer15. | HPC Application Specialist, Computational Physicist, Climate Simulation Scientist13. |
| **Primary Industry Sectors** | Cyber defense, defense contracting, semiconductor fabrication, systems infrastructure42. | Aerospace, numerical meteorology, nuclear energy, Department of Energy laboratories13. |
| **Typical US Compensation Range** | **![][image1]** \[cite: 42, 46\] | ![][image2] (Advanced HPC / National Labs)43 |
| **Entry Qualification Profile** | Computer Science or Computer Engineering; demonstrated binary exploitation or CTF portfolio. | Advanced STEM degrees (M.S./Ph.D.) in Applied Mathematics, Fluid Mechanics, or Physics43. |
| **Ten-Year Workforce Outlook** | High stability; hardware evolution sustains continuous demand for low-level auditing2. | Highly concentrated niche; expanding maintenance backlogs paired with an aging workforce48. |

### **The Assembly Market: Security, Firmware, and Binary Analysis**

Assembly language literacy is rarely hired as an isolated, single-skill job title; instead, it serves as a prerequisite across several high-compensation specializations15:

* In cybersecurity, software reverse engineers, exploit developers, and malware analysts rely on assembly reading comprehension to dissect untrusted binaries, analyze Advanced Persistent Threat (APT) vectors, and deconstruct firmware payloads6. The baseline salary range in this sector frequently spans ![][image3] to ![][image4], with senior defense-sector positions exceeding ![][image5]42.  
* In embedded systems engineering and semiconductor validation, assembly is required to author board support packages (BSPs), configure interrupt service routines, write memory management unit (MMU) initialization routines, and build real-time operating system (RTOS) contexts20.  
* In compiler engineering and runtime optimization, engineers inspect disassembled instructions to verify whether auto-vectorization routines correctly targeted AVX-512 or ARM NEON pipelines, tuning performance-critical kernels in foundational multimedia and cryptography libraries17.

### **The Fortran Market: High-Performance Computing and Legacy Infrastructure**

Fortran occupies a specialized niche focused on massive numerical scale and long-lived codebases13:

* The language underpins the planetary simulation infrastructure of numerical weather prediction (e.g., the ECMWF Integrated Forecasting System, NOAA models) and global climate circulation modeling (e.g., NASA Goddard Institute for Space Studies)13.  
* It dominates computational fluid dynamics (CFD), structural mechanics, astrophysics, and computational materials science across United States Department of Energy national laboratories, including Los Alamos, Lawrence Livermore, Oak Ridge, and Sandia21.  
* A 2023 evaluation by Los Alamos National Laboratory documented a persistent workforce risk: while mission-critical national security codes will continue to rely on Fortran for decades, the pipeline of graduating computer scientists fluent in the language has diminished, driving sustained institutional demand for engineers who can maintain and modernize legacy FORTRAN 77 and Fortran 90 codebases into modern Fortran standards13.  
* Compensation for specialized computational scientists and HPC engineers at national laboratories and aerospace institutions ranges between ![][image6] and ![][image7]43. However, these positions frequently require advanced degrees in computational science, physics, or mechanical engineering, along with government security clearances43.

## **Strategic Decision Framework and Selection Criteria**

The selection between Assembly and Modern Fortran should be guided by structural educational objectives, career specialization paths, and the realistic outcomes achievable within a 90-day learning window.

| Dimension | Opt for Assembly Language | Opt for Modern Fortran |
| :---- | :---- | :---- |
| **Core Intellectual Motivation** | Deepening mechanical hardware literacy and demystifying operating system interfaces2. | Expressing complex mathematical models and mastering parallel scientific simulation4. |
| **Tangible 90-Day Output** | Static analysis audits of compiled binaries; debugging optimization and memory bugs11. | Fully functioning, multi-threaded numerical libraries or scientific modeling pipelines9. |
| **Adjacent Language Synergies** | Direct synergy with C, C++, Rust, Zig, and low-level systems programming6. | Direct synergy with Python (f2py, NumPy), Julia, C (iso\_c\_binding), and MATLAB12. |
| **Target Career Trajectory** | Threat intelligence, vulnerability research, kernel development, firmware engineering15. | HPC research, national defense laboratories, climate modeling, aerospace engineering13. |

### **Criteria for Selecting Assembly Language**

Assembly is the optimal selection if the broader engineering goal is to master low-level systems programming and hardware execution mechanics2. Software developers who already possess fluency in higher-level compiled languages like C, C++, or Rust gain immense educational leverage from assembly6.  
Within three months, an assembly track will not produce a professional bare-metal assembly programmer, but it will establish foundational reading literacy20. This allows the engineer to audit binaries in Ghidra, analyze compiler optimization output, troubleshoot memory corruption defects, and evaluate the performance of generated code11.  
Furthermore, if the learner plans to enter cybersecurity, reverse engineering, or operating systems research, assembly literacy is an essential prerequisite6.

### **Criteria for Selecting Modern Fortran**

Modern Fortran is the optimal choice if the objective is to build complete, functional, high-performance computational projects before the end of the year4. With its small language footprint, array-oriented syntax, and the modern build automation of fpm, an engineer can go from syntax introduction to deploying scalable parallel simulation algorithms within weeks4.  
Fortran is particularly well-suited for developers working in applied mathematics, aerospace physics, meteorology, or high-performance linear algebra5. It provides immediate access to high-performance computing paradigms without the steep syntactic overhead of C++ template metaprogramming or manual pointer lifetime management5.  
Additionally, for practitioners targeting careers within national laboratories, research institutes, or engineering simulation centers, Modern Fortran offers access to specialized engineering roles managing mission-critical numerical software13.

## **Conclusions**

Within a dedicated three-month learning window, the strategic choice between Assembly and Modern Fortran hinges on a tradeoff between hardware literacy and end-to-end software delivery.  
Modern Fortran delivers the highest probability of shipping functional, production-ready software within 90 days4. Thanks to the recent modernization of its ecosystem—driven by the Fortran Package Manager (fpm), the fortls Language Server, and the modular syntax of the Fortran 2018 and 2023 standards—the historical tooling barriers associated with the language have been largely resolved3.  
An engineer choosing Fortran can reliably expect to design, parallelize, and benchmark real-world numerical solvers before the year concludes, while acquiring competencies directly applicable to high-performance computing, aerospace engineering, and national research infrastructure4.  
Assembly delivers a deeper long-term educational foundation for systems-level programming2. While three months is insufficient to become a prolific author of standalone assembly programs, it is ample time to build reading literacy in x86-64 or AArch6420.  
This literacy permanently alters an engineer’s mental model of software execution, transforming abstract language features into concrete sequences of register allocations, stack frames, and cache-line memory transactions7. It provides an indispensable foundation for disciplines where source code is unavailable, such as vulnerability analysis, malware triage, and reverse engineering6.  
Therefore, if the objective for the remainder of the year is to produce working, scalable numerical simulations and enter the domain of high-performance scientific computing, the learner should select **Modern Fortran**4.  
If the objective is to demystify physical hardware execution, inspect compiler lowering transformations, and establish the prerequisites for cybersecurity and systems programming, the learner should select **Assembly** with a dedicated focus on x86-64 or AArch64 reading comprehension6.

#### **Works cited**

> 1. RISC-V 101 | OS in 1,000 Lines, [https://operating-system-in-1000-lines.vercel.app/en/02-assembly](https://operating-system-in-1000-lines.vercel.app/en/02-assembly)  
> 2. 12 Best Assembly Language Courses for 2026: ARM to RISC-V, [https://www.classcentral.com/report/best-assembly-courses/](https://www.classcentral.com/report/best-assembly-courses/)  
> 3. Fortran… ok, and what's next? \- arXiv, [https://arxiv.org/html/2402.07520v1](https://arxiv.org/html/2402.07520v1)  
> 4. Fortran-lang.org, [https://fortran-lang.org/](https://fortran-lang.org/)  
> 5. What makes Fortran more straightforward for scientific and ... \- Quora, [https://www.quora.com/What-makes-Fortran-more-straightforward-for-scientific-and-engineering-computations-compared-to-C](https://www.quora.com/What-makes-Fortran-more-straightforward-for-scientific-and-engineering-computations-compared-to-C)  
> 6. Careers in Cyber \- TryHackMe, [https://tryhackme.com/room/careersincyber](https://tryhackme.com/room/careersincyber)  
> 7. What Is Machine Code? The Complete 2026 Guide \- Articsledge, [https://www.articsledge.com/post/machine-code](https://www.articsledge.com/post/machine-code)  
> 8. Courses Based on CS:APP \- CS:APP3e, Bryant and O'Hallaron, [https://csapp.cs.cmu.edu/3e/courses.html](https://csapp.cs.cmu.edu/3e/courses.html)  
> 9. ARCHER2-HPC/archer2-fortran-intro: Introduction to Modern Fortran, [https://github.com/ARCHER2-HPC/archer2-fortran-intro](https://github.com/ARCHER2-HPC/archer2-fortran-intro)  
> 10. Is Fortran better than Python for teaching the basics of numerical, [https://loiseaujc.github.io/posts/blog-title/fortran\_vs\_python.html](https://loiseaujc.github.io/posts/blog-title/fortran_vs_python.html)  
> 11. Ghidra vs IDA Pro: Key Features Explained | PDF \- Scribd, [https://www.scribd.com/document/882778522/session-3](https://www.scribd.com/document/882778522/session-3)  
> 12. LFortran, [https://lfortran.org/](https://lfortran.org/)  
> 13. Find Top Fortran Developers for Hire on Freelancer (September 2026), [https://www.freelancer.com/hire/fortran](https://www.freelancer.com/hire/fortran)  
> 14. Numerical projects — Fortran Programming Language, [https://fortran-lang.org/categories/numerical/](https://fortran-lang.org/categories/numerical/)  
> 15. 800 All Malware Reverse Engineer Salary Jobs & Work \- Indeed, [https://www.indeed.com/q-all-malware-reverse-engineer-salary-jobs.html](https://www.indeed.com/q-all-malware-reverse-engineer-salary-jobs.html)  
> 16. Reverse Engineering for Developers: Tools, Techniques, and Real, [https://www.gocodeo.com/post/reverse-engineering-for-developers-tools-techniques-and-real-world-use-cases](https://www.gocodeo.com/post/reverse-engineering-for-developers-tools-techniques-and-real-world-use-cases)  
> 17. Auto-Vectorization and SPMD \- Algorithmica, [https://en.algorithmica.org/hpc/simd/auto-vectorization/](https://en.algorithmica.org/hpc/simd/auto-vectorization/)  
> 18. LFortran compiles fpm \-, [https://lfortran.org/blog/2026/02/lfortran-compiles-fpm/](https://lfortran.org/blog/2026/02/lfortran-compiles-fpm/)  
> 19. Fortran-lang history — Fortran Programming Language, [https://fortran-lang.org/community/history/](https://fortran-lang.org/community/history/)  
> 20. How much assembly is used in embedded software development, [https://www.reddit.com/r/embedded/comments/1mj7ypu/how\_much\_assembly\_is\_used\_in\_embedded\_software/](https://www.reddit.com/r/embedded/comments/1mj7ypu/how_much_assembly_is_used_in_embedded_software/)  
> 21. Fortran in Modern Scientific Computing: An Unexpected Comeback, [https://medium.com/@stack1/fortran-in-modern-scientific-computing-an-unexpected-comeback-55be2564d22d](https://medium.com/@stack1/fortran-in-modern-scientific-computing-an-unexpected-comeback-55be2564d22d)  
> 22. The best Reverse Engineering courses on the web \- SendOwl, [https://www.sendowl.com/s/reverse-engineering](https://www.sendowl.com/s/reverse-engineering)  
> 23. CS 225: Computer Systems Fundamentals | PDF \- Scribd, [https://www.scribd.com/document/403597267/CS-225-Fundamentals-of-Computer-Systems-Junaid-H-Siddiqui](https://www.scribd.com/document/403597267/CS-225-Fundamentals-of-Computer-Systems-Junaid-H-Siddiqui)  
> 24. X86-64 Assembly: Essential Reference Guide \- SysTutorials, [https://www.systutorials.com/x86-64-isa-assembly-references/](https://www.systutorials.com/x86-64-isa-assembly-references/)  
> 25. Can C++ be as fast as Fortran? : r/cpp\_questions \- Reddit, [https://www.reddit.com/r/cpp\_questions/comments/1nnn5n8/can\_c\_be\_as\_fast\_as\_fortran/](https://www.reddit.com/r/cpp_questions/comments/1nnn5n8/can_c_be_as_fast_as_fortran/)  
> 26. A parallel Fortran framework for neural networks and deep learning, [https://arxiv.org/html/1902.06714v2](https://arxiv.org/html/1902.06714v2)  
> 27. articles tagged "Conda" \- Degenerate Conic, [https://degenerateconic.com/tag/conda.html](https://degenerateconic.com/tag/conda.html)  
> 28. What really is vectorization and how to implement it? \- Uncategorized, [https://fortran-lang.discourse.group/t/what-really-is-vectorization-and-how-to-implement-it/1665](https://fortran-lang.discourse.group/t/what-really-is-vectorization-and-how-to-implement-it/1665)  
> 29. Do Fortran compilers really generate faster code than C compilers?, [https://softwareengineering.stackexchange.com/questions/60372/do-fortran-compilers-really-generate-faster-code-than-c-compilers](https://softwareengineering.stackexchange.com/questions/60372/do-fortran-compilers-really-generate-faster-code-than-c-compilers)  
> 30. CUDA Pro Tip: Optimize for Pointer Aliasing | NVIDIA Technical Blog, [https://developer.nvidia.com/blog/cuda-pro-tip-optimize-pointer-aliasing/](https://developer.nvidia.com/blog/cuda-pro-tip-optimize-pointer-aliasing/)  
> 31. Is Fortran code still faster than C code? \- Reddit, [https://www.reddit.com/r/fortran/comments/1cozndo/is\_fortran\_code\_still\_faster\_than\_c\_code/](https://www.reddit.com/r/fortran/comments/1cozndo/is_fortran_code_still_faster_than_c_code/)  
> 32. Roadmap — Fortran Programming Language, [https://fortran-lang.org/roadmap/](https://fortran-lang.org/roadmap/)  
> 33. Modern Fortran \- Visual Studio Marketplace, [https://marketplace.visualstudio.com/items?itemName=fortran-lang.linter-gfortran](https://marketplace.visualstudio.com/items?itemName=fortran-lang.linter-gfortran)  
> 34. Some people believe that RISC-V is simple and elegant, other, [https://news.ycombinator.com/item?id=42960796](https://news.ycombinator.com/item?id=42960796)  
> 35. ARM vs x86; What are the key differences? \- Stack Overflow, [https://stackoverflow.com/questions/44269853/arm-vs-x86-what-are-the-key-differences](https://stackoverflow.com/questions/44269853/arm-vs-x86-what-are-the-key-differences)  
> 36. I want to learn assembler. Do I? If so x86 or arm? \- Help \- Ziggit, [https://ziggit.dev/t/i-want-to-learn-assembler-do-i-if-so-x86-or-arm/4328](https://ziggit.dev/t/i-want-to-learn-assembler-do-i-if-so-x86-or-arm/4328)  
> 37. Learning RISC-V vs x86 : r/learnprogramming \- Reddit, [https://www.reddit.com/r/learnprogramming/comments/rk6sat/learning\_riscv\_vs\_x86/](https://www.reddit.com/r/learnprogramming/comments/rk6sat/learning_riscv_vs_x86/)  
> 38. Fortran Installation & Setup \- CosmicLearn, [https://cosmiclearn.com/fortran/installation.php](https://cosmiclearn.com/fortran/installation.php)  
> 39. Simple setting in Windows \- \#6 by gnikit \- Visual Studio Code, [https://fortran-lang.discourse.group/t/simple-setting-in-windows/7071/6](https://fortran-lang.discourse.group/t/simple-setting-in-windows/7071/6)  
> 40. Cyber Reverse Engineer, Senior \- CACI International, Inc. \- Dice, [https://www.dice.com/job-detail/a10298c6-2498-4210-bdd8-e99da01589a2](https://www.dice.com/job-detail/a10298c6-2498-4210-bdd8-e99da01589a2)  
> 41. RISC-V or x86 : r/osdev \- Reddit, [https://www.reddit.com/r/osdev/comments/1jr1gs6/riscv\_or\_x86/](https://www.reddit.com/r/osdev/comments/1jr1gs6/riscv_or_x86/)  
> 42. Software Reverse Engineer \- STR \- BeBee, [https://bebee.com/us/jobs/software-reverse-engineer-str-arlington-va--t7xk-850760425](https://bebee.com/us/jobs/software-reverse-engineer-str-arlington-va--t7xk-850760425)  
> 43. Climate Computational Scientist Jobs, Employment | Indeed, [https://www.indeed.com/q-climate-computational-scientist-jobs.html](https://www.indeed.com/q-climate-computational-scientist-jobs.html)  
> 44. Staff Flight Sciences Software and HPC Engineer @ Archer, [https://jobs.alleycorp.com/companies/archer-technologies/jobs/66197288-staff-flight-sciences-software-and-hpc-engineer](https://jobs.alleycorp.com/companies/archer-technologies/jobs/66197288-staff-flight-sciences-software-and-hpc-engineer)  
> 45. HPC Application Performance Analyst (HLRS\_21\_2026), [https://www.wearedevelopers.com/jobs/ext/2317810-hpc-application-performance-analyst-hlrs\_21\_2026](https://www.wearedevelopers.com/jobs/ext/2317810-hpc-application-performance-analyst-hlrs_21_2026)  
> 46. ME00590-Reverse Engineer 3 \- Rippling, [https://ats.rippling.com/momentumcareers/jobs/62ae2a10-a120-4f27-b44e-cbc1d74bb25b](https://ats.rippling.com/momentumcareers/jobs/62ae2a10-a120-4f27-b44e-cbc1d74bb25b)  
> 47. Reverse Engineer Jobs in Singapore River Central Region \- Jobstreet, [https://sg.jobstreet.com/reverse-engineer-jobs/in-Singapore-River,-Central-Region](https://sg.jobstreet.com/reverse-engineer-jobs/in-Singapore-River,-Central-Region)  
> 48. Can Fortran survive another 15 years? \- Route Fifty, [https://www.route-fifty.com/infrastructure/2023/04/can-fortran-survive-another-15-years/385726/](https://www.route-fifty.com/infrastructure/2023/04/can-fortran-survive-another-15-years/385726/)  
> 49. The SEI CERT Coding Standard for Fortran, [https://www.sei.cmu.edu/blog/the-sei-cert-coding-standard-for-fortran/](https://www.sei.cmu.edu/blog/the-sei-cert-coding-standard-for-fortran/)  
> 50. How do you get into High-Performance Computing? : r/cpp \- Reddit, [https://www.reddit.com/r/cpp/comments/1chy760/how\_do\_you\_get\_into\_highperformance\_computing/](https://www.reddit.com/r/cpp/comments/1chy760/how_do_you_get_into_highperformance_computing/)  
> 51. Four Climate Postdoc Positions Available \- ICTP, [https://www.ictp.it/news/2026/6/four-climate-postdoc-positions-available](https://www.ictp.it/news/2026/6/four-climate-postdoc-positions-available)  
> 52. Organizations that use Fortran, for job seekers, [https://fortran-lang.discourse.group/t/organizations-that-use-fortran-for-job-seekers/7331](https://fortran-lang.discourse.group/t/organizations-that-use-fortran-for-job-seekers/7331)  
> 53. Is Fortran or C++ code better optimized? \- Advocacy, [https://fortran-lang.discourse.group/t/is-fortran-or-c-code-better-optimized/7469](https://fortran-lang.discourse.group/t/is-fortran-or-c-code-better-optimized/7469)  
> 54. SIMD City: Auto-Vectorisation \- Hacker News, [https://news.ycombinator.com/item?id=46336019](https://news.ycombinator.com/item?id=46336019)  
> 55. Radiative Transfer and Climate Model at Orau \- Terra.do, [https://www.terra.do/climate-jobs/job-board/radiative-transfer-and-climate-model-8409995/](https://www.terra.do/climate-jobs/job-board/radiative-transfer-and-climate-model-8409995/)  
> 56. \[D\] Fortran and Neural Networks : r/MachineLearning \- Reddit, [https://www.reddit.com/r/MachineLearning/comments/nge6ht/d\_fortran\_and\_neural\_networks/](https://www.reddit.com/r/MachineLearning/comments/nge6ht/d_fortran_and_neural_networks/)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAAWCAYAAACLxa2uAAAEXElEQVR4Xu2aW4hWVRTHV1pmlwelCMzoQmNKUFakmZRFFwlDSn0osYfKblSYlRWEdMMoKCIiiMgHpTFRIrMbVCQT9BCkQRlliRWVWBRdMamIWr9Ze3+zzubMfPtjRvjOsH/wZ85ee3+Lw5y1915n7SNSKIxilqiOTI2FQpMYp5qr2q56SDW52l0oNIPxqq2qf1W/qFao3lLN94MSjlWNTY0JB6hOSI2BY1RvqH5TfaZ6RHVIZUQeB4pNvi2qbarHpd7P2aqXVO+q+lRzKr1Grq9CF3Ov6gtVj+p11TSxh/iB6jA3jtX7dNUDqp9UZ7o+z9Gqy1VvqzYlfXC4aofqOtURqntU/6le8YMyWa/qFQtEJiU+CEbPLNVu1czQvki1T3VBa4SR46vQ5XykujlcvyoWzMtUf6nmxUHKt2KrKUFK8NUFM7/7WPW06m+pD+b7VA8nNgIJn0PtBimXif3mKGc7OdjOcjYm5VOuDeukOnlyfRW6nB9VC8J1DGZSDR7k7DjIcbcMHsyevVIfzK+pflad62y8eOJzrbO1g7E/JDZWVdIldhuYIub31tYI437V72LjIcdXoQF8qHo+XMdghlPD35ThBjM2fn+ts5GWYNvobO1gByDfTiHvJ+eHK8T8XjXQ3c/twX5eaOf4KjQAclceLPnyp6pVMnQ1Y7jBzFa+WDXG2VaK+XzQ2drxq1gQpnyv2hWu7xDzS1B7bgn2OKFyfBUaQsxZo3i4p1VGDDDcYE6hKvKJ2EvlpKRvKLiHugDkZe+7cB0nSRrMNwX7jaGd46vQIE4UW5mpNfNw36t2txjpYGZn+EesytAJf0p9ABJ8X4XrWClJg5kgxr40tHN8FRoGOfNJYnVfHvYp1e5+YjDPSDsSCOaXU2MC+Tm1Zl4AO+UbsYmXskesTgzXi93rlQPd/VC9wb4wtHN8FRrABrGXQHJYgrlHrBZMLZbcNmWkgnmiWHoRV8dO4Z53pkaxyUH5EBaJ3evVrV7jzmA/P7RzfNVxjlh/jihr8n8t7EdYfT6XgWBmZYYvVZfGQY4YzDPTjgSCeXNqDBwkViW4y9kIbmrQuawWqzZ4DhW7t0dD+/jQXh4HBNh5mKwTQjvHV6EBvCm2GkMszfGx0R9SPUSIxGBud5hAMPuDCc+TqmcSG0fMj7k2wX2NDH5sfrHYfRznbNwTtjOcjSPs51wbuK8XXTvXV6HL4ViXgwxWKYKZFzHavDzVwerJQ74w7XAcLLbyvSP2jYaHmi+/pw9xAsnuwAHFDW5cbxiXrqoevp94wrWplz/r2sD3IZTXOGYHTvY4tJnaGmHk+Co0AI6R+8SCh8C6rdJrrFF9LTYGcVzNqhePwoGJ8b5YIMdxBBI5Y8wX6Y99qfwEod5NgL/gbCmkRlQmOD4nVWDX8PXrCLsNNWxKkOwI06vd/eT6KjQEfwLYDZDudHLEXSh0LXwARB26UGg05NpUPOpeQguFRkH+fUlqLBQKhVHN/4BiJMlhcIjsAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKUAAAAWCAYAAAChdVwBAAAEm0lEQVR4Xu2afejfUxTHD0OYP0ySjRkZ24SZhw1hYhu21mz7gzV/eFpbszDPhCFF8lAiGcLY1oRio1BMTdIealMW8tA8tzVPIUqc1/fc+/2c793nO/cXfb5T91Xv9jnn3t/9/NrnfM7nnnN/IoXC/4CZqn1TZ6HQC3ZTTVC9r7pDdUDncKHQLLur1qj+VH2vukb1umqyn5RwkKpf6gzsr3pC9ZbqPdWszuEWt6gOdPYQ1XPOzmUXsZfoTdVa1b2qPTpmGCepXlS9rVqpOq1j1Mhdq9AAN6k+Ug1VvaIaLvYwVqv6u3lk01Gq21RbVMe7sQif/g2qucEerPpY7GciBPNfiXghLnNzclmqelYsoHi5XhYLKs+Jqq9Uo4M9TvWb6oz2DCNnrUJDrJcqiJaLBeXlqt9VE+Mk5QvVq6o3xAKpLijvEwtKzxyxIN412Dz0X8TmfS2WIc8KY31hitjvsZ/zHRF8Y5yPl+tBZ8NisaCL5K5VaIjNqqnhOgYln3AeyMlxkuM66R6Un6uWJT4yEvNPDfbOYpn53/K06rvER8CTdcn+cJjYvee1ZxgLVD+JzYectQoNsk71TLiOQQlHh39TugUle0n8jyb+44L/Zuf7L4KSTLsxdYrti9kTw3li976gGm4xP/jHBjtnrUKDXCr2gNhPfqC6U7ZffXcLSmz8DyX+o4L/Sedjn8keknuyLXhJOj+dOfwg224V4FvVJ+H6KrF7E5we7o3/4mDnrFVoGDb5PKQoHtIxHTMqugUlWacuKOPejCIiwqdzUrimqHpXLED7AmvWBRJFzZfhmuxcF5Tsc/HPDnbOWoUecKhYpqRXyUNa1TncpltQ0napC8oRwc++LXKkuwaCgzl9KXh+lfpAIog+C9fXS31QxvtdEuyctQo9gj3l4aq7xB4an96UGJQnJP5hwf9w4icA8T+Q+D1U+XU/uz02ib1AKd+I9RmBHinrnl8Nt6DbgH9asHPWKjQI1TLFDlUxQTlUtZdYL2+GmxfpFpT0KPHTOPcwDz8Nc7hb7LPIfSJjxeb0pYHO78zeNOVHsbYVTBdb98L2qHF18J8e7Jy16jhFbDxHtNP4fy1kQDb4UKqgJFPCp1Lt+zwxKEenA2JV9QuJ7xyx+bHnSUMa2zevY5/wHuf7Jx4Xq449e4qtQ+DDwcG+Mk4I8CXgpds72DlrFRrkNamyVmwJkfV+lvqKOAZlXVOZyp0A38n5rhUL/Ng8v191RTXc4kaxNcmYkQGqi6T7ceZ4sZ8Z4nz8TviOdT6OFh9zNtA4f97ZuWsVGoKMtUIsaxCU44JNkVDHrWIP68x0QOx47h3VucGmsiZ7+j7hQLHP2aBg8wKQlRe1ZxhU63VZzsP5NEEeod+a9kkPEWvrxPvRDdgqtgf25KxVaBD++GKlWBCQ1dJMBk+JndgwB/0hloXiEWVkH9UNYvMXSnVa5KFyJ1vxKeePQRbIthmRrMuJypLE72HLQSVNxc8nmCyOL4Xsf7tY6+sR1cjO4Ra5axUaxp/o7AiQRX0rqVDoORRAnDgVCjsEFEucO9cVW4VCT6AAOzt1FgqFQqP8DWY4LnlWEusFAAAAAElFTkSuQmCC>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAAAZCAYAAABJhMI3AAAEIElEQVR4Xu2YW6hWRRTHV1mZ1YOiCKl0oWOGUGbYUYNMtCIKsfShQh9KTUVFzbJAojKKBEUkgoh6KLJCiW5eoEI5gg+BGphiWqjRhYpCs0jRCF2/s2a+s/awv/3N6Sj4sH/wxz1r5lvuvWZmzZojUnNOmKYakBpr8rhEdbdqj+oF1eBid00rLlXtVP2nOqp6UvW5apIflHCVqldqTLhAdW1qDAxRbVYdU32jelnVpzAij4vEJn2rapdqlZT7Gav6ULVN1aEaV+g1cn2Vskz1rapNtUl1g9iPd6gud+NYrSNVz6v+UI1yfZ5BqvtVX6g+SvrgCtV+1SxVf9XTqtOqT/2gTN5XrRULAIsBHwTBM0b1s6o9tO9UnVBNaIwwcnw1ZbdqXnjeIBbEhaqTqnvjIOVHsdVDcPjosiDyu69Vr6pOSXkQn1W9lNj4AHxWrf6UyWK/Gehsw4NttLOxGF5xbXhXipOW66spv6seCM8xiGxpHNwWBzmekuZB9Pwj5UHcqDqiut3ZONDw+baztYKxvyU2VhFpid0FQ8X8LmiMMJ5T/SU2HnJ8VfKV6p3wHIMIN4V/U3oaRGz8foazsf2xrXe2VrDiyacp5HVyOjwo5nd6V3cnjwf7HaGd46sSchMOyYf7VC9K9enc0yCyZR5WXehsz4j5XO5srfhT7ONTflUdDM9LxPwSTM/8YI8TmeOrJTEnReH05sKILnoaxBRO+b1ih9WVSV8VvEPZh3OI/BSe4+SkQZwb7HNCO8dXFteJrURqRZxuL3Y3ONtBZCf8K3ZqdofjUv7hfPTh8BxP/jSIBA/7zNDO8ZUNOfF6sbqN/+TGYncnMYi3ph0JBPHj1JhA/qVW5GDpLj+ITXjKL2J1Hjwm9q4PdXV3QjWCfUpo5/iqZJ3Y4UKOIohtYrUctRS5K+VsBbGf2DaOq6G78M7fpUaxSaEMg6li7/pIo9d4ItjHh3aOr0qI9gHpCiIrEQ6p7ouDHDGI7WlHAkH8JDUGLhY79ZY6G0GlhszlTbHT03OZ2LutCO1rQntxHBBgp7FI+oZ2jq9KPhNbfRBLHP4I8bcUi89IDGKrIpQg+oLWs0b1WmLjKrbStQnqo9L8enmX2Htc7Wy8E7ZbnI2r3huuDbzXB66d66spXH8ogJkVgkiCp01SLoPVgvOJaYejt9hMbxG7Q3uo2fg9fYgbE7uBwna2G7c2jEtXkYf77WrXpt593bWB+ztlCtdR4CZCsT+sMcLI8VUJ160OsZfmgxYVeo23VN+LjUFc65jleGUEJuRLsQDGcXwAeYU8C/THvlR+YqhXCex7zpZCCuKk5ZrJlmSX+Pozwu6iBqWUYweMKHZ3kuurJf7Gcj5AWunOVbCmBP4wQB1Z8z8hl3KClx1uNZmQX+9JjTU1NTU15y9nAHc6HH2DkV2IAAAAAElFTkSuQmCC>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAAAZCAYAAABJhMI3AAAD+ElEQVR4Xu2YaahNURTHlyEZi0iGMj5DMsczFeKRIQkfEMmYMfNQyBSR5IOURHnyzJKeoVB6SlKGQpFZhhAZQ5RY/7v2Pmef/c49dyHlw/nVv3fX2uuuu1t7n73XeUQp/4QxrFq+M0VHBVZ/1k3WGlb96HBKLiqyrrB+sN6xFrLOsIa4QR4NWOV8p6ED6yDrBOsQazaVji1PsljnWFdZm1iVIhE6tHm6sY6yzrNKWD0jo4I2VyxLWXdZeayTrJYkX77MquLEYbeiQKtYb1idnDFLXZKJNjF2GVYxa0sQIexnFZFMHIuIGEz+d9Hk6cp6zso3dgHrK6tPECFocmXlOmuG+XycpIjYPd9Yg2wQ85R1inWW9ZPii4iVXOT5mrG+s6oaeyjJ92sHEUStjK+L48uFNg82g7+Ie0mKZNHmyspr1jDz2RYRjzQSdLdBDospexF3sw54vpok8fgLEPMqHM6A1cdxgqdCiyYPFhC/PSuIEFayPpLEA02uRK6x9pjPtoigrfnrk1TE1SRjh0keCbCAdSyIILrBuu3YFpzHOIu1aPKMJJnP2HA4wzzj72VsTa5EJpMkxHl4i7WWkm/npCJi5T+TjOOYQOxFVh0n5j3JpH1esh74zgQ0eeaTzAXFdJlp/BONrcmVExyqSGqFpO0jESFJRQQ4sD9QmAu3nH1sAHxxE8bh/8x3JqDJs5ziizjN+KcaW5NLRVOSnYheEUkvRIcDchVxI8ljjXPGFnKXM/6F4ieMyT7ynQlo8iyh+CKiePBPMrYmlxqcic1Z60l+pE10OIMtYmd/gFnGKnTsHqz7JPG273xCslA+L0j6My2aPFNIfntUOJwB3Qj8w42tyZUIGmNcLmVJiphH0o6glxrtxFmyFbEGyY3X0fM3Nv51xsZv3QuHA3AEoH3SoskzgmSu44NRAZcd/L2NrcmVCKp9h8IiYieCh6zBNsjBFjHf87c2frdBt+D232A+7yS59Vwqk3zXxmjQ5Glk7Lk2wIAnDZukurE1uRI5TbL7gG1x8E+ITxRtPi22iH4TWo1kYgM9P0Dnbxv3fiTfbxgOZ3LB5+5i7OwJVPqV0aLNgzeoHY4NillHHFubKyu4TfGei1VBEQuMjUM5jhUkyfv6A8x0krZgHMnOxrGAxt32oRbc2JsdG+PbHRsUUfwuctHkwXGCNqWesfEm8pbVIogQNLkSwaFfQjJpPN5zIqNCIesxSQyEVzmssn1ltCAXmutLJIvi34wABcYNuZXkUcLuhs8F/SreGPZ5fhdNHoCnCx0DWrltrHbR4QzaXDlx31j+B3CsoFVK+QvwjwG8UaX8Ifg3Gt5b4y63FCW48Ab4zpSUlJSU/5dfcQYqBs7AKP0AAAAASUVORK5CYII=>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAAAZCAYAAABJhMI3AAAEPUlEQVR4Xu2YacimYxTHj8GMLTEJWULGvmanrI1tJNsHRNlGhOxbIkOKspUle0NmSCENPqAYxQdroQgxsmTNWkSJ/+8553qe677f573fM0rNh/tX/973nOs857ne67ruc537Nev5XzhBWqvt7MkxXTpIek+6Vlq/OdwzFStJb0p/Sz9JF0vPS4fXQWKGdLf0nfSFtEDaoBHhrCs9IL0kvSad3hwesIL5Zr0ovSXdJK3ciMiRzbOn9KT0srRY2qcx6mRzjeUK6SNplvSstKX5h9+QVq3iHpVul9aRjpJ+kZZIq1cxlIJ3pbPC3lD6WJpXAgJysQlMnE1cZD75pSWTZw/pK2m3sGdLf0gHDCOcTK5JecdGf/TT5ot4rvSnNCf8+5vv4nJhA5/5R7qx8t1svog1Z0o/SCuGfYT559YeRphtHb7dK99UZPNwGG6rbFhovkiFbK5J+d78ZEFZRB5pEuwV/sukv6QLwgYeZWI4jYXPpMcqG9hx4vYO+yHp29HwAHafcsJTkSWTZzPz7z5nGOFcLf1qHg+ZXJ28LT0cv5dFhO3jJ1xoPpn5lW/N8FEjgVqIfc8wwtk5/FeGzUn9YDQ8hHpMLc6SyXOs+XefOBoewGHAv2/YmVydzDVPSD18X7rOJt7OPIonWbP+MQE+V+rGLmHfMYxwtgt/2YCfbeIjD99In7SdHWTylM1nMWvODv+pYWdyTQlFlaRFJN2xETERbmpiDw67LGp7EUttoWgDv4+bMMX/y7azg0weTv+4RaRO4z8j7EyuFJuan0R6RZK+0hxuwCNPvbiq8tFGjFvErcJP3YHfbfyEmeyStrODTB5q+bhFZPHwnxZ2JlcaauLm0vXmX8Kj2GYV8xt9fsu/hfln7mz5tw3/rWF/br5Rbb4278+yZPLQo/Ldx42GB5TO4uiwM7k64TblcplmvoizpNXMe6njqzigxXnEvJlevjVGj8jEGKvZNfzl1PJd9I5t6DtfaDs7yOQ5xvy7Tx6OOheFf7+wM7k6YbU/tNEichLhU+mwEhTMk54yjy2UEwY07U9UNhxqPuHSc95vfuvVcLqJuaHl7yKTZ+Owzy8BAU8ah2SNsDO5OnnO/PRBaXE4Vb9Zs/lkV1+35lsM79w04QVudjakbsovMd+o0mwfaD65jYYR3tDi26ny0UKdYhNPfCGbh/ndV9mwSHq8srO5JoVm+BnzXWERZ4dNUS5sY360qQ8cb961qSO81ZQeE3hdelU6MmxeHzmd7T6N99JbKpsc7f6S23zcKarJ5NnEvE1ZL2y6hR/Na3hNJlcn/LNhsfmkOTXnNUb91Y6xcbqmioOZ0uXSg9K9NnobqqEccENyk/MoXRq+Gk41HQA1eDIyeYCni3nSyt0l7dAcHpDNNSX1G8uyAGWltEY9/xH+MTC37ezJw+XEe2t9ufUsJVx4h7SdPT09PT3LLv8ChMw5uI6oGBYAAAAASUVORK5CYII=>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAAAZCAYAAABJhMI3AAAEZklEQVR4Xu2YachWRRTHj6Vh2gcLEVvMJEuNNrW0gjTMNkXK+lBRH2yjSNEsl4zMhaCINAgl2mgxi8SCFoUKyqCIyAIVlJQyWlxQ1JIKg6jze87Mc88z3vu881qCH+4P/rx3zsxz7r1nzsyc+4rUHBZuUfVOjTV5HKO6UrVBtVB1cmt3TUd0V61V/a3aq5qh+lA1wQ9KOFV1dGoM9FW9qPpE9aXqrtbuBnNVp7h2f9UK186lq9ikf6z6WvWk6tiWEcbFqrdVn6rWqEa19Bq5vkp5SLVZNVC1SjVY7MdfqXq6cWTrUNV81W7VBa4vwlawXnVvaPdTbRH7TYTg/5OICZzsxuTyhuo1sQCQDO+KBcFzkeoX1YjQHqv6UzWmOcLI8VXJOile+j2xIE5VHVCNi4OUn1SrVR+JvXhZEBeJBdFzj1jQu4U2D/m72LhtYhl4VejrDNeKPUcfZzsr2EY6G8nwtGvDcrEgRXJ9VbJLNTFcxyCypHFwSRzkmCXVQfxB9WZiY8YZf2loHyWW+f+VV1Q7ExsTRFazuuAMsXtPaY4w5ql+ExsPOb7a8o1qWbiOQYRzw9+UqiCyF2J/NrEPD/aHne3/CCKZvCk1iu3r7Olwo9i9by26G0wP9tGhneOrLXeKOWQ/3Kh6VNqfzlVBpI19SWI/J9hfcjb2SfZA7sk28Y60LqUc9snBWwfsUH0Xru8XuzfB9HBv7LeHdo6vDmFTxWkUTs9vGVFQFURmtSyIcW9h046wlMaHaw6xL8QC2hnwWfbiHCI/h2uyvyyI7NPY7w7tHF9ZnC6WidSKOP2stbtJVRApI8qCOCTY2XciZ7tr4GUY05kD5g8pf3Feemu4ni3lQYz3uyO0c3xlw554puoxsZuwFFNiEC9M7IOCfWliJ2DYn0rsHqqAst+240exCU/ZLlbnATUqfm8quhtQjWC/PrRzfLWF05TDhVOTIA5UHSdWS93sxkWqgkiNiJ1C28M47BTY8LjYMuE+kdFiYzpTcPPM7K0pv4qVYXCDmN9JzV7jgWC/LLRzfLWFaH8rRRDJRPhein3LE4M4Iu0QO3XfSmzXiI2PNScFLG1f7MY67Qln64gXxE5PTw8xP0wUnBba98UBAVYaSdIrtHN8teUDKbIiljhk1X4pPzFjEMuKUE52JqSLs80Um6hYbC9WTSu6G8wR80lGRo5X3SbVn5dXiP2mv7PxTNiGORufes+7NlBor3TtXF+VkBHvi80KQRwb2mzKZTwi5vzytEPsc+lz1XWhzclLdvo67USxJXJSaDNhZP2rzREGp3lZFnn4vmVSItS7aZ06QKxMifejWtgjtod7cny1hX82rBF7aLImzRR4WeyLhDHoL7FZjp+MkRNUD4qNf06KryEPJzvZwNLmnx/z5OCMI6v5Yng9sXvYgjhpqQhYkqwSbCmsrgVipdwzqvNauxvk+uoQ/8VyJECW+tKo5hDgwOGLquYQ4XDiu7XscKvJhAPv6tRYU1NTU3Pk8i/dryYtow08/gAAAABJRU5ErkJggg==>

[image7]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAAAZCAYAAABJhMI3AAAEa0lEQVR4Xu2Ye+ifUxzH3+7XZDXkUiMby33L3P4wNKwtafbHrCn3CM3McouGiBBiw4wWZkZLrn+gNCHlMs1qQrNyv+UaosTn9fuc83vOc77P8/2dn1H743nVu99zPud8P895Pudzbj+p439hlmlkbuwoY0vTCaY1putNu9erO4Zia9Pbpr9MP5jmmV40nZQ2MrYy3Wf6xvSpaalpj1qLXnY2fWcandmvUf23o0xPJOVSNpcP+sumd0y3mbaptXCOND1pesW00nR0rdYp9dXIVaYP5R/6vGms/MdvmbZL2j1mutu0i2ma6SfTetMOSZuchaa/5T4jmwVbKgbwwqRNKfSJwSQAJMMz8iCkHGH63HRYKE8y/W46brCFU+KrldWmC8Lzs/IPnm36wzQl2I+Vj+ImoQz8hgDcmthSJsh95EGkk7+a3jN9Ic/AE5P6Uk6W+ybbI/sF2+GJjWS4KynDo/IgRUp9tfKtPLMgBpEpjYOjgv1y05+mS0IZmI60IRubeFXeedrsm9g3lWf+hvKQ6evMxgCR1cwuGCN//0WDLZz5pp/l7aHEV19WmR4JzzGIcFD4C3PlnVmS2EYEG2tkzgzTjabL1JuJ8F8EkUx+PzfK13XWdKAfvP+0qnoAkgH7xFAu8dWXc+QOWQ/Xmm5Q7+68hel01dc/OsDv8nWDDeh107ZqD+JH8jWQd7JJPa36VCrhR/nH53xlWhee4+ATzBTejf2sUC7xNSQsqjiNwukhtRa9sFPTNl/PrlDVubYgMpWmhmc2sTfkAR0O+G36cDaRz8Lz1WoO4vnBfl4ol/gqYm95JnJWxOlr9eoaBIX1gqNKyk7yLIwbUFsQD8jKfEzTgPTjNzV/OB+9PjyzljcFMb7v7FAu8VUMa+I+ppvkLzmwXj0A05QdfUleYdyvap2BtiDmcAqgHUeiUj6RD3jOl/JzHpwr93tqVT1APFmcEsolvvryuHxzYdckiKNN28vPUjOTdkCGLTM9KD/vpYwzLc9sTUG8WT5NeE+EwNNuOAdu+szamsP59aXwPF3u94zBWufSYD8mlEt89YVof6AqiGQifKxq3Ypca3pK3jZyR/gbA9Ym/AEbEeX0sBvPabcktqF4QL57pjBL8MNAwZ6hPCc2CDDTSJIdQ7nEV19eUJUV8YjDPyF+UX3HZFTfVP0Ww52bQ3gbd6o3E283XZyU4Up5u4mJjSPUmerN+Mjx8t+MSmwcjLGNT2z0b3FSBg7aK5Jyqa9WyIjn5KNCECeFMotyZH95arM+kN7ctVlHuJHEM2YT98g7wu8ju8p97BbKDBhZ+vBgC2epmrMohfstgxKhL4uSMuwlP6bE93ET+V71CwCU+OoL/2xYKe800zvPFK521DXpuqRdBH/vqmpDp1l7I4equpsyIPPVm3GcVzkBsAa3wbLCTrtAPiVZUtKlJsJMoJ8c5e41HVyvHqDU15CkN5aNAbKUK1nHBsCGw42q41/CcYp763Cvgx0JbHiTc2NHR0dHx8bLP130MbFi9jnGAAAAAElFTkSuQmCC>