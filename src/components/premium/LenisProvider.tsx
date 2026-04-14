import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

/**
 * LenisProvider — buttery-smooth scroll globally.
 * Wrap your app root in this component.
 *
 * Usage:
 *   <LenisProvider>
 *     <App />
 *   </LenisProvider>
 */
export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
