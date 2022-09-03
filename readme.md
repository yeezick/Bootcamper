# Bootcamper

## Description

Bootcamper is a full-stack networking platform for bootcamp graduates. A common problem for many graduates is the limbo that arrives immediately after completing the program. Graduates often have a lot of time but no direction as to how they should spend their time. However, we commonly hear the only way to exchange a college degree is with experience & since there aren't many companies willing to hire without on-the-job experience, graduates must garner it through personal projects.

Enter <strong>Bootcamper</strong>, a platform designed specifically to match UX designers with Software Engineers. The math is simple: engineers can focus on engineering & UX designers can see their projects come to life!

After signing up for the platform, users are then directed to the core-feature of the app, a tinder-like roulette page where applicants can view projects that are seeking to expand their team. The algorithm behind this feature will listen to:

- What roles the project is seeking
- How many more members it needs
- How much time the project would demand weekly

Then, only users who match the seeking criteria will be able to view the projects. The users then have the ability to either show their interest or decline interest in a project. Both these actions send API requests to the back-end which updates the database, in turn updating the algorithm that handles what projects a user can view when seeking.

At a minimum, your project README needs a title and a short description explaining the what, why, and how. What was your motivation? Why did you build this project? (Note: The answer is not "Because it was a homework assignment.") What problem does it solve? What did you learn? What makes your project stand out?

Lastly, if your project is deployed, include a link to the deployed application here.

If you're new to Markdown, read the GitHub guide on [Mastering Markdown](https://guides.github.com/features/mastering-markdown/).

If you need an example of a good README, check out [the VSCode repository](https://github.com/microsoft/vscode).

## Table of Contents

- [Planning](#planning)
- [Technologies Used](#technologies)
- [Credits](#credits)

## Planning

We have high hopes for this application, so we wanted to be thorough in our planning. By visualizing what we wanted the app to be, we were able to streamline the process. We tackled the planning stage by:

- Creating a user flow to be concise about the user's intentions
  ![User Flow Diagram](/assets/images/userFlow.png)
- Mocking up a lo-fi design to avoid needing to ask design questions during development
  ![Lo-Fi Design](/assets/images/lofiDesign.png)
- Detailing the lo-fi design using FigJam, allowing new team members to have a deep understanding of not only the project, but also the components that make it up.
  ![Lo-Fi Design - Detailed](/assets/images/lofiFigjam.png)
- Visualizing our component hierarchy based off the Figjam
- Creating an initial file tree structure based off the component hierarchy

```
File Tree Structure:
src/
  |__ components/
    |__ Button/
      |__ SingleActionButton
      |__ DoubleActionButton
    |__ CallToAction/
    |__ DiceRoll/
    |__ Form/
      |__ Dropdown
      |__ Form
      |__ Input
      |__ TextArea
    |__ Hero/
    |__ Header/
    |__ Modal/
    |__ Projects/
      |__ ApplicantPreview/
      |__ ApplicantList/
      |__ ProjectCard/
      |__ ProjectIcon/
      |__ ProjectList/
    |__ Tool/
  |__ layout/
    |__ Layout.jsx
    |__ Nav/
    |__ Footer/
    |__ MobileMenu/
  |__ screens/
    |__ EditProfile/
    |__ EditProject/
    |__ Landing/
    |__ Roulette/
    |__ SignIn/
    |__ SignUp/
    |__ SingleProject/
    |__ UserProfile/
    |__ UserProjects/
  |__ services
    |__ api/
      |__ apiConfig.js
      |__ users.js
      |__ projects.js
    |__ utils
      |__ filterRoulette.js
    |__ redux
      |__ store/
      |__ reducers/
      |__ actions/
```

## Technologies

In order to build the app we used:

|    Back-End    |  Front-End   | Planing & Mgmt. |
| :------------: | :----------: | :-------------: |
|    Nodemon     |    React     |      Jira       |
|     BCrypt     |    Redux     |      Agile      |
|      Cors      |     SCSS     |      Figma      |
|    Express     |    Axios     |     FigJam      |
| JSON Web Token | React Router |                 |
|    Mongoose    | React Icons  |                 |
|     Morgan     |              |                 |

## Credits

### Engineering team

|                                      Name                                      |             Role             |                         GitHub                          |
| :----------------------------------------------------------------------------: | :--------------------------: | :-----------------------------------------------------: |
|         [Erick Manrique](https://www.linkedin.com/in/erick-manrique/)          | Founding Full-Stack Engineer |          [Yeezick](https://github.com/yeezick)          |
| [Nicholas Rynearson](https://www.linkedin.com/in/nicholas-rynearson-88a77635/) | Founding Full-Stack Engineer | [FlexibleIdealist](https://github.com/flexibleidealist) |
|   [ Julia Dwyer](https://www.linkedin.com/in/julia-dwyer-software-engineer/)   |     Full-Stack Engineer      |      [GooliaJulia](https://github.com/gooliajulia)      |
|      [Aaron Harris](https://www.linkedin.com/in/aaron-harris-577867218/)       |      Front-End Engineer      |     [AaronsHarris](https://github.com/aaronsHarris)     |
|            [Naved Rahim](https://www.linkedin.com/in/naved-rahim/)             |     Full-Stack Engineer      |       [NavedRahim](https://github.com/navedrahim)       |

### User Experience & Design Team

|                              Name                               |    Role     |
| :-------------------------------------------------------------: | :---------: |
| [Jennifer Huddock](https://www.linkedin.com/in/jenniferhudock/) | UX Designer |
|    [Osiris Ramos](https://www.linkedin.com/in/osirisramos/)     | UX Designer |
|    [ Jordan Chan](https://www.linkedin.com/in/jordanzchan/)     | UX Designer |
