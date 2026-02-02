-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT,
  preferred_language TEXT DEFAULT 'en',
  notification_settings JSONB DEFAULT '{"morning_adhkar": true, "evening_adhkar": true, "prayer_times": true}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Create duas table (public content)
CREATE TABLE public.duas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ar TEXT NOT NULL,
  text_ar TEXT NOT NULL,
  transliteration TEXT,
  category TEXT NOT NULL, -- 'morning', 'evening', 'daily', 'prophetic', 'protection', 'travel', etc.
  source TEXT, -- hadith reference
  audio_url TEXT,
  translations JSONB DEFAULT '{}'::jsonb, -- {"en": "...", "fr": "...", etc}
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on duas - public read access
ALTER TABLE public.duas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view duas" ON public.duas FOR SELECT USING (true);

-- Create surahs table (Quran chapters)
CREATE TABLE public.surahs (
  id SERIAL PRIMARY KEY,
  number INTEGER NOT NULL UNIQUE,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  revelation_type TEXT NOT NULL, -- 'meccan' or 'medinan'
  verses_count INTEGER NOT NULL,
  translations JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on surahs - public read access
ALTER TABLE public.surahs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view surahs" ON public.surahs FOR SELECT USING (true);

-- Create ayahs table (Quran verses)
CREATE TABLE public.ayahs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  surah_number INTEGER NOT NULL REFERENCES public.surahs(number),
  ayah_number INTEGER NOT NULL,
  text_ar TEXT NOT NULL,
  text_uthmani TEXT,
  translations JSONB DEFAULT '{}'::jsonb,
  tafsir JSONB DEFAULT '{}'::jsonb,
  audio_url TEXT,
  page_number INTEGER,
  juz_number INTEGER,
  hizb_number INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(surah_number, ayah_number)
);

-- Enable RLS on ayahs - public read access
ALTER TABLE public.ayahs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view ayahs" ON public.ayahs FOR SELECT USING (true);

-- Create prophets table
CREATE TABLE public.prophets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  translations JSONB DEFAULT '{}'::jsonb,
  story_ar TEXT NOT NULL,
  story_translations JSONB DEFAULT '{}'::jsonb,
  quranic_verses TEXT[], -- References to relevant verses
  moral_lessons JSONB DEFAULT '{}'::jsonb,
  timeline_order INTEGER NOT NULL,
  era TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on prophets - public read access
ALTER TABLE public.prophets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view prophets" ON public.prophets FOR SELECT USING (true);

-- Create user_favorites table
CREATE TABLE public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content_type TEXT NOT NULL, -- 'dua', 'ayah', 'prophet'
  content_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, content_type, content_id)
);

-- Enable RLS on user_favorites
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their favorites" ON public.user_favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add favorites" ON public.user_favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete favorites" ON public.user_favorites FOR DELETE USING (auth.uid() = user_id);

-- Create ai_conversations table for chat history
CREATE TABLE public.ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  messages JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on ai_conversations
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their conversations" ON public.ai_conversations FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can create conversations" ON public.ai_conversations FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can update their conversations" ON public.ai_conversations FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_ai_conversations_updated_at BEFORE UPDATE ON public.ai_conversations FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();