# Bussard ramjets and magnetic sails

- Unit: `astrophysics-kernels-u11`
- Source: [`sources/astrophysics-kernels.md`](../../sources/astrophysics-kernels.md)
- Characters: `57492:65214`
- Lines: `214:240`
- Purposes: claim-review, learning
- Excerpt SHA-256: `54fb3e8495edcfa8ecacce01d79d68fb90f99c39dc0f3e1a55712d87fd828abd`

This unit derives a ramjet limit and describes magnetic/plasma sails as high-speed brakes.

## Claims

### `astrophysics-kernels-u11-c01`

The displayed Bussard ramjet limit is an exact universal ceiling and magnetic sails act exclusively as relativistic brakes.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, calculation, reproduction.

Evidence needed: Field, plasma, and momentum accounting with stated scoop geometry and ambient flow.

Assumptions:
- The intake, fusion, field, and ambient-medium models capture all relevant effects. (`inferred`)

### `astrophysics-kernels-u11-c02`

The source states that proton-proton fusion and bremsstrahlung impose the described Bussard ramjet constraints.

Type: `empirical`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, calculation.

Evidence needed: Fusion cross-section, plasma-loss, and intake model.

### `astrophysics-kernels-u11-c03`

The displayed gamma maximum and exhaust-speed equations provide exact Bussard ramjet limits.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, primary-source.

Evidence needed: Full derivation and comparison with modern scoop models.

### `astrophysics-kernels-u11-c04`

The magnetic-sail equations imply a propellantless relativistic braking force in the stated medium.

Type: `mathematical`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, reproduction.

Evidence needed: Relativistic plasma model with field geometry and ambient-flow frame.

## Learning goals

### `astrophysics-kernels-u11-g01`: Interstellar propulsion limits

Distinguish momentum exchange, fusion energetics, intake drag, and braking frames.

Prerequisites: Plasma physics, Relativity

Claim dependencies: `astrophysics-kernels-u11-c01`

## Exact source excerpt

### **Bussard Ramjet and Magnetic Sails**

#### **Exact Mathematical Limits of the Bussard Ramjet**

