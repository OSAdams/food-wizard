export default function dbPostRecipe(spoonId, title) {
  const reqBody = {
    recipeName: title,
    spoonApiId: spoonId
  };
  const data = JSON.stringify(reqBody);
  fetch('/api/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  })
    .catch(err => console.error({ error: err }));
  /*
    I'm bug hunting and I notice that if there isn't a recipe from SpoonAPI in my database, the loading modal
    will render. This post request isn't happening.. fast enough? for the comments.

    If there aren't any comments, the page should render "Be the first to comment!"

    If the recipe existed in the database before the user clicks on a recipe card
    it renders: "Be the first to comment!"

    As expected

    If the recipe didn't exist in the database before the user clicks on a recipe card
    it renders the loading modal.

    I understand completely why this happening, I have no idea how to fix it.

    Yet.

    08-05-23

    Implemented the { dbPostRecipe } method into the { componentDidMount } definition.
    This effectively posts the recipe to our local database during the fetch request to the
    Spoonacular API.

    Current status - the bug is fixed. We'll see how long this lasts.

    It's literally working now. Crazy. What a fun bug hunt.
  */
}
