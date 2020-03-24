import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import { hashPass } from '../services/auth';


const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'twentymilehike@yahoo.com',
        pass: 'sexycatpants69!'
    }
});

export const sendResetEmail = async ({ display_name, email, id }) => {
    const key = await generatePasswordResetKey();
    storePasswordResetKey(id, key);
    await transport.sendMail({
        from: 'twentymilehike@yahoo.com',
        to: email,
        subject: 'Password Reset for All The Gins',
        text: generatePasswordResetMessage(display_name, key)
    });
};

const generatePasswordResetKey = async () =>
    (await randomBytes(32)).toString('hex');

const storePasswordResetKey = (member_id, key) =>
    knex('password_resets')
        .insert({ member_id, key });

const generatePasswordResetMessage = (display_name, key) => `
Hello ${display_name},
Someone requested that your password to All The Gins be reset. If that was you, please visit our password reset page and provide the following token: "${key}". Otherwise, please disregard thsi email. Thanks!
`;

export const getPasswordResetKey = async ({ id }, key) => {
    cosnt[result] = await knex('password_resets')
        .select('key')
        .where({ user_id: id })
        .andWhere('created_on', '>', getOneWeekAgo());
    return result ? result.key : null;
};

export const changePassword = async (userId, password) =>
    await knex('users')
        .update({
            password: await hashPass(password)
        })
        .where({ user_id });