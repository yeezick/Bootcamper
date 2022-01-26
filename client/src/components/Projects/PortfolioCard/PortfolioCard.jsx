import { useState } from 'react';
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
// make this a global function and remove
const handleChange = (e, property, setterFunction) => {
  const { value } = e.target;
  setterFunction((state) => {
    return { ...state, [property]: value };
  });
};

export const AddPortfolioProject = () => {
  const [newProject, setNewProject] = useState({
    description: '',
    link: '',
    title: '',
  });
  // ideally updates the database on each new project without slowing the app down
  // this way the user can add a new project and on refresh, load their work.
  const handleSubmit = (e) => {
    console.log(e);
  };

  const formData = {
    button: {
      type: 'single',
      text: 'Add New Project',
    },
    handlers: {
      onChange: handleChange,
      // onSubmit: handleNewProject,
    },
    inputs: [
      {
        labelText: 'Project Title',
        name: 'project_title',
        type: 'text',
        value: newProject.title,
      },
      {
        labelText: 'Describe the project',
        name: 'project_description',
        type: 'textarea',
        value: newProject.description,
      },
      {
        labelText: 'Link to your project',
        name: 'project_link',
        type: 'text',
        value: newProject.link,
      },
    ],
  };

  return (
    <div className="add-portfolio-project">
      <header>
        Add your personal projects here. You can add as many as you want, but to avoid cluttering we
        recommend a maximum of 3.
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          Project Title:
          <input
            type="text"
            value={newProject.title}
            onChange={(e) => handleChange(e, 'title', setNewProject)}
          />
        </label>

        <label>
          Describe the project. <small>(max 250 characters)</small>
          <input
            type="text"
            value={newProject.description}
            onChange={(e) => handleChange(e, 'description', setNewProject)}
          />
        </label>

        <label>
          Link to your project
          <input
            type="text"
            value={newProject.link}
            onChange={(e) => handleChange(e, 'link', setNewProject)}
          />
        </label>
        <button>Add</button>
      </form>
    </div>
  );
};

export const ShowPortfolioProjects = () => {
  return (
    <div className="show-portfolio-wrapper">
      <header> Portfolio Projects</header>
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
