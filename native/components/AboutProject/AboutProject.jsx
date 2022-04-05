import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SingleActionButton } from '../Button/SingleActionButton';

export const AboutProject = ({ createNewProject, handleSubmit, project, setEdit }) => {
  const currentUser = useSelector(state => state.ui.user);
  const toolsList = useSelector(state => state.tools.allTools);
  const [projectInfo, setProjectInfo] = useState({});
  const [currentTool, setCurrentTool] = useState('');
  const [designerCount, setDesignerCount] = useState(0);
  const [engineerCount, setEngineerCount] = useState(0);
  const [timeCommitment, setTimeCommitment] = useState('')
  const timeCommitments = ['no preference', 'hobby', 'part-time', 'full-time']
  


  const handleChange = (e) => {
    const {name, value} = e.target
    setProjectInfo({
      ...projectInfo,
      [name]: value,
    })
  }
  const buttonText = createNewProject ? 'Create Project' : 'Update Project'
  const buttonPayload = {
    type: 'call-api',
    text: buttonText,
  }

// tools related variables and functions
  const handleToolChange = (e) => {
    setCurrentTool(e.target.value)
  }
  const selectTool = () => {
    if (currentTool) { const selectedTool = toolsList.find(tool => tool.name === currentTool)
    setProjectInfo({
      ...projectInfo,
      tools: [...projectInfo.tools, selectedTool],
    })
  }
  setCurrentTool('')
}

const removeTool = (id) => {
  const removeIndex = projectInfo.tools.findIndex(tool => tool._id === id)
  const projectTools = projectInfo.tools
  projectTools.splice(removeIndex, 1);
  setProjectInfo({
    ...projectInfo,
    tools: projectTools
  })
}
// count related functions
const updateDesignerCount = (change) => {
  if (designerCount + change >= 0) setDesignerCount(designerCount + change);
  setProjectInfo({
    ...projectInfo,
    designer_count: designerCount,
  });
}
const updateEngineerCount = (change) => {
  if (engineerCount + change >= 0) setEngineerCount(engineerCount + change);
  setProjectInfo({
    ...projectInfo,
    engineer_count: engineerCount,
  });
}
useEffect(() => {
  if (createNewProject) setProjectInfo({
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
    setProjectInfo({...project});
    setDesignerCount(project.designer_count);
    setEngineerCount(project.engineer_count);
  }
}, [currentUser])

  return (
    <View>
      <Text>Project Title</Text>
      <TextInput
        onChangeText={handleChange}
        value={projectInfo.title}
      />
      <Text>Project Description</Text>
      <TextInput
        onChangeText={handleChange}
        value={projectInfo.description}
      />
      <Text>What tools will the project use?</Text>
      {project.tools.length ? 
      <View>
        <Text>Current tools list:</Text>
        <FlatList 
          data={project.tools?.map(tool => new Object({key: tool.name, id: tool._id}))}
          renderItem={({item}) => (
            <View>
              <Text>{item.key}</Text>
              <Button 
                onPress={() => removeTool(item.id)}
                title="x"
              />
            </View>)}>
        </FlatList> 

      </View> 
      : null }
      <Text>Add tools to the project:</Text>
      <Picker defaultValue={'select a tool'} selectedValue={currentTool} onValueChange={(e) => selectTool(e)}>
        {toolsList.map(tool => (
          <Picker.Item key={tool.name} label={tool.name} value={tool.name} />
        ))}
      </Picker>
      <Text>How many designers are you seeking?</Text>
      <Text>{designerCount}</Text>
      <Button 
        onPress={() => updateDesignerCount(1)}
        title='+'
      />
      <Button 
        onPress={() => updateDesignerCount(-1)}
        title='-'
      />
      <Text>How many engineers are you seeking?</Text>
      <Text>{engineerCount}</Text>
      <Button 
        onPress={() => updateEngineerCount(1)}
        title='+'
      />
      <Button 
        onPress={() => updateEngineerCount(-1)}
        title='-'
      />
      <Text>What is the requested time commitment for collaborators?</Text>
      <Text>{`Current time commitment: ${project.time_commitment}`}</Text>
      <Picker
        defaultValue={!createNewProject ? project.time_commitment : 'no preference'}
        selectedValue={project.time_commitment} 
      >
        {timeCommitments.map(time => (
          <Picker.Item key={time} label={time} value={time}/>
        ))}
      </Picker>
      <SingleActionButton payload={buttonPayload}/>
    </View>
  )

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
  //         {toolsList?.map(tool => (
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
}
