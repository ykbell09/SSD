import { buildSchema } from 'graphql';

export const schema = buildSchema(`
    type Query {
        distiller: Int
    }
`);

export default schema;