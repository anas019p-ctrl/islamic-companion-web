export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          created_at: string
          id: string
          messages: Json | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          messages?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          messages?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      ayahs: {
        Row: {
          audio_url: string | null
          ayah_number: number
          created_at: string
          hizb_number: number | null
          id: string
          juz_number: number | null
          page_number: number | null
          surah_number: number
          tafsir: Json | null
          text_ar: string
          text_uthmani: string | null
          translations: Json | null
        }
        Insert: {
          audio_url?: string | null
          ayah_number: number
          created_at?: string
          hizb_number?: number | null
          id?: string
          juz_number?: number | null
          page_number?: number | null
          surah_number: number
          tafsir?: Json | null
          text_ar: string
          text_uthmani?: string | null
          translations?: Json | null
        }
        Update: {
          audio_url?: string | null
          ayah_number?: number
          created_at?: string
          hizb_number?: number | null
          id?: string
          juz_number?: number | null
          page_number?: number | null
          surah_number?: number
          tafsir?: Json | null
          text_ar?: string
          text_uthmani?: string | null
          translations?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "ayahs_surah_number_fkey"
            columns: ["surah_number"]
            isOneToOne: false
            referencedRelation: "surahs"
            referencedColumns: ["number"]
          },
        ]
      }
      duas: {
        Row: {
          audio_url: string | null
          category: string
          created_at: string
          id: string
          order_index: number | null
          source: string | null
          text_ar: string
          title_ar: string
          translations: Json | null
          transliteration: string | null
        }
        Insert: {
          audio_url?: string | null
          category: string
          created_at?: string
          id?: string
          order_index?: number | null
          source?: string | null
          text_ar: string
          title_ar: string
          translations?: Json | null
          transliteration?: string | null
        }
        Update: {
          audio_url?: string | null
          category?: string
          created_at?: string
          id?: string
          order_index?: number | null
          source?: string | null
          text_ar?: string
          title_ar?: string
          translations?: Json | null
          transliteration?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          notification_settings: Json | null
          preferred_language: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id?: string
          notification_settings?: Json | null
          preferred_language?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          notification_settings?: Json | null
          preferred_language?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      prophets: {
        Row: {
          created_at: string
          era: string | null
          id: string
          image_url: string | null
          moral_lessons: Json | null
          name_ar: string
          name_en: string
          quranic_verses: string[] | null
          story_ar: string
          story_translations: Json | null
          timeline_order: number
          translations: Json | null
        }
        Insert: {
          created_at?: string
          era?: string | null
          id?: string
          image_url?: string | null
          moral_lessons?: Json | null
          name_ar: string
          name_en: string
          quranic_verses?: string[] | null
          story_ar: string
          story_translations?: Json | null
          timeline_order: number
          translations?: Json | null
        }
        Update: {
          created_at?: string
          era?: string | null
          id?: string
          image_url?: string | null
          moral_lessons?: Json | null
          name_ar?: string
          name_en?: string
          quranic_verses?: string[] | null
          story_ar?: string
          story_translations?: Json | null
          timeline_order?: number
          translations?: Json | null
        }
        Relationships: []
      }
      surahs: {
        Row: {
          created_at: string
          id: number
          name_ar: string
          name_en: string
          number: number
          revelation_type: string
          translations: Json | null
          verses_count: number
        }
        Insert: {
          created_at?: string
          id?: number
          name_ar: string
          name_en: string
          number: number
          revelation_type: string
          translations?: Json | null
          verses_count: number
        }
        Update: {
          created_at?: string
          id?: number
          name_ar?: string
          name_en?: string
          number?: number
          revelation_type?: string
          translations?: Json | null
          verses_count?: number
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          content_id: string
          content_type: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      vocabulary: {
        Row: {
          category: string | null
          created_at: string
          id: string
          word_ar: string
          word_en: string
          word_it: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          word_ar: string
          word_en: string
          word_it: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          word_ar?: string
          word_en?: string
          word_it?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
    DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
    DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | keyof DefaultSchema["Enums"]
  | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof DefaultSchema["CompositeTypes"]
  | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
