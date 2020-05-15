/* eslint-disable import/prefer-default-export */

import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
} from 'react-native';

type Style = ViewStyle | TextStyle | ImageStyle;

type NamedStyles<T> = {
  [P in keyof T]: Style;
};

export function createStyle<T extends NamedStyles<T>>(styles: NamedStyles<T>) {
  return StyleSheet.create(styles);
}
