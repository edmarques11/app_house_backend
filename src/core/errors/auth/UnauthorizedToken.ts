export default class UnauthorizedToken extends Error {
  constructor() {
    super("Token não autorizado");
    this.name = "UnauthorizedToken";
  }

  public get message(): string {
    return super.message;
  }
}
