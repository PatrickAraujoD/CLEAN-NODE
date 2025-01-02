import { EmailValidatorAdapter } from "../../../../infra/validators/email-validator-adapter";
import { RequiredFieldValidation, ValidationComposite, EmailValidation } from "../../../../validation/validators";

export const makeLoginValidation = (): ValidationComposite => {
  const validations = []
  for (const field of ["email", "password"]) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}