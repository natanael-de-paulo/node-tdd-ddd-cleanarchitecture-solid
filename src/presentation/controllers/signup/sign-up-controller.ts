import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator,
  AddAccount
} from './sign-up-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { httpHelper } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]

      for (const field of requiredFields) {
        if (!httpRequest.body[field])
          return httpHelper.badRequest(new MissingParamError(field))
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation)
        return httpHelper.badRequest(
          new InvalidParamError('passwordConfirmation')
        )

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) return httpHelper.badRequest(new InvalidParamError('email'))

      const account = await this.addAccount.add({ name, email, password })

      return httpHelper.ok(account)
    } catch (error: any) {
      return httpHelper.serverError(error)
    }
  }
}
