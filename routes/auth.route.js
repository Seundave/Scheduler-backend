import express from "express";
import { getsuperadmins, signin, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/super-admins", getsuperadmins);

export default router;
