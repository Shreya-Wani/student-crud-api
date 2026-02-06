import { Router } from 'express';
import { signupUser, loginUser} from '../controller/auth.controller.js';

const router = Router();

router.post('/signUp', signupUser);
router.post("/login", loginUser);

export default router;