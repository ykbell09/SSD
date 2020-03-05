import express, { response, request } from 'express';
import getGinsByState, { addUserToList, removeUserFromList, updateWebsite } from './services/gins.js';

const app = express();
app.use(express.json()); // needed if you expect your client to POST a JSON string to an endpoint

// api route to get gins by state
app.get('/api/getGins/:state_located', async (request, response) => {
    const results = await getGinsByState(request.params.state_located);
    response.json(results);
});

// api to add user to users table
app.post('/api/addUser', async (request, response) => {
    const newUserData = request.body;
    const userId = await addUserToList(newUserData);
    response.json({ id: userId });
});

// api to remove user from users table
app.post('/api/removeUser', async (request, response) => {
    const removeEmailRequest = request.body;
    await removeUserFromList(removeEmailRequest.removeEmail);
    response.json({ success: true });
});

// api to update a website in the distillers table
app.post('/api/updateWebsite', async (request, response) => {
    const updateWebsiteRequest = request.body;
    await updateWebsite(updateWebsiteRequest.distillerId, updateWebsiteRequest.newWebsite);
    response.json({ success: true });
});

// static/root routes
const staticRoute = express.static('static');
app.use('/static', staticRoute);
app.use('/', staticRoute);

// tell Express to run on a port, can visit using localhost:PORT#
const PORT = 8000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));