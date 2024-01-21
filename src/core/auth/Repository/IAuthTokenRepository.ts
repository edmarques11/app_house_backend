import type ITokenDecoded from "../interfaces/ITokenDecoded"

export default interface IAuthTokenRepository {
  createToken(obj: object): string
  verifyValidToken(token: string): ITokenDecoded
}
