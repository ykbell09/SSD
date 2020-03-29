import knex from '../database';
import { hashPass } from './auth';

// READ QUERY -- get all distillers
export const getAllDistillers = async () => {
    return await knex('distillers')
        .returning('id', 'distiller_name', 'added_on');
};

// READ query -- get spirits by distiller
export const getSpiritsByDistiller = async distiller_id => {
    return await knex('spirits')
        .select('id', 'spirit_name', 'distiller_id')
        .where({ distiller_id })
        .returning('id', 'spirit_name', 'distiller_id');
};

// READ QUERY -- get distiller id by name 
export const getDistillerIdByName = async (distiller_name) => {
    const [distiller] = await knex('distillers')
        .select('id', 'distiller_name')
        .where({ distiller_name })
        .returning('id', 'distiller_name');
    return distiller.id;
};

// READ QUERY -- get spirits by spirit type
export const getSpiritsByType = async (spirit_type) => {

    const [spiritType] = await knex('types')
        .where({ spirit_type })
        .select('id', 'spirit_type')
        .returning('id', 'spirit_type');
    const typeId = spiritType.id;

    const spiritIdList = await knex('join_st')
        .where({ type_id: typeId })
        .select('spirit_id', 'type_id')
        .returning('spirit_id', 'type_id');

    const spiritIdArray = spiritIdList.map((arg) => arg.spirit_id);

    const spiritsByType = await knex('spirits')
        .select('id', 'spirit_name', 'distiller_id')
        .whereIn('id', spiritIdArray)
        .returning('id', 'spirit_name', 'distiller_id');

    return spiritsByType;

};

// CREATE QUERY -- sign up for new members
export const createMember = async (email_address, password, username) => {
    const [member] = await knex('members')
        .insert({ email_address, password: await hashPass(password), username })
        .returning(['id', 'email_address', 'password', 'joined', 'username']);
    return member;
};

// READ QUERY -- get member info by provided email address
export const getMemberByEmail = async email => {
    const [member] = await knex('members')
        .select('id', 'email_address', 'password', 'joined', 'username')
        .where({ email_address: email })
        .returning('id', 'email_address', 'password', 'joined', 'username');
    return member;
};

// // HELPER FUNCTION -- get member by id
// export const getUserById = async (id) => {
//     const member = await knex('members')
//         .select('id', 'email_address', 'password', 'joined', 'username')
//         .where({ id })
//         .returning('id', 'email_address', 'password', 'joined', 'username');
// };

// UPDATE QUERY -- update member username by id
export const updateUsernameById = async (newUsername, id) => {
    const [member] = await knex('members')
        .where({ id })
        .update({ username: newUsername }, ['id', 'email_address', 'joined', 'username']);
    return member;
};

// UPDATE QUERY -- update member email address by id
export const updateEmailAddressById = async (newEmail, id) => {
    const [member] = await knex('members')
        .where({ id })
        .update({ email_address: newEmail }, ['id', 'email_address', 'joined', 'username']);
    return member;
};

// SELECT QUEREY -- get spirit by id
export const getSpiritById = async spirit_name => {
    const [spirit] = await knex('spirits')
        .select('id')
        .where({ spirit_name })
        .returning('id');
    return spirit.id;
};

// CREATE QUERY -- add a new review
export const createReviewBySpiritId = async (spirit_id, review, member_id) => {  
    const [newReview] = await knex('reviews')
        .insert({ spirit_id, review, member_id })
        .returning(['id', 'spirit_id', 'review', 'member_id']);
    return newReview;
};

// READ QUERY -- get reviews, returns objects
export const getAllReviews = async () => {
    const allReviews = await knex('reviews')
        .returning('id', 'spirit_id', 'review', 'member_id');
    return allReviews;
};

// xx JOIN QUERY ? WIP
// export const getAllReviews = async () => {
//     const [reviews] =  await knex('reviews')
//         .join('spirits', 'reviews.spirit_id', '=', 'spirits.id')
//         .select('spirits.spirit_name', 'reviews.review')
//         .returning('spirits.spirit_name', 'reviews.review')
//     return reviews;
// };

