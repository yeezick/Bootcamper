import { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { handleTextChange } from '../../services/utils/handlers';

export const EditTools = ({ projectInfoTools, setProjectInfo }) => {
  const [availableTools, setAvailableTools] = useState([]);
  let allTools = useSelector((state) => state.tools.allTools);
  // allTools = [{ name: 'Select a tool', id: 123 }, ...allTools];

  useEffect(() => {
    setAvailableTools(() => {
      let toolsNotInProject = allTools.filter((tool) =>
        projectInfoTools.find((projectTool) => projectTool._id !== tool._id)
      );
      return [{ name: 'Select a tool', id: 123 }, ...toolsNotInProject];
    });
  }, [projectInfoTools]);

  const selectTool = (selectedTool) => {
    const toolInList = allTools.find((tool) => tool.name === selectedTool);
    if (projectInfoTools.includes(toolInList) || toolInList.id === 123) {
      return;
    } else {
      const updatedToolList = [...projectInfoTools, toolInList];
      handleTextChange(updatedToolList, 'tools', setProjectInfo);
    }
  };

  const removeTool = (toolID) => {
    const removeIndex = projectInfoTools.findIndex((tool) => tool._id === toolID);
    let tempToolsList = projectInfoTools.map((tool) => tool); // may be able to remove this map method if "splice" does not mutate input array and returns a distinct one
    tempToolsList.splice(removeIndex, 1);
    handleTextChange(tempToolsList, 'tools', setProjectInfo);
  };

  return (
    <>
      <Text>What tools will the project use?</Text>
      {projectInfoTools?.length ? (
        <View>
          <Text>Current tools list:</Text>
          <FlatList
            data={projectInfoTools?.map((tool) => new Object({ key: tool.name, id: tool._id }))}
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
        defaultValue={allTools[0]}
        selectedValue={allTools[0]}
        onValueChange={(e) => selectTool(e)}
      >
        {availableTools.map((tool) => (
          <Picker.Item key={tool._id} label={tool.name} value={tool.name} />
        ))}
      </Picker>
    </>
  );
};

export const EditTeamCount = ({
  designerCount,
  setDesignerCount,
  engineerCount,
  setProjectInfo,
  setEngineerCount,
}) => {
  useEffect(() => {}, [designerCount, engineerCount]);

  const updateDesignerCount = (change) => {
    const newDesCount = designerCount + change;
    if (newDesCount > -1) setDesignerCount(newDesCount); // need to figure out better error handling for if count drops below 0, works on UI but console logging the values from projectInfo shows -1
    handleTextChange(newDesCount, 'designer_count', setProjectInfo);
  };

  const updateEngineerCount = (change) => {
    const newEngCount = engineerCount + change;
    if (newEngCount > -1) setEngineerCount(newEngCount);
    handleTextChange(newEngCount, 'engineer_count', setProjectInfo);
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

export const EditTimeCommitment = ({ createNewProject, projectInfo, setProjectInfo }) => {
  const timeCommitments = ['no preference', 'hobby', 'part-time', 'full-time'];
  return (
    <>
      <Text>What is the requested time commitment for collaborators?</Text>
      <Text>{`Current time commitment: ${projectInfo.time_commitment}`}</Text>
      <Picker
        defaultValue={!createNewProject ? projectInfo.time_commitment : 'no preference'}
        selectedValue={projectInfo.time_commitment}
        onValueChange={(newTimeCommitment) =>
          handleTextChange(newTimeCommitment, 'time_commitment', setProjectInfo)
        }
      >
        {timeCommitments.map((time) => (
          <Picker.Item key={time} label={time} value={time} />
        ))}
      </Picker>
    </>
  );
};
