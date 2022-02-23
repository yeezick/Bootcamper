import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header.jsx';
import { AboutProject } from '../../components/Projects/AboutProject/AboutProject.jsx'
import { editProject, deleteProject } from '../../services/api/projects.js';

export const EditProject = ({ project, setEdit }) => {
  const navigate = useNavigate();
  const createNewProject = false;

  const header = {
    text: 'Edit the fields below and click Update Project to save your changes.',
    title: 'Edit Project Details',
  }

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
    <div>
      <Header headerText={header.text} headerTitle={header.title} />
      <AboutProject createNewProject={createNewProject} project={project} setEdit={setEdit} handleSubmit={handleSubmit}/>
      <button onClick={handleDelete}>Delete Project</button>
    </div>
  )
}
