/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
const debug = require('debug')('app:persistence:seeding');

function createTestUsers(Users) {
  debug('creating test users');
  return Users.create({email: 'test@atsid.com', password: 'abc123'});
}

function resetUsers(Users) {
  debug('resetting users');
  return Users.deleteAll().then(() => createTestUsers(Users));
}

function seedData(repositories) {
  debug('loading seed data');
  const Users = repositories.Users;

  const resetPromises = [
    resetUsers(Users),
  ];
  return Promise.all(resetPromises)
    .then(() => debug('seed data populated'))
    .catch((err) => debug('errror seeding data', err));
}

module.exports = {seedData};
