import React, { Component } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import {
  LongPressGestureHandler,
  ScrollView,
  State,
  TapGestureHandler,
  createTag,
} from 'react-native-gesture-handler';

import { LoremIpsum } from '../common';

export class PressBox extends Component {
  _onHandlerStateChange = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      Alert.alert("I'm being pressed for so long");
    }
  };
  _onSingleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      Alert.alert("I'm touched");
    }
  };
  _onDoubleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      Alert.alert('Dable tap, good job!');
    }
  };
  render() {
    const doubleTap = createTag();
    return (
      <LongPressGestureHandler
        onHandlerStateChange={this._onHandlerStateChange}
        minDurationMs={800}>
        <TapGestureHandler
          onHandlerStateChange={this._onSingleTap}
          waitFor={doubleTap}>
          <TapGestureHandler
            maxDurationMs={1000}
            minPointers={2}
            id={doubleTap}
            onHandlerStateChange={this._onDoubleTap}
            numberOfTaps={2}>
            <View style={styles.box} />
          </TapGestureHandler>
        </TapGestureHandler>
      </LongPressGestureHandler>
    );
  }
}

export default class Example extends Component {
  render() {
    return (
      <ScrollView
        waitFor={['image_pinch', 'image_rotation', 'image_tilt']}
        style={styles.scrollView}>
        <LoremIpsum words={40} />
        <PressBox />
        <LoremIpsum />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  box: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    backgroundColor: 'plum',
    margin: 10,
    zIndex: 200,
  },
});
