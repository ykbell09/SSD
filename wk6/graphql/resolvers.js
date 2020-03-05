
const resolvers = {
    addMember: async ({ member }) => {
        const { member_id } = await addMember(MemberInput);
     }
       
    
    
    
    

export default resolvers;



// mutation {
//     addMember(first_name: "Test", email_address: "email@test.com") {
//         member_id
//         email_address
//     }
// }