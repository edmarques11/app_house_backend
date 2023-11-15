export class InvalidEmailOrPassword extends Error {
  constructor() {
    super("Email ou password incorretos");
    this.name = "InvalidEmailOrPassword";
  }

  public get message(): string {
    return super.message;
  }
}
