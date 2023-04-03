export default function dbPostComment(userId, token, spoonApiId, comment) {
  const reqBody = {
    userId,
    spoonApiId,
    comment
  };
  const data = JSON.stringify(reqBody);
  fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Token': token
    },
    body: data
  })
    .catch(err => console.error({ error: err }));
}
