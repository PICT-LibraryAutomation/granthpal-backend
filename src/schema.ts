import { readFileSync } from "fs";

export const typeDefs = readFileSync('schema.gql').toString();