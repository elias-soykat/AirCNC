process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const { faker } = require('@faker-js/faker');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');

const { gender } = require('../src/users/users.enum');
const { deleteUsers } = require('../src/users/users.service');
const _p = require('../src/utils/async-wrapper.util');

chai.use(chaiHttp);

describe('Site test suite', () => {
  beforeEach(async () => {
    await Promise.all([deleteUsers()]);
  });

  it('should registration a user with details', async () => {
    const user = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: `${faker.internet.password(15)}$#%`,
      gender: faker.helpers.arrayElement(Object.values(gender)),
    };

    const [err, res] = await _p(
      chai.request(server).post('/api/v1/users/registration').send(user)
    );

    const users = res.body.data;

    assert.isNull(err, 'API call error should be null');
    assert.isObject(users, 'users should be an object');
    assert.exists(users._id, 'users id should be exist');
    assert.equal(users.name, user.name, 'users name should be equal');
    assert.isString(users.gender, 'users gender should be string');
    assert.exists(users.token, 'users token should be exist');
    assert.isString(users.token, 'users token should be string');
  });

  afterEach(async () => {
    await Promise.all([deleteUsers()]);
  });
});
