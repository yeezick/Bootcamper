import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Header } from '../../components/Header/Header.jsx';
import { SingleActionButton } from '../../components/Button/SingleActionButton.jsx';
import { EditTeamCount, EditTimeCommitment, EditTools } from './helpers.jsx';
import { handleTextChange } from '../../services/utils/handlers';
import { createProject, editProject } from '../../services/api/projects';

export const EditProject = ({ navigation, route }) => {
  const { createNewProject, project } = route.params;
  const [projectInfo, setProjectInfo] = useState({});
  const [loadedProject, toggleLoadedProject] = useState(false);
  const [designerCount, setDesignerCount] = useState(0);
  const [engineerCount, setEngineerCount] = useState(0);
  const currentUser = useSelector((state) => state.ui.user);
  let [buttonText, header] = [undefined, undefined];
  if (createNewProject) {
    buttonText = 'Create Project';
    header = {
      text: 'Fill in the project details and click Create Project.',
      title: 'Create a New Project',
    };
  } else {
    buttonText = 'Update Project';
    header = {
      text: 'Edit the fields below and click Update Project to save your changes.',
      title: 'Edit Project Details',
    };
  }

  useEffect(() => {
    if (createNewProject) {
      setProjectInfo({
        description: '',
        designer_count: 0,
        engineer_count: 0,
        owner: currentUser._id,
        seeking: true,
        time_commitment: 'no preference',
        title: '',
        tools: [],
      });
      toggleLoadedProject(true);
    } else {
      setProjectInfo(project);
      setDesignerCount(project.designer_count);
      setEngineerCount(project.engineer_count);
      toggleLoadedProject(true);
    }
  }, [currentUser, createNewProject]);

  const handleSubmit = async () => {
    if (createNewProject) {
      const res = await createProject(projectInfo);
      navigation.navigate('SingleProject', { projectID: res._id });
    } else {
      await editProject(projectInfo._id, projectInfo);
      navigation.navigate('SingleProject', { projectID: projectInfo._id });
    }
  };

  const updateProjectPayload = {
    handler: handleSubmit,
    text: buttonText,
    type: 'api-reroute',
  };

  if (!loadedProject) {
    return <Text>Loading....</Text>;
  }

  return (
    <ScrollView>
      <Button
        title="Cancel Editing"
        onPress={() => {
          navigation.navigate('SingleProject');
        }}
      />
      <Header headerText={header.text} headerTitle={header.title} />
      <View>
        <Text>Project Title:</Text>
        <TextInput
          onChangeText={(title) => handleTextChange(title, 'title', setProjectInfo)}
          value={projectInfo.title}
        />
        <Text>Project Description:</Text>
        <TextInput
          onChangeText={(description) =>
            handleTextChange(description, 'description', setProjectInfo)
          }
          value={projectInfo.description}
        />
        <EditTools projectInfoTools={projectInfo.tools} setProjectInfo={setProjectInfo} />
        <EditTeamCount
          designerCount={designerCount}
          engineerCount={engineerCount}
          setDesignerCount={setDesignerCount}
          setEngineerCount={setEngineerCount}
          setProjectInfo={setProjectInfo}
        />

        <EditTimeCommitment projectInfo={projectInfo} setProjectInfo={setProjectInfo} />
        <SingleActionButton payload={updateProjectPayload} />
      </View>
    </ScrollView>
  );
};
