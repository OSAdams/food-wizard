export default function dbPostRecipe(spoonId, title) {
  const reqBody = {
    spoonApiId: spoonId,
    recipeName: title
  };
  const data = JSON.stringify(reqBody);
  fetch('/api/recipes',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
    .catch(err => console.error({ error: err }));
}
