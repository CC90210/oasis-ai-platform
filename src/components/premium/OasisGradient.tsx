import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";

/**
 * OasisGradient — animated blue-green WebGL mesh gradient.
 * The "flowy oasis water" background effect.
 *
 * Usage:
 *   <OasisGradient />
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
          uSpeed={0.2}
          uStrength={2.5}
          uDensity={1.5}
          uFrequency={0}
          uAmplitude={0}
          positionX={0}
          positionY={0}
          positionZ={0}
          rotationX={50}
          rotationY={0}
          rotationZ={-60}
          color1="#06b6d4"
          color2="#0ea5e9"
          color3="#f0fdf4"
          reflection={0.1}
          cAzimuthAngle={180}
          cPolarAngle={80}
          cDistance={2.8}
          cameraZoom={9.1}
          lightType="3d"
          brightness={1.2}
          envPreset="city"
          grain="on"
          toggleAxis={false}
          zoomOut={false}
          hoverState=""
        />
      </ShaderGradientCanvas>
    </div>
  );
}
