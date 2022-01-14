import Project from "../models/project.js";
import User from "../models/user.js";
// barbra : 61e090dc02b0f84cd989cd17
// second user id rynearson: 61e096f7dcab51d3edee52e6
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
    const { id } = req.params;
    // add user to `Project.team_members`
    const project = await Project.findByIdAndUpdate(
      id,
      req.body.projectUpdate,
      {
        new: true,
      }
    ).populate({ path: "team_members", model: User });

    //add project to `User.member_of_projects`
    const user = await User.findByIdAndUpdate(
      req.body.userId,
      req.body.userUpdate,
      {
        new: true,
      }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
/*
{
    "projectUpdate": {
        "team_members": [
        "61e090dc02b0f84cd989cd13",
        "61e090dc02b0f84cd989cd15",
        "61e090dc02b0f84cd989cd17",
        "61e096f7dcab51d3edee52e6"
    ]
    },
    "userId": "61e096f7dcab51d3edee52e6",
    "userUpdate": {
        "member_of_projects": [
            "61e090dc02b0f84cd989cd1b"
            ]

    }
}
*/

export const removeMemberFromProject = async (req, res) => {
  try {
    const { projectId, userId } = req.body;
    const project = await Project.findByIdAndUpdate(projectId, req.body, {
      new: true,
    });
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(200).json(project, user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const addInterestedUser = async (req, res) => {
  try {
    const { projectId, userId } = req.body;
    const project = await Project.findByIdAndUpdate(projectId, req.body, {
      new: true,
    });
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(200).json(project, user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const removeInterestedUser = async (req, res) => {
  try {
    const { projectId, userId } = req.body;
    const project = await Project.findByIdAndUpdate(projectId, req.body, {
      new: true,
    });
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(200).json(project, user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
