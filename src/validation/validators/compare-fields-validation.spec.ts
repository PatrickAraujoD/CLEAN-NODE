import { InvalidParamError } from "@/presentation/errors"
import { CompareFieldsValidation } from "./compare-fields-validation"

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'otherFields')
}
describe('CompareFields Validation', () => {
  test('Should returns a InvalidParamError if validation fails', () => {
    const sut= makeSut()
    const error = sut.validate({ 
      field: 'any_value',
      otherFields: 'wrong_value'
    })
    expect(error).toEqual(new InvalidParamError('otherFields'))
  })

  test('Should return if valdiation succeeds', () => {
    const sut = makeSut()
    
    const error = sut.validate({ 
      field: 'any_value',
      otherFields: 'any_value'
    })
    expect(error).toBeFalsy()
  })
})