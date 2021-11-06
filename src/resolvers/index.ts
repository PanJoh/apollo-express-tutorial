import userResolvers from './user';
import messageResolvers from './message';
import { Resolvers } from '../generated/graphql-server';

export default [userResolvers, messageResolvers];

export const resolvers: Resolvers = {
    Query: {
        ...userResolvers.Query,
        ...messageResolvers.Query,
    },
    Mutation: {
        ...messageResolvers.Mutation,
    },
    User: userResolvers.User,
    Message: messageResolvers.Message,
}
