const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe("users registration intergation test", () => {
    it("POST /api/auth/register registers a user", async () => {
        const newUser = { username: "test", password: "test"}
        const res = await supertest(server).post("/api/auth/register").send(newUser)
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.username).toBe("test") 
    })

    it("POST /api/auth/register (fail- user that already exists)", async () => {
        const notUniqueUser = {username: "Admin", password:"adminpass"}
        const res = await supertest(server).post("/api/auth/register").send(notUniqueUser)
        expect(res.statusCode).toBe(409)

    })


})

describe("users login intergation test", () => {
    it("POST /api/auth/login logs in a user", async () => {
        //add a user to hash a pass and test against that entry
        const newUser = { username: "test", password: "test"}
        await supertest(server).post("/api/auth/register").send(newUser)
        //now test against newly created user
        const res = await supertest(server).post("/api/auth/login").send(newUser)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.username).toBe("test") 
    })

    it("POST /api/auth/login (fail- user that does not exists)", async () => {
        const notAUser = {username: "Admin216", password:"adminpass"}
        const res = await supertest(server).post("/api/auth/login").send(notAUser)
        expect(res.statusCode).toBe(401)

    })

    it("POST /api/auth/login (fail- wrong password)", async () => {
        const notPass = {username: "Admin", password:"wrongpass"}
        const res = await supertest(server).post("/api/auth/login").send(notPass)
        expect(res.statusCode).toBe(401)

    })


})