import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller'
import { Controller } from '@/presentation/protocols'
import { makeSignUpValidation } from './singup-validation-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '../../../decoractors/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}