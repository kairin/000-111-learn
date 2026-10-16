###### *Mission Control Telemetry and Real-Time Controls*

                        Apollo Telemetry Signal Delay Chain  
    
  \[Lunar Module Transmits Telemetry\]  
                 |  
                 v (1.3 Seconds \- Speed of Light)  
  \[Mission Control Receives Telemetry\]  
                 |  
                 v (4.0 Seconds \- Ground Control Analysis)  
  \[Correction Guidance Generated\]  
                 |  
                 v (1.3 Seconds \- Speed of Light)  
  \[Lunar Module Receives Message Display\]  
    
  Total Latency \= 1.3s \+ 4.0s \+ 1.3s \= 6.6 Seconds Total Delay

* **Signal Delay Implementation** : To replicate authentic astronaut-ground communications, telemetry processing incorporates a fixed 6.6-second round-trip latency ( \$1.3\\text{ s}\$  Earth-Moon transit \+  \$4.0\\text{ s}\$  Ground Control processing \+  \$1.3\\text{ s}\$  Moon-Earth return).  
* **Control Feedback Modes** :  
* *High-Speed Emergency Mode* : When descent velocity reaches  \$\\ge 400\\text{ ft/s}\$ , vertical thrust increments ramp up at  \$10\\text{ lbs/s}\$  per frame (compared to  \$1\\text{ lb/s}\$  standard).  
* *High-Thrust Reduction Mode* : When thrust exceeds  \$\> 30\\text{ lbs/s}\$ , thrust drops at  \$5\\text{ lbs/s}\$  per frame for rapid power reduction.  
* **Display Optimization** : To eliminate visual artifacts without triggering costly full-screen redraws, memory locations are updated via direct zero-page cursor positioning (POKE 211, X: POKE 214, Y: SYS 58640), overwriting stale figures directly. Touchdown velocity must remain  \$\\le 5\\text{ ft/s}\$  on both vertical and horizontal axes to avoid crashing.

