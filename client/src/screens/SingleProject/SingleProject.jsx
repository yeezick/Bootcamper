import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getOneProject } from '../../services/api/projects.js';

export const SingleProject = () => {
  const currentUser = useSelector(state => state.ui.user);
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [loaded, setLoaded] = useState(false);

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

  console.log(project)

  return loaded ? (
    <div>
      <h2 className='project-title'>{project.title}</h2>
      <h3>Project Description:</h3>
      <p>{project.description}</p>
      <h3>Built with:</h3>
      {project.tools?.map(tool => (
        <div key={tool._id}>
          <h4>{tool.name}</h4>
        </div>
      ))} 
    </div>
  ) : 
  (
   <div>
     loading ... 
   </div>
  )
};
