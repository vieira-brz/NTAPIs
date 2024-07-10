// Import the supertest module for testing HTTP requests
import request from 'supertest';

// Import the App class from the app module
import { App } from './app';

// Describe a test suite named 'My first test'
describe('My first test', () => {

    // Create an instance of the App class
    const appInstance = new App();

    // Get the Express application instance
    const app = appInstance.getApp();

    // Define a test case to check if the server is running
    it('should test the server running', async () => {

        // Send a GET request to the root URL
        const response = await request(app).get('/');

        // Expect the response body to match { message: 'ok' }
        expect(response.body).toStrictEqual({ message: 'ok' });
    });

    // Define a test case to check if a user can be created
    it('should check if create user', async () => {

        // Send a POST request to the /user endpoint with user data
        const response = await request(app).post('/user').send({
            name: 'vini',
            email: 'teste@teste.com',
            pass: 'helloworld'
        });

        // Expect the response status code to be 201
        expect(response.statusCode).toEqual(201);

        // Expect the response body to have an 'id' property
        expect(response.body).toHaveProperty('id');
    });

    // Define a test case to check if all users can be retrieved
    it('should get all users', async () => {

        // Send a GET request to the /users endpoint
        const response = await request(app).get('/users');

        // Expect the response status code to be 200
        expect(response.statusCode).toEqual(200);
    });
});
