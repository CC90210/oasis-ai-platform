# Premium Components — OASIS AI Redesign Toolkit

Drop-in components for the 2026 redesign. Stack: React Three Fiber + ShaderGradient + Lenis.

## Components

### `<PremiumStarfield />`
GPU-accelerated cosmic starfield. Replaces any existing star background.
```tsx
import PremiumStarfield from "@/components/premium/PremiumStarfield";
<PremiumStarfield density={5000} opacity={0.4} />
```

### `<OasisGradient />`
Animated blue-green WebGL mesh — the "flowy oasis water" background.
```tsx
import OasisGradient from "@/components/premium/OasisGradient";
<OasisGradient opacity={0.55} />
```

### `<LenisProvider>`
Smooth-scroll wrapper. Wrap the app root once.
```tsx
import LenisProvider from "@/components/premium/LenisProvider";
<LenisProvider><App /></LenisProvider>
```

## Color Palette (Locked)

| Token | Hex | Use |
|-------|-----|-----|
| Background | `#fafafa` | Page background (warm white) |
| Gradient 1 | `#06b6d4` | Teal (oasis water) |
| Gradient 2 | `#0ea5e9` | Sky blue |
| Gradient 3 | `#f0fdf4` | Mist white |
| Foreground | `#0f172a` | Text (slate 900) |

## Typography

- Headline: [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif)
- Body: Geist or Inter

## Reference Sites

- [linear.app](https://linear.app) — sparse premium
- [vercel.com](https://vercel.com) — closest to OASIS vision
- [basement.studio](https://basement.studio) — advanced cosmic

## Next Steps (Redesign Day)

1. Wrap `App.tsx` in `<LenisProvider>`
2. Add `<OasisGradient />` + `<PremiumStarfield />` to landing layout
3. Rebuild hero with Instrument Serif headline + staggered Motion reveal
4. Replace current components with Aceternity UI equivalents
5. Ship to Vercel
