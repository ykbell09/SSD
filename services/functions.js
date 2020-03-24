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
export const createMember = async (email_address, password, username) => {
    const [member] = await knex('members')
        .insert({ email_address, password: await hashPass(password), username })
        .returning(['id', 'email_address', 'password', 'joined', 'username']);
    return member;
};

// READ QUERY - get member info by provided email address
export const getMemberByEmail = async email => {
    const [member] = await knex('members')
        .select('id', 'email_address', 'password', 'joined', 'username')
        .where({ email_address: email })
        .returning('id', 'email_address', 'password', 'joined', 'username');
    return member;
};

// HELPER FUNCTION - get member by id
export const getUserById = async (id) => {
    const member = await knex('members')
        .select('id', 'email_address', 'password', 'joined', 'username')
        .where({ id })
        .returning('id', 'email_address', 'password', 'joined', 'username');
};

// UPDATE QUERY -- update member username by id
export const updateUsernameById = async (newUsername, id) => {
    const [member] = await knex('members')
        .where({ id })
        .update({ username: newUsername }, ['id', 'email_address', 'joined', 'username'])

    return member;
};

// UPDATE QUERY -- update member email address by id
export const updateEmailAddressById = async (newEmail, id) => {
    const [member] = await knex('members')
        .where({ id })
        .update({ email_address: newEmail }, ['id', 'email_address', 'joined', 'username'])
    return member;
};