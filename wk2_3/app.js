// EXPRESS SERVER 
import knex from './database';

import express from 'express';
const app = express();


app.get('/test', (req, res) => {
    res.json([]);
}); 


// extract location, get results, return as json
app.get('/api/getGins/:location', (request, response) => {
    const { state_located } = request.params || {};
    const gins = checkLocation(state_located);
    response.json(gins);
});

// static route, middleware
const staticRoute = express.static('static');
app.use('/static', staticRoute);

// root route
app.use('/', staticRoute);


// tell Express to run on a port, can visit using localhost:PORT#  
const PORT = 8000;
app.listen(PORT, () =>
    console.log(`listening on port ${PORT}`));
