export const userForm = {
  button: {
    type: 'single',
    text: 'Add New Project',
  },
  handlers: {
    // setterFunction: setUserInfo,
    // onSubmit: handleNewProject,
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
