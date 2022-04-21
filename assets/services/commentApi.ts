import {IWrite} from "./interfaces/IWrite";
import {ICommentData} from "../types/ICommentData";
import {IRead} from "./interfaces/IRead";
import {AxiosResponse} from "axios";
import {IJsonLdCollection} from "../types/IjsonLd";

export class CommentApi implements IWrite<ICommentData>, IRead<ICommentData> {
    findAll = (url: string): Promise<AxiosResponse<IJsonLdCollection<ICommentData>>> => {
        throw new Error("Method not implemented.");
    };

    findOne = (url: string, id: string): Promise<AxiosResponse<ICommentData>> => {
        throw new Error("Method not implemented.");
    };

    create = (url: string, item: ICommentData): Promise<AxiosResponse<boolean>> => {
        throw new Error("Method not implemented.");
    };

    update = (url: string, id: string, item: ICommentData): Promise<AxiosResponse<boolean>> => {
        throw new Error("Method not implemented.");
    };

    delete = (url: string, d: string): Promise<AxiosResponse<boolean>> => {
        throw new Error("Method not implemented.");
    };
}