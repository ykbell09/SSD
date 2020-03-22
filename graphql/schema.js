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
 type Query {
     spiritsByDistiller(distiller_id: ID): [Spirit]
     currentMember: Member
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
 input UpdateInput {
     email_address: String
     password: String
     username: String
 }
 type Mutation {
     signUp(member: MemberInput!): Member
     login(member: LoginInput!): Member
     updateMember(member: UpdateInput): Member
 }

`);

export default schema;