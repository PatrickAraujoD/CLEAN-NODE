import env from '../../config/env'
import { makeLoginValidation } from './login-validation-factory';
import { BcryptAdapter } from './../../../infra/criptography/bcrypt-adapter/bcrypt-adapter';
import { DbAuthentication } from "../../../data/usecases/authentication/db-authentication";
import { AccountMongoRepository } from "../../../infra/db/mongodb/account/account-mongo-repository";
import { LogMongoRepository } from "../../../infra/db/mongodb/log/log-mongo-repository";
import { LoginController } from "../../../presentation/controllers/login/login-controller";
import { Controller } from "../../../presentation/protocols";
import { LogControllerDecorator } from "../../decorators/log-controller-decorator";
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter';

export const makeLoginController = (): Controller => {
  const salt = 12
  const logMongoRepository = new LogMongoRepository()
  const accountMongoRepository = new AccountMongoRepository()
  const hashComparer = new BcryptAdapter(salt)
  const encrypter = new JwtAdapter(env.jwtSecret)
  const authentication = new DbAuthentication(accountMongoRepository, hashComparer, encrypter, accountMongoRepository)
  const loginController = new LoginController(makeLoginValidation(), authentication)
  return new LogControllerDecorator(loginController, logMongoRepository)
}