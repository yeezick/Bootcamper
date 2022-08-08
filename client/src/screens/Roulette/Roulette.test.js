/**
 * renders succesfully (snapshot)
 * Check if all the projects in the "available_projects" state are valid
 *    User should not be able to see projects they have already made a decision on, are a part of, or have created.
 * OnClick "X" :
 *  - project should be added to the user's "rejected_projects" array
 *  - render the next available project
 * OnClick "Yes" :
 *  - should render the AskToJoin modal
 *  - ? once the user finishes the AskToJoin flow, it should render the next project
 * OnClick "either option", if there are no more available projects:
 *  - should render some kind of message "no more projects" or something similar
 */
