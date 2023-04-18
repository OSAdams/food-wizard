require('dotenv/config');
const express = require('express');
const jsonMiddleware = express.json();
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const authorizationMiddleware = require('./authorization-middleware');
const db = require('./db');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const app = express();

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.get('/api/recipes', (req, res, next) => {
  throw new ClientError(400, 'Use an id number to select a recipe');
});

app.get('/api/recipes/:id', (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    throw new ClientError(400, 'id must be a positive whole integer');
  }
  const sql = `
         SELECT *
           FROM recipes
          WHERE "recipeId" = $1
  `;
  const params = [id];
  db.query(sql, params)
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.post('/api/recipes', (req, res, next) => {
  const { recipeName, spoonApiId } = req.body;
  const apiIdInt = parseInt(spoonApiId);
  if (!recipeName || !spoonApiId) {
    throw new ClientError(400, 'recipeName, and spoonApiId are required fields');
  }
  if (!apiIdInt) {
    throw new ClientError(400, 'spoonApiId must be an integer');
  }
  const sql = `
    INSERT INTO recipes ("recipeName", "spoonApiId")
         VALUES ($1, $2)
    ON CONFLICT DO NOTHING
  `;
  const params = [recipeName, spoonApiId];
  db.query(sql, params)
    .then(result => {
      const [recipes] = result.rows;
      res.status(201).json(recipes);
    })
    .catch(err => next(err));
});

app.get('/api/recipes/spoonApiId/:id', (req, res, next) => {
  const { id } = req.params;
  const recipeId = Number(id);
  if (!recipeId) {
    throw new ClientError(401, 'spoonacular api id is required');
  }
  const sql = `
    SELECT *
      FROM recipes
     WHERE "spoonApiId" = $1
  `;
  const params = [recipeId];
  db.query(sql, params)
    .then(result => {
      const [recipeId] = result.rows;
      if (!recipeId) {
        throw new ClientError(404, 'recipeId doesn\'t exist');
      }
      res.status(201).json(recipeId);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-up', (req, res, next) => {
  const { body: { username, password } } = req;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        INSERT INTO users (username, "hashedPassword")
             VALUES ($1, $2)
          RETURNING "userId", username, "createdAt"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { body: { username, password } } = req;
  if (!username || !password) {
    throw new ClientError(401, 'username and password are required fields');
  }
  const sql = `
    SELECT "userId",
           "hashedPassword"
      FROM users
     WHERE username = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'username or password are invalid');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'username or password are invalid');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.post('/api/comments', (req, res, next) => {
  const {
    user: { userId },
    body: {
      recipeId,
      comment
    }
  } = req;
  if (!userId) throw new ClientError(400, 'must be logged in to comment on a recipe');
  if (comment.length < 5) throw new ClientError(400, 'comment needs to exceed 5 characters');
  if (!recipeId) throw new ClientError(400, 'Spoonacular API id required');
  const sql = `
    INSERT INTO comments ("userId", "recipeId", comment)
         VALUES ($1, $2, $3)
      RETURNING "recipeId", comment, "commentId"
  `;
  const params = [userId, recipeId, comment];
  db.query(sql, params)
    .then(result => {
      const [comment] = result.rows;
      res.status(201).json(comment);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
