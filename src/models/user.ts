import { Message } from "./message";

export interface DbUser {
    id: string;
    firstName: string;
    lastName: string;
    messageIds: string[];
}

export interface User {
    id: string;
    userName: string;
    messages: Message[];
}