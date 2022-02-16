import { useState } from 'react';
import { Form } from '../../Form/Form';
import { Header } from '../../Header/Header';

import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../services/redux/slices/uiSlice';
import { portfolioProjectForm } from '../../../services/formData';
import { addPortfolioProject } from '../../../services/api/users.js';
import './PortfolioCard.scss';

export const AddPortfolioProject = () => {
  const { _id: userId } = useSelector((state) => state.ui.user);
  const dispatch = useDispatch();
  const [newProject, setNewProject] = useState({
    image: 'https://pbs.twimg.com/media/E5KGFT9X0AQzzaR?format=jpg&name=240x240',
    project_description: '',
    project_link: '',
    project_title: '',
  });
  // ideally updates the database on each new project without slowing the app down
  // this way the user can add a new project and on refresh, load their work.
  const handleNewProject = async (e) => {
    e.preventDefault();
    try {
      // must be able to access user's portfolio projects, spread them, then add newProject at the end of it
      const res = await addPortfolioProject(userId, newProject);
      dispatch(uiActions.updateUser(res));
      setNewProject({
        project_description: '',
        project_link: '',
        project_title: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const header = {
    title: 'Portfolio Projects',
    text: ' Add your personal projects here. You can add as many as you want, but to avoid cluttering we recommend a maximum of 3.',
  };

  return (
    <div className="add-portfolio-project">
      <Header headerTitle={header.title} headerText={header.text} />
      <Form
        formData={portfolioProjectForm}
        formState={[newProject, setNewProject, handleNewProject]}
      />
    </div>
  );
};

export const ShowPortfolioProjects = () => {
  const { portfolio_projects } = useSelector((state) => state.ui.user);

  return (
    <div className="show-portfolio-wrapper">
      <header> Your Portfolio Projects</header>
      {portfolio_projects.map((project, idx) => (
        <PortfolioProject key={`portfolioProject-${idx}`} project={project} />
      ))}
    </div>
  );
};

const PortfolioProject = ({ project }) => {
  console.log('project', project);
  const { image, project_description, project_link, project_title } = project;
  return (
    <div className="portfolio-project">
      <img src={image} alt={project_title} />
      <div className="portfolio-content">
        <p>{project_title}</p>
        {/* there should be an expand description that would expand the card and show the the project's description */}
        <p>{project_description}</p>
        <p>{project_link}</p>
      </div>
    </div>
  );
};
