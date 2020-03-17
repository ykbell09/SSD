import { buildSchema } from 'graphql'

export default buildSchema(`
scalar Date
type Spirit {
  spirit_id: ID!
  spirit_name: String!
  distiller: Distiller!
}
type Distiller {
  distiller_id: ID!
  distiller_name: String!
  added_on: Date!
  spirits: [Spirit]
}
type Member {
  member_id: ID!
  first_name: String
  email_address: String!
}
type Query {
  spiritsByDistiller(distiller_id: ID!): Distiller
}
input MemberData {
  first_name: String
  email_address: String!
}
type Mutation {
  newMember(member: MemberData): Member
}
`);