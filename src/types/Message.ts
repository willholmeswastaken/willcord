import { User } from "@supabase/supabase-js";

export interface Message {
  id: string;
  content: string;
  channel_id: string;
  user_id: string;
  user_image: string;
  username: string;
  created_at: Date;
  user_metadata: any;
}
