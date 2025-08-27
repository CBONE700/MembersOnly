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

//Find the user to authenticate
async function findUser(uname) {
  const find = await pool.query("SELECT * FROM users WHERE username = $1", [uname]);
  return find.rows[0];
} 

async function findUserById(id) {
  const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return user.rows[0];
}

async function setMember(id) {
  await pool.query("UPDATE users SET membership_status = true  WHERE id = $1", [id]);
}

async function insertMessage(title, message, username) {
  await pool.query(
    "INSERT INTO messages (title, text, username) VALUES ($1, $2, $3)", [title, message, username]
  );
}

module.exports = {
  insertUser,
  checkUsernameExists,
  findUser,
  findUserById,
  setMember,
  insertMessage
}