-- ╔═══════════════════════════════════════════════════════════════╗
-- ║  RLS POLICIES FOR CHADA ALYASMIN                            ║
-- ║  Run in Supabase Dashboard → SQL Editor                     ║
-- ╚═══════════════════════════════════════════════════════════════╝

-- ============================================================
-- TABLE: products (public read, server-only write)
-- ============================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON public.products;
DROP POLICY IF EXISTS "Allow service_role full access" ON public.products;
DROP POLICY IF EXISTS "anon_read_only" ON public.products;
DROP POLICY IF EXISTS "service_role_all" ON public.products;
DROP POLICY IF EXISTS "products_select_only" ON public.products;
DROP POLICY IF EXISTS "products_service_role_all" ON public.products;

CREATE POLICY "products_select_only"
    ON public.products FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "products_service_role_all"
    ON public.products FOR ALL
    TO service_role
    USING (true) WITH CHECK (true);

-- ============================================================
-- TABLE: contacts (form submissions — server-only)
-- ============================================================
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "contacts_service_role_only" ON public.contacts;
DROP POLICY IF EXISTS "contacts_deny_public" ON public.contacts;

CREATE POLICY "contacts_service_role_only"
    ON public.contacts FOR ALL
    TO service_role
    USING (true) WITH CHECK (true);

CREATE POLICY "contacts_deny_public"
    ON public.contacts FOR SELECT
    TO anon, authenticated
    USING (false);

-- ============================================================
-- TABLE: quotes (PDF requests — server-only)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.quotes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    cart JSONB NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "quotes_service_role_only" ON public.quotes;
DROP POLICY IF EXISTS "quotes_deny_public" ON public.quotes;

CREATE POLICY "quotes_service_role_only"
    ON public.quotes FOR ALL
    TO service_role
    USING (true) WITH CHECK (true);

CREATE POLICY "quotes_deny_public"
    ON public.quotes FOR SELECT
    TO anon, authenticated
    USING (false);

-- ============================================================
-- DONE: All tables locked down.
-- products: public can READ, only server can WRITE
-- contacts: only server can READ and WRITE
-- quotes: only server can READ and WRITE
-- ============================================================
