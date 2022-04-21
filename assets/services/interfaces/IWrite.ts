import {AxiosResponse} from "axios";

export interface IWrite<T> {
    create(url: string, item: T): Promise<AxiosResponse<boolean>>;

    update(url: string, id: string, item: T): Promise<AxiosResponse<boolean>>;

    delete(url: string, id: string): Promise<AxiosResponse<boolean>>;
}