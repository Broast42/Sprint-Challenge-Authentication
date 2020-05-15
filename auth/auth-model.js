const db = require("../database/dbConfig")
const bc = require("bcryptjs")


function findBy(filter){
    return db("users").where(filter)
}

function findById(id){
    return db("users").select("id", "username").where("id", id).first()
}

async function add(user){
    user.password = await bc.hashSync(user.password, 12)

    const [id] = await db("users").insert(user)
    return findById(id)
}

module.exports = {
    findBy,
    findById,
    add,
}