import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { Form } from '../../Form/Form';
import { Header } from '../../Header/Header';

import { uiActions } from '../../../services/redux/slices/uiSlice';
import { portfolioProjectForm } from '../../../services/formData';
import { addPortfolioProject } from '../../../services/api/users.js';
import './PortfolioCard.scss';
import { handleChange } from '../../../services/utils/formHandlers';
import { addRejectedProject } from '../../../services/redux/actions/uiActions';
import { Button, TextInput, View } from 'react-native';
/*
export const REACTAddPortfolioProject = () => {
  const { _id: userId } = useSelector((state) => state.ui.user);
  const dispatch = useDispatch();
  const [newProject, setNewProject] = useState({
    image: 'https://pbs.twimg.com/media/E5KGFT9X0AQzzaR?format=jpg&name=240x240',
    project_description: '',
    project_link: '',
    project_title: '',
    project_id: nanoid(),
  });
  // ideally updates the database on each new project without slowing the app down
  // this way the user can add a new project and on refresh, load their work.
  const handleNewProject = async (e) => {
    e.preventDefault();
    try {
      const res = await addPortfolioProject(userId, newProject);
      dispatch(uiActions.updateUser(res));
      setNewProject({
        image: 'https://pbs.twimg.com/media/E5KGFT9X0AQzzaR?format=jpg&name=240x240',
        project_description: '',
        project_link: '',
        project_title: '',
        project_id: nanoid(),
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
*/

export const ShowPortfolioProjects = ({ currUser }) => {
  const dispatch = useDispatch();

  const updateEditedProject = (editedProject, removeProject) => {
    const { portfolio_projects, _id: userId } = currUser;
    const { project_id: currentId } = editedProject;
    let copyPortfolioProjects = [...portfolio_projects];
    if (removeProject) {
      copyPortfolioProjects = portfolio_projects.filter(
        (project) => project.project_id !== currentId
      );
    } else {
      const editedIdx = portfolio_projects.findIndex((project) => project.project_id === currentId);
      copyPortfolioProjects[editedIdx] = editedProject;
    }
    dispatch(addRejectedProject(userId, { portfolio_projects: copyPortfolioProjects }));
  };
  return (
    currUser?.portfolio_projects?.length > 0 && (
      // className="show-portfolio-wrapper
      <View>
        <Text> Your Portfolio Projects</Text>
        {currUser?.portfolio_projects?.map((project, idx) => (
          <PortfolioProject
            key={`portfolioProject-${idx}`}
            project={project}
            updateEditedProject={updateEditedProject}
          />
        ))}
      </View>
    )
  );
};

/*
export const ShowPortfolioProjects = ({ currUser }) => {
  const dispatch = useDispatch();

  const updateEditedProject = (editedProject, removeProject) => {
    const { portfolio_projects, _id: userId } = currUser;
    const { project_id: currentId } = editedProject;
    let copyPortfolioProjects = [...portfolio_projects];
    if (removeProject) {
      copyPortfolioProjects = portfolio_projects.filter(
        (project) => project.project_id !== currentId
      );
    } else {
      const editedIdx = portfolio_projects.findIndex((project) => project.project_id === currentId);
      copyPortfolioProjects[editedIdx] = editedProject;
    }
    dispatch(addRejectedProject(userId, { portfolio_projects: copyPortfolioProjects }));
  };

  return (
    currUser?.portfolio_projects?.length > 0 && (
      <div className="show-portfolio-wrapper">
        <header> Your Portfolio Projects</header>
        {currUser?.portfolio_projects?.map((project, idx) => (
          <PortfolioProject
            key={`portfolioProject-${idx}`}
            project={project}
            updateEditedProject={updateEditedProject}
          />
        ))}
      </div>
    )
  );
};
*/

