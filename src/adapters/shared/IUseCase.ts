export default interface IUseCase<Request, Response> {
  execute(request: Request, response: Response): Promise<void>
}
