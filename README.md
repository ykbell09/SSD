# SSD
Server Side Development Class Projects


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