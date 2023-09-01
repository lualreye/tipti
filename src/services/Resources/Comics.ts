import { AxiosResponse } from 'axios';
import APIBase from '../Base';

class APIComics extends APIBase {
  async getComics(endpoint: string): Promise<AxiosResponse> {
    return await this.get(endpoint);
  }
}

export default APIComics;