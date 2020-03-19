import express from 'express';
import session from 'express-session';
import ConnectSessionKnex from 'connect-session-knex';
import knex from './database';
import graphqlHTTP from 'express-graphql';
import schema from './services/graphql/schema';
import resolvers from './services/graphql/resolvers';

const app = express();

// sessions middleware
const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
const KnexSessionStore = ConnectSessionKnex(session);
app.use(session({
    store: new KnexSessionStore({ knex }),
    secret: 'SecretPhrase',
    cookie: { maxAge: ONE_WEEK }
}));

// Error handler REFERENCE CODE FROM LESSON 25
if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
    app.use(function (err, req, res, next) {
        console.error(err);
        // then:
        res.status(500).send();
        // or:
        res.send(errPageHTML);
    });
}


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
const PORT = 8080;
app.listen(PORT, () =>
    console.log(`listening on port ${PORT} -- YOU CAN DO THIS!`));