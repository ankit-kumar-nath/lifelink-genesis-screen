export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blood_donations: {
        Row: {
          blood_type: string
          created_at: string
          donation_date: string
          donor_id: string | null
          id: string
          location_id: string | null
          notes: string | null
          status: string
          units_donated: number
          updated_at: string
        }
        Insert: {
          blood_type: string
          created_at?: string
          donation_date?: string
          donor_id?: string | null
          id?: string
          location_id?: string | null
          notes?: string | null
          status?: string
          units_donated?: number
          updated_at?: string
        }
        Update: {
          blood_type?: string
          created_at?: string
          donation_date?: string
          donor_id?: string | null
          id?: string
          location_id?: string | null
          notes?: string | null
          status?: string
          units_donated?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blood_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blood_donations_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      blood_inventory: {
        Row: {
          blood_type: string
          created_at: string
          expiry_date: string
          id: string
          location_id: string | null
          units_available: number
          updated_at: string
        }
        Insert: {
          blood_type: string
          created_at?: string
          expiry_date: string
          id?: string
          location_id?: string | null
          units_available?: number
          updated_at?: string
        }
        Update: {
          blood_type?: string
          created_at?: string
          expiry_date?: string
          id?: string
          location_id?: string | null
          units_available?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blood_inventory_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      blood_requests: {
        Row: {
          blood_type: string
          created_at: string
          doctor_name: string | null
          hospital_name: string
          id: string
          location_id: string | null
          patient_id: string | null
          reason: string | null
          status: string
          units_needed: number
          updated_at: string
          urgency: string
        }
        Insert: {
          blood_type: string
          created_at?: string
          doctor_name?: string | null
          hospital_name: string
          id?: string
          location_id?: string | null
          patient_id?: string | null
          reason?: string | null
          status?: string
          units_needed: number
          updated_at?: string
          urgency?: string
        }
        Update: {
          blood_type?: string
          created_at?: string
          doctor_name?: string | null
          hospital_name?: string
          id?: string
          location_id?: string | null
          patient_id?: string | null
          reason?: string | null
          status?: string
          units_needed?: number
          updated_at?: string
          urgency?: string
        }
        Relationships: [
          {
            foreignKeyName: "blood_requests_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blood_requests_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address: string
          capacity: number | null
          city: string
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          state: string
          updated_at: string
        }
        Insert: {
          address: string
          capacity?: number | null
          city: string
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          state: string
          updated_at?: string
        }
        Update: {
          address?: string
          capacity?: number | null
          city?: string
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          state?: string
          updated_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          agree_to_marketing: boolean | null
          blood_type: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          password: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          agree_to_marketing?: boolean | null
          blood_type?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          password?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          agree_to_marketing?: boolean | null
          blood_type?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          password?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_master_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
      promote_to_admin: {
        Args: { user_email: string }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "donor" | "patient" | "healthcare" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["donor", "patient", "healthcare", "admin"],
    },
  },
} as const
