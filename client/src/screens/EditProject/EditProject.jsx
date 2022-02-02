import React from 'react';
import { useState, useEffect } from 'react';
// import { Form } from '../../components/Form/Form.jsx';
import { Header } from '../../components/Header/Header.jsx';
// import { projectForm } from '../../services/formData';
import { handleChange } from '../../services/utils/formHandlers.js';
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
  const [selectedTools, setSelectedTools] = useState([]);
  const [projectInfo, setProjectInfo] = useState({
    title: '',
    description: '',
    tools: [],
    designer_count: 0,
    engineer_count: 0,
    time_commitment: '',
  });
// a toolsList will later be generated from the list of tools stored in the DB; functionality for adding a new tool also needs to be added here
const toolsList = ['JavaScript', 'React', 'Ruby'];
const handleChange = (e) => {
  const {name, value} = e.target
  setProjectInfo({
    ...projectInfo,
    [name]: value,
    tools: selectedTools, 
  })
}

const handleToolChange = (e) => {
  setSelectedTools(
    [...selectedTools, e.target[0].value]
  )
}
const selectTool = (e) => {
  e.preventDefault()
  setProjectInfo({
    ...projectInfo,
    tools: selectedTools,
  })
}

  return (
    <div className="about-project">
      {/* <Form formData={projectForm} formState={[projectInfo, setProjectInfo]} /> */}
      <form className='project-form form'>
       <label htmlFor='title'>Name the project</label>
       <input
        id='title' 
        name='title'
        type='text'
        value={projectInfo.title}
        onChange={handleChange}
       />
       <label htmlFor='description'>Describe the project (max 300 characters)</label>
       <input
        id='description' 
        name='description'
        type='textarea'
        value={projectInfo.description}
        onChange={handleChange}
       />
       <form className="tools-form form">
        <label htmlFor="tools">What tools will the project use?</label>
        <input 
          id='tools'
          list='tools-list'
          name='tools'
          onChange={handleChange}
          value={projectInfo.tools}
        />
        <datalist id='tools-list'>
          {toolsList.map(tool => (
            <option value={tool} />
          ))}
        </datalist>
        <button onClick={selectTool}>Add Tool</button>
      </form>
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
