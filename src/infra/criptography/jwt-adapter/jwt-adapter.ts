import jwt from 'jsonwebtoken'
import { Encrypter } from "../../../data/protocols/criptography/encrypter";
import { Decrypter } from '../../../data/protocols/criptography/decrypter';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secretKey: string) {}

  async encrypt(value: string): Promise<string> {
    const acessToken = jwt.sign({ id: value }, this.secretKey)
    return acessToken
  }

  async decrypt(token: string): Promise<string> {
    const value: any = jwt.verify(token, this.secretKey)
    return value
  }
}