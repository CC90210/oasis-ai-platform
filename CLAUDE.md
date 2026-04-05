# OASIS AI PLATFORM — Client Automation SaaS

> The client-facing platform for OASIS AI Solutions. Marketing site + authenticated client portal.
> Managed by Bravo. Code changes happen here, summaries go to Business-Empire-Agent/memory/SESSION_LOG.md.
> Routing: Local `C:\Users\User\APPS\oasis-ai-platform` | GitHub: CC90210/oasis-ai-platform | Deploy: Vercel (oasisai.work)

## Stack

- **Framework:** Vite 5.4 + React 18, TypeScript — NOT Next.js. No App Router. No server components.
- **Routing:** React Router v6 (`react-router-dom`) — all routes defined in `src/App.tsx`
- **Database:** Supabase (`sajanpiqysuwviucycjh`) — PostgreSQL + Auth + RLS
- **Payments:** Stripe v20 — subscriptions, one-time checkout, webhooks
- **Automation:** n8n webhooks via `api/n8n/log.ts` — logs runs, records metrics
- **State:** Zustand with `persist` middleware (`src/store/`)
- **UI:** Tailwind CSS, Framer Motion, Recharts, Lucide React, shadcn/ui primitives (Radix)
- **Toast:** Sonner (`sonner` package)
- **API routes:** Vercel Serverless Functions (`api/` directory, `@vercel/node`)
- **Analytics:** Vercel Analytics

## Architecture

```
src/
  App.tsx              — All routes. Lazy-loaded pages. ThemeProvider wraps everything.
  pages/
    landing/           — Public marketing site
    services/          — Services listing
    pricing/           — Pricing + ProductConfigPage (per-product config)
    checkout/          — Checkout flow + success + legal acceptance
    portal/            — Authenticated client portal (8 pages + debug utils)
    blog/              — Blog listing + individual posts
    case-studies/      — Case studies
    legal/             — Legal hub + 7 individual legal docs
    custom-agreement/  — Custom deal flow
  components/
    layout/MainLayout   — Shared nav + footer for public pages
    portal/PortalLayout — Sidebar layout for portal pages
    auth/ProtectedRoute — Auth guard (Supabase session check + onboarding redirect)
    cart/CartDrawer     — Global cart, persists across routes
    ui/                — shadcn/ui-style primitives
    animations/        — Framer Motion wrappers
  store/
    authStore.ts       — Zustand: user, isAuthenticated, userType (prospect|client)
    cartStore.ts       — Zustand: cart items, totals
  lib/
    supabase.ts        — Supabase client + all TypeScript interfaces + auth helpers
    pricing.ts         — SINGLE SOURCE OF TRUTH for all product prices (never hardcode elsewhere)
    constants.ts       — DB table name constants (TABLES object)
    auth.ts            — Legacy credential stub (not used for real auth — Supabase handles it)
    stripe-webhook.ts  — Stripe webhook utility types
    metrics.ts         — Portal metrics helpers
    formatters.ts      — Currency, date formatters
    promoCodes.ts      — Promo code validation
  contexts/
    ThemeContext.tsx   — Dark/light theme

api/                   — Vercel Serverless Functions
  stripe/
    index.ts           — Stripe checkout session creation
    webhook.ts         — Stripe webhook handler (signature verified, idempotent upserts)
  n8n/
    log.ts             — n8n automation run logging (x-api-key auth)
    health.ts          — n8n health check endpoint
  auth/
    signup.ts          — Post-signup logic (links pending Stripe sessions)
  _lib/
    auth.ts            — API route auth helpers
    pricing.ts         — Server-side pricing lookups
    stripe.ts          — Stripe client initialisation
  chat.ts              — AI chat endpoint
```

## Supabase Tables

| Table | Purpose |
|-------|---------|
| `profiles` | User profiles — role: `client` / `admin` / `super_admin` |
| `client_automations` | Automations per user — status, tier, stats, last_run_at |
| `automation_logs` | n8n run logs — event_type, event_name, status, metadata |
| `automation_metrics` | Numeric/text/JSON metrics from n8n runs |
| `subscriptions` | Stripe subscription state — synced via webhook |
| `billing_history` | Invoice history — synced via webhook |
| `pending_stripe_sessions` | Checkout sessions awaiting user signup link |
| `support_tickets` | Client support requests |
| `monthly_reports` | ROI reports per automation |
| `product_purchases` | One-time product purchase records |
| `custom_agreements` | Custom deal agreements |
| `legal_acceptances` | Legal document acceptance records |

Constants: `src/lib/constants.ts` — use `TABLES.AUTOMATIONS` etc., never raw strings.

## Key TypeScript Interfaces

All defined in `src/lib/supabase.ts`:
`Profile`, `Automation`, `AutomationLog`, `Subscription`, `BillingHistory`, `MonthlyReport`,
`SupportTicket`, `PendingStripeSession`

## Auth Model

- **Real auth:** Supabase Auth (`supabase.auth.getSession()` / `supabase.auth.getUser()`)
- **Session persistence:** `persistSession: true`, `autoRefreshToken: true` in Supabase client
- **Portal guard:** `ProtectedRoute` — checks Supabase session, redirects to `/portal/login` if missing,
  redirects new users (`onboarding_completed: false`) to `/portal/welcome`
