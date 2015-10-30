const passwordChecker = require('app/components/password_checker');
const log = require('log4js').getLogger('app:models:user:encrypt_on_save');
const Bluebird = require('bluebird');

function encryptPassword(next) {
  const user = this;
  const isPasswordModified = user.isModified('password');
  const checkForPasswordChange = user.password && isPasswordModified;

  if (!checkForPasswordChange) {
    next();
  } else {
    log.debug('password change detected for ', user.email || user.name);
    return Bluebird.resolve(true)
      .then(() => passwordChecker.encryptPassword(user.password))
      .then((hash) => user.password = hash)
      .then(next)
      .catch(next);
  }
}
module.exports = encryptPassword;
