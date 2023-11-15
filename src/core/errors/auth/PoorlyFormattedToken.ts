export default class PoorlyFormattedToken extends Error {
  constructor() {
    super("Token mal formatado");
    this.name = "PoorlyFormattedToken";
  }

  public get message(): string {
    return super.message;
  }
}
