# Relativistic rocket kinematics

- Unit: `astrophysics-kernels-u09`
- Source: [`sources/astrophysics-kernels.md`](../../sources/astrophysics-kernels.md)
- Characters: `46585:51936`
- Lines: `160:185`
- Purposes: claim-review, learning
- Excerpt SHA-256: `245c298a252a521748647e6d14c14600e97f8ea44e42204aca4978734cbb7b9a`

This unit presents Ackeret mass ratios, rapidity, proper acceleration, and hyperbolic motion.

## Claims

### `astrophysics-kernels-u09-c01`

The displayed relativistic rocket and constant-proper-acceleration formulae follow under the stated exhaust and acceleration assumptions.

Type: `mathematical`. Status: `unchecked`. Priority: `medium`.

Review methods: calculation, logical-analysis.

Evidence needed: A derivation from four-momentum conservation and a dimensional check.

Assumptions:
- The exhaust model, frame, and constant proper acceleration assumptions hold. (`explicit`)

### `astrophysics-kernels-u09-c02`

The displayed Ackeret relation gives relativistic mass ratio as a function of terminal speed and exhaust speed.

Type: `mathematical`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, logical-analysis.

Evidence needed: A four-momentum derivation and low-speed limiting case.

Assumptions:
- Exhaust speed is defined in the vehicle instantaneous rest frame and the rocket model assumptions hold. (`inferred`)

### `astrophysics-kernels-u09-c03`

Rapidity provides the stated additive parameterization of relativistic velocity changes.

Type: `mathematical`. Status: `unchecked`. Priority: `medium`.

Review methods: calculation.

Evidence needed: A Lorentz-boost derivation and velocity-addition check.

Assumptions:
- Collinear boosts are assumed. (`inferred`)

### `astrophysics-kernels-u09-c04`

For collinear motion, coordinate acceleration equals proper acceleration divided by gamma cubed.

Type: `mathematical`. Status: `unchecked`. Priority: `high`.

Review methods: calculation.

Evidence needed: A differentiation of velocity with respect to coordinate and proper time.

Assumptions:
- Acceleration is collinear with velocity. (`inferred`)

### `astrophysics-kernels-u09-c05`

Constant proper acceleration produces the displayed hyperbolic worldline relations.

Type: `mathematical`. Status: `unchecked`. Priority: `high`.

Review methods: calculation.

Evidence needed: Integration of the rapidity equations with initial conditions.

Assumptions:
- Proper acceleration remains constant and collinear. (`inferred`)

## Learning goals

### `astrophysics-kernels-u09-g01`: Special relativity

Use rapidity and four-momentum to derive rocket and proper-acceleration relations.

Prerequisites: Special relativity, Calculus

Claim dependencies: `astrophysics-kernels-u09-c01`

## Exact source excerpt

## **4\. Hard Mathematical Formulations for Interstellar Transit**

To simulate relativistic starships traversing interstellar space without exotic metric manipulation, the computational physics kernel must integrate special-relativistic rocket kinematics coupled to relativistic magnetohydrodynamic and radiative interactions with the Interstellar Medium (ISM). The governing equations below utilize exact SI physical constants: speed of light c \= 299,792,458\\text{ m/s}, standard gravity g\_0 \= 9.80665\\text{ m/s}^2, proton mass m\_p \= 1.67262192 \\times 10^{-27}\\text{ kg}, electron mass m\_e \= 9.1093837 \\times 10^{-31}\\text{ kg}, elementary charge e \= 1.60217663 \\times 10^{-19}\\text{ C}, classical electron radius r\_e \= 2.81794032 \\times 10^{-15}\\text{ m}, and fine-structure constant \\alpha\_{\\text{fs}} \\approx 1/137.035999.

### **Relativistic Kinematics and Rocketry**

#### **The Relativistic Rocket Equation (Ackeret's Formula)**

