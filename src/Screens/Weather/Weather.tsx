/* eslint-disable @typescript-eslint/camelcase */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import WeatherbitApi from 'src/Apis/WeatherbitApi';
import weatherUtils from 'src/Utils/weather';
import {
  sg,
  cls,
} from 'src/Styles';

import Celsius from 'src/Assets/Celsius.png';
import Fahrenheit from 'src/Assets/Fahrenheit.png';

import WeatherItem from './WeatherItem';
import WeatherLocation from './WeatherLocation';

import styles from './styles';

interface StateTypes {
  data: object[],
  isCelsius: boolean,
  isLoading: boolean,
}

const screenWidth = weatherUtils.ITEM_WIDH;
const itemWidth = (screenWidth) / 2;

class Weather extends React.Component <null, StateTypes> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: [],
      isCelsius: true,
      isLoading: true,
    };
  }

  componentDidMount() {
    WeatherbitApi.forecastCities().then((data) => {
      this.setState({
        isLoading: false,
        data,
      });
    });
  }

  onDegreeChange = (isCelsiusInp: boolean = true) => {
    this.setState({
      isCelsius: isCelsiusInp,
    });
  };

  renderSwipeFooter() {
    const { isCelsius } = this.state;
    const styleButtonCelsius = [styles.degreeButton];
    const styleButtonFahrenheit = [styles.degreeButton];
    const styleIconCelsius = [styles.degreeButtonIcon];
    const styleIconFahrenheit = [styles.degreeButtonIcon];

    if (isCelsius) {
      styleButtonCelsius.push(styles.degreeButtonActive);
      styleIconCelsius.push(styles.degreeButtonIconActive);
    } else {
      styleButtonFahrenheit.push(styles.degreeButtonActive);
      styleIconFahrenheit.push(styles.degreeButtonIconActive);
    }

    return (
      <View style={[sg.aICenter]}>
        <View style={styles.degreeBl}>
          <TouchableOpacity
            onPress={() => this.onDegreeChange()}
            style={styleButtonCelsius}
          >
            <Image
              source={Celsius}
              style={styleIconCelsius}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onDegreeChange(false)}
            style={styleButtonFahrenheit}
          >
            <Image
              source={Fahrenheit}
              style={styleIconFahrenheit}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderSwipeData() {
    const { data, isCelsius } = this.state;
    const dataLength = data.length;

    if (dataLength < 1) {
      return null;
    }

    const item = (dataLength >= 2) ? data[1] : data[0];

    return <WeatherItem item={item} isModal isCelsius={isCelsius} />;
  }

  renderItem = ({ item }: { [key: string]: any}) => {
    const { isCelsius } = this.state;

    return <WeatherItem item={item} isCelsius={isCelsius} />;
  };

  renderActivityIndicator() {
    const { isLoading } = this.state;

    if (!isLoading) {
      return null;
    }

    return (
      <View style={[sg.flexJCCenter]}>
        <ActivityIndicator size="large" color={cls.blue} />
      </View>
    );
  }

  renderWeather() {
    const { data, isLoading } = this.state;

    if (isLoading) {
      return null;
    }

    return (
      <WeatherLocation
        renderSwipeData={() => this.renderSwipeData()}
        renderSwipeFooter={() => this.renderSwipeFooter()}
      >
        <ScrollView style={[sg.flex, sg.mT30, sg.pB100]}>
          <Text style={[sg.aSCenter, sg.mB30]}>Weather</Text>
          <FlatList
            keyExtractor={({ country_code }: { [key: string]: any}) => country_code}
            data={data}
            bounces={false}
            horizontal
            renderItem={this.renderItem}
            snapToAlignment="start"
            snapToInterval={itemWidth + 10}
            decelerationRate="fast"
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={1}
          />
        </ScrollView>
      </WeatherLocation>
    );
  }

  render() {

    return (
      <View style={[sg.flex]}>
        {this.renderActivityIndicator()}
        {this.renderWeather()}
      </View>
    );
  }
}

export default Weather;
