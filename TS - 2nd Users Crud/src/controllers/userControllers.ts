import { Request, Response } from "express"
import User from "../models/userModel"

// Getting all users from DB
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {

        const users = await User.find()
        res.status(200).json(users)

    } catch (err: any) { res.status(500).json({ message: err.message }) }
};

// Getting One user by ID from DB
export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({ message: 'User not found' })
        }
        else {
            res.status(200).json(user)
        }

    } catch (err: any) { res.status(500).json({ message: err.message }) }
};


// Creating a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {

    const user = new User(req.body)

    try {

        const newUser = await user.save()
        res.status(201).json(newUser)

    } catch (err: any) { res.status(400).json({ message: err.message }) }
};


// Updating user by ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {

        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (!updateUser) [
            res.status(404).json(updateUser)
        ]
        else {
            res.status(200).json(updateUser)
        }

    } catch (err: any) { res.status(400).json({ message: err.message }) }
};

// Removing user by ID
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {

        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            res.status(400).json({ message: "User not found" })
        }
        else {
            res.status(200).json({ message: "User deleted" })
        }

    } catch (err: any) { res.status(500).json({ message: err.message }) }
}; 