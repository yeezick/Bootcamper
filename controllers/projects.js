import Project from "../models/project";
import User from "../models/user";

// standard crud
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find(); //.populate(?) i believe this method checks a specific property in the params like "userId" and if it is a valid ObjectID, will populate that field with the instance from the database
    res.json(projects);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getOneProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id); //.populate("userId")?
    res.json(project);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const addProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
      (err, project) => {
        if (err) {
          res.status(500).json(err);
        }
        if (!project) {
          res.status(500).send("Wine not found!");
        }
        return res.status(200).json(project);
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Project.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send("Project deleted!");
    }
    throw new Error("Project not found!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// special-case functions
export const addMemberToProject = async (req, res) => {
  try {
    // should query the project
    // query the user
    // add user to `Project.team_members`
    // add project to `User.member_of_projects`
    // remove project from `User.interested_projects`
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const removeMemberFromProject = async (req, res) => {
  try {
    // query the project
    // query the user
    // remover user from `Project.team_members`
    // remove project from `User.member_of_projects`
    // add project to `User.rejected_projects`
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const addInterestedUser = async (req, res) => {
  try {
    // query the project
    // query the user
    // add project to `User.interested_projects`
    // add user to `Project.interested_applicants`
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const removeInterestedUser = async (req, res) => {
  try {
    // query the project
    // query the user
    // remove user from `Project.interested_applicants`
    // remove project from `User.interested_projects`
    // add project to `User.rejected_projects`
  } catch (error) {
    res.status(500).send(error.message);
  }
};
