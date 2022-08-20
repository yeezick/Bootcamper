/**
 * Renders correctly
 *    - should have header, first name, last name, email, password, re-enter password, button => snapshot testing
 *    - user is able to enter text in the fields
 *    - password should have an eye icon, which will reveal the password to the user
 *    - a small symbol (like a green check) that lets the user know if the passwords match
 *    - after the user types in the email => there should be something to signify (like a green check) that the email is valid & available
 *    - when the user clicks "register"
 *      - creates the user in the DB
 *      - fetches & stores user token (as if they were signing in)
 *      - navigates to create profile
 */
