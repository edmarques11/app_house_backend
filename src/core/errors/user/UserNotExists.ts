export default class UserNotExists extends Error {
  constructor() {
    super("Usuário não existe");
    this.name = "UserNotExists";
  }

  public get message(): string {
    return super.message;
  }
}
