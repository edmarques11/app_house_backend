import type IUser from "~/core/user/model/IUser";

export default interface IUserRepository {
  create(user: IUser): Promise<IUser>
  findByEmail(email: string): Promise<IUser | null>
  findById(id: string): Promise<IUser | null>
}
