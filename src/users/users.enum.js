const gender = Object.freeze({
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
});

const role = Object.freeze({
  HOST: 'host',
  VISITOR: 'visitor',
  ADMIN: 'admin',
});

module.exports = {
  gender,
  role,
};
