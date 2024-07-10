import { Router } from 'express'
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/userControllers'

const router = Router()

router.get('/', getUsers)
router.post('/', getUser)

router.get('/:id', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router