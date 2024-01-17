import { SignUpController } from '../../presentation/controllers/signup/sign-up-controller'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'

export const makeSignUpControllerFactory = (): SignUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const accountMongoRespository = new AccountMongoRepository()
  const bcryptAdaper = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdaper, accountMongoRespository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
