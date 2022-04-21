import {IWrite} from "./interfaces/IWrite";
import {IRead} from "./interfaces/IRead";
import {AxiosResponse} from "axios";
import {ITagData} from "../types/ITagData";
import {IJsonLdCollection} from "../types/IjsonLd";

export class TagApi implements IWrite<ITagData>, IRead<ITagData> {
    findAll = (url: string): Promise<AxiosResponse<IJsonLdCollection<ITagData>>> => {
        throw new Error("Method not implemented.");
    };

    findOne = (url: string, id: string): Promise<AxiosResponse<ITagData>> => {
        throw new Error("Method not implemented.");
    };

    create = (url: string, item: ITagData): Promise<AxiosResponse<boolean>> => {
        throw new Error("Method not implemented.");
    };

    update = (url: string, id: string, item: ITagData): Promise<AxiosResponse<boolean>> => {
        throw new Error("Method not implemented.");
    };

    delete = (url: string, id: string): Promise<AxiosResponse<boolean>> => {
        throw new Error("Method not implemented.");
    };
}