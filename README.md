# User table with Recent tasks coding-challenge
### Available Scripts

In the project directory, you can run:

### `npm install`

Installs the required packages to run the application
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

This app has been built using create-react-app and as such is subject the build tool and configuration choice limits as per the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

### Challenge Checklist

- Built a table to display users without using a third party library
- Created 2 request for data that fire on app load using fetch to get the User and Todos from the [Placeholder API](https://jsonplaceholder.typicode.com/)
- Used TailWindCSS to handle styles
- Added a input to allow users to search the table by the name field
- Table is filtered when user enters at least 3 characters into the input field
- Table displays the status of the last 3 todos for each users
- Table doesn't display the Phone and Address columns on displays smaller than 1024px


### Authors Notes

This was a fun challenge which I enjoyed despite having not used react in a few years. When it came to the types I kept the component specific types
with the component and added the Principle types (User, Task etc) in dedicated files. I am not sure if this is best practice or if the component prop types should be
in the types folder as well. I have also added dark mode css mainly for my own amusement.

## Things I would add or change

- Currently the api endpoints are hardcoded into the requests these need moving to global settings or evironemental variables.
- I would handle errors by adding an error boundry and displaying appropriate messages to the user.
- The table component created is very specific and could be refactored to be more generic and therefore more re-usable.
- While I built in the requested functionality to not display the Phone and Address columns of the table on smaller devices this does not go far enough and the recent 
task column is cut off on very small displays the table component should be re-written to collapse down further perhaps listing the users details (name, email, address)
in one column and the tasks in a second column.