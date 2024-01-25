import { LogErrorRepository } from '../../../data/protocols/log-error-repository'
import { serverError } from '../../../presentation/helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../../presentation/protocols'
import { LogControllerDecorator } from '../log'

const makeController = (): Controller => {
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
  return new ControllerStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log(stack: string): Promise<void> {
      await new Promise<void>(resolve => {
        resolve()
      })
    }
  }
  return new LogErrorRepositoryStub()
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    controllerStub,
    sut,
    logErrorRepositoryStub
  }
}

describe('LogController Decorator', () => {
  it('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
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

  it('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        emai: 'any_email@email.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmations: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'Natan'
      }
    })
  })

  it('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(
      new Promise(resolve => {
        resolve(error)
      })
    )
    const httpRequest = {
      body: {
        emai: 'any_email@email.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmations: 'any_password'
      }
    }

    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
