import express from 'express';
import session from 'express-session';
import ConnectSessionKnex from 'connect-session-knex';
import knex from './database';
import graphqlHTTP from 'express-graphql';
import schema from './services/graphql/schema';
import resolvers from './services/graphql/resolvers';

const app = express();

// SESSIONS MIDDLEWARE
const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
const KnexSessionStore = ConnectSessionKnex(session);
const store = new KnexSessionStore({ knex });
app.use(session({
    store,
    cookie: { maxAge: ONE_WEEK },
    secret: 'uniquesecrettextgoeshere'
}));

// GRAPHQL ENDPOINT
const env = process.env.NODE_ENV || 'development';
app.use('/api/graphql', graphqlHTTP({
    graphiql: env === 'development',
    schema,
    rootValue: resolvers
}));

// STATIC ROUTES
const staticRoute = express.static('static');
app.use('/', staticRoute);
app.use('/static', staticRoute);

// GLOBAL ERROR HANDLER
const { NODE_ENV } = process.env;
// COMMENT OUT IF STATEMENT FOR TESTING
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
})
};

// LOCAL PORT
// const PORT = 8000;
// app.listen(PORT, () =>
//     console.log(`listening on port ${PORT} -- YOU CAN DO THIS!`));

app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`)
);