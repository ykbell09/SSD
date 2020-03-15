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
     member_pw: String!
     joined: Date!
 }
 type Query {
     spiritsByDistiller(distiller_id: ID): [Spirit]
     currentMember: Member
 }
 input MemberInput {
     email_address: String!
     password: String!
 }
 input LoginInput {
     email_address: String!
     password: String!
 }
 type Mutation {
     login(loginInput: LoginInput!): Member
     signup(member: MemberInput!): Member
 }

`);

export default schema;