import { MissingParamError } from "../../errors"
import { RequiredFieldValidation } from "./required-field-validation"

describe('RequiredField Validation', () => {
  test('Should returns a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ name: 'any_name'})
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return if valdiation succeeds', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ field: 'any_name'})
    expect(error).toBeFalsy()
  })
})