import { Sondage } from "./sondage.interface";
import { User } from "./users.interface";

export interface Response {
    _id: string;
    author: User;
    choix: boolean;
    sondage: Sondage
}