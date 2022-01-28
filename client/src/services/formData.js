export const userForm = {
  button: {
    type: 'single',
    text: 'Add New Project',
  },
  handlers: {
    // setterFunction: ,
    // onSubmit: ,
  },
  inputs: [
    {
      labelText: 'Tell us a bit about you <small>(max 250 characters)</small>',
      name: 'about',
      max_chars: 250,
      type: 'textarea',
    },
    {
      labelText: 'Include a fun fact!  <small> (optional, max 250 characters)</small> ',
      name: 'funFact',
      max_chars: 250,
      type: 'textarea',
    },
    {
      labelText: 'I am a...',
      name: 'role',
      type: 'select',
      options: ['UX Designer', 'Software Engineer'],
    },
    {
      labelText: 'Link to your portfolio <small>(optional)</small>',
      name: 'portfolioLink',
      type: 'text',
    },
  ],
};
// project form 
export const projectForm = {
  button: {
    type: 'submit',
    text: 'Create Project',
  },
  handlers: {
    // setterFunction: setUserInfo,
    // onSubmit: handleNewProject,
  },
  inputs: [
    {
      labelText: 'Name the project',
      name: 'title',
      max_chars: 45,
      type: 'text',
    },
    {
      labelText: 'Describe the project (max 300 characters)',
      name: 'description',
      max_chars: 300,
      type: 'textarea',
    },
    {
      labelText: 'What tools will it use?',
      name: 'tools',
      // list: 'toolsList', the list this input refers to needs to be defined; tools should be in the DB
      type: 'text',
    },
    {
      labelText: 'How many designers are you seeking?',
      name: 'designer_count',
      type: 'number',
    },
    {
      labelText: 'How many engineers are you seeking?',
      name: 'engineer_count',
      type: 'number',
    },
    {
      labelText: '...who can commit at least...',
      name: 'time_commitment',
      type: 'select',
      options: ['no preference', 'hobby <10 hours', 'part-time <20 hours', 'full-time <30 hours' ]
    },
  ],
}
