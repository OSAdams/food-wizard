export default function dbPostComment(spoonId, title, content) {
  const reqBody = {
    username: title,
    spoonApiId: spoonId,
    comment: content
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
