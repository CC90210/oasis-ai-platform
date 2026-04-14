import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";

/**
 * OasisGradient — slow, atmospheric deep-ocean gradient.
 * Tuned for a stable, non-distracting background wash.
 * Drop as a fixed-position layer behind content.
 */
export default function OasisGradient({
  opacity = 0.55,
}: {
  opacity?: number;
}) {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1, opacity }}
    >
      <ShaderGradientCanvas
        style={{ width: "100%", height: "100%" }}
      >
        <ShaderGradient
          control="props"
          type="waterPlane"
          animate="on"
          uTime={0}
          uSpeed={0.05}
          uStrength={1.2}
          uDensity={0.9}
          uFrequency={0}
          uAmplitude={0}
          positionX={0}
          positionY={0}
          positionZ={0}
          rotationX={50}
          rotationY={0}
          rotationZ={-60}
          color1="#0c4a6e"
          color2="#0e7490"
          color3="#164e63"
          reflection={0.05}
          cAzimuthAngle={180}
          cPolarAngle={80}
          cDistance={3.2}
          cameraZoom={9.5}
          lightType="3d"
          brightness={0.85}
          envPreset="night"
          grain="on"
          toggleAxis={false}
          zoomOut={false}
          hoverState=""
        />
      </ShaderGradientCanvas>
    </div>
  );
}
