# JSON Placeholder User and Recent Tasks Datatable Coding Challenge

## How To Use

```
npm install
```

```
npm start
```

## Notes for reviewer

I have built the following functionality for this challenge:

- Built a HTML table from scratch with no third party library
- Created two GET request endpoints for
  - Users
  - Todos
- Used Axios to consume API endpoints (I could have used fetch API to consume endpoints if this was to fully vanilla)
- Used TailWind CSS to style datatable
- Used react Hooks to handle data returned from
  - API
  - Value from filter input
- Conditional Logic
- Responsive design

I have tried to adhear to best practices by implementing:

- Used components Parent/Child with props
- Kept simple naming conventions

If I had more time I would:

- Implement error messaging for no record returned from filter input --> how? where? what about ErrorBoundary / Suspense ?
- UI elements would be improved to show data in a more meaninful way --> how? examples? any UX suggestions?
- Refactor code to make more reusable components:
  - Ideally we would like to be able to reuse the table with style but with props to allow us to define columns and rows data
  - Ideally we would make an object of header fields, and map it in a function for produce the headers
  - The search term on line 78 - Put in a "filteredData()" function so the whole return is easier to read

I Hope you enjoy reviewing my solution and I look forward for any feedback.

FEEDBACK & QAs:
 - generate optimized bundle for production
 - why app is rendering 2 times in dev mode?
 - how you can make the data is available before waiting to the component to be mounted first?


Regards
Nathan
