import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  constructor(controller: Controller) {
    this.controller = controller
  }

  async handle(req: HttpRequest): Promise<HttpResponse> {
    await this.controller.handle(req)
    // if (httpResponse.statusCode === 500) {
    // }
    return null as any
  }
}
