-- ################################################
-- ADVANCED SETUP: CLEANUP & RBAC
-- ################################################

-- 1. DATA CLEANUP
-- Removes any legacy data containing "Isam" or "Barber"
DO $$
BEGIN
    -- profiles
    DELETE FROM public.profiles WHERE display_name ILIKE '%Isam%' OR display_name ILIKE '%Barber%';
    -- blog_posts
    DELETE FROM public.blog_posts WHERE title ILIKE '%Isam%' OR title ILIKE '%Barber%' OR content ILIKE '%Isam%' OR content ILIKE '%Barber%';
    -- duas
    DELETE FROM public.duas WHERE title_ar ILIKE '%Isam%' OR title_ar ILIKE '%Barber%' OR text_ar ILIKE '%Isam%' OR text_ar ILIKE '%Barber%';
    -- prophets
    DELETE FROM public.prophets WHERE name_en ILIKE '%Isam%' OR name_en ILIKE '%Barber%' OR name_ar ILIKE '%Isam%' OR name_ar ILIKE '%Barber%';
    -- vocabulary
    DELETE FROM public.vocabulary WHERE word_en ILIKE '%Isam%' OR word_en ILIKE '%Barber%' OR word_it ILIKE '%Isam%' OR word_it ILIKE '%Barber%';
END $$;

-- 2. RBAC SYSTEM (Role-Based Access Control)

-- Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can view their own role" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- Create is_admin function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid()
        AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 3. MIGRATE POLICIES TO RBAC

-- 1. DUAS
DROP POLICY IF EXISTS "Admin All" ON public.duas;
CREATE POLICY "Admin All" ON public.duas FOR ALL TO authenticated USING (public.is_admin());

-- 2. PROPHETS
DROP POLICY IF EXISTS "Admin All" ON public.prophets;
CREATE POLICY "Admin All" ON public.prophets FOR ALL TO authenticated USING (public.is_admin());

-- 3. VOCABULARY
DROP POLICY IF EXISTS "Admin All" ON public.vocabulary;
CREATE POLICY "Admin All" ON public.vocabulary FOR ALL TO authenticated USING (public.is_admin());

-- 4. BLOG POSTS
DROP POLICY IF EXISTS "Admin All" ON public.blog_posts;
CREATE POLICY "Admin All" ON public.blog_posts FOR ALL TO authenticated USING (public.is_admin());

-- ################################################
-- INITIAL ADMIN ASSIGNMENT
-- Replace the ID below with your actual User ID from auth.users
-- ################################################
-- INSERT INTO public.user_roles (user_id, role)
-- VALUES ('TUO-USER-ID-QUI', 'admin')
-- ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
