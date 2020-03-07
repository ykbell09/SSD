import getSpiritsByDistiller, { addNewMember } from '../services/gins'



const resolvers = {
    spiritsByDistiller: async ({ distiller_id }) => {
        await getSpiritsByDistiller(distiller_id)
    },
    newMember: async ({ memberData }) => {
        await addNewMember(memberData)
    }
};

export default resolvers;