import { RequiredFieldValidation, ValidationComposite, EmailValidation, CompareFieldsValidation } from "@/validation/validators"
import { Validation } from "@/presentation/protocols/validation"
import { EmailValidator } from "@/validation/protocols/email-validator"
import { makeSignUpValidation } from "./singup-validation-factory"

jest.mock('../../../../../validation/validators/validation-compose')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe('SignUpValidation Factory', () => {
  test('Should call ValidationCompose with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})