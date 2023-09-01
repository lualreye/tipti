import { AxiosResponse } from "axios";
import APIBase from "../Base";

class APISeries extends APIBase {
  async getSeries(endpoint: string): Promise<AxiosResponse> {
    return await this.get(endpoint);
  }
}

export default APISeries;