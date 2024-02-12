import { SignUpController } from '../../presentation/controllers/signup/sign-up-controller'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'

export const makeSignUpControllerFactory = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const accountMongoRespository = new AccountMongoRepository()
  const bcryptAdaper = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdaper, accountMongoRespository)
  const signUpController = new SignUpController(
    emailValidatorAdapter,
    dbAddAccount
  )
  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(signUpController, logMongoRepository)
}
