import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Header } from '../components/Header/Header.jsx';
import { SingleActionButton } from '../components/Button/SingleActionButton.jsx';
import { handleTextChange } from '../services/utils/handlers';
import { createProject, editProject } from '../services/api/projects';

export const EditProject = ({ navigation, route }) => {
  const currentUser = useSelector((state) => state.ui.user);
  const allTools = useSelector((state) => state.tools.allTools);
  const { createNewProject, project } = route.params;
  const [projectInfo, setProjectInfo] = useState({});
  const [loadedProject, toggleLoadedProject] = useState(false);
  const [currentTool, setCurrentTool] = useState('');
  const [designerCount, setDesignerCount] = useState(0);
  const [engineerCount, setEngineerCount] = useState(0);
  const timeCommitments = ['no preference', 'hobby', 'part-time', 'full-time'];

  const buttonText = createNewProject ? 'Create Project' : 'Update Project';
  const header = createNewProject
    ? {
        text: 'Fill in the project details and click Create Project.',
        title: 'Create a New Project',
      }
    : {
        text: 'Edit the fields below and click Update Project to save your changes.',
        title: 'Edit Project Details',
      };

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
    }
    if (!createNewProject) {
      setProjectInfo(project);
      setDesignerCount(project.designer_count);
      setEngineerCount(project.engineer_count);
      toggleLoadedProject(true);
    }
  }, [currentUser]);

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
        <EditTools
          currentTool={currentTool}
          allTools={allTools}
          projectInfo={projectInfo}
          setProjectInfo={setProjectInfo}
          setCurrentTool={setCurrentTool}
        />
        <EditTeamCount
          designerCount={designerCount}
          engineerCount={engineerCount}
          projectInfo={projectInfo}
          setDesignerCount={setDesignerCount}
          setEngineerCount={setEngineerCount}
          setProjectInfo={setProjectInfo}
        />

        <EditTimeCommitment
          projectInfo={projectInfo}
          setProjectInfo={setProjectInfo}
          timeCommitments={timeCommitments}
        />
        <SingleActionButton payload={updateProjectPayload} />
      </View>
    </ScrollView>
  );
};

//subcomponents:
const EditTools = ({ currentTool, allTools, projectInfo, setProjectInfo }) => {
  const selectTool = (selectedTool) => {
    const toolInList = allTools.find((tool) => tool.name === selectedTool);
    const toolInProject = projectInfo.tools.includes(toolInList);

    if (toolInProject) {
      return;
    } else {
      setProjectInfo({
        ...projectInfo,
        tools: [...projectInfo.tools, toolInList],
      });
    }
  };

  const removeTool = (id) => {
    const removeIndex = projectInfo.tools.findIndex((tool) => tool._id === id);
    let tempToolsList = projectInfo.tools.map((tool) => tool);
    tempToolsList.splice(removeIndex, 1);
    setProjectInfo({
      ...projectInfo,
      tools: tempToolsList,
    });
  };

  return (
    <>
      <Text>What tools will the project use?</Text>
      {projectInfo.tools?.length ? (
        <View>
          <Text>Current tools list:</Text>
          <FlatList
            data={projectInfo.tools?.map((tool) => new Object({ key: tool.name, id: tool._id }))}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text>{item.key}</Text>
                  <Button onPress={() => removeTool(item.id)} title="x" />
                </View>
              );
            }}
          ></FlatList>
        </View>
      ) : null}
      <Text>Add tools to the project:</Text>
      <Picker
        defaultValue={'select a tool'}
        selectedValue={currentTool}
        onValueChange={(e) => selectTool(e)}
      >
        {allTools.map((tool) => (
          <Picker.Item key={tool._id} label={tool.name} value={tool.name} />
        ))}
      </Picker>
    </>
  );
};

const EditTeamCount = ({
  designerCount,
  projectInfo,
  setDesignerCount,
  engineerCount,
  setProjectInfo,
  setEngineerCount,
}) => {
  useEffect(() => {}, [designerCount, engineerCount]);

  const updateDesignerCount = (change) => {
    const newDesCount = designerCount + change;
    if (newDesCount > -1) setDesignerCount(newDesCount); // need to figure out better error handling for if count drops below 0, works on UI but console logging the values from projectInfo shows -1
    setProjectInfo({
      ...projectInfo,
      designer_count: newDesCount,
    });
  };
  const updateEngineerCount = (change) => {
    const newEngCount = engineerCount + change;
    if (newEngCount > -1) setEngineerCount(newEngCount);
    setProjectInfo({
      ...projectInfo,
      engineer_count: newEngCount,
    });
  };

  return (
    <>
      <Text>How many designers are you seeking?</Text>
      <Text>{designerCount}</Text>
      <Button onPress={() => updateDesignerCount(1)} title="+" />
      <Button onPress={() => updateDesignerCount(-1)} title="-" />
      <Text>How many engineers are you seeking?</Text>
      <Text>{engineerCount}</Text>
      <Button onPress={() => updateEngineerCount(1)} title="+" />
      <Button onPress={() => updateEngineerCount(-1)} title="-" />
    </>
  );
};

const EditTimeCommitment = ({ createNewProject, projectInfo, setProjectInfo, timeCommitments }) => {
  return (
    <>
      {/* time collab */}
      <Text>What is the requested time commitment for collaborators?</Text>
      <Text>{`Current time commitment: ${projectInfo.time_commitment}`}</Text>
      <Picker
        defaultValue={!createNewProject ? projectInfo.time_commitment : 'no preference'}
        selectedValue={projectInfo.time_commitment}
        onValueChange={(e) =>
          setProjectInfo((state) => {
            return { ...state, time_commitment: e };
          })
        }
      >
        {timeCommitments.map((time) => (
          <Picker.Item key={time} label={time} value={time} />
        ))}
      </Picker>
    </>
  );
};
