import { useState } from 'react';
import { ShowPortfolioProjects } from '../../components/Projects/PortfolioCard/PortfolioCard';

const handleChange = (e, property, setterFunction) => {
  const { value } = e.target;

  setterFunction((state) => {
    return { ...state, [property]: value };
  });
};

export const EditProfile = () => {
  return (
    <div>
      <header>
        (header component) About You - Before you can create or join a project, we'll need to finish
        your profile first.
      </header>
      <AboutUser />
      <AddPortfolioProject />
      <ShowPortfolioProjects />
      <button>Update Profile</button>
    </div>
  );
};

const AboutUser = () => {
  const [userInfo, setUserInfo] = useState({
    about: '',
    funFact: '',
    role: '',
    portfolio_link: '',
    user_projects: [],
  });
  const [dropdownOption, setDropdownOption] = useState('');

  const handleDropdownChange = (e) => {
    const { value } = e.target;
    setDropdownOption(value);
  };

  return (
    <div>
      <div>
        <label>
          Tell us a bit about you <small>(max 250 characters)</small>
          <input
            type="textarea"
            max={250}
            value={userInfo.about}
            onChange={(e) => handleChange(e, 'about', setUserInfo)}
          />
        </label>

        <label>
          Include a fun fact! <small> (optional, max 250 characters)</small>
          <input
            type="texarea"
            max={250}
            value={userInfo.funFact}
            onChange={(e) => handleChange(e, 'funFact')}
          />
        </label>

        <label>
          I am a...
          <select value={dropdownOption} onChange={handleDropdownChange}>
            <option value="UX designer">UX designer</option>
            <option value="Software engineer">Software Engineer</option>
          </select>
        </label>

        <label>
          Link to your portfolio <small>(optional)</small>
          <input
            type="text"
            value={userInfo.portfolio_link}
            onChange={(e) => handleChange(e, 'portfolio_link')}
          />
        </label>
        {/* save button should save the user's progress so they don't lose this on refresh */}
        <button>save</button>
      </div>
    </div>
  );
};

const AddPortfolioProject = () => {
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    link: '',
  });
  // ideally updates the database on each new project without slowing the app down
  // this way the user can add a new project and on refresh, load their work.
  const handleChange = (e, property) => {
    const { value } = e.target;
    setNewProject((state) => {
      return { ...state, [property]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div>
      <header>
        Add your personal projects here. You can add as many as you want, but to avoid cluttering we
        recommend a maximum of 3.
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          Project Title:{' '}
          <input type="text" value={newProject.title} onChange={(e) => handleChange(e, 'title')} />
        </label>

        <label>
          Describe the project. <small>(max 250 characters)</small>
          <input
            type="text"
            value={newProject.description}
            onChange={(e) => handleChange(e, 'description')}
          />
        </label>

        <label>
          Link to your project
          <input type="text" value={newProject.link} onChange={(e) => handleChange(e, 'link')} />
        </label>
        <button>Add</button>
      </form>
    </div>
  );
};
