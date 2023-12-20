import express from 'express'
import { createadmin, deleteadmin, getadmin, getalladmins, signinadmin, updateadmin, filteradmin } from '../controllers/user.controller.js';

const router = express.Router()

router.post('/create-admin', createadmin)
router.post('/sign-in', signinadmin)
router.get('/all-admins', getalladmins)
router.get('/get-admin/:id', getadmin)
router.post('/get-admins/', filteradmin)
router.delete('/delete-admin/:id', deleteadmin)
router.patch('/update-admin/:id', updateadmin)


export default router;