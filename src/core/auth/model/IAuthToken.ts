export default interface IAuthToken {
  id?: string;
  token: string;
  user_id: string;
  time_valid: string;
  created_at: Date;
  updated_at: Date;
}