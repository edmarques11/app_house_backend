export default interface IAuthTokenRepository {
  createToken(obj: object): string
  verifyValidToken(token: string): any
}
