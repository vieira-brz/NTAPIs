"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
// Import express and the Application type from 'express'
const express_1 = __importDefault(require("express"));
// Import the crypto module for generating UUIDs
const crypto_1 = __importDefault(require("crypto"));
class App {
    constructor() {
        // Initialize the express application
        this.app = (0, express_1.default)();
        // Call the config method to set up middleware
        this.config();
        // Call the routes method to set up routes
        this.routes();
    }
    config() {
        // Use the express.json() middleware to parse JSON requests
        this.app.use(express_1.default.json());
        // Use the express.urlencoded() middleware to parse URL-encoded requests
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    listen(port) {
        // Start the server on the specified port and log a message
        this.app.listen(port, () => console.log('Server is running...'));
    }
    routes() {
        // Initialize an array to store user data
        var users = [];
        // Define a GET route at the root URL that returns a JSON response with a message
        this.app.use('/', (req, res) => {
            return res.json({ message: 'ok' });
        });
        // Define a POST route at '/user' to create a new user        
        this.app.post('/user', (req, res) => {
            // Destructure email, pass, and name from the request body
            const { email, pass, name } = req.body;
            // Generate a unique ID for the user
            const id = crypto_1.default.randomUUID();
            // Create a user object with the ID and the provided data
            const data = {
                id, email, pass, name
            };
            // Add the new user to the users array
            users.push(data);
            // Return a 201 status code and the new user data in the response
            return res.status(201).json(data);
        });
        // Define a GET route at '/users' that returns the array of users
        this.app.get('/users', (req, res) => {
            // Return a 200 status code and the users array in the response
            return res.status(200).json(users);
        });
    }
    // Add a method to get the Express application instance
    getApp() {
        return this.app;
    }
}
exports.App = App;
