import express from 'express'
import { createscheduler, deletescheduler, filterscheduler, getallscheduler, getscheduler, updatescheduler } from '../controllers/scheduler.controller.js';

const router = express()

router.post('/create-scheduler', createscheduler)
router.get('/get-schedulers', getallscheduler)
router.delete('/delete-scheduler/:id', deletescheduler)
router.get('/get-scheduler/:id', getscheduler)
router.get('/get-scheduler/', filterscheduler)
router.patch('/update-scheduler/:id', updatescheduler)

export default router;