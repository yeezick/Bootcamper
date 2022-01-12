import Project from "../models/project.js";

//basic CRUD functions:
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: error.message});
    
  }
};

export const getOneProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id)
    if (project) {
      return res.json(project);
    }
    res.status(404).json({message: "Project not found."});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: error.message});
  }
};

export const createProject = async (req, res) => {
  try {
    const newProject = new Album(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: error.message});
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, req.body, {new: true});
    res.status(200).json(project);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: error.message})
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (deletedProject) {
      return res.status(200).send("Project deleted.")
    }
    throw new Error("Project not found.")
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: error.message});
  }
};

//custom functions:

export const addMemberToProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, req.body, {new: true});
    res.status(200).json(project);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: error.message});
  }
};

export const removeMemberFromProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, req.body, {new: true});
    res.status(200).json(project);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: error.message});
  }
};

export const addInterestedUser = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, req.body, {new: true});
    res.status(200).json(project);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: error.message});
  }
};

export const removeInterestedUser = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id);
    res.status(200).json(project);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: error.message});
  }
};

