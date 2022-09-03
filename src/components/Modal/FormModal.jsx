/** FormModal for editPortfolioProject, AddPortfolioProject, and AskToJoin flows
 * Renders correctly (header, should have inputs, should have a button)
 *   - test with different inputs (one has 3 inputs, other has just 1 large textarea)
 *   - if the user clicks the "x" button, the modal is closed
 * Assuming it is an "edit project" modal:
 *   - Should have the 3 inputs (title, description, url) && the fields should be prefilled
 *   - user should be able type within them
 *   - should have a "save" button which should update this project in the user's data
 *   - this project has been updated in the UI as well
 * Assuming it is an "add project" modal:
 *   - should have 3 inputs & they should be empty
 *   - should have an "add" button which should update the user's data to include this project
 *   - the UI should reflect this newly created project
 * Assuming it is an "ask to join" modal:
 *   - should have 1 large textarea input
 *   - user should be able to type within it
 *   - should have a "send" button which does the following:
 *      1. adds the user to the "applicants" of this project
 *      2. adds the project to the user's "interested_projects"
 *      3. (HOLD) should also verify that the message has been sent
 */
