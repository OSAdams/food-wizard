export default function insertIntoRecipes(recipe) {
  if (!recipe) {
    return null;
  }
  const reqBody = {
    recipeName: recipe.title,
    spoonApiLikes: recipe.aggregateLikes,
    spoonApiId: recipe.id
  };
  fetch('/api/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody)
  })
    .then(res => res.json())
    .catch(err => console.error({ error: err }));
}
