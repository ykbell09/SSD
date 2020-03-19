import { getSpiritsByDistiller, getMemberByEmail, createMember, } from '../functions';
import { compareHash } from '../auth';

// ORIGINAL RESOLVERS
const resolvers = {
    spiritsByDistiller: async ({ distiller_id }) => {
        return await getSpiritsByDistiller(distiller_id);   
    },
    
    signUp: async (
            { member: { email_address, password } },
            { session }
    ) => {
        session.member = await createMember({ email_address, password });
        return session.member;        
    },
    login: async(
        { member: { email_address, password } }, { session }
    ) => {
        const member = await getMemberByEmail(email_address);
        const matches = compareHash(password, member.password);
        session.member = matches ? member : null;
        return session.member;
    },
    currentMember: (args, { session }) => session.member,

}

export default resolvers;