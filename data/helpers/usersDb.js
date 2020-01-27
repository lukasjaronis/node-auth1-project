const knex = require("knex");
const dbConfig = require("../../knexfile");

const db = knex(dbConfig.development);

module.exports = {
  add,
  get,
  findUsers
};

function add(user) {
  return db("users").insert(user);
}

function get(user) {
  return db("users").where("username", user.username);
}

function findUsers() {
  return db("users").select("username", 'password');
}
