/* eslint-disable @typescript-eslint/camelcase */

import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';

import Countries from 'src/Utils/Countries';
import moment from 'src/Utils/moment';
import weatherUtils from 'src/Utils/weather';
import {
  sg,
} from 'src/Styles';

import styles from './styles';

const screenWidth = weatherUtils.ITEM_WIDH;

interface PropTypes {
  item: { [key: string]: any },
  isModal?: boolean,
  isCelsius: boolean,
}

const WeatherItem = ({ item, isCelsius, isModal = false }: PropTypes) => {
  const { city_name, data } = item;
  const {
    temp: todayTemp,
    weather: todayWeather,
    wind_cdir,
    wind_spd,
  } = data[0];

  const todayWind = `${wind_cdir} ${Math.round(wind_spd)} mph`;

  const styleWeatherHeader = [styles.weatherHeader];
  const styleTextHeader = [];

  if (isModal) {
    styleWeatherHeader.push(styles.weatherHeaderModal);
    styleTextHeader.push(styles.weatherHeaderTextModal);
  }

  return (
    <View style={[styles.weatherContainer, { width: screenWidth }]}>
      <View style={styleWeatherHeader}>
        <Text style={[sg.aSCenter, sg.mB10, sg.fS12, sg.colorWhite, styleTextHeader]}>Today</Text>

        <View style={styles.weatherHeaderData}>
          <View style={[sg.flex, sg.row, sg.aICenter]}>
            <View>
              <Text style={[sg.fS22, sg.colorWhite, sg.fontBold, styleTextHeader]}>{city_name}</Text>
              <Text style={[sg.fS14, sg.colorWhite, styleTextHeader]}>{Countries.getCountryName(item)}</Text>
            </View>
          </View>

          <View style={[sg.flex, sg.aICenter]}>
            <Image
              style={styles.weatherHeaderImage}
              source={weatherUtils.getIcon(todayWeather)}
            />
          </View>

          <View style={[sg.row, sg.aICenter, sg.flex]}>
            <View style={sg.aICenter}>
              <Text style={[sg.colorWhite, sg.fS35, styleTextHeader]}>{weatherUtils.formatTemp(todayTemp, isCelsius)}</Text>
              <Text style={[sg.colorWhite, sg.fS13, styleTextHeader]}>{todayWind}</Text>
            </View>
          </View>
        </View>

      </View>
      <View style={styles.weatherDaysContainer}>
        {data.map(({ datetime, min_temp, max_temp, weather }: {[key: string]: any}) => (
          <View key={datetime} style={styles.weatherDaysItem}>
            <Text style={[sg.flex, sg.fS16]}>{moment(datetime).format('dddd')}</Text>
            <View style={[sg.flex]}>
              <Image
                style={styles.weatherDaysImage}
                source={weatherUtils.getIcon(weather)}
              />
            </View>
            <View style={[sg.row, sg.flex, sg.jCEnd]}>
              <Text style={[sg.fontBold, sg.fS15]}>{weatherUtils.formatTemp(min_temp, isCelsius)}</Text>
              <Text style={[sg.mH15, sg.fS15]}>|</Text>
              <Text>{weatherUtils.formatTemp(max_temp, isCelsius)}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default WeatherItem;
