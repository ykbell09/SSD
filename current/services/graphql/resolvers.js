import { getSpiritsByDistiller, getMemberByEmail, createMember, getAllSpirits } from '../functions';
import { compareHash } from '../auth';

// ORIGINAL RESOLVERS
const resolvers = {
    spiritsByDistiller: async ({ distiller_id }) => {
        console.log('resolver', distiller_id);
        return await getSpiritsByDistiller(distiller_id);
        
    },
    login: async ({ loginInput: { email_address, password } },
        { session }) => {
        const member = await getMemberByEmail(email_address);
        const matches = compareHash(password, member.password);
        session.user = matches ? user : null;
        return session.user;
    },
    signup: async({
        member: { email_address, password }
    }, { session }) => {
        session.member = await createMember({
            email_address, password
        });
        return session.member;
    },
    currentMember: (args, { session }) => session.member,
}

export default resolvers;