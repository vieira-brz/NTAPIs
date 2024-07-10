// Importing the supertest library for making HTTP requests
import request from 'supertest'

// Importing the app module
import app from "./app"

// Describe block for testing the user creation functionality
describe('Testing create users', () => {

    // Nested describe block for when a username and password are provided
    describe('Given a username and password', () => {

        // Test case to check if the response status code is 200
        test('Should respond with a 200 status code', async () => {

            const response = await request(app).post('/users').send({
                username: 'username',
                password: 'password'
            })

            // Expecting the status code to be 200
            expect(response.statusCode).toBe(200)
        })

        // Test case to check if the content type is specified as JSON
        test('Should specify json in the content type header', async () => {
            const response = await request(app).post('/users').send({
                username: 'username',
                password: 'password'
            })

            // Expecting the content type to contain 'json'
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })

        // Test case to check if the response body contains a user id
        test('Should respond with a json object containing the user id', async () => {
            const response = await request(app).post('/users').send({
                username: 'username',
                password: 'password'
            })

            // Expecting the userId to be defined in the response body
            expect(response.body.userId).toBeDefined()
        })
    })

    // Nested describe block for when the username or password is missing
    describe('When the username and password is missing', () => {

        // Test case to check if the status code is 400 when data is missing
        test('Should respond with a status code of 400', async () => {

            // Array of different request bodies
            const bodyData = [
                { username: 'username' },     // Only username provided
                { password: 'password' },     // Only password provided
                {}                            // Neither username nor password provided
            ]

            // Loop through each request body and check the response status code
            for (const body of bodyData) {

                // Sending the request body
                const response = await request(app).post('/users').send(body)

                // Expecting the status code to be 400
                expect(response.statusCode).toBe(400)
            }
        })
    })
})
