import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../../presentation/protocols'
import { LogControllerDecorator } from '../log'

describe('LogController Decorator', () => {
  it('Should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse = {
          statusCode: 200,
          body: {
            name: 'Natan'
          }
        }
        return await new Promise<HttpResponse>(resolve => {
          resolve(httpResponse)
        })
      }
    }

    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest = {
      body: {
        emai: 'any_email@email.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmations: 'any_password'
      }
    }

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
