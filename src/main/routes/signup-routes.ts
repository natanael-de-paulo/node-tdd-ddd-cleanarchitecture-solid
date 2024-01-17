import { Router } from 'express'
import { adapterRoute } from '../adapters/express-route-adapter'
import { makeSignUpControllerFactory } from '../factories/signup'

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignUpControllerFactory()))
}
