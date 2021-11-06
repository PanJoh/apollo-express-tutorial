import { User } from "./user";

export interface DbMessage {
    id: string;
    text: string;
    userId: string;
}

export interface Message {
    id: string;
    text: string;
    user: User;
}