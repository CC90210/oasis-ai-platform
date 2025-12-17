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
1. **UI/UX Standardization:** Implemented `GlobalBackground` and optimized `CursorGlow` across all pages.
2. **Hero Performance:** Achieved stable 30fps+ on all devices with throttled animations and reduced particle counts.
3. **Immersive Effects:** Added multiple DNA strands and removed old blob animations.
4. **Removed Fake Data:** All hardcoded stats removed from dashboard.
5. **Fixed Auth Build Error:** Deleted conflicting `src/lib/auth.js`.
6. **Created Workflow Guide:** context restoration guide located in `.agent/workflows/restore-context.md`.

## 🚀 Deployment Command
Use this to deploy updates:
```powershell
git add .
git commit -m "Update description"
git push
```
