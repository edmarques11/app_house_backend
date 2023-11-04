export default interface IAuthTokenRepository {
  createToken(): string
  verifyValidToken(token: string): string
}