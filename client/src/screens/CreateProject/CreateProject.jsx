import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header.jsx';
import { AboutProject } from '../../components/Projects/AboutProject/AboutProject.jsx';
import { createProject } from '../../services/api/projects.js'
import '../../components/Form/Form.scss';
import './CreateProject.scss'

export const CreateProject = () => {

  const createNewProject = true;
  const navigate = useNavigate();
  const header = {
    text: "Have a vision? Let's make it real!",
    title: 'Create a Project',
  };

  const handleSubmit = async (e, projectInfo) => {
    e.preventDefault();
    const newProject = await createProject(projectInfo);
    if (newProject) navigate(`/projects/${newProject._id}`)
  }

  return (
    <div className='create-project-screen'>
      <Header headerText={header.text} headerTitle={header.title} />
      <AboutProject handleSubmit={handleSubmit} createNewProject={createNewProject} />
    </div>
  )
}