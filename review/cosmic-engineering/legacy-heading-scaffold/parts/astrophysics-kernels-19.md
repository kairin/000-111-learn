### **WarpFactory and Warpax: Metric Discretization, Stress-Energy Evaluation, and Energy Conditions**

While the Einstein Toolkit evolves initial data forward in time, designing and testing exotic propulsion metrics (such as Alcubierre, Natário, Van Den Broeck, Lentz, or Fuchs-Helmerich warp shells) follows the *reverse* mathematical workflow: specifying a desired spacetime geometry g\_{\\mu\\nu}(t, x, y, z) that transports a passenger volume and solving the Einstein equations algebraically for the required stress-energy tensor T\_{\\mu\\nu} to evaluate its physicality. This reverse pipeline is implemented in WarpFactory (developed by Jared Fuchs, Christopher Helmerich, et al. at Applied Physics) and its modern JAX-based automatic-differentiation successor warpax.

