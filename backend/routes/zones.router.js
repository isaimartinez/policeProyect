import express from 'express';
import auth from '../middleware/auth.js'
import { getZones, createZone } from '../controllers/zones.controller.js';
const router = express.Router();

router.get('/getZones', getZones)
router.post('/createZone', auth, createZone)

export default router;
