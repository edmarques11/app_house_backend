export default class TokenNotSend extends Error {
  constructor() {
    super("Token não enviado");
    this.name = "TokenNotSend";
  }

  public get message(): string {
    return super.message;
  }
}
