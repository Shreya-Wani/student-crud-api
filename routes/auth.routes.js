import { Router } from 'express';
import { signupUser, loginUser, refreshAccessToken, logoutUser} from '../controller/auth.controller.js';
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/signUp', signupUser);
router.post("/login", loginUser);
router.post("/refresh-token",refreshAccessToken);
router.post("/logout", authMiddleware, logoutUser);

export default router;