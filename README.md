# SmoothieBook

Built with react functional components, hooks and the @reduxjs/toolkit package (which removes a lot of the usual redux boilerplate code.)

To view a build version:
http://impartial-lawyer.surge.sh/

To run locally:
1. Clone the repo
2. npm install
3. npm start
4. go to http://localhost:3000

Data Flow:
1. On app load cached recipe data from localstorage added to redux store if exists. If not - default data added to store.
2. create / edit changes kept in component local storage until user ready to save
3. On save additions / changes added to redux store.
4. When component notified of redux store changes the recipe data is persisted to localStorage.

The recipe book can be reset to the three default recipes by clearing localStorage (via webdev tools in browser)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
