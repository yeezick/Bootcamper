export const userForm = {
  button: {
    type: 'single',
    text: 'Save Progress',
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
      name: 'fun_fact',
      max_chars: 250,
      type: 'textarea',
    },
    {
      labelText: 'I am a...',
      name: 'role',
      type: 'select',
      options: ['Select role', 'UX Designer', 'Software Engineer'],
    },
    {
      labelText: 'Link to your portfolio <small>(optional)</small>',
      name: 'portfolio_link',
      type: 'text',
    },
  ],
};

export const portfolioProjectForm = {
  button: {
    type: 'single',
    text: 'Add New Project',
  },
  handlers: {
    // onSubmit: handleNewProject,
  },
  inputs: [
    {
      labelText: 'Project Title',
      name: 'project_title',
      type: 'text',
    },
    {
      labelText: 'Describe the project',
      name: 'project_description',
      type: 'textarea',
    },
    {
      labelText: 'Link to your project',
      name: 'project_link',
      type: 'text',
    },
  ],
};

export const signInForm = {
  button: {
    type: 'single',
    text: 'Sign in',
  },
  handlers: {
    // onSubmit: handleNewProject,
  },
  inputs: [
    { labelText: 'Email:', name: 'email', type: 'email' },
    {
      labelText: 'Password:',
      name: 'password',
      type: 'password',
    },
  ],
};

export const signUpForm = {
  button: {
    type: 'single',
    text: 'Register',
  },
  handlers: {
    // onSubmit: handleNewProject,
  },
  inputs: [
    {
      labelText: "What's your first name?",
      name: 'first_name',
      type: 'text',
    },
    {
      labelText: "What's your last name?",
      name: 'last_name',
      type: 'text',
    },
    {
      labelText: "What's your email?",
      name: 'email',
      type: 'email',
    },
    {
      labelText: 'Create a password:',
      name: 'password',
      type: 'password',
    },
    {
      labelText: 'Confirm password:',
      name: 'confirm_password',
      type: 'password',
    },
  ],
};
