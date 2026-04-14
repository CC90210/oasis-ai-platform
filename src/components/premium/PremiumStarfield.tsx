import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

/**
 * PremiumStarfield — GPU-accelerated cosmic starfield background.
 * Drop as a fixed-position layer behind content.
 *
 * Usage:
 *   <PremiumStarfield />
 *   <main className="relative z-10">...</main>
 */
export default function PremiumStarfield({
  density = 5000,
  depth = 60,
  speed = 0.5,
  opacity = 0.6,
}: {
  density?: number;
  depth?: number;
  speed?: number;
  opacity?: number;
}) {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity }}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars
          radius={100}
          depth={depth}
          count={density}
          factor={4}
          saturation={0}
          fade
          speed={speed}
        />
      </Canvas>
    </div>
  );
}
