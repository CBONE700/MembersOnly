const crypto = require("crypto");

//Create a hashed password and return the hash and salt
function genPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex');
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return {
    salt: salt,
    hash: genHash
  };
};

//Check for a valid password on login
function validPassword(password, hash, salt) {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash == hashVerify;
}

module.exports = {
  genPassword,
  validPassword
}