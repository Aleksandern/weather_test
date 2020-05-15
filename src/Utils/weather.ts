
import storm4 from 'src/Assets/004-storm.png';
import storm5 from 'src/Assets/005-storm.png';
import windy8 from 'src/Assets/008-windy.png';
import windy9 from 'src/Assets/009-windy.png';
import windy12 from 'src/Assets/012-windy.png';
import clouds21 from 'src/Assets/021-clouds.png';
import hail24 from 'src/Assets/024-hail.png';
import rain25 from 'src/Assets/025-rain.png';
import sun26 from 'src/Assets/026-sun.png';
import moon27 from 'src/Assets/027-moon.png';
import cloudy28 from 'src/Assets/028-cloudy.png';

import deviceUtils from 'src/Utils/device';

type Weather = {
  icon: string,
  code: number,
  description: string,
};

export default {
  ITEM_WIDH: deviceUtils.screenWidth() - 40,

  getIcon({ code }: Weather) {
    let res;

    switch (code) {
      case 200:
      case 201:
      case 202:
        res = storm5;
        break;
      case 230:
      case 231:
      case 232:
      case 233:
        res = storm4;
        break;
      case 300:
      case 301:
      case 302:
        res = hail24;
        break;
      case 500:
      case 501:
      case 502:
      case 511:
      case 520:
      case 521:
      case 522:
        res = rain25;
        break;
      case 600:
      case 601:
      case 602:
      case 610:
      case 621:
      case 622:
      case 623:
        res = windy9;
        break;
      case 611:
      case 612:
        res = windy8;
        break;
      case 700:
      case 711:
      case 721:
      case 731:
      case 741:
      case 751:
        res = windy12;
        break;
      case 800:
      case 801:
        res = sun26;
        break;
      case 802:
      case 803:
        res = cloudy28;
        break;
      case 804:
        res = clouds21;
        break;
      case 900:
        res = moon27;
        break;
      default:
        break;
    }

    return res;
  },
  formatTemp(tempInp: number, isCelsius: boolean) {
    let temp = tempInp;

    if (!isCelsius) {
      // convert to fahrenheit
      // eslint-disable-next-line no-mixed-operators
      temp = Math.round(tempInp * 9 / 5 + 32);
    }

    return `${temp}\xB0`;
  },
};
