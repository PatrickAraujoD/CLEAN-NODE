import { AccountModel } from "../../../usecases/add-account/db-add-account-protocols";

export interface LoadAccountByTokenRepository {
  loadByToken (value: string, role?: string): Promise<AccountModel>
}