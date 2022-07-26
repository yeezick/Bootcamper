import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import uuid from 'react-native-uuid';
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { handleTextChange, handleToggle } from '../../services/utils/handlers';
import { Octicons } from '@expo/vector-icons';

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

  const handleProjectUpdate = (updateType) => {
    updateEditedProject(currProject, updateType);
    handleToggle(toggleEditProject);
  };

  if (!editMode) {
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
    <TouchableOpacity style={styles.default} onPress={() => (project_link)}>
      <View>
        <Text style={styles.title}>{project_title}</Text>
        <Text>{project_description}</Text>
        <Text>{project_link}</Text>
      </View>
      {/* <Text>IMAGE: PORTFOLIO PROJECT</Text> */}
      <Image style={styles.image}></Image>
      {/* className="portfolio-content" */}
    </TouchableOpacity>
  );
};

const EditModeView = ({ currProject, toggleEditProject }) => {
  const { image, project_description, project_link, project_title } = currProject;

  return (
    <View style={styles.default}>
      <TouchableOpacity style={styles.iconButtonContainer} onPress={handleToggle(toggleEditProject)} >
          <View style={styles.iconButton}>
            <Octicons name="pencil" size={20} />
          </View>
          <Text style={styles.buttonText}>EDIT PROFILE</Text>
        </TouchableOpacity>
      <Button
        style={{ width: '45px' }}
        title="edit project"
        onPress={() => {
          handleToggle(toggleEditProject);
        }}
      />
{/*       
      <Text>IMAGE: PORTFOLIO PROJECT</Text> */}
      {/* className="portfolio-content" */}
      <View>
        <Text style={styles.title}>{project_title}</Text>
        <Text>{project_description}</Text>
        <Text>{project_link}</Text>
      </View>
      <Image style={styles.image}></Image>
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


const styles = StyleSheet.create({
  default: {
    backgroundColor: '#C4C4C4',
    borderRadius: 3,
    // margin: 10,
    marginVertical: 8,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: 320
  },
  iconButton: {
    borderWidth: 2,
    borderRadius: 100,
    padding: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 15,
    color: 'black',
  },
  image: {
    backgroundColor: '#313131',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  }
})