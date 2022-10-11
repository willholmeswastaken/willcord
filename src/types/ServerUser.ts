import { WillcordUser } from "./User";

export interface ServerUser {
  id: string;
  server_id: string;
  user_id: string;
  User?: WillcordUser;
  created_at: Date;
  roles: Array<string>;
}
