import { useState, useEffect } from 'react';
import uuid from 'react-native-uuid';
import { Button, Text, TextInput, View } from 'react-native';
import { handleTextChange, handleToggle } from '../../services/utils/handlers';
import { useSelector } from 'react-redux';

export const SinglePortfolioProject = ({ updateEditedProject, project }) => {
  const [currProject, setCurrProject] = useState({
    image: 'https://pbs.twimg.com/media/E5KGFT9X0AQzzaR?format=jpg&name=240x240',
    project_description: '',
    project_link: '',
    project_title: '',
    project_id: uuid.v4(),
  });
  const [editProject, toggleEditProject] = useState(false);
  const { editMode, user } = useSelector((state) => state.ui);

  useEffect(() => {
    const onLoad = () => {
      setCurrProject(project);
    };
    onLoad();
  }, [project]);

  useEffect(() => {}, [editMode]);

  const handleProjectUpdate = (updateType) => {
    updateEditedProject(currProject, updateType);
    handleToggle(toggleEditProject);
  };

  if (editMode === false) {
    return <DefaultView currProject={currProject} />;
  } else if (editMode && editProject) {
    return (
      <EditableProject
        currProject={currProject}
        handleProjectUpdate={handleProjectUpdate}
        setCurrProject={setCurrProject}
        toggleEditProject={toggleEditProject}
      />
    );
  } else {
    return <EditModeView currProject={currProject} toggleEditProject={toggleEditProject} />;
  }
};

const DefaultView = ({ currProject }) => {
  const { image, project_description, project_link, project_title } = currProject;

  return (
    <View>
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

const EditModeView = ({ currProject, toggleEditProject }) => {
  const { image, project_description, project_link, project_title } = currProject;

  return (
    <View>
      <Button
        style={{ width: '45px' }}
        title="edit project"
        onPress={() => {
          handleToggle(toggleEditProject);
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

const EditableProject = ({
  currProject,
  handleProjectUpdate,
  setCurrProject,
  toggleEditProject,
}) => {
  const { image, project_description, project_link, project_title } = currProject;

  return (
    // className="edit-portfolio-project"
    <View>
      <Button title="delete" onPress={() => handleProjectUpdate('remove project')} />
      <Button title="cancel" onPress={() => handleToggle(toggleEditProject)} />
      {/* each view here is a label-input pair, should be replaced with custom component*/}
      <View>
        <Text>Title:</Text>
        <TextInput
          placeholder="My Project"
          value={project_title}
          onChangeText={(e) => handleTextChange(e, 'project_title', setCurrProject)}
        />
      </View>
      <View>
        <Text>Description:</Text>
        <TextInput
          placeholder="It's super cool..."
          value={project_description}
          onChangeText={(e) => handleTextChange(e, 'project_description', setCurrProject)}
        />
      </View>
      <View>
        <Text>Link:</Text>
        <TextInput
          placeholder="www.myproject.com"
          value={project_link}
          onChangeText={(e) => handleTextChange(e, 'project_link', setCurrProject)}
        />
      </View>
      <Button title="SAVE EDIT" onPress={handleProjectUpdate} />
    </View>
  );
};
