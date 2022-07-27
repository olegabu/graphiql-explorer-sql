# GraphQL and SQL editor web application

This is a single page React web app to edit GraphQL and SQL based on a
popular [GraphiQL IDE](https://github.com/graphql/graphiql) with
[GraphQL schema Explorer](https://github.com/OneGraph/graphiql-explorer)
and a SQL Editor.

- GraphiQL lets you edit GraphQL queries and send them to a GraphQL
  server
- Explorer queries the GraphQL server for its schema and shows it in a
  tree view to help craft your queries
- SQL editor lets you 
  - send queries to your API server and view results in a paginated
    table
  - send create view commands to your API which can turn them into
    GraphQL queries and add them to your GraphQL schema
    
## Build

Install dependencies:

```bash
npm install --force
# or
yarn install
```

Specify endpoints and default queries in environment variables:
```bash
REACT_APP_GRAPHQL_URL = 'https://yourgraphqlapiserver/v1/graphql' # GraphQL server endpoint
REACT_APP_GRAPHQL_SUBSCRIPTION_URL = 'wss://yourgraphqlapiserver/v1/graphql' # GraphQL server websocket endpoint
REACT_APP_SQL_URL = 'https://yoursqlapiserver/sql'  # SQL query endpoint url
REACT_APP_DEFAULT_GRAPHQL_QUERY = '{ event(limit: 10) { name } }'  # default query for the GraphQL editor
REACT_APP_DEFAULT_SQL_QUERY = 'select * from event limit 10'  # default query for the SQL editor
```

If deploying to a non root url set:
```bash
PUBLIC_URL = 'http://yourwebserver/console'
```

You can put these in a `.env` file in project's root or directly in
code in [./src/constants/constants.js](./src/constants/constants.js).

Build the web app for deployment to a web server.
```bash
npm run build
# or
yarn build
```

## Development

Serve the app in a development server. Your browser will automatically
open to [http://localhost:3000](http://localhost:3000).
```bash
npm run start
# or
yarn start
```

Serve the app and start a [mock SQL API](./mock) server at
[http://localhost:8080](http://localhost:8080).
```bash
npm run dev:mock
# or
yarn dev:mock
```
