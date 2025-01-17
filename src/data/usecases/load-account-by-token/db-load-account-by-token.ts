import { LoadAccountByToken } from "../../../domain/usecases/load-account-by-token";
import { Decrypter } from "../../protocols/criptography/decrypter";
import { LoadAccountByTokenRepository } from "../../protocols/db/account/load-account-by-repository";
import { AccountModel } from "../add-account/db-add-account-protocols";

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ){}

  async load (acessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(acessToken)
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(acessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}