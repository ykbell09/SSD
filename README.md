# SSD
Server Side Development Class Projects

'wk6' directory - files includes schema and resolvers with intention of meeting assignment requirements. This is not connected to any data. 

'current' directory - includes re-working through the material to grasp a better understanding of the connections between graphql, server and front end. 


NOTE TO SELF:

// QUERY / MUTATION REFERENCE FOR FRONT END

Query: {
    getSpiritsByDistiller(distiller_id: ID!) {
        distiller_name
        spirits {
            spirit_name
        }
    }
};
mutaton: {
    addNewMember(member: { first_name: String, email_address: String! }) {
        member_id
    }
} 