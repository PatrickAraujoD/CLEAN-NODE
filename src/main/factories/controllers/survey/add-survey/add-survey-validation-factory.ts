import { RequiredFieldValidation, ValidationComposite } from "@/validation/validators";

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations = []
  for (const field of ["question", "answers"]) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}