import { Router } from "express";
import * as controllers from "../controllers/projects.js";

const router = Router();
// standard crud
router.get("/projects", controllers.getAllProjects);
router.get("/projects/:id", controllers.getOneProject);
router.post("/projects", controllers.createProject);
router.put("/projects/:id", controllers.updateProject); //update description etc
router.delete("/projects/:id", controllers.deleteProject);

// special endpoints
router.put("/projects/:id/add-member", controllers.addMemberToProject);
router.put("/projects/:id/remove-member", controllers.removeMemberFromProject);
router.put("/projects/:id/add-interested-user", controllers.addInterestedUser);
router.put(
  "/projects/:id/remove-interested-user",
  controllers.removeInterestedUser
);

export default router;
