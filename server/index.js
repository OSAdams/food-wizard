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

app.post('/api/recipes', (req, res, next) => {
  const { recipeName, recipeRating, spoonApiId } = req.body;
  const ratingInt = parseInt(recipeRating);
  const apiIdInt = parseInt(spoonApiId);
  if (!recipeName || !recipeRating || !spoonApiId) {
    throw new ClientError(400, 'recipeName, recipeRating, and spoonApiId are required fields');
  }
  if (!ratingInt || !apiIdInt) {
    throw new ClientError(400, 'recipeRating and spoonApiId must be an integer');
  }
  if (recipeRating > 5 || recipeRating < 1) {
    throw new ClientError(400, 'recipeRating must be a number 1 through 5');
  }
  const sql = `
    INSERT INTO recipes ("recipeName", "recipeRating", "spoonApiId")
         VALUES ($1, $2, $3)
      RETURNING *
  `;
  const params = [recipeName, recipeRating, spoonApiId];
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
