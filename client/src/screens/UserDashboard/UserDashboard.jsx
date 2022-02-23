import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllProjects } from '../../services/api/projects.js';

export const UserDashboard = () => {
  const currentUser = useSelector(state => state.ui.user);
  const collaborations = currentUser.member_of_projects;
  const [userProjects, setUserProjects] = useState([]);
  
  useEffect(() => {
    const fetchProjects = async () => {
      const allProjects = await getAllProjects();
      if (allProjects) setUserProjects(allProjects.filter(project => project.owner === currentUser._id))
    }
    fetchProjects();
  }, [currentUser]);

  
  return (
    <div className='user-dashboard'>
      <div className="collaborations-wrapper">
        <h3>My Collaborations:</h3>
        {collaborations?.map(project => (
          <div className="collaboration-wrapper" key={project._id}>
            <Link to={`/projects/${project._id}`}><h5>{project.title}</h5></Link>
          </div>
        ))}
      </div>
      <div className="user-projects-wrapper">
        <h3>My Projects:</h3>
          {userProjects.map(project => (
            <div className="user-project-wrapper" key={project._id}>
              <Link to={`/projects/${project._id}`}><h5>{project.title}</h5></Link>
            </div>
          ))}
      </div>
    </div>
  )
}
