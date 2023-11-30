export default class UserAlreadyExists extends Error {
  constructor() {
    super("Usuário já cadastrado");
    this.name = "UserAlreadyExists";
  }

  public get message(): string {
    return super.message;
  }
}
