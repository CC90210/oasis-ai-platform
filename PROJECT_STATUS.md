# 🏗️ OASIS AI - Project Status Anchor

**Last Updated:** 2024-12-07
**Current Phase:** Production Foundation (Zero Fake Data)

## 📌 Context
This project is the client portal for OASIS AI. We have just transformed it from a demo mock-up to a production-ready foundation.

## 🛠️ Tech Stack
- **Framework:** React + Vite
- **Styling:** Tailwind CSS + Lucide Icons
- **Auth:** Custom dummy auth (ready for real logic) in `src/lib/auth.ts`
- **Data:** JSON-based (read from `public/client-data/`)
- **Deployment:** Vercel/Netlify via GitHub

## 📂 Key Files
- `src/lib/auth.ts`: Authentication logic (currently has empty `CLIENT_CREDENTIALS`).
- `src/pages/dashboard/[clientId].tsx`: Main dashboard logic (fetches JSON).
- `src/components/EmptyState.tsx`: Shown when a client has 0 automations.
- `public/client-data/`: Directory where client JSON files live.

## 📝 Recent Major Changes
1. **Emergency Fix 2024-12-16:** Restored global star field by moving it to root layout (`App.tsx`).
2. **DNA Visuals:** Updated `CinematicDNA` with repulsion logic to prevent clumping and refined visuals.
3. **Hero Optimization:** Replaced static helix with living, drifting DNA ecosystem.
4. **Global Consistency:** Enforced transparent page backgrounds to show stars.
5. **Performance:** Reduced `CursorGlow` size to 120px and optimized for desktop-only.
6. **Cleanup:** Removed all legacy background animations and blobs.
7. **Removed Fake Data:** All hardcoded stats removed from dashboard.
8. **Fixed Auth Build Error:** Deleted conflicting `src/lib/auth.js`.
9. **Created Workflow Guide:** context restoration guide located in `.agent/workflows/restore-context.md`.

## 🚀 Deployment Command
Use this to deploy updates:
```powershell
git add .
git commit -m "Update description"
git push
```
