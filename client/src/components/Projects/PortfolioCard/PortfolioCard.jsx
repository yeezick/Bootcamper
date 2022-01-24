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

export const ShowPortfolioProjects = () => {
  // map through all user projects
  // return portfolio card for that project
  return (
    <div>
      <header> Your Projects</header>
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
        <p>{description}</p>
        <p>{link}</p>
      </div>
    </div>
  );
};
