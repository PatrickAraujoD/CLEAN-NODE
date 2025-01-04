import request from 'supertest'
import app from '../config/app'
import env from '../config/env'
import { sign } from 'jsonwebtoken';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let serveyCollection: Collection
let accountCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    serveyCollection = await MongoHelper.getCollection('surveys')
    accountCollection = await MongoHelper.getCollection('accounts')
    await serveyCollection.deleteMany({})
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
})
