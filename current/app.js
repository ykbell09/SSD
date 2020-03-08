import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './database/graphql/schema';
import resolvers from './database/graphql/resolvers';

const app = express();

// graphql endpoint
const env = process.env.NODE_ENV || 'development';
app.use('/api/graphql', graphqlHTTP({
    graphiql: env === 'development',
    schema,
    rootValue: resolvers
}))

// static routes
const staticRoute = express.static('static');
app.use('/', staticRoute);
app.use('/static', staticRoute);

// local port
const PORT = 8000;
app.listen(PORT, () =>
    console.log(`listening on port ${PORT} -- YOU CAN DO THIS!`));