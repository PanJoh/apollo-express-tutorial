import { DbUser, Models } from "../models";

export default interface ResolverContext {
    models: Models;
    me: DbUser;
}