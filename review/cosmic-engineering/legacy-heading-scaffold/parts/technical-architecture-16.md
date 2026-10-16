###### *Simplified Euler Integration*

Under constrained frame-rate conditions (such as real-time 10 FPS update loops operating at  \$h \= 0.1\\text{s}\$  intervals), the engine dynamically shifts localized entity physics to simplified Euler integration:  \$\$y\_{\\text{new}} \= y \+ h \\cdot f(t, y)\$\$

* **Computational Complexity:**  Reduces derivative evaluations from 4 to 1 per timestep, yielding an immediate  \$\\sim 4\\times\$  processing speedup per entity.  
* **Game Loop Impact:**  Lowering CPU execution time per entity frees up cycle budgets to maintain stable 10 FPS /  \$0.1\\text{s}\$  update loops across high entity counts.  
* **Numerical Drift Management:**  While Euler integration introduces position drift over long durations, this is managed by using RK4 periodic corrections on backend Fortran servers for stable long-term planetary orbits while reserving Euler for short-term active craft piloting.

