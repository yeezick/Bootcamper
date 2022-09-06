# File Tree Structure

A suppplementary document holding a visual of our current file tree structure. I believe this will help us stay organized as well as comfortable with navigating the app's architecture.

```
File Tree Structure:
src/
  |__ components/
    |__ AboutProject/
      |_AboutProject
      |__ TeamView
    |__ Button/
      |__ SingleActionButton
      |__ DoubleActionButton
    |__ Form/Form
    |__ Header/Header
    |__ Portfolio/
      |__ AddPortfolioProject/
      |__ ShowPortfolioProject/
      |__ SinglePortfolioProject/

  |__ screens/
    |__ User/
      |__ Applicants/
      |__ Dashboard/
      |__ EditProfile/
      |__ Messages
      |__ Settings
      |__ SignIn/
      |__ SignUp/
        |__ CreateProfile
        |__ AddProjects
      |__ UserProfile/
    |__ Project/
      |__ EditProject/
      |__ SingleProject/
    |__ Landing/
    |__ Roulette/

  |__ services
    |__ api/
      |__ apiConfig.js
      |__ users.js
      |__ projects.js
    |__ redux
      |__ actions/
        |__ projectActions
        |__ toolActions
        |__ uiActions  **rename
      |__ slices/
        |__ projectSlice
        |__ toolSlice
        |__ uiSlice
      |__ store.js
    |__ utils
      |__ filterRoulette.js
      |__ handlers.js
    |__ formData.js
```
