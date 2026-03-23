// Stripe SDK CANNOT be imported from a shared module on Vercel.
// Vercel's bundler (@vercel/nft) traces dynamic imports from shared files
// and pre-bundles them, causing the stripe package to crash on Node v24.
// Each handler must import stripe inline:
//   const { default: Stripe } = await import('stripe');
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
