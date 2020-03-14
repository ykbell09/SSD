import knex from '../database/database';

export const getSpiritsByDistiller = async (id) => {
    return await knex('spirits')
        .select('spirit_name')
        .where({ distiller_id: id });
};