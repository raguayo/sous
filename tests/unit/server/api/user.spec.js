/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../../../../server/db');
const app = require('../../../../server');

const User = db.model('user');

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com';
    const codysPassword = 'password';

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        password: codysPassword
      });
    });

    it('GET /api/users returns just the users email and id', () => {
      return request(app).get('/api/users').expect(200).then((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body[0].email).to.be.equal(codysEmail);
        expect(res.body[0].password).to.be.an('undefined');
        expect(res.body[0].id).to.be.equal(1);
      });
    });
  });
});
