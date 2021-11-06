import { DbMessage } from "../models";
import ResolverContext from "./context";
import { v4 as uuidv4} from 'uuid';
import { QueryMessageArgs, QueryResolvers, Message, MutationResolvers, MessageResolvers, User } from "../generated/graphql-server";

const query: QueryResolvers = {
    message: (parent: any, { id }: QueryMessageArgs, { models }: ResolverContext): Message | null => {
        const message = models.messages[id];
        if (message == null) {
            return null;
        }

        return message;
    },

    messages: (parant: any, args: any, { models }: ResolverContext): Message[] => {
        return Object.entries(models.messages).map(([, message]) => {
            return message
        });
    }
}

const mutations: MutationResolvers = {
    createMessage: (parent: any, { text}, { models, me }: ResolverContext): Message => {
        const id = uuidv4();
        const message = models.messages[id] = { text, id, userId: me.id};
        return message;
    },

    deleteMessage: (parent, { id }, { models }: ResolverContext): boolean => {
        delete models.messages[id];
        return  true;
    }
}

const messageResolvers: MessageResolvers = {
    user: (message, args, { models }: ResolverContext): User => {
        return models.users[message.userId];
    } 
}

export default {
    Query: query,
    Mutation: mutations,
    Message: messageResolvers,
}