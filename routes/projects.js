import { Router } from "express";
import * as controllers from "../controllers/projects.js";

const router = Router();
// standard crud
router.get("/projects", controllers.getAllProjects);
router.get("/projects/:id", controllers.getOneProject);
router.post("/projects", controllers.createProject);
router.put("/projects/:id", controllers.updateProject); //update description etc
router.delete("/projects/:id", controllers.deleteProject);

// special endpoints(`id` is sent via the req.body)
// `put` requests NEED id's
router.patch("/projects/add-member", controllers.addMemberToProject);
router.patch("/projects/remove-member", controllers.removeMemberFromProject);
router.patch("/projects/add-interested-user", controllers.addInterestedUser);
router.patch(
  "/projects/remove-interested-user",
  controllers.removeInterestedUser
);

export default router;
