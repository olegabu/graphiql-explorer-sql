const path = require('path');
const jsonServer = require('json-server');

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const PORT = 8080;

app.use(jsonServer.bodyParser);

app.use(middlewares);

app.use(router);

app.listen(PORT, () => {
  console.log('Mock server is running on port:', PORT);
});
