import { MissingParamError, ServerError, InvalidParamError } from "../../errors";
import { EmailValidator, AccountModel, AddAccount, AddAccountModel, Validation } from "./signup-protocols";
import { SignUpController} from "./signup";
import { ok, serverError, badRequest } from "../../helpers/http-helper"

interface SutType {
  sut: SignUpController,
  emailValidatorStub: EmailValidator,
  addAccountStub: AddAccount,
  validationStub: Validation
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()));
    }
  }
  return new AddAccountStub();
};

const makeSut = (): SutType => {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccount();
  const validationStub = makeValidation();
  const sut =  new SignUpController(emailValidatorStub, addAccountStub, validationStub);
  return {
    sut,
    emailValidatorStub,
    addAccountStub,
    validationStub
  };
};

const makeFakeRequest = () => ({
  body: {
    name: "any_name",
    email: "any_email@example.com",
    password: "any_password",
    passwordConfirmation: "any_password",
  }
})

const makeFakeAccount = (): AccountModel => ({
  id: "valid_id",
  name: "valid_name",
  email: "valid_email@example.com",
  password: "valid_password",
})

describe("SignUp Controller", () => {
  test("Should return 400 if an invalid email is provided", async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);
    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new InvalidParamError("email")))
  });

  test("Should call EmailValidator with correct email", async () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");
    const httpRequest = makeFakeRequest()

    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith("any_email@example.com");
  });

  test("Should return 500 if EmailValidator throws", async () => {
    const { sut, emailValidatorStub } =  makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  });

  test("Should return 400 if password confirmation fails", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@example.com",
        password: "any_password",
        passwordConfirmation: 'other_password'
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("passwordConfirmation"));
  });

  test("Should call AddAccount with correct values", async () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest.spyOn(addAccountStub, "add");
    const httpRequest = makeFakeRequest()

    sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({
      name: "any_name",
      email: "any_email@example.com",
      password: "any_password",
    });
  });

  test("Should return 500 if AddAccount throws", async () => {
    const { sut, addAccountStub } =  makeSut();
    jest.spyOn(addAccountStub, "add").mockImplementationOnce(() => {
      return new Promise((resolve, reject) => {
        reject(new Error());
      });
    });
    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  });

  test("Should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  });

  test("Should call Validation with correct values", async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, "validate");
    const httpRequest = makeFakeRequest()

    sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test("Should return 400 if Validation returns an error", async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  });

});