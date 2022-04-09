import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SingleActionButton } from '../Button/SingleActionButton';
import { handleTextChange } from '../../services/utils/handlers';
import { createProject, editProject } from '../../services/api/projects';
import { useNavigation } from '@react-navigation/native';

export const AboutProject = ({ project, setEdit }) => {
  const currentUser = useSelector((state) => state.ui.user);
  const allTools = useSelector((state) => state.tools.allTools);
  const [projectInfo, setProjectInfo] = useState({});
  const [currentTool, setCurrentTool] = useState('');
  const [designerCount, setDesignerCount] = useState(0);
  const [engineerCount, setEngineerCount] = useState(0);
  const [timeCommitment, setTimeCommitment] = useState('');
  const timeCommitments = ['no preference', 'hobby', 'part-time', 'full-time'];
  const buttonText = createNewProject ? 'Create Project' : 'Update Project';
  const navigation = useNavigation();
  const createNewProject = true;

  useEffect(() => {
    if (createNewProject)
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
    if (!createNewProject) {
      setProjectInfo({ ...project });
      setDesignerCount(project.designer_count);
      setEngineerCount(project.engineer_count);
    }
  }, [currentUser]);

  const handleSubmit = async () => {
    if (createNewProject) {
      const res = await createProject(projectInfo);
      navigation.navigate('SingleProject', { projectID: res._id });
    } else {
      await editProject(projectInfo._id);
      navigation.navigate('SingleProject', { projectID: projectInfo._id });
    }
  };
  const updateProjectPayload = {
    handler: handleSubmit,
    text: buttonText,
    type: 'api-reroute',
  };

  return (
    <View>
      <Text>Project Title</Text>
      <TextInput
        onChangeText={(title) => handleTextChange(title, 'title', setProjectInfo)}
        value={projectInfo.title}
      />
      <Text>Project Description</Text>
      <TextInput
        onChangeText={(description) => handleTextChange(description, 'description', setProjectInfo)}
        value={projectInfo.description}
      />
      <EditTools
        currentTool={currentTool}
        allTools={allTools}
        project={project}
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
  );
};

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
    const projectTools = projectInfo.tools;
    projectTools.splice(removeIndex, 1);
    setProjectInfo({
      ...projectInfo,
      tools: projectTools,
    });
  };

  return (
    <>
      {/* tools */}
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
          <Picker.Item key={tool.name} label={tool.name} value={tool.name} />
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

//react return statement:
// return (
//   <div className="about-project">
//     <form onSubmit={(e) => handleSubmit(e, projectInfo)} className='project-form form'>
//      <label htmlFor='title'>Project Title</label>
//      <input
//       id='title'
//       name='title'
//       type='text'
//       value={projectInfo.title}
//       onChange={handleChange}
//      />
//      <label htmlFor='description'>Project Description (max 300 characters)</label>
//      <textarea
//       id='description'
//       name='description'
//       value={projectInfo.description}
//       onChange={handleChange}
//      />
//      <div className="tools-form form">
//       <label htmlFor="tools">What tools will the project use?</label>
//       <input
//         id='tools'
//         list='tools-list'
//         name='tools'
//         onChange={handleToolChange}
//         value={currentTool}
//       />
//       <datalist id='tools-list'>
//         {allTools?.map(tool => (
//           <option key={tool._id} value={tool.name}/>
//         ))}
//       </datalist>
//       <button onClick={selectTool}>Add Tool</button>
//       <div className="current-tools">
//         {projectInfo?.tools?.map(tool => (
//           <div key={tool._id} className="tool-preview">
//             <p>{tool.name}</p>
//             <button onClick={(e) => removeTool(e, tool._id)}>x</button>
//           </div>
//         ))}
//       </div>
//     </div>
//      <label htmlFor='designer-count'>How many designers are you seeking?</label>
//      <input
//       id='designer-count'
//       min='0'
//       name='designer_count'
//       type='number'
//       value={projectInfo.designer_count}
//       onChange={handleChange}
//      />
//      <label htmlFor='engineer-count'>How many engineers are you seeking?</label>
//      <input
//       id='engineer-count'
//       min='0'
//       name='engineer_count'
//       type='number'
//       value={projectInfo.engineer_count}
//       onChange={handleChange}
//      />
//      <label htmlFor='time-commitment'>...whose commitment level is:</label>
//      <select
//       defaultValue={project?.time_commitment ? project.time_commitment : 'no preference'}
//       id='time-commitment'
//       name='time_commitment'
//       onChange={handleChange}
//     >
//       <option value='no preference'>no preference</option>
//       <option value='hobby'>hobby</option>
//       <option value='part-time'>part-time</option>
//       <option value='full-time'>full-time</option>
//     </select>
//     <SingleActionButton type={'submit'} text={createNewProject ? 'Create Project' : 'Update Project'} />
//     </form>
//   </div>
// )
