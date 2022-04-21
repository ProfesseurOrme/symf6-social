import {ICommentData} from "./ICommentData";
import {ITagData} from "./ITagData";
import {IJsonLd} from "./IjsonLd";
import {IUserData} from "./IUserData";

export interface IPictureData extends IJsonLd{
    "id": number,
    "image": string,
    "description": string,
    "likes": string[],
    "tags": ITagData[] | [],
    "comments": ICommentData[] | [],
    "user" : IUserData
}