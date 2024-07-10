import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app'
import User, { IUser } from '../models/userModel'


describe('Testing the User API', () => {

    // Pre-settings
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test')
    })

    // After each test do...
    afterEach(async () => {
        await User.deleteMany()
    })

    // After all tests do...
    afterAll(async () => {
        await mongoose.connection.close()
    })


    // Get all users
    it("Should return an empty array", async () => {
        const response = await request(app).get('/users')
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual([])
    })

    // Creating a new user
    it('Should create a new user', async () => {
        const newUser: Partial<IUser> = {
            name: 'vinicius',
            email: "teste@teste.com",
            password: "teste"
        }

        const response = await request(app).post('/users').send(newUser)
        expect(response.status).toBe(201)
        expect(response.body.name).toBe(newUser.name)
        expect(response.body.email).toBe(newUser.email)
        expect(response.body.password).toBe(newUser.password)
    })

    // Getting user by ID
    it('Should return a user', async () => {

        // Need to create the user previously
        const newUser = new User({ name: 'John Doe', email: 'john@example.com', password: 'password123' })
        await newUser.save()

        // Get user infos
        const response = await request(app).get(`/users/${newUser._id}`)
        expect(response.status).toBe(200)
        expect(response.body.name).toBe(newUser.name)
        expect(response.body.email).toBe(newUser.email)
    })

    // Updating user by ID
    it('Should update a user', async () => {

        // Need to create the user previously
        const newUser = new User({ name: 'John Doe', email: 'john@example.com', password: 'password123' })
        await newUser.save()

        // Updating user infos
        const updatedUser: Partial<IUser> = { name: 'Jane Doe', email: 'jane@example.com' }
        const response = await request(app).put(`/users/${newUser._id}`).send(updatedUser)

        expect(response.status).toBe(200)
        expect(response.body.name).toBe(updatedUser.name)
        expect(response.body.email).toBe(updatedUser.email)
    })

    // Removing user by ID
    it('Should delete a user', async () => {

        // Need to create the user previously
        const newUser = new User({ name: 'John Doe', email: 'john@example.com', password: 'password123' })
        await newUser.save()

        // Removing user infos
        const response = await request(app).delete(`/users/${newUser._id}`)
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('User deleted')
    })
})