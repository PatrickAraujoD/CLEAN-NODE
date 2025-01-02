import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe("POST /singup", () => {
    test('Should return 200 on signup', async () => {
      await request(app)
            .post('/api/signup')
            .send({
              name: 'Patrick',
              email: 'patrick.araujo@gmail.com',
              password: 'patrick1234',
              passwordConfirmation: 'patrick1234'
            })
            .expect(200)
    })
  })
})