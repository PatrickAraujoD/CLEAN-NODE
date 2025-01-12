import { makeLoginValidation } from './login-validation-factory';
import { LoginController } from "@/presentation/controllers/login/login/login-controller";
import { Controller } from "@/presentation/protocols";
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory';
import { makeLogControllerDecorator } from '@/main/factories/decoractors/log-controller-decorator-factory';

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeLoginValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}