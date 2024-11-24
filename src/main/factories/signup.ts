import { SignUpController } from '../../presentation/controllers/signup/signup'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-compose'
import { makeSignUpValidation } from './singup-validation'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const logErrorRepository = new LogMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const validationComposite = new ValidationComposite([

  ])
  const singUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  return new LogControllerDecorator(singUpController, logErrorRepository)
}