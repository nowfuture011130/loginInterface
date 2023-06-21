import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
type customProps = {
  text: string;
  onPress: any;
  type: string;
  bgColor: string;
  fgColor: string;
};
function customButton({
  onPress,
  text,
  type,
  bgColor,
  fgColor,
}: customProps): JSX.Element {
  if (type == 'Blue') {
    return (
      <Pressable
        onPress={onPress}
        style={[
          styles.container,
          styles.container_Blue,
          bgColor != '' ? {backgroundColor: bgColor} : {},
        ]}>
        <Text
          style={[
            styles.input,
            styles.input_Blue,
            fgColor != '' ? {color: fgColor} : {},
          ]}>
          {text}
        </Text>
      </Pressable>
    );
  } else if (type == 'Gray') {
    return (
      <Pressable
        onPress={onPress}
        style={[
          styles.container,
          styles.container_Gray,
          bgColor != '' ? {backgroundColor: bgColor} : {},
        ]}>
        <Text
          style={[
            styles.input,
            styles.input_Gray,
            fgColor != '' ? {color: fgColor} : {},
          ]}>
          {text}
        </Text>
      </Pressable>
    );
  } else if (type == 'White') {
    return (
      <Pressable
        onPress={onPress}
        style={[
          styles.container,
          styles.container_White,
          bgColor != '' ? {backgroundColor: bgColor} : {},
        ]}>
        <Text
          style={[
            styles.input,
            styles.input_White,
            fgColor != '' ? {color: fgColor} : {},
          ]}>
          {text}
        </Text>
      </Pressable>
    );
  } else {
    return (
      <Pressable
        onPress={onPress}
        style={[styles.container, {backgroundColor: bgColor}]}>
        <Text style={[styles.input, {color: fgColor}]}>{text}</Text>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  container_Blue: {
    backgroundColor: '#3b71f3',
  },
  container_Gray: {},
  container_White: {
    borderColor: '#3b71f3',
    borderWidth: 2,
  },
  input: {fontWeight: 'bold'},
  input_Blue: {
    color: 'white',
  },
  input_Gray: {},
  input_White: {color: '#3b71f3'},
});
export default customButton;
