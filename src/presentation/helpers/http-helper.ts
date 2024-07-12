import { ServerError } from '../errors'
import { HttpResponse } from '../protocols/http'

export const httpHelper = {
  badRequest: (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error
  }),
  serverError: (error: Error): HttpResponse => ({
    statusCode: 500,
    body: new ServerError(String(error.stack))
  }),
  ok: (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
  })
}
