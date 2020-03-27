import { buildSchema } from 'graphql';
  
 const schema = buildSchema(`
 scalar Date
 type Distiller {
     id: ID!
     distiller_name: String!
     added_on: Date!
     spirits: [Spirit]
 }
 type Spirit {
     id: ID!
     spirit_name: String!
     distiller_id: Int!
 }
 type Member {
     id: ID!
     email_address: String!
     password: String!
     joined: Date!
     username: String!
 }
 type SpiritType {
     id: ID! 
     spirit_type: String!
 }
 type Review {
     id: ID!
     spirit_id: Int!
     review: String!
     member_id: Int!
 }
 type Query {
     spiritsByDistiller(distiller_id: ID): [Spirit]
     currentMember: Member
     spiritsByType(spirit_type: String!): [Spirit]
 }
 input MemberInput {
     email_address: String!
     password: String!
     username: String!
 }
 input LoginInput {
     email_address: String!
     password: String!
 }
input PasswordResetInput {
    username: String!
    password: String!
    key: String!
}
input UpdateUsernameInput {
    username: String!
}
input UpdateEmailInput {
    email_address: String!
}
input CreateReviewInput {
    spirit_id: ID!
    review: String!
}
 type SuccessResponse { 
  wasSuccessful: Boolean!
}
 type Mutation {
     signUp(member: MemberInput!): Member
     login(member: LoginInput!): Member
     updateUsername(usernameInput: UpdateUsernameInput): Member
     updateEmail(emailInput: UpdateEmailInput): Member
     createReview(reviewInput: CreateReviewInput): Review

     requestPasswordReset(email_address: String!): SuccessResponse
     passwordReset(resetInput: PasswordResetInput!): SuccessResponse

 }

`);

export default schema;