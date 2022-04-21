import {AxiosResponse} from "axios";
import {IJsonLdCollection} from "../../types/IjsonLd";

export interface IRead<T> {
    findAll(url: string): Promise<AxiosResponse<IJsonLdCollection<T>>>;

    findOne(url: string, id: string): Promise<AxiosResponse<T>>;
}