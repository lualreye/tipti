import { AxiosResponse } from "axios";
import APIBase from "../Base";

class APIStories extends APIBase {
  async getStories(endpoint: string): Promise<AxiosResponse> {
    return await this.get(endpoint);
  }
}

export default APIStories;