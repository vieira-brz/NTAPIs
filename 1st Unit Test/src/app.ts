// Import express and the Application type from the express module
import express, { Application } from 'express';  

// Declare a private member app of type Application
class App {
    private app: Application;  

    constructor() {
        // Initialize the express application
        this.app = express();  

        // Call the routes method to set up the routes
        this.routes();  
    }

    config() {
        // Use the express.json() middleware to parse JSON request bodies
        this.app.use(express.json());  
        
        // Use the express.urlencoded() middleware to parse URL-encoded request bodies, with the extended option to support rich objects and arrays
        this.app.use(express.urlencoded({ extended: true }));  
    }

    listen(port: number) {
        // Start the server and listen for incoming requests on the specified port, logging a message when the server is running
        this.app.listen(port, () => console.log('Server is running...'));  
    }

    routes() {
        // Define a route for the root URL '/'
        this.app.use('/', (req, res) => {  
        
            // Respond with a JSON object containing a message
            return res.json({ message: 'ok' });  
        });
    }
}

// Export the App class
export { App };  
