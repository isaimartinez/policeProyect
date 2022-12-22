import express from 'express';
import auth from '../middleware/auth.js'
import { createIncidencia, getData, getZones, createZone, updateIncidencia} from '../controllers/general.js';
const router = express.Router();

router.get('/getData', auth, getData)
router.get('/getZones', getZones)
router.post('/createZone', auth, createZone)
router.patch('/:id', auth, updateIncidencia)

// Mobile part
router.post('/postData', createIncidencia);


export default router;
