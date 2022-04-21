import {IJsonLd} from "./IjsonLd";

export interface ICommentData extends IJsonLd {
    "id": number,
    "message": string,
    "created": Date
}