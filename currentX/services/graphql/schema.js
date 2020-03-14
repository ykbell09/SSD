import { buildSchema } from 'graphql';

export const schema = buildSchema(`
    scalar Date
    type Spirit {
        id: ID!
        spirit_name: String!
        distiller: Distiller!
    }
    type Distiller {
        id: ID!
        distiller_name: String!
        added_on: Date!
        spirits: [Spirit]
    }
    type Query {
        distiller: Int
        spiritsByDistiller(distiller_id: ID!): Distiller
    }
`);

export default schema;