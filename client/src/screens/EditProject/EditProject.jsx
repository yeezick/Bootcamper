import { useState } from 'react';
import { Header } from '../../components/Header/Header.jsx';
import { editProject } from '../../services/api/projects.js';
import { getAllTools } from '../../services/api/tools.js';

export const EditProject = ({ project }) => {
  const [projectInfo, setProjectInfo] = useState({
    ...project,
  })
  const header = {
    text: 'Edit the fields below and click Update Project to save your changes.',
    title: 'Edit Project Details',
  }
  return (
    <div>
      <Header headerText={header.text} headerTitle={header.title} />
    </div>
  )
};
