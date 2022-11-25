export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
          max_allowed_pageViews: number
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
          max_allowed_pageViews?: number
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
          max_allowed_pageViews?: number
        }
      }
      sites: {
        Row: {
          created_at: string
          user_id: string
          url: string
          title: string | null
          updated_at: string | null
          blacklist: string[] | null
          single_page_app: boolean
          id: string
        }
        Insert: {
          created_at?: string
          user_id: string
          url: string
          title?: string | null
          updated_at?: string | null
          blacklist?: string[] | null
          single_page_app?: boolean
          id?: string
        }
        Update: {
          created_at?: string
          user_id?: string
          url?: string
          title?: string | null
          updated_at?: string | null
          blacklist?: string[] | null
          single_page_app?: boolean
          id?: string
        }
      }
      stats: {
        Row: {
          site_id: string
          id: number
          aggregates: Json | null
          browsers: Json | null
          time: string
          platforms: Json | null
          utms: Json | null
          hashes: Json | null
          systems: Json | null
          engines: Json | null
          pages: Json | null
          queries: Json | null
          referrers: Json | null
          countries: Json | null
        }
        Insert: {
          site_id: string
          id?: number
          aggregates?: Json | null
          browsers?: Json | null
          time: string
          platforms?: Json | null
          utms?: Json | null
          hashes?: Json | null
          systems?: Json | null
          engines?: Json | null
          pages?: Json | null
          queries?: Json | null
          referrers?: Json | null
          countries?: Json | null
        }
        Update: {
          site_id?: string
          id?: number
          aggregates?: Json | null
          browsers?: Json | null
          time?: string
          platforms?: Json | null
          utms?: Json | null
          hashes?: Json | null
          systems?: Json | null
          engines?: Json | null
          pages?: Json | null
          queries?: Json | null
          referrers?: Json | null
          countries?: Json | null
        }
      }
      users: {
        Row: {
          id: string
          full_name: string | null
          username: string | null
          billing_address: Json | null
          payment_method: Json | null
        }
        Insert: {
          id: string
          full_name?: string | null
          username?: string | null
          billing_address?: Json | null
          payment_method?: Json | null
        }
        Update: {
          id?: string
          full_name?: string | null
          username?: string | null
          billing_address?: Json | null
          payment_method?: Json | null
        }
      }
      visitors: {
        Row: {
          site_id: string
          id: string
          time: string
          duration: number | null
          visits: Json | null
          browser: string | null
          system: string | null
          platform: string | null
          engine: string | null
          country: string | null
        }
        Insert: {
          site_id: string
          id: string
          time?: string
          duration?: number | null
          visits?: Json | null
          browser?: string | null
          system?: string | null
          platform?: string | null
          engine?: string | null
          country?: string | null
        }
        Update: {
          site_id?: string
          id?: string
          time?: string
          duration?: number | null
          visits?: Json | null
          browser?: string | null
          system?: string | null
          platform?: string | null
          engine?: string | null
          country?: string | null
        }
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
  }
}
