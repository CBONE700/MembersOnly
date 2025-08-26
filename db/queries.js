//Require in pool so that it can be accessed
const pool = require("./pool");

//Insert the username and hashed password with salt.
async function insertUser(uname, hash, salt) {
  await pool.query(
    "INSERT INTO users (username, hash, salt, membership_status) VALUES ($1, $2, $3, $4)", [uname, hash, salt, false]
  );
};

//Check if the username exists and return a bool value based on its existence
//This is used in the signup controller to prevent username collision
async function checkUsernameExists(uname) {
  const unameCheck = await pool.query("SELECT * FROM users WHERE username = $1", [uname]);
  return unameCheck.rows.length > 0;
}

module.exports = {
  insertUser,
  checkUsernameExists
}