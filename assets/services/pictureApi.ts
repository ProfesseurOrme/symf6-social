import {IWrite} from "./interfaces/IWrite";
import {IPictureData} from "../types/IPictureData";
import {IRead} from "./interfaces/IRead";
import axios, {AxiosResponse} from "axios";
import {IJsonLdCollection} from "../types/IjsonLd";


class PictureApi implements IWrite<IPictureData>, IRead<IPictureData> {

    findAll = (url: string): Promise<AxiosResponse<IJsonLdCollection<IPictureData>>> => axios.get(url);

    findOne = (url: string): Promise<AxiosResponse<IPictureData>> => axios.get(url);

    create = (url: string, item: IPictureData): Promise<AxiosResponse<boolean>> => axios.post(url, item);

    update = (url: string, id: string, item: IPictureData): Promise<AxiosResponse<boolean>> => axios.patch(`${url}/pictures`, item);

    delete = (url: string, id: string): Promise<AxiosResponse<boolean>> => {
        throw new Error("Method not implemented.");
    };
}

export default PictureApi;