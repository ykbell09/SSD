import knex from '../database';
import { hashPass } from './auth';

// READ query -- get spirits by distiller
export const getSpiritsByDistiller = async selected_id => {
    return await knex('spirits')
        .select('id', 'spirit_name', 'distiller_id')
        .where({ distiller_id: selected_id })
        .returning('id', 'spirit_name', 'distiller_id')
};

// CREATE QUERY -- sign up for new members
export const createMember = async ({ email_address, password }) => {
    const [member] = await knex('members')
        .insert({ email_address, password: await hashPass(password, 10) })
        .returning(['id', 'email_address', 'password']);
    return member;
};

// READ QUERY - get member info by provided email address
export const getMemberByEmail = async email => {
    const [member] = await knex('members')
        .select('id', 'email_address', 'password', 'joined')
        .where({ email_address: email })
        .returning('id', 'email_address', 'password', 'joined');
    return member;
};




