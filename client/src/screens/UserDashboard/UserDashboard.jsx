import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getAllProjects } from '../../services/api/projects.js';

export const UserDashboard = () => {
  const currentUser = useSelector(state => state.ui.user);
  const [collaborations, setCollaborations] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  
  useEffect(() => {
    const fetchProjects = async () => {
      const allProjects = await getAllProjects();
      if (allProjects) setUserProjects(allProjects.filter(project => project.owner === currentUser._id))
    }
    fetchProjects();
    setCollaborations(currentUser.member_of_projects);
  }, [currentUser]);
  console.log("collaborations:", collaborations)
  console.log("userProjects:", userProjects)
  
  return (
    <div>UserDashboard</div>
  )
}
