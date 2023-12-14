import express from 'express'
import { createadmin, deleteadmin, getadmin, getalladmins, signinadmin, updateadmin } from '../controllers/user.controller.js';

const router = express.Router()

router.post('/create-admin', createadmin)
router.post('/sign-in', signinadmin)
router.get('/all-admins', getalladmins)
router.get('/get-admin/:id', getadmin)
router.delete('/delete-admin/:id', deleteadmin)
router.put('/update-admin/:id', updateadmin)

export default router;