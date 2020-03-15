import { getSpiritsByDistiller, getDistillerById, addNewMember } from '../services/gins'



const resolvers = {
    spiritsByDistiller: async ({ distiller_id }) => {
        //console.log('test ' + distiller_id);
        //console.log(await getDistillerById(1003));
        //console.log(await getSpiritsByDistiller(1003));

        //const distiller = await getDistillerById(distiller_id);
        //const spirits = await getSpiritsByDistiller(distiller_id);

        const distillerObject = {
            distiller_id: 123,
            distiller_name: "foo"
        };
        
        return distillerObject;
        //return await getSpiritsByDistiller(distiller_id)
    },
    newMember: async ({ memberData }) => {
        await addNewMember(memberData)
    }
};

export default resolvers;