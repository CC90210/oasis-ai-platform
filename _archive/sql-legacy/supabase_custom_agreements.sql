-- Custom Agreements Table
-- This table stores custom pricing agreements with signed NDAs

CREATE TABLE IF NOT EXISTS public.custom_agreements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Client Information
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    company_name TEXT,
    phone TEXT,
    
    -- Agreement Details
    automation_type TEXT NOT NULL,
    agreement_reference TEXT,
    
    -- Pricing (stored in cents for precision)
    upfront_cost_cents INTEGER NOT NULL DEFAULT 0,
    monthly_cost_cents INTEGER NOT NULL DEFAULT 0,
    currency TEXT DEFAULT 'usd' CHECK (currency IN ('usd', 'cad')),
    
    -- NDA Information
    nda_signed BOOLEAN DEFAULT FALSE,
    nda_signed_at TIMESTAMP WITH TIME ZONE,
    nda_signature_name TEXT,
    
    -- Payment & Status
    status TEXT DEFAULT 'pending' CHECK (status IN (
        'pending',
        'nda_signed',
        'payment_pending',
        'payment_complete',
        'active',
        'cancelled'
    )),
    stripe_session_id TEXT,
    stripe_subscription_id TEXT,
    payment_completed_at TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_custom_agreements_email ON public.custom_agreements(client_email);
CREATE INDEX IF NOT EXISTS idx_custom_agreements_status ON public.custom_agreements(status);
CREATE INDEX IF NOT EXISTS idx_custom_agreements_created_at ON public.custom_agreements(created_at DESC);

-- Row Level Security
ALTER TABLE public.custom_agreements ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (for public form submissions)
CREATE POLICY "Anyone can create custom agreements" ON public.custom_agreements
    FOR INSERT WITH CHECK (TRUE);

-- Policy: Users can view their own agreements by email
CREATE POLICY "Users can view own agreements" ON public.custom_agreements
    FOR SELECT USING (
        client_email = (SELECT email FROM auth.users WHERE id = auth.uid())
    );

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_custom_agreements_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::TEXT, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_custom_agreements_updated_at
    BEFORE UPDATE ON public.custom_agreements
    FOR EACH ROW
    EXECUTE FUNCTION update_custom_agreements_updated_at();

-- Grant permissions
GRANT INSERT ON public.custom_agreements TO anon;
GRANT SELECT ON public.custom_agreements TO authenticated;
