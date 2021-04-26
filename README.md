## elaina-blog

### Development Environment

- VS Code, [Node.js](https://nodejs.org/en/)(recommend latest LTS version), [MongoDB Compass](https://www.mongodb.com/try/download/compass)
- Git(Using GitHub Desktop or Git Bash...etc)
- Enter `elaina-blog/elaina-blog.code-workspace` and click `Open Workspace` button
- We are working in workspace, CHECK you're working in workspace..!
  - How to check? - See the top of VS Code, and check `Filename - elaina-blog (Workspace) - Visual Studio Code`

### Tech Stack

- Language: TypeScript
- Front: React.js, Next.js, Apollo-Client, Styled-Components, GraphQL
- Server: Apollo-Server, Express, GraphQL
- DB: MongoDB(MongoDB Atlas)

### VS Code Essential Extensions

- ESLint
- Prettier

### VS Code Useful Extensions

- Apollo GraphQL
  - **syntax highlight** in frontend graphql
- GraphQL
  - **syntax highlight** in graphql
- vscode-styled-components
  - **syntax highlight and auto-complete** in styled-component

### Web Browser Extension

- React Developer Tools
  - provides useful react dev tools in DevTools

### How To Start(First Start)

- Open Terminal in VS Code(`ctrl + backtick`)
- If not ready for `yarn`, install `yarn` with `npm i -g yarn`
  - If error in this instruction, check npm with `npm --version`, or reinstall Node.js
- Change pwd to `elaina-blog/client` and input `yarn install`
- Open new terminal
- Change pwd to `elaina-blog/server` and input `yarn install`
- `yarn dev` in each terminal
