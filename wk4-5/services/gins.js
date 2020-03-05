import knex from '../database'

// gin related queries

// READ query -- get gins by state
export const getGinsByState = async (state) => {
    return await knex('gins')
        .select('gin_name', 'rating')
        .where({ state_located: state });
};

// INSERT query -- add a new user to database
export const addUserToList = async (newUser) =>
    await knex('users')
        .insert(newUser)
        .returning('id');

// DELETE query -- remove a user from database
export const removeUserFromList = async (removeEmail) =>
    await knex('users')
        .del()
        .where({ email_address: removeEmail })
        
// UPDATE querey -- update a gin's website
export const updateWebsite = async (distillerId, newWebsite) =>
    await knex('distillers')
        .update({ website: newWebsite })
        .where({ id: distillerId });


export default getGinsByState;