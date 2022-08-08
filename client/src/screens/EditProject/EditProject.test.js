/**
 * TEST PLAN:
 * renders successfully (snapshot testing)
 *  - inputs in the file, render are prefilled with data of the current project
 *  - includes the tools that the project uses
 * OnClick "done" will:
 *  - just revert back to singleProject screen
 * OnClick "add" button will:
 *  - add the tool to the current project's state
 *  - should also render below the input
 * OnClick of a "tool" should:
 *  - should remove the tool from the project's state
 *  - should unrender from the page
 * OnClick of "save project" should:
 *  - make an api request to update this project in the database
 *  - navigate back to SingleProject (non-edit mode)
 */
