export default function dbPostComment(userId, token, recipeId, comment) {
  const reqBody = {
    recipeId,
    comment
  };
  const data = JSON.stringify(reqBody);
  fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Token': token
    },
    user: userId,
    body: data
  })
    .catch(err => console.error({ error: err }));
}
