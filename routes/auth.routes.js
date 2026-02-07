import { Router } from 'express';
import { signupUser, loginUser, refreshAccessToken} from '../controller/auth.controller.js';

const router = Router();

router.post('/signUp', signupUser);
router.post("/login", loginUser);
router.post("/refresh-token",refreshAccessToken);

export default router;