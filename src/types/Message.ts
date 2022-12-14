import { WillcordUser } from "./User";

export interface Message {
  id: string;
  content: string;
  channel_id: string;
  user_id: string;
  User?: WillcordUser;
  created_at: Date;
  user_metadata: any;
}
