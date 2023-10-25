export default class SecurityPassword {
  async generateHash(password: string): Promise<string> {
    return await Bun.password.hash(password)
  }

  async verifyPassword(password: string, hash: string): Promise<Boolean> {
    return await Bun.password.verify(password, hash)
  }
}