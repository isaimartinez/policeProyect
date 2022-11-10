import express from 'express';
import { onLoad, onPostData, getData} from '../controllers/c4.js';
const router = express.Router();

router.get('/', onLoad);
router.post('/postData', onPostData);
router.get('/getData', getData)


export default router;
