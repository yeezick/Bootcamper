import { useState } from 'react';
import { Form } from '../../Form/Form';
import { Header } from '../../Header/Header';

import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../services/redux/slices/uiSlice';
import { portfolioProjectForm } from '../../../services/formData';
import { addPortfolioProject } from '../../../services/api/users.js';
import './PortfolioCard.scss';

const dummyProjects = [
  {
    title: 'first',
    description: 'im a project mwahahahahahaha',
    image: 'https://pbs.twimg.com/media/E5KGFT9X0AQzzaR?format=jpg&name=240x240',
    link: 'www.google.com',
  },
  {
    title: 'second',
    description: 'im a project mwahahahahahaha',
    image: 'https://pbs.twimg.com/media/E5KGFT9X0AQzzaR?format=jpg&name=240x240',
    link: 'www.google.com',
  },
  {
    title: 'third',
    description: 'im a project mwahahahahahaha',
    image: 'https://pbs.twimg.com/media/E5KGFT9X0AQzzaR?format=jpg&name=240x240',
    link: 'www.google.com',
  },
];

export const AddPortfolioProject = () => {
  const { _id: userId } = useSelector((state) => state.ui.user);
  const dispatch = useDispatch();
  const [newProject, setNewProject] = useState({
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
  return (
    <div className="show-portfolio-wrapper">
      <header> Your Portfolio Projects</header>
      {dummyProjects.map((project, idx) => (
        <PortfolioProject key={`portfolioProject-${idx}`} project={project} />
      ))}
    </div>
  );
};

const PortfolioProject = ({ project }) => {
  const { description, image, link, title } = project;
  return (
    <div className="portfolio-project">
      <img src={image} alt={title} />
      <div className="portfolio-content">
        <p>{title}</p>
        {/* there should be an expand description that would expand the card and show the the project's description */}
        <p>{description}</p>
        <p>{link}</p>
      </div>
    </div>
  );
};
