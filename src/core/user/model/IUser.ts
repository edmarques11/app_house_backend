export default interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updatedAt: Date;
  rule_id: string;
}
