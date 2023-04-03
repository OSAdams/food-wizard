export default function dbPostComment(userId, token, spoonApiId, comment) {
  const reqBody = {
    userId,
    token,
    spoonApiId,
    comment
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
}
