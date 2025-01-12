import { InvalidParamError } from "@/presentation/errors";
import { EmailValidator } from "../protocols/email-validator";
import { EmailValidation } from "./email-validation";

interface SutType {
  sut: EmailValidation,
  emailValidatorStub: EmailValidator,
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeSut = (): SutType => {
  const emailValidatorStub = makeEmailValidator();
  const sut =  new EmailValidation('email', emailValidatorStub);
  return {
    sut,
    emailValidatorStub
  };
};

describe("Email Validation", () => {
  test("Should return an error if EmailValidator returns false", () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);
    const httpResponse = sut.validate({ email: 'any_email@example.com' });
    expect(httpResponse).toEqual(new InvalidParamError("email"))
  });

  test("Should call EmailValidator with correct email", async () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");
    sut.validate({ email: 'any_email@example.com' });
    expect(isValidSpy).toHaveBeenCalledWith("any_email@example.com");
  });

  test("Should throws if EmailValidator throws", () => {
    const { sut, emailValidatorStub } =  makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(sut.validate).toThrow()
  });
});