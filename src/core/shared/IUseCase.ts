export default interface IUseCase<Entry, Exit> {
  execute(entry: Entry): Promise<Exit>;
}
