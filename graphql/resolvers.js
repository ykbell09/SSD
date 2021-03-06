import { getSpiritsByDistiller, getMemberByEmail, createMember, updateUsernameById, updateEmailAddressById, getSpiritsByType, createReviewBySpiritId, getSpiritById, getAllDistillers, getDistillerIdByName, getAllReviews } from '../services/functions';
import { compareHash } from '../services/auth';
// import { sendResetEmail, getPasswordResetKey } from '../services/email';

const resolvers = {
    allDistillers: async () => {
        return await getAllDistillers();
    },

    spiritsByDistiller: async ({ distiller_name }) => {
        const distiller_id = await getDistillerIdByName(distiller_name);
        return await getSpiritsByDistiller(distiller_id);   
    },

    spiritsByType: async ({ spirit_type }) => {
        return await getSpiritsByType(spirit_type);
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

    // requestPasswordReset: async ({ email_address }) => {
    //     try {
    //         sendResetEmail(await getMemberByEmail(email_address));
    //     } catch (err) {
    //         return { wasSuccessful: false };
    //     }
    //     return { wasSuccessful: true };
    // },

    // passwordReset: async({
    //     resetInput: { email_address, password, key }
    // }, { session }) => {
    //     const member = await getMemberByEmail(email_address);
    //     const actualKey = getPasswordResetKey(member);
    //     if (key !== actualKey)
    //         throw new Error('invalid password reset key');
    //     changePassword(member.id, password);
    //     session.member = member;
    //     return member;
    // },

    updateUsername: async ({ usernameInput: { username } }, { session }) => {
        return await updateUsernameById(username, session.member.id);        
    },

    updateEmail: async ({ emailInput: { email_address } }, { session }) => {
        const update = await updateEmailAddressById(email_address, session.member.id);
        return update;
    },
       
    createReview: async ({ reviewInput: { spirit_name, review } }, { session }) => {
        const spirit_id = await getSpiritById(spirit_name);

        const newReview = await createReviewBySpiritId(spirit_id, review, session.member.id);
        return newReview;
    },

    allReviews: async () => {
        return await getAllReviews();        
    }
    
}

export default resolvers;