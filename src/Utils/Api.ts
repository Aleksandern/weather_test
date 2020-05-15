
import _ from 'lodash';
import axios, {
  AxiosRequestConfig,
  Method,
} from 'axios';

type Url = string;
type Data = {
  [key: string]: any,
} | null;

class Api {
  static post(url: Url, data: Data = {}, options: AxiosRequestConfig = {}) {
    return this.proc('POST', url, data, options);
  }

  static get(url: Url, data: Data = {}, options: AxiosRequestConfig = {}) {
    return this.proc('GET', url, data, options);
  }

  static proc(method: Method, url: Url, dataInp: Data = {}, optionsInp: AxiosRequestConfig = {}) {
    const headers = {};
    let data: Data = dataInp;
    let params = null;

    if (method === 'GET') {
      params = data;
      data = null;
    }

    if (_.isObject(data) && _.isEmpty(data)) {
      data = null;
    }

    const options = {
      url,
      method,
      headers,
      data,
      params,
      timeout: 10000,
      ...optionsInp,
    };

    return axios(options);
  }
}

export default Api;
