import { AxiosError } from "axios";
import { APIClient } from "../libs/axios-client";
import CustomLocalStorage from "../libs/local-storage";

interface TableInterface {
  tb_name: string;
}
type ErrorHandlerProps = (error: AxiosError) => any;
export class APICRUDMixin extends APIClient implements TableInterface {
  tb_name: string = "";
  constructor(tb_name?: string, errorHandler?: ErrorHandlerProps) {
    super(null, errorHandler);
    this.tb_name = tb_name ?? this.tb_name;
    this.setBearerToken(CustomLocalStorage.token());
  }

  private generateQueryStr = (queries: {} | any) => {
    const queryKeys = Object.keys(queries || {});
    if (!(queryKeys.length > 0)) return "";
    const str = queryKeys.map((key) => `${key}=${queries[key]}`).join("&");
    return `?${str}`;
  };

  onGet = (id: string) => this.get(`${this.tb_name}/${id}`);

  onList = () => this.get(this.tb_name);

  onQuery = (queries: {}) =>
    this.get(`${this.tb_name}${this.generateQueryStr(queries)}`);

  onCreate = (data: any) => this.post(this.tb_name, data);

  onUpdate = (data: any) => this.patch(`${this.tb_name}/${data?.id}`, data);
  onUpdateWithId = (args: any) =>
    this.patch(`${this.tb_name}/${args?.id}`, args.data);

  onDelete = (id: string) => this.delete(`${this.tb_name}/${id}`);

  static onPaginate = (route: { path: string; queries?: {} }) => {
    const instance = new APICRUDMixin("");
    let queryString = "";
    if (route?.queries) {
      const _queries = route?.queries as any;
      queryString = instance.generateQueryStr(_queries);
    }
    return instance.get(
      `${route.path?.replace("http", "https")}${queryString}`
    );
  };
}
