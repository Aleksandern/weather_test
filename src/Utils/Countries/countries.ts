/* eslint-disable @typescript-eslint/camelcase */

import _ from 'lodash';

import countriesList from './countriesList.json';

type Item = {
  [key: string]: any,
};

type Country = {
  country_code: string,
  country_name: string | null,
} | undefined;

export default {
  getCountryName({ country_code: countryCodeFind }: Item) {
    let res: string | null = '';

    if (!countryCodeFind) {
      return res;
    }

    const country: Country = countriesList.find(({ country_code }: Item) => country_code === countryCodeFind);

    if (country) {
      res = _.get(country, 'country_name', '');
    }

    return res;
  },
};
