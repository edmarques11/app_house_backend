import IAuthToken from "../model/IAuthToken";

export default interface IAuthTokenRepository {
  saveToken(data: Partial<IAuthToken>): Promise<IAuthToken>
}