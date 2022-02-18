import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const AboutProject = ({ createNewProject, handleSubmit, project, setEdit }) => {
  const currentUser = useSelector(state => state.ui.user)
  const toolsList = useSelector(state => state.tools.allTools)
  const [projectInfo, setProjectInfo] = useState({
  })
  const [currentTool, setCurrentTool] = useState('');

  const handleChange = (e) => {
    const {name, value} = e.target
    setProjectInfo({
      ...projectInfo,
      [name]: value,
    })
  }
  

// tools related variables and functions
const handleToolChange = (e) => {
  setCurrentTool(e.target.value)
}
const selectTool = (e) => {
  e.preventDefault();
  if (currentTool) { const selectedTool = toolsList.find(tool => tool.name === currentTool)
  setProjectInfo({
    ...projectInfo,
    tools: [...projectInfo.tools, selectedTool],
  })
}
  setCurrentTool('')
}

const removeTool = (e, id) => {
  e.preventDefault();
  const removeIndex = projectInfo.tools.findIndex(tool => tool._id === id)
  projectInfo.tools.splice(removeIndex, 1);
  setProjectInfo({
    ...projectInfo,
    tools: projectInfo.tools
  })
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
  if (!createNewProject) setProjectInfo({...project})
}, [currentUser])

  return (
    <div className="about-project">
      <form onSubmit={(e) => handleSubmit(e, projectInfo)} className='project-form form'>
       <label htmlFor='title'>Project Title</label>
       <input
        id='title' 
        name='title'
        type='text'
        value={projectInfo.title}
        onChange={handleChange}
       />
       <label htmlFor='description'>Project Description (max 300 characters)</label>
       <textarea
        id='description' 
        name='description'
        value={projectInfo.description}
        onChange={handleChange}
       />
       <div className="tools-form form">
        <label htmlFor="tools">What tools will the project use?</label>
        <input 
          id='tools'
          list='tools-list'
          name='tools'
          onChange={handleToolChange}
          value={currentTool}
        />
        <datalist id='tools-list'>
          {toolsList?.map(tool => (
            <option key={tool._id} value={tool.name}/>
          ))}
        </datalist>
       
        <button onClick={selectTool}>Add Tool</button>
        <div className="current-tools">
          {projectInfo?.tools?.map(tool => (
            <div key={tool._id} className="tool-preview">
              <p>{tool.name}</p>
              <button onClick={(e) => removeTool(e, tool._id)}>x</button>
            </div>
          ))}
        </div>
      </div>
       <label htmlFor='designer-count'>How many designers are you seeking?</label>
       <input
        id='designer-count'
        min='0' 
        name='designer_count'
        type='number'
        value={projectInfo.designer_count}
        onChange={handleChange}
       />
       <label htmlFor='engineer-count'>How many engineers are you seeking?</label>
       <input
        id='engineer-count'
        min='0' 
        name='engineer_count'
        type='number'
        value={projectInfo.engineer_count}
        onChange={handleChange}
       />
       <label htmlFor='time-commitment'>...whose commitment level is:</label>
       <select
        defaultValue={project?.time_commitment ? project.time_commitment : 'no preference'}
        id='time-commitment' 
        name='time_commitment'
        onChange={handleChange}
      >
        <option value='no preference'>no preference</option>
        <option value='hobby'>hobby</option>
        <option value='part-time'>part-time</option>
        <option value='full-time'>full-time</option>
      </select>
      <button type='submit'>{createNewProject ? 'Create Project' : 'Update Project'}</button>
      </form>
    </div>
  )
}