- **Role check helpers:** `isOwnerAccount()`, `isAdminAccount()`, `isBillingExempt()` in `src/lib/supabase.ts`
- **Legacy `src/lib/auth.ts`:** Contains a test credential stub — this is NOT used for real login. Do not extend it.
- **Zustand `authStore`:** Tracks UI-level user state (name, email, userType). NOT a substitute for Supabase auth.

## Pricing Rules

- **All prices live in `src/lib/pricing.ts`** — `BUNDLES`, `STANDARD_AUTOMATIONS`, `PREMIUM_AUTOMATIONS`
- Use `getAutomationPricing(id, tier)` and `getBundlePricing(id)` helpers
- Bundles: Launchpad ($2,500 setup / $347/mo), Integration Suite ($7,500 setup / $597/mo)
- Standard automations: $797–$1,497 setup, $149–$347/mo per tier
- Premium automations: $1,197–$2,497 setup, $197–$797/mo per tier
- **Never hardcode a price in a component.** Always import from `src/lib/pricing.ts`.

## API Routes (Vercel Serverless)

| Route | Auth | Purpose |
|-------|------|---------|
| `POST /api/stripe/webhook` | Stripe signature (`stripe-signature` header) | Stripe event handler — idempotent upserts |
| `POST /api/n8n/log` | API key (`x-api-key` header = `N8N_API_KEY`) | Log n8n automation run + metrics |
| `GET /api/n8n/health` | None | Health check for n8n integration |
| `POST /api/auth/signup` | None (post-Supabase signup) | Links pending Stripe session to new user |
| `POST /api/chat` | TBD | AI chat |

Stripe webhook listens for: `checkout.session.completed`, `checkout.session.expired`,
`checkout.session.async_payment_failed`, `customer.subscription.created/updated/deleted`,
`invoice.paid`, `invoice.payment_failed`, `invoice.created`, `invoice.finalized`

## Environment Variables

Required in `.env.local` (see `.env.example` for full template):

```bash
# Supabase (client-side — VITE_ prefix)
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY

# Supabase (server-side API routes — NO VITE_ prefix)
NEXT_PUBLIC_SUPABASE_URL        # used in api/ routes
SUPABASE_SERVICE_ROLE_KEY       # server-only, never in client bundle

# Stripe
STRIPE_SECRET_KEY               # server-only
STRIPE_WEBHOOK_SECRET           # server-only
VITE_STRIPE_PUBLIC_KEY          # client-side publishable key

# n8n integration
N8N_API_KEY                     # validates inbound n8n webhook calls

# App
VITE_APP_URL
NEXT_PUBLIC_APP_URL
```

Note: `api/` routes use `process.env.NEXT_PUBLIC_SUPABASE_URL` (Vercel injects this).
Client code uses `import.meta.env.VITE_SUPABASE_URL` (Vite). Both point to the same project.

## Development Rules

1. **RLS is always on.** All `src/` client queries use the anon key and respect RLS.
   `api/` routes use `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS only when necessary
   (webhook handlers, admin operations). Never pass the service role key to the client bundle.

2. **Prices come from `src/lib/pricing.ts`.** No exceptions. Adding a new product means adding
   it there first, then referencing it everywhere else.

3. **Table names come from `src/lib/constants.ts`.** Use `TABLES.AUTOMATIONS` etc.
   in API routes. In client code, raw strings are acceptable but constants are preferred.

4. **Stripe webhooks must verify signature** via `stripe.webhooks.constructEvent()` before
   processing any event. The raw body must not be parsed before this step.

5. **All portal pages are lazy-loaded** in `src/App.tsx`. New portal pages follow the same
   `lazy(() => import(...))` pattern and wrap in `<ProtectedRoute>`.

6. **Component structure:** `pages/` for route-level components, `components/` for reusable UI.
   Portal pages use `PortalLayout` from `src/components/portal/PortalLayout.tsx`.

7. **State management:** Zustand for UI state (`store/`). Supabase for server state (query directly
   in components or custom hooks in `src/hooks/`). No prop drilling — use the stores.

8. **Error handling:** All async operations must handle loading and error states.
   Use Sonner (`sonner`) for toast notifications, not `alert()`.

9. **TypeScript:** All new code is TypeScript. Use interfaces from `src/lib/supabase.ts`
   for DB types. Never use `any` unless the type is genuinely unknown (add a comment if so).

10. **No `console.log` in production code.** `api/` routes may use `console.error` for
    server-side error logging (Vercel captures these in function logs).

## Commands

```bash
npm run dev        # Development server (http://localhost:5173)
npm run build      # Production build — run this to verify zero TS errors before committing
npm run lint       # ESLint (zero warnings enforced)
npm run preview    # Preview production build locally
```

## Deployment

- **Platform:** Vercel — auto-deploys on push to `main`
- **Live URL:** https://oasisai.work
- **Supabase project:** `sajanpiqysuwviucycjh`
- SQL migration files are in the repo root (`.sql` files) — run in Supabase SQL Editor

## Part of Business-Empire-Agent

This app is managed by Bravo. When working here:
- Make ALL code changes in this repo (`C:\Users\User\APPS\oasis-ai-platform`)
- Commit and push from this repo — NOT from Business-Empire-Agent
- After completing work, append a 1-2 sentence summary to `Business-Empire-Agent/memory/SESSION_LOG.md`
- Do not store source code in Business-Empire-Agent
