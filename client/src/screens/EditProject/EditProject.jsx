import { useNavigate } from 'react-router-dom';
import { AboutProject } from '../../components/Projects/AboutProject/AboutProject.jsx'
import { SingleActionButton } from '../../components/Button/SingleActionButton.jsx';
import { editProject, deleteProject } from '../../services/api/projects.js';
import './EditProject.scss';

export const EditProject = ({ project, setEdit }) => {
  const navigate = useNavigate();
  const createNewProject = false;

  const handleSubmit = async (e, projectInfo) => {
    e.preventDefault();
    const updatedProject = await editProject(project._id, projectInfo);
    if (updatedProject) setEdit(false)
  }

  const handleDelete = async () => {
    await deleteProject(project._id)
    navigate('/dashboard')
  }

  return (
    <div className='edit-project'>
      <h3>Edit Project</h3>
      <AboutProject createNewProject={createNewProject} project={project} setEdit={setEdit} handleSubmit={handleSubmit}/>     
      <SingleActionButton onClick={handleDelete} text={'Delete Project'} />
    </div>
  )
}
