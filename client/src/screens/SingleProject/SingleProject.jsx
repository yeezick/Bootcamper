import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getOneProject } from '../../services/api/projects.js';

export const SingleProject = () => {
  const currentUser = useSelector(state => state.ui.user);
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [loaded, setLoaded] = useState(false);

  let hours;
  const option = project.time_commitment
  switch(option) {
    case 'hobby':
      hours = 10;
      break;
    case 'part-time':
      hours = 20;
      break;
    case 'full-time':
      hours = 30;
      break;
    default: 
      hours = 'any';
  }

  useEffect(() => {
    const fetchProject = async () => {
    const currentProject = await getOneProject(id);
    if (currentProject) {
      setLoaded(true)
      setProject(currentProject);
    }
  }
    fetchProject();
  }, [id])

  

  return loaded ? (
    <div>
      <h2 className='project-title'>{project.title}</h2>
      <h3>Project Description:</h3>
      <p>{project.description}</p>
      <p>{project.team_members?.length} team members</p>
      <h3>Built with:</h3>
      {project.tools?.map(tool => (
        <div key={tool._id}>
          <h4>{tool.name}</h4>
        </div>
      ))} 
      <h3>{`Looking for collaborators who can commit ${hours} hours per week.`}</h3>
      {currentUser._id === project.owner? <button>Edit Project</button> : null}
    </div>
  ) : 
  (
   <div>
     loading ... 
   </div>
  )
};
