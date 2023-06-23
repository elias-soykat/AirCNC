process.env.NODE_ENV = 'test';

import { faker } from '@faker-js/faker';
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';
import { Gender, Role } from '../src/user/user.enum';
import userService from '../src/user/user.service';
import _p from '../src/utils/async-wrapper.util';

const { deleteUsers } = userService;

chai.use(chaiHttp);

describe('Site test suite', () => {
  beforeEach(async () => {
    await Promise.all([deleteUsers()]);
  });

  it('should register a user with user details', async () => {
    const user = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: `${faker.internet.password(15)}$#%`,
      gender: faker.helpers.arrayElement(Object.values(Gender)),
      role: faker.helpers.arrayElement(Object.values(Role)),
    };

    const [err, res] = await _p(
      chai.request(server).post('/api/v1/users/registration').send(user)
    );

    const users = res?.body.data;

    assert.isNull(err, 'API call error should be null');
    assert.isObject(users, 'users should be an object');
    assert.exists(users?._id, 'users id should exist');
    assert.equal(users?.name, user.name, 'users name should be equal');
    assert.isString(users?.gender, 'users gender should be a string');
    assert.exists(users?.token, 'users token should exist');
    assert.isString(users?.token, 'users token should be a string');
  });

  afterEach(async () => {
    await Promise.all([deleteUsers()]);
  });
});
