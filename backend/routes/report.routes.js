import express from 'express';
import auth from '../middleware/auth.js'
import { createReport, setReportStatus, getReports, setReportFile, setReportDetails } from '../controllers/report.controller.js';
const router = express.Router();

router.get('/getReports', auth, getReports)
router.patch('/setReportStatus/:id', auth, setReportStatus)
router.patch('/setReportFile/:id', setReportFile)
router.patch('/setReportDetails/:id', setReportDetails)


// Mobile part
router.post('/createReport', createReport);


export default router;
