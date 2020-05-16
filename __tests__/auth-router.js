const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe("users authentication intergation test", () => {
    it("POST /api/auth/register registers a user", async () => {
        const newUser = { username: "test", password: "test"}
        const res = await supertest(server).post("/api/auth/register").send(newUser)
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.username).toBe("test") 
    })
})