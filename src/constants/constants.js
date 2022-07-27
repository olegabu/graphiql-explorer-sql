export const DEFAULT_QUERY = process.env.REACT_APP_DEFAULT_GRAPHQL_QUERY || ''
export const GRAPH_QL_URL = process.env.REACT_APP_GRAPHQL_URL || ''
const isHttps = GRAPH_QL_URL.split('://')[0] === 'https';
export const GRAPH_QL_SUBSCRIPTION_URL = process.env.REACT_APP_GRAPHQL_SUBSCRIPTION_URL || `${isHttps ? 'wss' : 'ws'}://${GRAPH_QL_URL.split('://')[1]}`;
export const SQL_QUERY_URL = process.env.REACT_APP_SQL_URL || ''
export const DEFAULT_SQL_QUERY = process.env.REACT_APP_DEFAULT_SQL_QUERY || ''
