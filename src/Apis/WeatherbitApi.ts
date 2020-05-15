
import _ from 'lodash';

import Config from 'src/Utils/Config';
import Api from 'src/Utils/Api';

class WeatherbitApi {
  static getUrl(path: string, query: string) {
    const baseUrl = 'https://api.weatherbit.io/v2.0/';
    const { weatherbitApiKey } = Config.get();
    const requestUrl = `${baseUrl}${path}?${query}&key=${weatherbitApiKey}`;

    return requestUrl;
  }

  static async request(url: string, defaultResult = null) {
    let res = defaultResult;

    try {
      const resApi = await Api.get(url);
      res = _.get(resApi, 'data', defaultResult);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(`!!!weatherbit err: ${url}`, e);
    }

    return res;
  }

  static async forecastCities() {
    const res: any[] = [];
    const urlBerlin = this.getUrl('forecast/daily', 'city=Berlin');
    const urlParis = this.getUrl('forecast/daily', 'city=Paris');
    const urlTomsk = this.getUrl('forecast/daily', 'city=Tomsk');

    const reqRes = await Promise.all([
      this.request(urlParis),
      this.request(urlBerlin),
      this.request(urlTomsk),
    ]);

    reqRes.forEach((itemReq) => {
      if (itemReq) {
        res.push(itemReq);
      }
    });

    return res;
  }
}

export default WeatherbitApi;
