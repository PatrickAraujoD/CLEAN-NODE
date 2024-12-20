import { CompareFieldsValidation } from '../../../presentation/helpers/validators/compare-fields-validation'
import { RequiredFieldValidation, ValidationComposite, EmailValidation } from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/protocols/validation'
import {  } from '../../../presentation/helpers/validators/validation-compose'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  const emailValidator = new EmailValidatorAdapter()
  validations.push(new EmailValidation('email', emailValidator))
  return new ValidationComposite(validations)
}