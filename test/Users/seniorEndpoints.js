/* eslint-disable handle-callback-err */
const common = require('../common')
const server = common.server
const chai = common.chai

const User = require('../../src/models/user')

describe('/Get/api/users/userId/seniors', () => {
  it('it should fail fetching the seniors of a user when he has none', (done) => {
    User.findOne({ email: 'test@email.com' }, (err, user) => {
      chai
        .request(server)
        .get(`/api/users/${user.user_id}/seniors`)
        .set('Authorization', user.token)
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })
})

describe('/Post/api/users/userId/seniors', () => {
  it('it should create a senior for a given user when request user_id matches token user_id', (done) => {
    User.findOne({ email: 'test@email.com' }, (err, user) => {
      const senior = {
        given_name: 'Test',
        gender: 'female',
        birthdate: new Date(),
        other_info: 'no',
        background: '#00838F',
        image: '/images/profiles/child_default_photo.jpg',
        availabilities: [
          {
            weekDay: 3,
            startTimeHour: 21,
            startTimeMinute: 0,
            endTimeHour: 24,
            endTimeMinute: 0
          }
        ]
      }
      chai
        .request(server)
        .post(`/api/users/${user.user_id}/seniors`)
        .set('Authorization', user.token)
        .send(senior)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
})

describe('/Post/api/users/userId/seniors', () => {
  it('it should create a senior for a given user when request user_id matches token user_id', (done) => {
    User.findOne({ email: 'test@email.com' }, (err, user) => {
      const senior = {
        given_name: 'Test 2',
        gender: 'male',
        birthdate: new Date(),
        other_info: 'no',
        background: '#00838F',
        image: '/images/profiles/child_default_photo.jpg',
        availabilities: [
          {
            weekDay: 5,
            startTimeHour: 21,
            startTimeMinute: 30,
            endTimeHour: 24,
            endTimeMinute: 0
          }
        ]
      }
      chai
        .request(server)
        .post(`/api/users/${user.user_id}/seniors`)
        .set('Authorization', user.token)
        .send(senior)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
})

describe('/Get/api/users/userId/seniors', () => {
  it('it should fetch the seniors of a user when he is authenticated', (done) => {
    User.findOne({ email: 'test@email.com' }, (err, user) => {
      chai
        .request(server)
        .get(`/api/users/${user.user_id}/seniors`)
        .set('Authorization', user.token)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.should.have.lengthOf.at.least(1)
          done()
        })
    })
  })
})
