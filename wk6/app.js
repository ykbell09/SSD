import express from 'express'
import graphqlHTTP from 'express-graphql'
import resolvers from './graphql/resolvers'
import schema from './graphql/schema'

const app = express();

// graphql endpoint
const env = process.env.NODE_ENV || 'development';
app.use('/api/graphql', graphqlHTTP({
    graphiql: env === 'development',
    schema,
    rootValue: resolvers
}));

// static route end
const staticRoute = express.static('static');
app.use('/static', staticRoute);
app.use('/', staticRoute);

const PORT = 8000;
app.listen(PORT, () => console.log(`listening on port ${PORT} .. YOU CAN DO THIS`));