-- ################################################
-- FULL DATABASE SETUP FOR ISLAM & MUSLIM APP
-- Copy and paste this into the Supabase SQL Editor
-- ################################################

-- 0. UTILS
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT,
  preferred_language TEXT DEFAULT 'it',
  notification_settings JSONB DEFAULT '{"morning_adhkar": true, "evening_adhkar": true, "prayer_times": true}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 2. DUAS
CREATE TABLE IF NOT EXISTS public.duas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ar TEXT NOT NULL,
  text_ar TEXT NOT NULL,
  transliteration TEXT,
  category TEXT NOT NULL,
  source TEXT,
  audio_url TEXT,
  translations JSONB DEFAULT '{}'::jsonb,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 3. PROPHETS
CREATE TABLE IF NOT EXISTS public.prophets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  translations JSONB DEFAULT '{}'::jsonb,
  story_ar TEXT NOT NULL,
  story_translations JSONB DEFAULT '{}'::jsonb,
  quranic_verses TEXT[],
  moral_lessons JSONB DEFAULT '{}'::jsonb,
  timeline_order INTEGER NOT NULL,
  era TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 4. VOCABULARY
CREATE TABLE IF NOT EXISTS public.vocabulary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word_ar TEXT NOT NULL,
  word_en TEXT NOT NULL,
  word_it TEXT NOT NULL,
  category TEXT DEFAULT 'basic',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 5. BLOG POSTS
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  image_url TEXT,
  video_url TEXT,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 6. FAVORITES & CONVERSATIONS
CREATE TABLE IF NOT EXISTS public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, content_type, content_id)
);

CREATE TABLE IF NOT EXISTS public.ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  messages JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- ################################################
-- TRIGGERS
-- ################################################

DROP TRIGGER IF EXISTS tr_profiles_updated_at ON public.profiles;
CREATE TRIGGER tr_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS tr_ai_conversations_updated_at ON public.ai_conversations;
CREATE TRIGGER tr_ai_conversations_updated_at BEFORE UPDATE ON public.ai_conversations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ################################################
-- RLS POLICIES (Public read, Admin write)
-- ################################################

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prophets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;

-- 1. DUAS
DROP POLICY IF EXISTS "Public Read" ON public.duas;
CREATE POLICY "Public Read" ON public.duas FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin All" ON public.duas;
CREATE POLICY "Admin All" ON public.duas FOR ALL TO authenticated USING (auth.jwt() ->> 'email' = 'anas019p@gmail.com');

-- 2. PROPHETS
DROP POLICY IF EXISTS "Public Read" ON public.prophets;
CREATE POLICY "Public Read" ON public.prophets FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin All" ON public.prophets;
CREATE POLICY "Admin All" ON public.prophets FOR ALL TO authenticated USING (auth.jwt() ->> 'email' = 'anas019p@gmail.com');

-- 3. VOCABULARY
DROP POLICY IF EXISTS "Public Read" ON public.vocabulary;
CREATE POLICY "Public Read" ON public.vocabulary FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin All" ON public.vocabulary;
CREATE POLICY "Admin All" ON public.vocabulary FOR ALL TO authenticated USING (auth.jwt() ->> 'email' = 'anas019p@gmail.com');

-- 4. BLOG POSTS
DROP POLICY IF EXISTS "Public Read" ON public.blog_posts;
CREATE POLICY "Public Read" ON public.blog_posts FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin All" ON public.blog_posts;
CREATE POLICY "Admin All" ON public.blog_posts FOR ALL TO authenticated USING (auth.jwt() ->> 'email' = 'anas019p@gmail.com');

-- 5. PROFILES
DROP POLICY IF EXISTS "User Own" ON public.profiles;
CREATE POLICY "User Own" ON public.profiles FOR ALL USING (auth.uid() = user_id);

-- 6. FAVORITES
DROP POLICY IF EXISTS "User Own" ON public.user_favorites;
CREATE POLICY "User Own" ON public.user_favorites FOR ALL USING (auth.uid() = user_id);

-- 7. AI CONVERSATIONS
DROP POLICY IF EXISTS "User Own" ON public.ai_conversations;
CREATE POLICY "User Own" ON public.ai_conversations FOR ALL USING (auth.uid() = user_id);

-- ################################################
-- AUTH TRIGGER (Handle new user)
-- ################################################

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, display_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
