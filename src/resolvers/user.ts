import { Message, QueryResolvers, Resolvers, User, UserResolvers } from "../generated/graphql-server";
import { DbUser } from "../models";
import ResolverContext from "./context";

const queries: QueryResolvers = {
    user: (parent, { id }, { models }: ResolverContext): User | null  => {
        const user = models.users[id];
        return user;
    },

    users: (parent, args, { models }: ResolverContext) => {
        return Object.entries(models.users).map(([, user]) => user as any as User);
    },
};

const userResolvers: UserResolvers = {
    messages: (user, args, { models }: ResolverContext): Message[] => {
        return user.messageIds?.map(msgId => models.messages[msgId]) ?? [];
    },

    userName: (user) => {
        return `${user.firstName} ${user.lastName}`;
    }
}

export default {
    Query: queries,
    User: userResolvers,
}; 