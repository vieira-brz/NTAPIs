// Importing the express library
import express from 'express'

// Creating an instance of an Express application
const app = express()

// Middleware to parse JSON bodies
app.use(express.json())

// POST endpoint for creating users
app.post('/users', (req, res) => {

    // Destructuring password and username from the request body
    const { password, username } = req.body

    // Checking if either password or username is missing
    if (!password || !username) {

        // Sending a 400 Bad Request status if any field is missing
        res.sendStatus(400)
        return
    }

    // Sending a response with a dummy userId
    res.send({ userId: 0 })
})

// Exporting the app instance
export default app 