Consider a rocket of instantaneous rest mass M expelling propellant backward at constant effective exhaust velocity v\_e \= I\_{sp} g\_0 measured in the rocket's instantaneous rest frame. Conservation of relativistic four-momentum P^\\mu \= (E/c, \\mathbf{p}) in the external inertial frame yields the differential relation:  
\\gamma M \\frac{dv}{1 \- v^2/c^2} \= M c\\,dw \= \-v\_e\\,dM  
where \\beta \= v/c is the normalized coordinate velocity, \\gamma \= (1 \- \\beta^2)^{-1/2} is the Lorentz factor, and w \= \\operatorname{artanh}(\\beta) \= \\frac{1}{2}\\ln\\\!\\left(\\frac{1 \+ \\beta}{1 \- \\beta}\\rig\[span\_259\](start\_span)\[span\_259\](end\_span)ht) is the additive **rapidity**. Integrating from initial wet mass M\_0 at v \= 0 to final dry mass M\_f at terminal velocity v \= \\beta c yields Jakob Ackeret's (1946) Relativistic Rocket Equation:  
R \= \\frac{M\_0}{M\_f} \= \\left( \\frac{1 \+ \\beta}{1 \- \\beta} \\right)^{\\frac{c}{2 v\_e}} \= \\exp\\\!\\left( \\frac{c}{v\_e} \\operatorname{artanh}(\\beta) \\right) \= \\exp\\\!\\left( \\frac{c\\,w}{v\_e} \\right)  
Solving for the terminal velocity \\beta as a function of mass ratio R \= M\_0 / M\_f yields:  
\\beta \= \\frac{v}{c} \= \\tanh\\\!\\left( \\frac{v\_e}{c} \\ln\\left(\\frac{M\_0}{M\_f}\\right) \\right) \= \\frac{R^{2 v\_e / c} \- 1}{R^{2 v\_e / c} \+ 1}  
Because rapidity w is strictly additive under collinear Lorentz boosts, a mission requiring symmetric acceleration to cruise velocity \\beta\_{\\max} followed by propulsive deceleration to rest at the target star system requires total rapidity change \\Delta w\_{\\text{tot}} \= 2 \\operatorname{artanh}(\\beta\_{\\max}), squaring the single-stage mass ratio: R\_{\\text{rende\[span\_261\](start\_span)\[span\_261\](end\_span)zvous}} \= R\_{\\text{flyby}}^2. If the rocket converts a fraction \\epsilon\_m of its annihilated or fused fuel mass into pure radiation and directs a kinetic fraction \\eta\_{\\text{th}} into the remaining reaction mass (1 \- \\epsilon\_m), the relativistic exhaust velocity of the reaction products is:

\\frac{v\_e}{c} \= \\sqrt{1 \- \\left(\\frac{1 \- \\epsilon\_m}{1 \- \\epsilon\_m \+ \\eta\_{\\text{th}}\\epsilon\_m}\\right)^2} \\approx \\sqrt{2\\eta\_{\\text{th}}\\epsilon\_m} \\quad (\\text{for } \\epsilon\_m \\ll 1\)

#### **Proper Acceleration, Coordinate Acceleration, and Hyperbolic Motion**

Let \\alpha denote the **proper acceleration** measured by an onboard accelerometer in the ship's instantaneous rest frame (where u^\\mu \= (\\gamma c, \\gamma \\mathbf{v}) and a^\\mu a\_\\mu \= \\alpha^2), and let a \= dv/dt denote the **coordinate acceleration** measured in the barycentric frame of the galaxy. For rectilinear motion along the x-axis, four-acceleration transformation gives:  
a \= \\frac{dv}{dt} \= \\frac{\\alpha}{\\gamma^3} \= \\alpha \\left(1 \- \\frac{v^2}{c^2}\\right)^{3/2}, \\qquad \\frac{d(\\gamma v)}{dt} \= \\frac{d(c\\sinh w)}{dt} \= \\alpha  
Under constant proper acceleration \\alpha, integrating with respect to ship proper time \\tau and galactic coordinate time t (with initial conditions x(0) \= 0, v(0) \= 0, t(0) \= 0 at \\tau \= 0\) produces the exact hyperbolic motion equations:  
w(\\tau) \= \\frac{\\alpha \\tau}{c} \= \\operatorname{arsinh}\\\!\\left(\\frac{\\alpha t}{c}\\right) t(\\tau) \= \\frac{c}{\\alpha}\\sinh\\\!\\left(\\frac{\\alpha \\tau}{c}\\right), \\qquad \\tau(t) \= \\frac{c}{\\alpha}\\operatorname{arsinh}\\\!\\left(\\frac{\\alpha t}{c}\\right) \= \\frac{c}{\\alpha}\\ln\\\!\\left\[\\frac{\\alpha t}{c} \+ \\sqrt{1 \+ \\left(\\frac{\\alpha t}{c}\\right)^2}\\right\] \\beta(\\tau) \= \\tanh\\\!\\left(\\frac{\\alpha \\tau}{c}\\right) \= \\frac{\\alpha t / c}{\\sqrt{1 \+ (\\alpha t / c)^2}}, \\qquad \\gamma(\\tau) \= \\cosh\\\!\\left(\\frac{\\alpha \\tau}{c}\\right) \= \\sqrt{1 \+ \\left(\\frac{\\alpha t}{c}\\right)^2} x(\\tau) \= \\frac{c^2}{\\alpha}\\left\[\\cosh\\\!\\left(\\frac{\\alpha \\tau}{c}\\right) \- 1\\right\] \= \\frac{c^2}{\\alpha}\\left(\\sqrt{1 \+ \\left(\\frac{\\alpha t}{c}\\right)^2} \- 1\\right) \= \\frac{c^2}{\\alpha}(\\gamma \- 1\)  
During cruise or acceleration at Lorentz factor \\gamma, a target star system separated by rest-frame proper distance D\_0 appears Lorentz-contracted along the flight vector in the ship's instantaneous rest frame to D\_{\\text{ship}} \= D\_0 / \\gamma \= D\_0 \\sqrt{1 \- \\beta^2}.
