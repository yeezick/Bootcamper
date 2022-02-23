import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllProjects } from '../../services/api/projects.js';
import './UserDashboard.scss'

export const UserDashboard = () => {
  const currentUser = useSelector(state => state.ui.user);
  const [collaborations, setCollaborations] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  
  useEffect(() => {
    const fetchProjects = async () => {
      const allProjects = await getAllProjects();
      if (allProjects) {
      setUserProjects(allProjects.filter(project => project.owner === currentUser._id));
      setCollaborations(allProjects.filter(project => currentUser.member_of_projects.includes(project._id)));
    }
    }
    fetchProjects();
  }, [currentUser]);

  
  return (
    <div className='user-dashboard'>
      <div className="collaborations-wrapper">
        <h3>My Collaborations:</h3>
        {collaborations?.map(project => (
          <Link to={`/projects/${project._id}`}><div className="collaboration-wrapper" key={project._id}>
            <h4>{project.title}</h4>
          </div></Link>
        ))}
      </div>
      <div className="user-projects-wrapper">
        <h3>My Projects:</h3>
          {userProjects.map(project => (
            <Link to={`/projects/${project._id}`}><div className="user-project-wrapper" key={project._id}>
              <h4>{project.title}</h4>
            </div></Link>
          ))}
      </div>
    </div>
  )
}
