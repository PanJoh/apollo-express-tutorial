import { DbMessage } from './message';
import { DbUser } from './user';

export * from './user';
export * from './message';

export type UserModels = { [id: string]: DbUser};
export type MessageModels = { [id: string]: DbMessage};

export interface Models {
    messages: MessageModels;
    users: UserModels;
}