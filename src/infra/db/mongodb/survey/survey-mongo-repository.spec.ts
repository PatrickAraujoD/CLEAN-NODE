import { Collection } from "mongodb";
import { MongoHelper } from "../helpers/mongo-helper";
import { SurveyMongoRepository } from "./survey-mongo-repository";

let surveyCollection: Collection;

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('add()', () => {
    test("Should add a survey on success", async () => {
      const sut = makeSut()
      await sut.add({
        question: 'any_question', 
        answers: [{
          answer: 'any_answer',
          image: 'any_image'
        }, {
          answer: 'other_answer'
        }],
        date: new Date()
      })
  
      const survey = await surveyCollection.findOne({ question: 'any_question' })
  
      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test("Should loadAll surveys on success", async () => {
      await surveyCollection.insertMany([{
        question: 'any_question', 
        answers: [{
          answer: 'any_answer',
          image: 'any_image'
        }],
        date: new Date()
      }, {
        question: 'other_question', 
        answers: [{
          answer: 'other_answer',
          image: 'other_image'
        }],
        date: new Date()
      }])
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(2)
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[1].question).toBe('other_question')
    })

    test("Should loadAll empty list", async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })
})