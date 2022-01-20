import api from "./apiConfig";

export const getProjects = async () => {
  try {
    const res = await api.get("/wines");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getOneProject = async (id) => {
  try {
    const res = await api.get(`/projects/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createProject = async (project) => {
  try {
    const res = await api.post("/projects", project);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const editProject = async (id, project) => {
  try {
    const res = await api.put(`/projects/${id}`, project);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    const res = await api.delete(`/wines/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addMemberToProject = async (project, user) => {
  try {
    const res = await api.put(`/projects/add-member`, { project, user });
    return res.data;
  } catch (error) {
    throw error;
  }
};
/* sample body request:
{
  "project": {
    "projectId": "61e090dc02b0f84cd989cd1b",
    "projectUpdate": {
      "team_members": [
        "61e090dc02b0f84cd989cd13",
        "61e090dc02b0f84cd989cd15",
        "61e090dc02b0f84cd989cd17",
        "61e096f7dcab51d3edee52e6" // new member
      ]
    }
  },
  "user": {
    "userId": "61e096f7dcab51d3edee52e6",
    "userUpdate": {
      "member_of_projects": ["61e090dc02b0f84cd989cd1b"] //must have old project id's too
    }
  }
}
*/

export const removeMemberFromProject = async (project, user) => {
  try {
    const res = await api.put("/projects/remove-member", { project, user });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addInterestedUser = async (project, user) => {
  try {
    const res = await api.put("/projects/add-interested-user", {
      project,
      user,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const removeInterestedUser = async (project, user) => {
  try {
    const res = await api.put("/projects/remove-interested-user", {
      project,
      user,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

/*
getAllProjects -> '/projects/
getOneProejct -> /projects/:id'
create project -> /projects
update projecct -> /projects/:id
delete project -> /projects/:id

specials: 
addMemberToProject -> /projects/:projectId/add-member
removeMemberFromProject -> /projects/:projectId/remove-member
addInterestedUser -> /projects/:projectId/add-interested-user
removeInterestedUser -> /projects/:projectId/remove-interested-user

*/
