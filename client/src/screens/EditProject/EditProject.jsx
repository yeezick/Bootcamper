import { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header.jsx';
import { editProject } from '../../services/api/projects.js';
import { getAllTools } from '../../services/api/tools.js';

export const EditProject = ({ project, setEdit }) => {
  
  const header = {
    text: 'Edit the fields below and click Update Project to save your changes.',
    title: 'Edit Project Details',
  }
  return (
    <div>
      <Header headerText={header.text} headerTitle={header.title} />
      <AboutProject project={project} setEdit={setEdit}/>
    </div>
  )
}

const AboutProject = ({ project, setEdit }) => {
  const [projectInfo, setProjectInfo] = useState({
    ...project,
  })
  const [toolsList, setToolsList] = useState([]);
  const [currentTool, setCurrentTool] = useState('');

  const handleChange = (e) => {
    const {name, value} = e.target
    setProjectInfo({
      ...projectInfo,
      [name]: value,
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProject = await editProject(project._id, projectInfo);
    if (updatedProject) setEdit(false)
  }
// tools related variables and functions
const handleToolChange = (e) => {
  setCurrentTool(e.target.value)
}
const selectTool = (e) => {
  e.preventDefault();
  const selectedTool = toolsList.find(tool => tool.name === currentTool)
  setProjectInfo({
    ...projectInfo,
    tools: [...projectInfo.tools, selectedTool],
  })
  setCurrentTool('')
}

const removeTool = (id) => {
  const removeIndex = projectInfo.tools.findIndex(tool => tool._id === id)
  projectInfo.tools.splice(removeIndex, 1);
  setProjectInfo({
    ...projectInfo,
    tools: projectInfo.tools
  })
}

useEffect(() => {
  const generateToolsList = async () => {
    const allTools = await getAllTools();
    setToolsList(allTools)
  }
  generateToolsList();
}, []);

  return (
    <div className="about-project">
      <form onSubmit={handleSubmit} className='project-form form'>
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
          {toolsList.map(tool => (
            <option key={tool._id} value={tool.name}/>
          ))}
        </datalist>
       
        <button onClick={selectTool}>Add Tool</button>
        <div className="current-tools">
          {projectInfo.tools.map(tool => (
            <div key={tool._id} className="tool-preview">
              <p>{tool.name}</p>
              <button onClick={() => removeTool(tool._id)}>x</button>
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
        defaultValue={project.time_commitment}
        id='time-commitment' 
        name='time_commitment'
        onChange={handleChange}
      >
        <option value='no preference'>no preference</option>
        <option value='hobby'>hobby</option>
        <option value='part-time'>part-time</option>
        <option value='full-time'>full-time</option>
      </select>
      <button type='submit'>Update Project</button>
      </form>
    </div>
  )
}
