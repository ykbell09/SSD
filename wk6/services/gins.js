import knex from '../database'

// gin related functions 

export default getSpiritsByDistiller = async (id) => {
    return await knex('spirits')
        .select('spirit_name')
        .where({ distiller_id: id });
};

export const addNewMember = async (memberData) =>
    await knex('members')
        .insert(memberData)
        .returning('id');



