import IUser from "../model/IUser";

export default interface IUserRepository {
  create(user: IUser): Promise<IUser>;
}
