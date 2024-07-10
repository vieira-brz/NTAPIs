import request from 'supertest'
import app from "./app"

describe('Testing create users', () => {

    describe('Given a username and password', () => {

        test('Should respond with a 200 status code', async () => {
            const response = await request(app).post('/users').send({
                username: 'username',
                password: 'password'
            })
            expect(response.statusCode).toBe(200)
        })

        test('Should specify json in the content type header', async () => {
            const response = await request(app).post('/users').send({
                username: 'username',
                password: 'password'
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })

        test('Should respond with a json object containing the user id', async () => {
            const response = await request(app).post('/users').send({
                username: 'username',
                password: 'password'
            })
            expect(response.body.userId).toBeDefined()
        })
    })

    describe('When the username and password is missing', () => {
        test('Should respond with a status code of 400', async () => {
            
            const bodyData = [
                {username: 'username'},
                {password: 'password'},
                {}
            ]

            for (const body of bodyData) {
                const response = await request(app).post('/users').send(body)
                expect(response.statusCode).toBe(400)
            }
        })
    })
})