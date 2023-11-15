export default class RuleNotExist extends Error {
  constructor() {
    super("Rule does not exists");
    this.name = "RuleNotExist";
  }

  public get message(): string {
    return super.message;
  }
}
