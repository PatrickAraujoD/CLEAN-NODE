import { DbLoadSurveyById } from "./db-load-survey-by-id"
import { LoadSurveyByIdRepository } from "../../protocols/db/survey/load-survey-by-id-repository"
import { SurveyModel } from "@/domain/models/survey"
import MockDate from "mockdate"

const makeLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(makeFakeSurveyData()))
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}
const makeFakeSurveyData = (): SurveyModel => ({
  id: "any_id",
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

type SutTypes = {
  sut: DbLoadSurveyById,
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository,
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)
  return {
    sut,
    loadSurveyByIdRepositoryStub
  } 
}
describe('DbLoadSurveyById UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  
  test('Should call LoadSurveyByIdRepository with correct id', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith("any_id")
  })
})