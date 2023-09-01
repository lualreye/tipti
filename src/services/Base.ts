import axios, { AxiosResponse } from 'axios';
import md5 from 'md5';

class APIBase {
  private baseUrl: string;
  private publicKey: string
  private privateKey: string

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
    this.publicKey = `${import.meta.env.VITE_PUBLIC_KEY}`;
    this.privateKey = `${import.meta.env.VITE_PRIVATE_KEY}`;
  }

  private buildUrl(endpoint: string, id?: string): string {
    const query = this.createQuery();

    if (id) {
      return `${this.baseUrl}/${endpoint}/${id}&${query}`;
    }
    return `${this.baseUrl}/${endpoint}&${query}`;
  }

  private createQuery(): string {
    const timestamp = Date.now();
    const hash = this.createHash(timestamp);
    const query = `ts=${timestamp}&apikey=${this.publicKey}&hash=${hash}`

    return query;
  }

  private createHash(timestamp: number): string {
    return md5(timestamp + this.privateKey + this.publicKey);
  }

  protected async get<T>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    try {
      const response: AxiosResponse<T> = await axios.get(url);
      return response.data;
    } catch (error: any) {
      throw new Error(`GET request to ${url} failed: ${error.message}`);
    }
  }

  protected async getById<T>(endpoint: string, id: string): Promise<T> {
    const url = this.buildUrl(endpoint, id);
    try {
      const response: AxiosResponse<T> = await axios.get(url);
      return response.data;
    } catch (error: any) {
      throw new Error(`PUT request to ${url} failed: ${error.message}`);
    }
  }
}

export default APIBase;