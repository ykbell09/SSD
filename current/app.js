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
const store = new KnexSessionStore({ knex });
app.use(session({
    store,
    cookie: { maxAge: ONE_WEEK },
    secret: 'uniquesecrettextgoeshere'
}));

// Error handler 
const { NODE_ENV } = process.env;
if (NODE_ENV !== 'development' && NODE_ENV !== 'test') {
    app.use(function (err, req, res, next) {
        console.error(err);
        // then:
        res.status(500).send({
            error: 'GENERIC',
            description: 'Something went wrong. Please try again later.',
        });
        // or:
        // res.send(errPageHTML);
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