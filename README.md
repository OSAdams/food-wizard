# Food Wizard

A full stack JavaScript web application for people who want to find and share recipes.

## Why I built this

As a former chef, I wanted to build an application that provided straight forward recipes. Commenting on recipes allows users to share recipe modifications successes and failures. This will provide immediate recipe feedback for the user to utilize in their decision to use the recipe!

## Technologies Used

- [React.js](https://react.dev/)
- [Webpack](https://webpack.js.org/)
- [Node.js](https://nodejs.org/en)
- [MongoDB](https://www.mongodb.com/)
- [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Dokku](https://dokku.com/)
- [AWS](https://aws.amazon.com/)
- [Spoonacular](https://spoonacular.com/)

## Live Demo

Try the application live at [food-wizard.osastack.dev](https://food-wizard.osastack.dev)

### Preview

<img src="server/public/food-wizard-preview.gif" width=45%>

### Current Features

- User can cycle through a carousel of random recipes
- User can search for recipes
- User can view a full recipe
- User can register an account
- User can sign in and sign out
- User can view comments on recipes
- User can comment on a recipe
- User can edit their comment
- User can delete their comment

## Development

### Clone the Repository

#### LearningFuze vscode

1. Copy the link below
  ```bash
  git@github.com:OSAdams/final-project.git
  ```
2. Clone the repository by clicking the blue icon on the bottem left of your vscode
3. Click "**Clone Repository in Container Volume**"
4. Paste the link you have just copied and hit enter!

#### GitBash

1. Open your GitBash terminal
2. Copy the *HTTPS* code below
```bash
https://github.com/OSAdams/food-wizard.git
```
3. In your terminal, clone the repository
```bash
git clone https://github.com/OSAdams/food-wizard.git
cd food-wizard
```

### Run and test project setup

#### Getting Started

1. Install all dependencies with NPM
```bash
npm install
```

#### Create the database

1. Start PostgreSQL server
```bash
sudo service postgresql start
```
2. Create database
```bash
createdb foodWizard
```
3. Start the database
```bash
pgweb --db=foodWizard
```
4. Copy the `.env.example` file and name it to `.env`
5. Open the `.env` file and update the `TOKEN_SECRET` to any 20 character string value. This is used to hash the users password in our database. Upper case, lower case, and numbers only.
6. When you obtain your Spoonacular API key, update the `SPOONACULAR_API_KEY` value in the `.env` file with your own Spoonacular API key.

#### Start the development servers

1. Open your `Procfile` and copy/paste the line below *above* `web: npm start`
    - This command clears the database, you can remove it in the future
```bash
release: npm run prod:db:import
```
2. In a seperate terminal, start all the development servers with the `"dev"` scripts
```bash
npm run dev
```
3. Later, when you wish to stop the development servers, type `Ctrl-C` in the terminal where theservers are running.
4. To turn off your postgresql server, copy and paste the command below in your terminal
```bash
sudo service postgresql stop
```

#### Verify the client

1. A React app has already been created for you
2. Take a minute to look over the code in `client/components/app.jsx` to get an idea of what it is doing.
3. Go to your app in your browers, you should see the home page!

#### Set up the database

1. In a seperate terminal, run `npm run db:import` to create your tables
2. At this point your database is setup and you are good to start using it. However there is no data in your database, which isn&apos;t necessarily a bad thing. All you need to do is register an account using the sign-up feature!

## Work in Progress

### Latest Updates

#### Readme

- Initial Readme v1 release

#### Bugs

- Comment card loading modal infinite render. Inconsistent on rendering "Be the first to comment" and loading modal
- Window hashing causing forward and backward button page rendering errors

#### UI

- Element sizing updates for better UI Responsiveness
- Update navbar sizing, padding, and flex properties
- Update full recipe render
- Update carousel button interaction and location

### Future Updates

#### Features

- User can save a recipe
- User can create a recipe
- User can modify a recipe
- User can check boxes to keep track of ingredients
- User can check boxes to keep track of instructions
- User can share a recipe

#### UI

- Remove carousel feature, create an accordion list of recently viewed recipes
- If user isn't signed in, the accordion list of recipes will be randomized