In 1960, Robert W. Bussard proposed eliminating onboard propellant mass by using a vast axisymmetric magnetic funnel to scoop ionized ISM protons and fuse them via the proton-proton (p\\text{-}p\[span\_281\](start\_span)\[span\_281\](end\_span)\[span\_284\](start\_span)\[span\_284\](end\_span)) chain to expel a high-enthalpy plasma exhaust. Rigorous nuclear and relativistic electrodynamic analyses expose three insurmountable mathematical bottlenecks that invalidate the pure p\\text{-}p Bussard Ramjet.  
First, the reactor faces the proton-proton weak cross-section bottleneck. The primary p \+ p \\to \\text{D} \+ e^+ \+ \\nu\_e fusion reaction requires a simultaneous weak-interaction \\beta^+ quark conversion (u \\to d) during the fleeting \\sim 10\[span\_287\](start\_span)\[span\_287\](end\_span)\[span\_289\](start\_span)\[span\_289\](end\_span)^{-21}\\text{ s} proton-proton Coulomb collision. Its astrophysical S-factor is S\_{pp}(0) \= 4.01 \\times 10^{-46}\\text{ keV}\\cdot\\text{cm}^2, yielding a non-resonant Gamow-peak reactivity \\langle\\sigma v\\rangle\_{pp} \\sim 10^{-43}\\text{ m}^3/\\text{s} at T \\sim 15\\text{ keV}—roughly 10^{20} to 10^{22} times smaller than \\text{D-T} or \\text{D-}^3\\text{He} fusion.  
Second, the compressed plasma suffers catastrophic Bremsstrahlung radiative quenching. Within the compressed fusion throat of ion density n\_r and temperature T\_e, the volumetric fusion power density p\_{\\text{fus}} versus volumetric electron-ion Bremsstrahlung loss density p\_{\\text{brem}} is governed by:  
p\_{\\text{fus}} \= \\frac{1}{4} n\_r^2 \\langle \\sigma v \\rangle\_{pp} E\_{pp}, \\qquad p\_{\\text{brem}} \= C\_B Z\_{\\text{eff}}^2 n\_r^2 T\_e^{1/2}  
where C\_B \= \\frac{16}{3}\\sqrt{\\frac{2\\pi}{3}}\\frac{r\_e^3 m\_e c^2}{\\alpha\_{\\text{fs}}^{-1}}\\sqrt{\\frac{k\_B}{m\_e c^2}} \\approx 1.42 \\times 10^{-40}\\text{ W}\\cdot\\text{m}^3\\text{K}^{-1/2}. Because both rates scale as n\_r^2, their ratio p\_{\\text{fus}} / p\_{\\text{brem}} is independent of plasma density and depends solely on temperature. For pure p\\text{-}p fusion, p\_{\\text{brem}} \\gg p\_{\\text{fus}} by more than 15 orders of magnitude at all temperatures, meaning the plasma radiates away its thermal energy via X-rays vastly faster than fusion can heat it.  
Third, even if the reactor utilizes CNO-cycle catalytic carbon or fuses ambient deuterium (\\text{D}/p \\approx 1.5 \\times 10^{-5}), John Ford Fishback (1969) proved in a special-relativistic MHD analysis that funneling ISM ions radially inward imparts a colossal transverse momentum flux against the magnetic field lines of the scoop. By applying the Virial Theorem to the superconducting magnetic field coils of material density \\rho\_c and maximum tensile working stress \\sigma\_{\\max}, Fishback derived the absolute upper bound on the Lorentz factor \\gamma\_{\\max} of a constant-acceleration (a) ramjet:  
\\gamma\_{\\max} \= \\frac{\\epsilon\_{\\text{fus}} B\_0 \\sigma\_{\\max}}{4 e n\_0 a c^2 \\rho\_\[span\_267\](start\_span)\[span\_267\](end\_span)c}  
where B\_0 \\approx 10^{-10}\\text{ T} is the ambient galactic magnetic field and \\epsilon\_{\\text{fus}} \\approx 7.1 \\times 10^{-3} is the nuclear mass-energy conversion efficiency. Furthermore, compressing the incoming relativistic stream from scoop area A\_{\\text{s\[span\_268\](start\_span)\[span\_268\](end\_span)coop}} into throat area A\_{\\text{throat}} excites synchrotron radiation and ion-acoustic turbulence with an intake kinetic efficiency \\eta\_{\\text{in}} \< 1\. Energy balance across the ramjet requires:  
v\_{\\text{exhaust}} \= c\\sqrt{1 \- \\frac{1 \- \\eta\_{\\text{in}}\\beta^2}{\\left(1 \+ (\\gamma \- 1)\\eta\_{\\text{in}} \+ \\frac{\\epsilon\_{\\text{fus}}}{\\gamma}\\right)^2}} \> \\beta c  
Whenever (1 \- \\eta\_{\\text{in}})(\\gamma \- 1\) \> \\epsilon\_{\\text{fus}}, momentum drag at the magnetic intake exceeds exhaust thrust, imposing a strict terminal velocity cap \\beta\_{\\max} \\approx \\sqrt{\\frac{2\\epsilon\_{\\text{fus}}}{1 \- \\eta\_{\\text{in}}}}. Unless \\eta\_{\\text{in}} \> 0.99, even a catalyzed fusion ramjet becomes a net brake above 0.05c \- 0.12c.

#### **Magnetic and Plasma Sails (Zubrin-Andrews): Why They Act as Relativistic Brakes**

