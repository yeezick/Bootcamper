import { useState } from 'react';
import { Form } from '../../Form/Form';
import { Header } from '../../Header/Header';

import { portfolioProjectForm } from '../../../services/formData';
import { updateUser } from '../../../services/api/users.js';
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
  const [newProject, setNewProject] = useState({
    description: '',
    link: '',
    title: '',
  });
  // ideally updates the database on each new project without slowing the app down
  // this way the user can add a new project and on refresh, load their work.
  const handleNewProject = async (e) => {
    e.preventDefault();
    try {
      const user = await updateUser(newProject);
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
      <Form formData={portfolioProjectForm} formState={[newProject, setNewProject]} />
    </div>
  );
};

export const ShowPortfolioProjects = () => {
  return (
    <div className="show-portfolio-wrapper">
      <header> Your Portfolio Projects</header>
      {dummyProjects.map((project, idx) => (
        <PortfolioProject key={idx} project={project} />
      ))}
    </div>
  );
};

const PortfolioProject = ({ project }) => {
  const { title, description, image, link } = project;
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
