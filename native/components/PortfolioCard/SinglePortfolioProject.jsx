import { useState, useEffect } from 'react';
import uuid from 'react-native-uuid';
import { handleTextChange } from '../../services/utils/handlers';
import { Button, Text, TextInput, View } from 'react-native';

export const SinglePortfolioProject = ({ updateEditedProject, project }) => {
  const [currProject, setCurrProject] = useState({
    image: 'https://pbs.twimg.com/media/E5KGFT9X0AQzzaR?format=jpg&name=240x240',
    project_description: '',
    project_link: '',
    project_title: '',
    project_id: uuid.v4(),
  });
  const [editProject, toggleEditProject] = useState(false);
  const { image, project_description, project_link, project_title } = currProject;

  useEffect(() => {
    const onLoad = () => {
      setCurrProject(project);
    };
    onLoad();
  }, [project]);

  const handleProjectUpdate = (updateType) => {
    updateEditedProject(currProject, updateType);
    toggleEditProject(!editProject);
  };

  if (editProject) {
    return (
      // className="edit-portfolio-project"
      <View>
        <Button title="toggle edit" onPress={() => toggleEditProject(!editProject)} />
        <Button title="delete" onPress={() => handleProjectUpdate('remove project')} />
        {/* each view here is a label-input pair */}
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
