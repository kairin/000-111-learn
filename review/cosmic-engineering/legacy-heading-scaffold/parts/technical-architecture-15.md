###### *4th-Order Runge-Kutta (RK4) Integration*

Standard scientific simulations use RK4 to bound global error accumulation. The state step is calculated via four intermediate derivative evaluations per timestep  \$h\$ :  \$\$k\_1 \= f(t, y)\$\$   \$\$k\_2 \= f\\left(t \+ \\frac{h}{2}, y \+ \\frac{h}{2} k\_1\\right)\$\$   \$\$k\_3 \= f\\left(t \+ \\frac{h}{2}, y \+ \\frac{h}{2} k\_2\\right)\$\$   \$\$k\_4 \= f(t \+ h, y \+ h k\_3)\$\$   \$\$y\_{\\text{new}} \= y \+ \\frac{h}{6}(k\_1 \+ 2k\_2 \+ 2k\_3 \+ k\_4)\$\$While highly accurate over extended orbital timescales, RK4 requires four complete function evaluations per step, creating high computational overhead during real-time, frame-bound execution cycles.

