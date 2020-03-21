import bcrypt from 'bcrypt';

const saltRounds = 10;
export const hashPass = async rawPass =>
    await bcrypt.hash(rawPass, saltRounds);

export const compareHash = async (rawPass, hashedPass) =>
    await bcrypt.compare(rawPass, hashedPass);

// export const validatePassword = candidate => {
//     if (candidate.length < 6)
//         throw new Error('please enter at least 6 characters');
// };