const request = require('supertest')
const app = require('../app')
describe('Get Endpoints', () => {
  it('should display hello world', async () => {
    const res = await request(app)
      .get('/')
    expect(res.statusCode).toEqual(200)
  })
})
