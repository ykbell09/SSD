import express from 'express';
import session from 'express-session';
import ConnectSessionKnex from 'connect-session-knex';
import knex from './database/database';
import graphqlHTTP from 'express-graphql';
import schema from './services/graphql/schema';
import resolvers from './services/graphql/resolvers';

const app = express();

// sessions middleware
const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
const KnexSessionStore = ConnectSessionKnex(session);
app.use(session({
    store: new KnexSessionStore({ knex }),
    secret: 'Tom Collins',
    cookie: { maxAge: ONE_WEEK }
}));

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