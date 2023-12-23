import { Router } from "express";
import { loginController, registerController } from "../controllers/auth";
import catchFunction from "../utils/catchFunction";

const router = Router();

router.post("/login", catchFunction(loginController));
router.post("/register", catchFunction(registerController));

export default router;
