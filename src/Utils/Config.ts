
import {
  APP_ENV,
  ENV_DEBUG,
  ENV_PRODUCTION,
} from 'src/Config/Environments';

export const isProd = () => !__DEV__;

export default class Config {
  private static instance: Config;

  constructor() {
    if (!Config.instance) {
      Config.instance = this;
    }
    return Config.instance;
  }

  static get() {
    let res;
    if (isProd()) {
      res = APP_ENV[ENV_PRODUCTION];
    } else {
      res = APP_ENV[ENV_DEBUG];
    }
    return res;
  }
}
