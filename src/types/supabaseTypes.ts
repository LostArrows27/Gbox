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
      achievement: {
        Row: {
          created_at: string
          description: string | null
          game_id: string | null
          id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          game_id?: string | null
          id?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          game_id?: string | null
          id?: string
        }
        Relationships: []
      }
      achievement_obtainer: {
        Row: {
          achievement_id: string | null
          id: string
          obtained_at: string
          profile_id: string | null
        }
        Insert: {
          achievement_id?: string | null
          id?: string
          obtained_at?: string
          profile_id?: string | null
        }
        Update: {
          achievement_id?: string | null
          id?: string
          obtained_at?: string
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "achievement_obtainer_achievement_id_fkey"
            columns: ["achievement_id"]
            referencedRelation: "achievement"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "achievement_obtainer_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      appointment: {
        Row: {
          appoinment_date: string
          course_student_id: string
          id: string
          note: string | null
        }
        Insert: {
          appoinment_date: string
          course_student_id: string
          id?: string
          note?: string | null
        }
        Update: {
          appoinment_date?: string
          course_student_id?: string
          id?: string
          note?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointment_course_student_id_fkey"
            columns: ["course_student_id"]
            referencedRelation: "course_student"
            referencedColumns: ["id"]
          }
        ]
      }
      comment: {
        Row: {
          created_at: string
          html_content: string
          id: string
          modified_at: string | null
          post_id: string
          reply_comment_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          html_content: string
          id?: string
          modified_at?: string | null
          post_id: string
          reply_comment_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          html_content?: string
          id?: string
          modified_at?: string | null
          post_id?: string
          reply_comment_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      course: {
        Row: {
          created_at: string
          description: string
          email_verified_date: string | null
          id: string
          price: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description: string
          email_verified_date?: string | null
          id?: string
          price: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          email_verified_date?: string | null
          id?: string
          price?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      course_student: {
        Row: {
          course_id: string | null
          created_at: string
          id: string
          joined_date: string | null
          user_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          id?: string
          joined_date?: string | null
          user_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string
          id?: string
          joined_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_student_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_student_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      demand: {
        Row: {
          created_at: string
          game_id: string | null
          id: string
          is_active: boolean | null
          nums_of_player: number | null
          room_id: string
        }
        Insert: {
          created_at?: string
          game_id?: string | null
          id?: string
          is_active?: boolean | null
          nums_of_player?: number | null
          room_id: string
        }
        Update: {
          created_at?: string
          game_id?: string | null
          id?: string
          is_active?: boolean | null
          nums_of_player?: number | null
          room_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "demand_room_id_fkey"
            columns: ["room_id"]
            referencedRelation: "room"
            referencedColumns: ["id"]
          }
        ]
      }
      event: {
        Row: {
          created_UserId: string | null
          game_id: string | null
          game_name: string | null
          id: string
          is_instance: boolean | null
          room_id: string
          start_date: string
        }
        Insert: {
          created_UserId?: string | null
          game_id?: string | null
          game_name?: string | null
          id?: string
          is_instance?: boolean | null
          room_id?: string
          start_date?: string
        }
        Update: {
          created_UserId?: string | null
          game_id?: string | null
          game_name?: string | null
          id?: string
          is_instance?: boolean | null
          room_id?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_created_UserId_fkey"
            columns: ["created_UserId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      message: {
        Row: {
          content: string
          created_at: string | null
          id: string
          receiver_id: string | null
          room_id: string | null
          sender_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          receiver_id?: string | null
          room_id?: string | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          receiver_id?: string | null
          room_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_receiver_id_fkey"
            columns: ["receiver_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_room_id_fkey"
            columns: ["room_id"]
            referencedRelation: "room"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_sender_id_fkey"
            columns: ["sender_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      notification: {
        Row: {
          content: string
          created_at: string
          id: string
          link_to: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          link_to?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          link_to?: string | null
        }
        Relationships: []
      }
      notification_user: {
        Row: {
          created_at: string | null
          id: string
          notification_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          notification_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          notification_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_user_notification_id_fkey"
            columns: ["notification_id"]
            referencedRelation: "notification"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_user_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      play_history: {
        Row: {
          created_at: string
          demand_id: string | null
          end_date: string | null
          id: number
        }
        Insert: {
          created_at?: string
          demand_id?: string | null
          end_date?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          demand_id?: string | null
          end_date?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "play_history_demand_id_fkey"
            columns: ["demand_id"]
            referencedRelation: "demand"
            referencedColumns: ["id"]
          }
        ]
      }
      post: {
        Row: {
          created_at: string
          event_id: string | null
          game_id: string | null
          game_name: string | null
          game_progress: string | null
          html_content: string
          id: string
          newsURL: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id?: string | null
          game_id?: string | null
          game_name?: string | null
          game_progress?: string | null
          html_content: string
          id?: string
          newsURL?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string | null
          game_id?: string | null
          game_name?: string | null
          game_progress?: string | null
          html_content?: string
          id?: string
          newsURL?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string
          dob: string | null
          gaming_platform: string[] | null
          gender: string
          hobbies: string | null
          id: string
          modified_at: string | null
          name: string | null
          play_time: string[] | null
          role: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          dob?: string | null
          gaming_platform?: string[] | null
          gender: string
          hobbies?: string | null
          id: string
          modified_at?: string | null
          name?: string | null
          play_time?: string[] | null
          role?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          dob?: string | null
          gaming_platform?: string[] | null
          gender?: string
          hobbies?: string | null
          id?: string
          modified_at?: string | null
          name?: string | null
          play_time?: string[] | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      rate: {
        Row: {
          content: string | null
          id: string | null
          modified_at: string | null
          score: number | null
          user_id: string
        }
        Insert: {
          content?: string | null
          id?: string | null
          modified_at?: string | null
          score?: number | null
          user_id: string
        }
        Update: {
          content?: string | null
          id?: string | null
          modified_at?: string | null
          score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rate_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      rate_for_lesson: {
        Row: {
          content: string | null
          created_at: string
          id: string
          score: number
        }
        Insert: {
          content?: string | null
          created_at?: string
          id: string
          score: number
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "rate_for_lesson_id_fkey"
            columns: ["id"]
            referencedRelation: "course_student"
            referencedColumns: ["id"]
          }
        ]
      }
      reaction: {
        Row: {
          comment_id: string | null
          id: string
          modified_at: string
          post_id: string | null
          reaction_type: string
          user_id: string
        }
        Insert: {
          comment_id?: string | null
          id?: string
          modified_at?: string
          post_id?: string | null
          reaction_type: string
          user_id: string
        }
        Update: {
          comment_id?: string | null
          id?: string
          modified_at?: string
          post_id?: string | null
          reaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reaction_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reaction_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      room: {
        Row: {
          created_at: string
          id: string
        }
        Insert: {
          created_at?: string
          id?: string
        }
        Update: {
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      room_user: {
        Row: {
          created_at: string
          id: string
          is_host: boolean | null
          joined_date: string | null
          outed_date: string | null
          room_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_host?: boolean | null
          joined_date?: string | null
          outed_date?: string | null
          room_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_host?: boolean | null
          joined_date?: string | null
          outed_date?: string | null
          room_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "room_user_room_id_fkey"
            columns: ["room_id"]
            referencedRelation: "room"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_user_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sender_receiver: {
        Row: {
          accepted_date: string | null
          id: number
          is_accepted: boolean | null
          receiver_id: string | null
          send_date: string | null
          sender_id: string
        }
        Insert: {
          accepted_date?: string | null
          id?: number
          is_accepted?: boolean | null
          receiver_id?: string | null
          send_date?: string | null
          sender_id: string
        }
        Update: {
          accepted_date?: string | null
          id?: number
          is_accepted?: boolean | null
          receiver_id?: string | null
          send_date?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sender_receiver_receiver_id_fkey"
            columns: ["receiver_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sender_receiver_sender_id_fkey"
            columns: ["sender_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_game_data: {
        Row: {
          comment: string | null
          finish_date: string | null
          game_level: string | null
          id: string
          is_favourite: boolean | null
          progress: number | null
          replay_times: number | null
          score_rate: number | null
          start_date: string
          status: string | null
          user_id: string
        }
        Insert: {
          comment?: string | null
          finish_date?: string | null
          game_level?: string | null
          id?: string
          is_favourite?: boolean | null
          progress?: number | null
          replay_times?: number | null
          score_rate?: number | null
          start_date?: string
          status?: string | null
          user_id: string
        }
        Update: {
          comment?: string | null
          finish_date?: string | null
          game_level?: string | null
          id?: string
          is_favourite?: boolean | null
          progress?: number | null
          replay_times?: number | null
          score_rate?: number | null
          start_date?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_game_data_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
