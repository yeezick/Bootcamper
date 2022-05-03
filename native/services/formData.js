

/* 
  authentication forms
 */
export const signInForm = {
  button: {
    text: 'Sign in',
    type: 'single',
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
    text: 'Register',
    type: 'single',
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

/* 
  user related forms 
*/

export const createProfile = {
  button: {
      text: 'Next',
      type: 'single',
      },
  handlers: {
    // setterFunction: ,
    // onSubmit: ,
  },
  inputs: [
      {
          labelText: 'I am a',
          name: 'role',
          required: true,
          type: 'select',
          options: ['Select Occupation', 'UX Designer', 'Software Engineer'],
      },
      {
          labelText: 'About Me',
          name: 'about',
          max_chars: 250,
          required: true,
          type: 'textarea',
      },
      {
          labelText: 'Portfolio Link',
          name: 'portfolio_link',
          type: 'text',
      },
      {
          labelText: 'Share on Profile?',
          name: 'show_portfolio',
          type: 'switch',
      }
  ],
};


export const userForm = {
  button: {
    text: 'Next',
    type: 'single',
  },
  handlers: {
    // setterFunction: ,
    // onSubmit: ,
  },
  inputs: [
    {
      labelText: 'Occupation',
      name: 'role',
      required: true,
      type: 'select',
      options: ['Select role', 'UX Designer', 'Software Engineer'],
    },
    {
      labelText: 'Bio',
      name: 'about',
      max_chars: 250,
      required: true,
      type: 'textarea',
    },
    // {
    //   labelText: 'Include a fun fact!   (optional, max 250 characters) ',
    //   name: 'fun_fact',
    //   max_chars: 250,
    //   type: 'textarea',
    // },

    {
      labelText: 'Portfolio Link',
      name: 'portfolio_link',
      type: 'text',
    },
    {
      labelText: 'Share on Profile?',
      name: 'show_portolio',
      type: 'checkbox',
    }
  ],
};

export const portfolioProjectForm = {
  button: {
    text: 'Save',
    type: 'single',
  },
  handlers: {
    // onSubmit: handleNewProject,
  },
  inputs: [
    {
      labelText: 'Project Title',
      name: 'project_title',
      required: true,
      type: 'text',
    },
    {
      labelText: 'Role',
      name: 'role',
      required: true,
      type: 'text',
    },
    {
      labelText: 'Tools Used',
      name: 'tools',
      required: true,
      type: 'text',
    },
    {
      labelText: 'About',
      name: 'project_description',
      required: true,
      type: 'textarea',
    },
    // {
    //   labelText: 'Link to your project',
    //   name: 'project_link',
    //   required: true,
    //   type: 'text',
    // },
  ],
};

/* 
  new project form
*/
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
      options: ['no preference', 'hobby', 'part-time', 'full-time'],
    },
  ],
};