Proposed by Dana Andrews and Robert Zubrin (1988), a Magnetic Sail (Magsail) deploys a large superconducting cable loop of radius R\_c carrying current I\_c without carrying onboard propellant. By the Biot-Savart law, the axial magnetic field along the loop centerline z is:  
B\_{\\text{cl}}(z) \= \\frac{\\mu\_0 I\_c R\_c^2}{2(z^2 \+ R\_c^2)^{3/2}}  
which behaves at distances r \\gg R\_c as a magnetic dipole of moment M\_d \= \\pi R\_c^2 I\_c. When immersed in a plasma stream of mass density \\rho\_p and relative velocity \\mathbf{u}\_{\\text{rel}} \= \\mathbf{v}\_{\\tex\[span\_271\](start\_span)\[span\_271\](end\_span)t{plasma}} \- \\mathbf{v}\_{\\text{ship}}, the magnetic field deflects incoming protons and electrons at the magnetopause standoff distance L\_Z, where magnetic pressure B^2/(2\\mu\_0) balances the relativistic plasma ram pressure \\gamma\_{\\text{rel}}^2 \\rho\_p u\_{\\text{rel}}^2:  
\\frac{B(L\_Z)^2}{2\\mu\_0} \= \\gamma\_{\\text{rel}}^2 \\rho\_p u\_{\\text{rel}}^2 \\implies L\_Z \= R\_c \\left( \\frac{\\mu\_0 I\_c^2}{8 \\gamma\_{\\text{rel}}^2 \\rho\_p u\_{\\text{rel}}^2 R\_c^2} \\right)^{1/6}  
Integrating the momentum transfer of deflected ions over the effective magnetosphere cross-section A\_G(v) \\propto \\pi L\_Z^2 yields the Andrews-Zubrin / Toivanen-Janhunen MHD force equation:  
\\mathbf{F}\_{\\text{MS}} \= 1.214 \\left(\\frac{1}{2} \\gamma\_{\\text{rel}}^2 \\rho\_p \\|\\mathbf{u}\_{\\text{rel}}\\|^2\\right) \\pi L\_Z^2 \\,\\hat{\\mathbf{u}}\_{\\text{rel}} \= m\_{\\text{tot}}\\frac{d(\\gamma \\mathbf{v}\_{\\text{ship}})}{dt} \= 2\\rho\_{\\text{im}} A\_G(v) \\gamma\_{\\text{rel}}^2 \\|\\mathbf{v}\_{\\text{plasma}} \- \\mathbf{v}\_{\\text{ship}}\\|(\\mathbf{v}\_{\\text{plasma}} \- \\mathbf{v}\_{\\text{ship}})  
The fundamental vector dependence on (\\mathbf{v}\_{\\text{plasma}} \- \\mathbf{v}\_{\\text{ship}}) explains why a magnetic sail cannot accelerate a starship to relativistic speeds. Inside a stellar heliosphere, the solar wind flows radially outward at v\_{\\text{plasma}} \= u\_{\\text{sw}} \\approx 400 \- 800\\text{ km/s} (0.0013c \- 0.0027c). A magsail can only extract forward thrust while v\_{\\text{ship}} \< u\_{\\text{sw}}; the moment the vessel exceeds u\_{\\text{sw}} \\approx 0.002c, the relative velocity vector \\mathbf{u}\_{\\text{rel}} \= \\mathbf{u}\_{\\text{sw}} \- \\mathbf{v}\_{\\text{ship}} reverses sign, and the solar wind drags the ship backward. Outside the heliopause in the interstellar medium, the ambient plasma is nearly stationary in the local galactic standard of rest (\\mathbf{v}\_{\\text{plasma}} \\approx \\mathbf{0}). Consequently, \\mathbf{u}\_{\\text{rel}} \= \-\\mathbf{v}\_{\\text{ship}}, and the magsail force is strictly antiparallel to the ship's velocity:  
F\_{\\text{MKM}} \= m\_{\\text\[span\_273\](start\_span)\[span\_273\](end\_span){tot}}\\dot{v} \= \-2\\gamma^2 \\rho\_{\\text{ISM}} v\_{\\text{ship}}^2 A\_G(v\_{\\text{ship}}) \< 0  
Thus, at relativistic velocities (0.05c \- 0.5c), the Zubrin-Andrews magsail operates exclusively as a propellantless *brake*. By eliminating the deceleration burn, a magsail halves the total mission rapidity requirement (\\Delta w\_{\\text{tot}} \= \\operatorname{artanh}(\\beta\_{\\max}) instead of 2\\operatorname{artanh}(\\beta\_{\\max})), reducing the required launch mass ratio from R^2 to R.
