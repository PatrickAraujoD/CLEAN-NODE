import { AddSurveyRepository, AddSurveyModel } from "./add-survey-protocols"
import { DbAddSurvey } from "./add-survey"

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

describe('DbAddSurvey UseCase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    class AddSuveyRepositoryStub implements AddSurveyRepository {
      async add(surveyData: AddSurveyModel): Promise<void> {
        return new Promise(resolve => resolve())
      }
    }
    const addSurveyRepositoryStub = new AddSuveyRepositoryStub()
    const sut = new DbAddSurvey(addSurveyRepositoryStub)
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    await sut.add(makeFakeSurveyData())
    expect(addSpy).toHaveBeenCalledWith(makeFakeSurveyData())
  })
})