import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on sucess', async () => {
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