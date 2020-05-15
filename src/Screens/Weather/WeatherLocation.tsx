
import React, { Component, ReactElement } from 'react';
import {
  Animated,
  View,
  PanResponder,
  PanResponderInstance,
  Image,
  Text,
  ScrollView,
} from 'react-native';

import deviceUtils from 'src/Utils/device';

import ArrowUp from 'src/Assets/ArrowUp.png';
import ArrowDown from 'src/Assets/ArrowDown.png';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

interface PropTypes {
  renderSwipeData(): ReactElement | null,
  renderSwipeFooter(): ReactElement | null,
}

interface StateTypes {
  bounceValue: Animated.Value,
  topContainerValue: Animated.Value,
  childrenValue: Animated.Value,
  isOpened: boolean,
}

const screenHeight = deviceUtils.screenHeight();
const screenWidth = deviceUtils.screenWidth();
const topContainerMax = 90;
const topContainerMin = screenHeight - 50;
const heightTopMax = 0;
const heightTopMin = -230;
const heightSwipeData = screenHeight - 260;

class WeatherLocation extends Component <PropTypes, StateTypes> {
  private PanResponder!: PanResponderInstance;

  constructor(props: PropTypes) {
    super(props);

    this.state = {
      bounceValue: new Animated.Value(topContainerMin),
      topContainerValue: new Animated.Value(heightTopMin),
      childrenValue: new Animated.Value(1),
      isOpened: false,
    };

    this.buildPanResponder();
  }

  toggleAnimation(open: boolean = true) {
    const { bounceValue, topContainerValue, childrenValue } = this.state;
    let childrenVal = 1;
    let childrenDur = 500;
    let heightSwipe = topContainerMin;
    let heightTop = heightTopMin;

    if (open) {
      childrenVal = 0;
      childrenDur = 100;
      heightSwipe = topContainerMax;
      heightTop = heightTopMax;
    }

    this.setState({
      isOpened: open,
    });

    Animated.timing(
      childrenValue,
      {
        toValue: childrenVal,
        duration: childrenDur,
        useNativeDriver: true,
      },
    ).start();

    Animated.parallel([
      Animated.spring(
        topContainerValue,
        {
          toValue: heightTop,
          bounciness: 0,
          useNativeDriver: false,
        },
      ),
      Animated.spring(
        bounceValue,
        {
          toValue: heightSwipe,
          bounciness: 0,
          useNativeDriver: false,
        },
      ),
    ]).start();
  }

  buildPanResponder() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        const x = gestureState.dx;
        const y = gestureState.dy;
        if (
          (Math.abs(x) <= Math.abs(y))
          && y >= 0
        ) {
          this.toggleAnimation(false);
        } else if (y < 0 && (Math.abs(x) < Math.abs(y))) {
          this.toggleAnimation();
        }
      },
    });
  }

  renderTopLine() {
    const { isOpened } = this.state;
    const panHandlers = { ...this.PanResponder.panHandlers };
    const arrowIcon = isOpened ? ArrowDown : ArrowUp;

    return (
      <View
        style={styles.topLineBl}
        {...panHandlers}
      >
        <Image source={arrowIcon} />
      </View>
    );
  }

  renderTopContainer() {
    const { topContainerValue } = this.state;

    return (
      <Animated.View
        style={[
          styles.locationTopContainer,
          { top: topContainerValue },
        ]}
      >
        <Text style={styles.locationTopContainerText}>My location</Text>
        <View
          style={[
            styles.locationTopSubContainer,
            { borderRightWidth: screenWidth },
          ]}
        />
      </Animated.View>
    );
  }

  renderBody() {
    const { children, renderSwipeData, renderSwipeFooter } = this.props;
    const { bounceValue, childrenValue } = this.state;

    return (
      <View style={[sg.flex]}>

        {this.renderTopContainer()}

        <Animated.View
          style={[
            sg.flex,
            sg.pB100,
            { opacity: childrenValue },
          ]}
        >
          {children}
        </Animated.View>

        <Animated.View
          style={[
            styles.locationSwipeContainer,
            { top: bounceValue },
            { height: topContainerMin },
          ]}
        >

          <View style={[sg.jCSpaceBetween]}>
            <View style={styles.locationSwipeDataContainer}>
              {this.renderTopLine()}

              <ScrollView style={{ height: heightSwipeData }}>
                {renderSwipeData()}
              </ScrollView>
            </View>
            <View>
              {renderSwipeFooter()}
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }

  render() {
    const render = this.renderBody();

    return render;
  }
}

export default WeatherLocation;