export const PortfolioProject = ({ updateEditedProject, project }) => {
  const [currProject, setCurrProject] = useState({
    image: 'https://pbs.twimg.com/media/E5KGFT9X0AQzzaR?format=jpg&name=240x240',
    project_description: '',
    project_link: '',
    project_title: '',
    project_id: nanoid(),
  });
  const [editProject, toggleEditProject] = useState(false);
  const { image, project_description, project_link, project_title } = currProject;

  useEffect(() => {
    const onLoad = () => {
      setCurrProject(project);
    };
    onLoad();
  }, [project]);

  const handleProjectUpdate = (e, removeProject) => {
    updateEditedProject(currProject, removeProject);
    toggleEditProject(!editProject);
  };

  if (editProject) {
    return (
      // className="edit-portfolio-project"
      <View>
        <Button onPress={() => toggleEditProject(!editProject)}>toggle edit</Button>
        <Button onPress={(e) => handleProjectUpdate(e, 'remove project')}>delete</Button>
        {/* each view here is a label-input pair */}
        {/* onChange={(e) => handleChange(e, 'project_title', setCurrProject)} */}
        <View>
          <Text>Title:</Text>
          <TextInput
            placeholder="project_title"
            value={project_title}
            onChangeText={(e) => console.log(e)}
          />
        </View>
        {/* onChange={(e) => handleChange(e, 'project_title', setCurrProject)} */}
        <View>
          <Text>Description:</Text>
          <TextInput
            placeholder="project_title"
            value={project_description}
            onChangeText={(e) => console.log(e)}
          />
        </View>
        {/* onChange={(e) => handleChange(e, 'project_link', setCurrProject)} */}
        <View>
          <Text>Link:</Text>
          <TextInput
            placeholder="project_link"
            value={project_title}
            onChangeText={(e) => console.log(e)}
          />
        </View>
        <Button onPress={handleProjectUpdate}> SAVE EDIT</Button>
      </View>
    );
  }

  return (
    // className="portfolio-project"
    <View>
      <Button
        style={{ width: '45px' }}
        title="edit project"
        onPress={() => {
          toggleEditProject(!editProject);
        }}
      />
      <Text>IMAGE: PORTFOLIO PROJECT</Text>
      {/* className="portfolio-content" */}
      <View>
        <Text>{project_title}</Text>
        <Text>{project_description}</Text>
        <Text>{project_link}</Text>
      </View>
    </View>
  );
};
/* 
const PortfolioProject = ({ updateEditedProject, project }) => {
  const [currProject, setCurrProject] = useState({
    image: 'https://pbs.twimg.com/media/E5KGFT9X0AQzzaR?format=jpg&name=240x240',
    project_description: '',
    project_link: '',
    project_title: '',
    project_id: nanoid(),
  });
  const [editProject, toggleEditProject] = useState(false);
  const { image, project_description, project_link, project_title } = currProject;

  useEffect(() => {
    const onLoad = () => {
      setCurrProject(project);
    };
    onLoad();
  }, [project]);

  const handleProjectUpdate = (e, removeProject) => {
    updateEditedProject(currProject, removeProject);
    toggleEditProject(!editProject);
  };

  if (editProject) {
    return (
      <div className="edit-portfolio-project">
        <button onClick={() => toggleEditProject(!editProject)}>toggle edit</button>
        <button onClick={(e) => handleProjectUpdate(e, 'remove project')}>delete</button>
      ///  {/* reuse of inputs is opportunity to consolidate using a map method 
        <label className="">
          Title:
          <input
            type="text"
            className=""
            value={project_title}
            onChange={(e) => handleChange(e, 'project_title', setCurrProject)}
          />
        </label>

        <label className="">
          Description:
          <input
            type="text"
            className=""
            value={project_description}
            onChange={(e) => handleChange(e, 'project_description', setCurrProject)}
          />
        </label>

        <label className="">
          Link:
          <input
            type="text"
            className=""
            value={project_link}
            onChange={(e) => handleChange(e, 'project_link', setCurrProject)}
          />
        </label>
        <button onClick={handleProjectUpdate}> SAVE EDIT</button>
      </div>
    );
  }
  return (
    <div className="portfolio-project">
      <button
        style={{ width: '45px' }}
        onClick={() => {
          toggleEditProject(!editProject);
        }}
      ></button>
      <img src={image} alt={project_title} />
      <div className="portfolio-content">
        <p>{project_title}</p>
        <p>{project_description}</p>
        <p>{project_link}</p>
      </div>
    </div>
  );
};
*/
