import bcrypt from 'bcrypt';

const saltRounds = 10;
export const hashPass = async rawPass =>
    await bcrypt.hash(rawPass, saltRounds);

export const compareHash = async rawPass =>
    await bcrypt.compare(rawPass, hashPass);
