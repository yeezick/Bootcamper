import { Router } from "express";
import * as controllers from "../controllers/users.js";
// import restrict from '../helpers/restrict.js'

const router = Router();

// standard crud
router.post("/sign-up", controllers.signUp);
router.put("/users/:id", controllers.updateUserInfo);

// auth
router.post("/sign-in", controllers.signIn);
router.get("/verify", controllers.verify);

export default router;
