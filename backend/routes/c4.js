import express from 'express';
import { onLoad, createIncidencia, getData} from '../controllers/c4.js';
const router = express.Router();

router.get('/', onLoad);
router.post('/postData', createIncidencia);
router.get('/getData', getData)


export default router;
