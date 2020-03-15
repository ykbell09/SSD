import knex from '../database/database';
import { hashPass } from './auth';

// READ query -- get spirits by distiller
export const getSpiritsByDistiller = async selected_id => {
    return await knex('spirits')
        .select('id', 'spirit_name', 'distiller_id')
        .where({ distiller_id: selected_id })
        .returning('id', 'spirit_name', 'distiller_id')
};

export const getMemberByEmail = async email_address =>
    (await knex('members')
        .select()
        .where({ email_address })
    )[0];

export const createMember = async ({ email_address, password }) => {
    const [member] = await knex('members')
        .insert({ email_address, password: await hashPass(password) })
        .returning(['id', 'email_address', 'password']);
    return member;
};