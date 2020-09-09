const bc = require("bcryptjs")

exports.seed = async function(knex) {

  const hashedPass = bc.hashSync("password", 12)

  await knex("users").insert([
    {username: "Admin", password: hashedPass}
  ])
}