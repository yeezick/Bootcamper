import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Header } from '../../components/Header/Header.jsx';
import { createProject } from '../../services/api/projects.js'
import '../../components/Form/Form.scss';

export const EditProject = () => {
  const header = {
    text: "Have a vision? Let's make it real!",
    title: 'Create a Project',
  };

  return (
    <div className='create-project-screen'>
      <Header headerText={header.text} headerTitle={header.title} />
      <AboutProject />
    </div>
  )
}

const AboutProject = () => {
  const navigate = useNavigate()
  const [currentTool, setCurrentTool] = useState('')
  const [projectInfo, setProjectInfo] = useState({
    description: '',
    designer_count: 0,
    engineer_count: 0,
    owner: '61fc3a9afec2b58f7be69b01', //this should dynamically retrieve the current user
    seeking: true,
    time_commitment: '',
    title: '',
    tools: [],
  });
  // submit the form and create a record for the project in the DB
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = await createProject(projectInfo);
    if (newProject) navigate('/')
  }

// tools related functions; a toolsList will later be generated from the list of tools stored in the DB; functionality for adding a new tool also needs to be added here
const toolsList = ['JavaScript', 'React', 'Ruby'];
const handleChange = (e) => {
  const {name, value} = e.target
  setProjectInfo({
    ...projectInfo,
    [name]: value,
  })
}

const handleToolChange = (e) => {
  setCurrentTool(e.target.value)
}
const selectTool = (e) => {
  e.preventDefault()
  setProjectInfo({
    ...projectInfo,
    tools: [...projectInfo.tools, currentTool],
  })
  setCurrentTool('')
}
/* draft of a function to remove a current tool from the tool list; need to figure out how to delete button when the tool is removed
const removeTool = (e, tool) => {
  e.preventDefault()
  const currentTools = projectInfo.tools
  currentTools.splice(currentTools.indexOf(tool), 1)
  setProjectInfo({
    ...projectInfo,
    tools: [currentTools],
  })
  console.log(currentTools)
} */

  return (
    <div className="about-project">
      <form onSubmit={handleSubmit} className='project-form form'>
       <label htmlFor='title'>Name the project</label>
       <input
        id='title' 
        name='title'
        type='text'
        value={projectInfo.title}
        onChange={handleChange}
       />
       <label htmlFor='description'>Describe the project (max 300 characters)</label>
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
            <option value={tool} />
          ))}
        </datalist>
       
        <button onClick={selectTool}>Add Tool</button>
        <div className="current-tools">
          {projectInfo.tools.map(tool => (
              <h5>{tool}</h5>
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
        defaultValue=''
        id='time-commitment' 
        name='time_commitment'
        onChange={handleChange}
      >
        <option value='no preference'>no preference</option>
        <option value='hobby'>hobby</option>
        <option value='part-time'>part-time</option>
        <option value='full-time'>full-time</option>
      </select>
      <button type='submit'>Create Project</button>
      </form>
    </div>
  )
}
