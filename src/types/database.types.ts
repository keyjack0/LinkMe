// AUTO-GENERATED — jalankan `npm run db:types` untuk update dari Supabase
// supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          display_name: string | null
          bio: string | null
          avatar_url: string | null
          theme_id: string | null
          custom_domain: string | null
          is_pro: boolean
          total_views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          theme_id?: string | null
          custom_domain?: string | null
          is_pro?: boolean
          total_views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          theme_id?: string | null
          custom_domain?: string | null
          is_pro?: boolean
          total_views?: number
          updated_at?: string
        }
      }
      links: {
        Row: {
          id: string
          profile_id: string
          title: string
          url: string
          icon: string | null
          color: string | null
          is_active: boolean
          sort_order: number
          total_clicks: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          title: string
          url: string
          icon?: string | null
          color?: string | null
          is_active?: boolean
          sort_order?: number
          total_clicks?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          title?: string
          url?: string
          icon?: string | null
          color?: string | null
          is_active?: boolean
          sort_order?: number
          total_clicks?: number
          updated_at?: string
        }
      }
      link_clicks: {
        Row: {
          id: string
          link_id: string
          profile_id: string
          clicked_at: string
          ip_hash: string | null
          user_agent: string | null
          country: string | null
          device: string | null
          referrer: string | null
        }
        Insert: {
          id?: string
          link_id: string
          profile_id: string
          clicked_at?: string
          ip_hash?: string | null
          user_agent?: string | null
          country?: string | null
          device?: string | null
          referrer?: string | null
        }
        Update: never
      }
      profile_views: {
        Row: {
          id: string
          profile_id: string
          viewed_at: string
          ip_hash: string | null
          country: string | null
          device: string | null
          referrer: string | null
        }
        Insert: {
          id?: string
          profile_id: string
          viewed_at?: string
          ip_hash?: string | null
          country?: string | null
          device?: string | null
          referrer?: string | null
        }
        Update: never
      }
      themes: {
        Row: {
          id: string
          name: string
          slug: string
          bg_color: string
          text_color: string
          accent_color: string
          card_style: string
          is_premium: boolean
          preview_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          bg_color: string
          text_color: string
          accent_color: string
          card_style: string
          is_premium?: boolean
          preview_url?: string | null
          created_at?: string
        }
        Update: {
          name?: string
          bg_color?: string
          text_color?: string
          accent_color?: string
          card_style?: string
          is_premium?: boolean
          preview_url?: string | null
        }
      }
    }
    Views: {
      analytics_summary: {
        Row: {
          profile_id: string
          total_views: number
          total_clicks: number
          views_today: number
          clicks_today: number
          views_this_week: number
          clicks_this_week: number
        }
      }
    }
    Functions: {
      increment_link_clicks: {
        Args: { link_id: string }
        Returns: void
      }
      increment_profile_views: {
        Args: { profile_id: string }
        Returns: void
      }
    }
    Enums: Record<string, never>
  }
}

// Helper types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export type Link = Database['public']['Tables']['links']['Row']
export type LinkInsert = Database['public']['Tables']['links']['Insert']
export type LinkUpdate = Database['public']['Tables']['links']['Update']

export type LinkClick = Database['public']['Tables']['link_clicks']['Row']
export type ProfileView = Database['public']['Tables']['profile_views']['Row']
export type Theme = Database['public']['Tables']['themes']['Row']

export type AnalyticsSummary = Database['public']['Views']['analytics_summary']['Row']
