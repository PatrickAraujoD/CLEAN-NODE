import request from 'supertest'
import app from '../config/app'
import env from '../config/env'
import { sign } from 'jsonwebtoken';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: "patrick",
    email: "mail@mail.com",
    password: '123',
    role: 'admin'
  })
  const id = res.insertedId
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne(
    {
      _id: id
    }, {
      $set: {
        accessToken
      }
    }
  )
  return accessToken
}

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    accountCollection = await MongoHelper.getCollection('accounts')
    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

  describe("POST /surveys", () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
            .post('/api/surveys')
            .send({
              question: 'Question',
              answers: [{
                answer: 'Answer 1',
                image: 'http://image-name.com'
              }, {
                answer: 'Answer 2'
              }]
            })
            .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      console.log(accessToken)
      await request(app)
            .post('/api/surveys')
            .set('x-access-token', accessToken)
            .send({
              question: 'Question',
              answers: [{
                answer: 'Answer 1',
                image: 'http://image-name.com'
              }, {
                answer: 'Answer 2'
              }]
            })
            .expect(204)
    })
  })

  describe("GET /surveys", () => {
    test('Should return 403 on load surveys without accessToken', async () => {
      await request(app)
            .get('/api/surveys')
            .expect(403)
    })

    test('Should return 204 on load surveys with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
            .get('/api/surveys')
            .set('x-access-token', accessToken)
            .expect(204)
    })
  })
})
