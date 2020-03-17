import { getSpiritsByDistiller, getMemberByEmail, createMember, } from '../functions';
import { compareHash } from '../auth';

// ORIGINAL RESOLVERS
const resolvers = {
    spiritsByDistiller: async ({ distiller_id }) => {
        return await getSpiritsByDistiller(distiller_id);   
    },
    
    signUp: async ({ member: { email_address, password } }) => {
        await createMember({ email_address, password });
        return await getMemberByEmail(email_address);
        
    }

}








export default resolvers;


// SAMPLE CODE FROM LESSON

// loginSample: async ({ loginInput: { email_address, password } },
//     { session }) => {
//     const member = await getMemberByEmail(email_address);
//     const matches = compareHash(password, member.password);
//     session.user = matches ? user : null;
//     return session.user;
// },




//    signup: async ({
//         member: { email_address, password }
//     }, { session }) => {
//         session.member = await createMember({
//             email_address, password
//         });
//         return session.member;
//     },
//         currentMember: (args, { session }) => session.member,