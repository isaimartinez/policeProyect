import express from 'express';
import auth from '../middleware/auth.js'
import { createIncidencia, getData, getZones} from '../controllers/c4.js';
const router = express.Router();

router.get('/getData', auth, getData)
router.get('/getZones', getZones)
router.post('/postData', createIncidencia);


export default router;
