import { getSpiritsByDistiller, getMemberByEmail, createMember, } from '../services/functions';
import { compareHash } from '../services/auth';

// ORIGINAL RESOLVERS
const resolvers = {
    spiritsByDistiller: async ({ distiller_id }) => {
        return await getSpiritsByDistiller(distiller_id);   
    },
    
    signUp: async (
            { member: { email_address, password, username } },
            { session }
    ) => {
        session.member = await createMember( email_address, password, username );
        return session.member;        
    },
    login: async(
        { member: { email_address, password } }, { session }
    ) => {
        const member = await getMemberByEmail(email_address);
        const matches = await compareHash(password, member.password);
        session.member = matches ? member : null;
        return session.member;
    },
    currentMember: (args, { session }) => session.member,

    // updateMember: async({ member: { email_address, password, username } }, { session }
    // ) => {
    //     // insert code to update database?
    // }

}

export default resolvers;