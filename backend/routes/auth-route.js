import express from 'express';
import { signup , signin, signOut} from '../controller/auth.controller.js';
import { googleSignin } from '../controller/auth.controller.js';


const router = express.Router();

router.post('/signup',signup);

router.post("/signin", signin);

router.post ("/google", googleSignin)

router.get('/signout',signOut);

export default router;