import React from 'react';
import { useState } from 'react';
import { Form } from '../../components/Form/Form.jsx';
import { Header } from '../../components/Header/Header.jsx';
import { projectForm } from '../../services/formData';
import { handleChange } from '../../services/utils/formHandlers.js';

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

const tools = ['JavaScript', 'React', 'Ruby'];
const selectTool = (e) => {
  e.preventDefault();
  console.log(e)
  setSelectedTools([...selectedTools, e.target[0].value])
}


  return (
    <div className="about-project">
      <Form formData={projectForm} formState={[projectInfo, setProjectInfo]} />
      <form className="tools-form form" onSubmit={selectTool}>
        <label htmlFor="tools">What tools will the project use?</label>
        <input 
          id='tools'
          list='tools-list'
          name='tools'
        />
        <datalist id='tools-list'>
          {tools.map(tool => (
            <option value={tool} />
          ))}
        </datalist>
        <button type='submit'>Add Tool</button>
      </form>
    </div>
  )
}
