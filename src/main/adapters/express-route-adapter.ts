import { Request, Response } from 'express'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../presentation/protocols'

export const adapterRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httRequest: HttpRequest = {
      body: req.body
    }

    const httpResponse: HttpResponse = await controller.handle(httRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      return res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
