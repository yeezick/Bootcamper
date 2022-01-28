import React from 'react';
import { useState } from 'react';
import { Form } from '../../components/Form/Form.jsx';
import { Header } from '../../components/Header/Header.jsx';
import { projectForm } from '../../services/formData';

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
  const [projectInfo, setProjectInfo] = useState({
    title: '',
    description: '',
    tools: '',
    designer_count: '',
    engineer_count: '',
    time_commitment: '',
  });

  return (
    <div className="about-project">
      <Form formData={projectForm} formState={[projectInfo, setProjectInfo]} />
    </div>
  )
}
