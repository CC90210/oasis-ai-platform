---
description: How to restore context and deploy changes after restarting AntiGravity
---

# 🔄 AntiGravity Context Restoration & Deployment Guide

Use this guide whenever you restart AntiGravity to instantly restore context and manage your deployment workflow.

## 1. 🧠 Restore Context (The "First Move")

**User:** When you open a new chat, type:
> "Restore context using the workflow guide."

**Agent Action (Copy this checklist):**
1. [ ] **Read Project State:**
   - `view_file PROJECT_STATUS.md` (or `task.md` / `implementation_plan.md` in the brain folder)
   - `list_dir src/pages` (to recall file structure)
   - `view_file package.json` (to verify dependencies)

2. [ ] **Check Git Status:**
   - Run `git status` to see pending changes.
   - Run `git log -n 1` to see the last commit.

3. [ ] **Verify Environment:**
   - Check if `.env.local` exists (do not read secrets, just verify existence).

---

## 2. 🛠️ The Development Loop

Follow this standard process for every update:

### Step A: Plan & Execute
1. User requests a change.
2. Agent creates an **Implementation Plan**.
3. Agent makes code edits.
4. Agent verifies locally (e.g., `npm run build`).

### Step B: Deployment (The "Magic Command")
Once changes are verified, use this **exact** PowerShell command block to push to GitHub (which triggers Vercel/Netlify):

```powershell
# 1. Navigate to project (if not already there)
cd C:\Users\User\.gemini\antigravity\scratch\oasis-ai-platform

# 2. Stage, Commit, and Push
git add .
git commit -m "Describe your changes here"
git push
```

---

## 3. 🚨 Troubleshooting "Lost Context"

If the agent seems confused:
1. Ask the agent: *"Read `TASK_HISTORY.md` and `implementation_plan.md` to refresh your memory."*
2. Remind the agent of the active workspace: `C:\Users\User\.gemini\antigravity\scratch\oasis-ai-platform`.

---

## 📝 Project Quick Stats
- **Main Branch:** `main`
- **Build Command:** `npm run build`
- **Dev Command:** `npm run dev`
