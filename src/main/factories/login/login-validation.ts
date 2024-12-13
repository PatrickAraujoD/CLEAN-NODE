import { EmailValidation } from "../../../presentation/helpers/validators/email-validation";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field-validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-compose";
import { EmailValidatorAdapter } from "../../../utils/email-validator-adapter";

export const makeLoginValidation = (): ValidationComposite => {
  const validations = []
  for (const field of ["email", "password"]) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter))
  return new ValidationComposite(validations)
}