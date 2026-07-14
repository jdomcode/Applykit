export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          preferred_language: "en" | "es";
          role: "user" | "admin";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          preferred_language?: "en" | "es";
          role?: "user" | "admin";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          preferred_language?: "en" | "es";
          role?: "user" | "admin";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      tools: {
        Row: {
          id: string;
          slug: string;
          category: "application" | "communication" | "career-profile";
          status: "active" | "draft" | "archived";
          icon: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          category: "application" | "communication" | "career-profile";
          status?: "active" | "draft" | "archived";
          icon?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          category?: "application" | "communication" | "career-profile";
          status?: "active" | "draft" | "archived";
          icon?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      tool_translations: {
        Row: {
          id: string;
          tool_id: string;
          locale: "en" | "es";
          title: string;
          description: string;
          seo_title: string | null;
          seo_description: string | null;
          intro_content: string | null;
          faq: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          tool_id: string;
          locale: "en" | "es";
          title: string;
          description: string;
          seo_title?: string | null;
          seo_description?: string | null;
          intro_content?: string | null;
          faq?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          tool_id?: string;
          locale?: "en" | "es";
          title?: string;
          description?: string;
          seo_title?: string | null;
          seo_description?: string | null;
          intro_content?: string | null;
          faq?: Json;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tool_translations_tool_id_fkey";
            columns: ["tool_id"];
            referencedRelation: "tools";
            referencedColumns: ["id"];
          }
        ];
      };
      template_versions: {
        Row: {
          id: string;
          tool_id: string;
          locale: "en" | "es";
          version: number;
          name: string;
          tone: string;
          template_body: string;
          input_schema: Json;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          tool_id: string;
          locale: "en" | "es";
          version?: number;
          name: string;
          tone: string;
          template_body: string;
          input_schema: Json;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          tool_id?: string;
          locale?: "en" | "es";
          version?: number;
          name?: string;
          tone?: string;
          template_body?: string;
          input_schema?: Json;
          is_active?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "template_versions_tool_id_fkey";
            columns: ["tool_id"];
            referencedRelation: "tools";
            referencedColumns: ["id"];
          }
        ];
      };
      generated_documents: {
        Row: {
          id: string;
          user_id: string;
          tool_id: string | null;
          template_version_id: string | null;
          locale: "en" | "es";
          title: string;
          input_data: Json;
          output_text: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tool_id?: string | null;
          template_version_id?: string | null;
          locale: "en" | "es";
          title: string;
          input_data: Json;
          output_text: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          tool_id?: string | null;
          template_version_id?: string | null;
          locale?: "en" | "es";
          title?: string;
          input_data?: Json;
          output_text?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "generated_documents_tool_id_fkey";
            columns: ["tool_id"];
            referencedRelation: "tools";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "generated_documents_template_version_id_fkey";
            columns: ["template_version_id"];
            referencedRelation: "template_versions";
            referencedColumns: ["id"];
          }
        ];
      };
      document_favorites: {
        Row: {
          id: string;
          user_id: string;
          document_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          document_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          document_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "document_favorites_document_id_fkey";
            columns: ["document_id"];
            referencedRelation: "generated_documents";
            referencedColumns: ["id"];
          }
        ];
      };
      feedback: {
        Row: {
          id: string;
          user_id: string | null;
          tool_id: string | null;
          rating: number | null;
          comment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          tool_id?: string | null;
          rating?: number | null;
          comment?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          tool_id?: string | null;
          rating?: number | null;
          comment?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "feedback_tool_id_fkey";
            columns: ["tool_id"];
            referencedRelation: "tools";
            referencedColumns: ["id"];
          }
        ];
      };
      usage_events: {
        Row: {
          id: string;
          user_id: string | null;
          tool_id: string | null;
          event_type: "tool_viewed" | "document_generated" | "document_copied" | "document_saved";
          locale: "en" | "es" | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          tool_id?: string | null;
          event_type: "tool_viewed" | "document_generated" | "document_copied" | "document_saved";
          locale?: "en" | "es" | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          tool_id?: string | null;
          event_type?: "tool_viewed" | "document_generated" | "document_copied" | "document_saved";
          locale?: "en" | "es" | null;
          metadata?: Json;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "usage_events_tool_id_fkey";
            columns: ["tool_id"];
            referencedRelation: "tools";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      current_user_role: {
        Args: Record<PropertyKey, never>;
        Returns: string | null;
      };
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      set_updated_at: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
