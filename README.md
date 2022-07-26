Example usage of [OneGraph](https://www.onegraph.com)'s open source [GraphiQL explorer](https://github.com/OneGraph/graphiql-explorer).

[OneGraph](https://www.onegraph.com) provides easy, consistent access to the APIs that underlie your business--all through the power of GraphQL.

Sign up at [https://www.onegraph.com](https://www.onegraph.com).

## Getting started

1. Install dependencies:

```
npm install --force
# or
yarn install
```

Alternatively, you can add .env file in the root folder of project to set environment variables.
Example env file:
```
REACT_APP_GRAPH_QL_URL = 'https://starknet-archive.hasura.app/v1/graphql' // Hasura GraphQL url
REACT_APP_GRAPH_QL_SUBSCRIPTION_URL = 'wss://starknet-archive.hasura.app/v1/graphql' // Hasura GraphQL socket url
REACT_APP_SQL_QUERY_URL = 'https://starknet-archive.hasura.app/v2/query'  // Hasura SQL query url
REACT_APP_DEFAULT_QUERY = 'Welcome world!'  // Welcome text for the GraphQL query window
REACT_APP_DEFAULT_SQL_QUERY = 'select * from customers'  // default SQL query for the SQL editor
```
If you do not specify these variables, their values will be default.  The default values can be viewed in the file: src/constants/constants.js

2. Run the app with mock server:

```
npm run dev:mock
# or
yarn dev:mock
```

Your browser will automatically open to http://localhost:3000 with the explorer open.

http://localhost:8080/ - mock server


## Build
1. Install dependencies:

```
npm install --force
# or
yarn install
```

Alternatively, you can add .env file in the root folder of project to set environment variables.
Example env file:
```
REACT_APP_GRAPH_QL_URL = 'https://starknet-archive.hasura.app/v1/graphql' // GraphQL url
REACT_APP_GRAPH_QL_SUBSCRIPTION_URL = 'wss://starknet-archive.hasura.app/v1/graphql' // GraphQL socket url
REACT_APP_SQL_QUERY_URL = 'https://starknet-archive.hasura.app/v2/query'  // SQL query url
REACT_APP_DEFAULT_QUERY = 'Welcome world!'  // Welcome text for the GraphQL query window
REACT_APP_DEFAULT_SQL_QUERY = 'select * from customers'  // default SQL query for the SQL editor
PUBLIC_URL = '' // url to which you are deploying the app
```
If you do not specify these variables, their values will be default.  The default values can be viewed in the file: src/constants/constants.js

2. Create the production build
```
npm run build
# or
yarn build
```

3. The build directory containing the production build is created within the root project folder. `build` folder.

## Live demo

The example app is deployed to GitHub pages at [https://onegraph.github.io/graphiql-explorer-example/](https://onegraph.github.io/graphiql-explorer-example/) and is in use in production at [https://www.onegraph.com/graphiql](https://www.onegraph.com/graphiql).

![Preview](https://user-images.githubusercontent.com/476818/51567716-c00dfa00-1e4c-11e9-88f7-6d78b244d534.gif)
