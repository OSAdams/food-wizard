require('dotenv/config');
const express = require('express');
const jsonMiddleware = express.json();
const db = require('./db');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');

const app = express();

app.use(staticMiddleware);

app.use(jsonMiddleware);

app.get('/api/recipes', (req, res, next) => {
  const sql = `
    SELECT *
      FROM recipes
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

// app.get('/api/recipes:id', (req, res, next) => {
//   const sql = `
//     SELECT *
//       FROM recipes
//      WHERE "spoonApiId" = ($1)
//  RETURNING *
//   `;
//   const params = [req.id];
//   db.query(sql)
//     .then(result => res.json(result.rows))
//     .catch(err => next(err));
// });

app.post('/api/recipes', (req, res, next) => {
  const { recipeName, spoonApiLikes, spoonApiId } = req.body;
  const apiRatingInt = parseInt(spoonApiLikes);
  const apiIdInt = parseInt(spoonApiId);
  if (!recipeName || !spoonApiLikes || !spoonApiId) {
    throw new ClientError(400, 'recipeName, spoonApiLikes, and spoonApiId are required fields');
  }
  if (!apiRatingInt || !apiIdInt) {
    throw new ClientError(400, 'spoonApiLikes and spoonApiId must be an integer');
  }
  const sql = `
    INSERT INTO recipes ("recipeName", "spoonApiLikes", "spoonApiId")
         VALUES ($1, $2, $3)
    ON CONFLICT DO NOTHING
  `;
  const params = [recipeName, spoonApiLikes, spoonApiId];
  db.query(sql, params)
    .then(result => {
      const [recipes] = result.rows;
      res.status(201).json(recipes);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
