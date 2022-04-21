import {IJsonLd} from "./IjsonLd";
import {ITagData} from "./ITagData";
import {ICommentData} from "./ICommentData";

export interface IUserData extends IJsonLd{
    "id": number,
    "username": string,
    "email": string
}