import knex from '../database.js'

// gin related functions 

export const getDistillerById = async (distiller_id) => {
    return await knex('distillers')
        .select('id', 'distiller_name', 'added_on')
        .where({ id: distiller_id });
};

export const getSpiritsByDistiller = async (id) => {
    return await knex('spirits')
        .select('id', 'spirit_name', 'distiller_id')
        .where({ distiller_id: id });
};





export const addNewMember = async (memberData) =>
    await knex('members')
        .insert(memberData)
        .returning('id');

export default getSpiritsByDistiller;

