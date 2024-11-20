import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter"

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve("hash"))
  }  
}))

const salt = 12;
const makeSut = (): BcryptAdapter => {
  const sut = new BcryptAdapter(salt);
  return sut
}

describe('Bcrypt Adapter', () => {
  test("Should call bcrypt with correct values", async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test("Should return a hash on sucess", async () => {
    const sut = makeSut()
    const hashValue = await sut.encrypt('any_value')
    expect(hashValue).toBe('hash')
  })

  test("Should throws if bcrypt throws", async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => Promise.reject(new Error()))
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})