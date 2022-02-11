import { Router } from "express";
import * as controllers from "../controllers/users.js";
// import restrict from '../helpers/restrict.js'

const router = Router();

// standard crud
router.get("/users", controllers.getAllUsers);
router.get('/users/:id', controllers.getOneUser);
router.post("/sign-up", controllers.signUp);
router.put("/users/:id", controllers.updateUserInfo);
router.patch('/users/:id', controllers.addPortfolioProject);

// auth
router.post("/sign-in", controllers.signIn);
router.get("/verify", controllers.verify);

export default router;