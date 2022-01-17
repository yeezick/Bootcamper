/**
 * todo:
 * - need to add edge cases
 * - need to add edge cases
 * - refactor this code because there is a for sure cleaner way to do all of this
 *  - might even be able to make a helper function since a lot of the special endpoints share the same funcitonality
 * - consider what properties containing objectId's should be populated in the response
 */
import Project from "../models/project.js";
import User from "../models/user.js";
// barbra : 61e1dd56f0433b2d40e12cdb
// wiggle jones: 61e1dd56f0433b2d40e12cd7
// mike: 61e1dd56f0433b2d40e12cd9

// project id gamebot: 61e1dd57f0433b2d40e12cdf //owned by wiggle jones
// painting app: 61e1dd57f0433b2d40e12ce0 // owned by mike

//basic CRUD functions:
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find(); // .populate({path: "interested_applicants",model: User,  });
    res.json(projects);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}; //tested and is good

export const getOneProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (project) {
      return res.json(project);
    }
    res.status(404).json({ message: "Project not found." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}; // tested and is good

export const createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}; // works, requires userID

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(project);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}; // works

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (deletedProject) {
      return res.status(200).send("Project deleted.");
    }
    throw new Error("Project not found.");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}; // works

//custom functions:

export const addMemberToProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { projectUpdate, userUpdate, userId } = req.body;
    const project = await Project.findByIdAndUpdate(projectId, projectUpdate, {
      new: true,
    }).populate({ path: "team_members", model: User });

    const user = await User.findByIdAndUpdate(userId, userUpdate, {
      new: true,
    });
    res.status(200).json({ message: "Success!", user, project });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
/* for `addMemberToProject`, currently getting project id from params
- on the front-end must do a check if the project is in this User's `interested_projects` array and remove this project from that array 
 {
  projectUpdate: {
    team_members: [
      "61e090dc02b0f84cd989cd13",
      "61e090dc02b0f84cd989cd15",
      "61e090dc02b0f84cd989cd17",
      "61e096f7dcab51d3edee52e6", // new member
    ],
  },
  userId: "61e096f7dcab51d3edee52e6",
  userUpdate: {
    member_of_projects: ["61e090dc02b0f84cd989cd1b"], //must have old project id's too 
  },
};
todo: refactor this so that req.body looks like
todo: this will also help with the need to destructure id from params
const body = {
  project: {
    projectId: "61e090dc02b0f84cd989cd1b"
    projectUpdate: {
      team_members: [
        "61e090dc02b0f84cd989cd13",
        "61e090dc02b0f84cd989cd15",
        "61e090dc02b0f84cd989cd17",
        "61e096f7dcab51d3edee52e6", // new member
      ],
    },
  },
  user: {
    userId: "61e096f7dcab51d3edee52e6",
    userUpdate: {
      member_of_projects: ["61e090dc02b0f84cd989cd1b"], //must have old project id's too
    },
  },
};
*/

export const removeMemberFromProject = async (req, res) => {
  try {
    const { projectUpdate, userId, userUpdate } = req.body;
    const { projectId } = req.params;
    const project = await Project.findByIdAndUpdate(projectId, projectUpdate, {
      new: true,
    });
    const user = await User.findByIdAndUpdate(userId, userUpdate, {
      new: true,
    });
    res.status(200).json({ message: "Success!", user, project });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

/* in this instance I removed the member i had originally added with `addMemberToProject`
{
  projectUpdate: {
    team_members: ["61e1dd56f0433b2d40e12cd7", "61e1dd56f0433b2d40e12cd9"],
  },
  userId: "61e1dd56f0433b2d40e12cdb",
  userUpdate: {
    member_of_projects: [],
    rejected_projects: ["61e1dd57f0433b2d40e12cdf"], // dont forget to add project here
  },
};
 */

export const addInterestedUser = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId, userUpdate, projectUpdate } = req.body;
    const project = await Project.findByIdAndUpdate(projectId, projectUpdate, {
      new: true,
    });
    const user = await User.findByIdAndUpdate(userId, userUpdate, {
      new: true,
    });
    res.status(200).json({ message: "Success!", user, project });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
/*
{
  "projectUpdate": {
    "interested_applicants": ["61e1dd56f0433b2d40e12cd9"]
  },
  "userId": "61e1dd56f0433b2d40e12cdb",
  "userUpdate": {
    "interested_projects": ["61e1dd57f0433b2d40e12cdf"],
  }
}
*/

export const removeInterestedUser = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId, userUpdate, projectUpdate } = req.body;
    const project = await Project.findByIdAndUpdate(projectId, projectUpdate, {
      new: true,
    });
    const user = await User.findByIdAndUpdate(userId, userUpdate, {
      new: true,
    });
    res.status(200).json({ message: "Success!", user, project });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

/*
{
  "projectUpdate": {
    "interested_applicants": []
  },
  "userId": "61e1dd56f0433b2d40e12cdb",
  "userUpdate": {
    "interested_projects": [],
    "rejected_projects": ["61e1dd57f0433b2d40e12cdf"]
  }
}
*/
