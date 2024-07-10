"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the App class from the app module
const app_1 = require("./app");
// Create a new instance of the App class
const app = new app_1.App();
// Start the application and listen for incoming requests on port 3000
app.listen(3000);
