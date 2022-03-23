import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Button, TextInput, View } from 'react-native';
import './PortfolioCard.scss';

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
