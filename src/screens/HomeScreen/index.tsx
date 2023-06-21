import {View, Text} from 'react-native';
import React from 'react';
import {Auth} from 'aws-amplify';
const HomeScreen = () => {
  const signOut = () => {
    Auth.signOut();
  };
  return (
    <View style={{flex: 1}}>
      <Text>HomeScreen</Text>
      <Text
        onPress={signOut}
        style={{
          fontSize: 40,
          color: 'red',
          textAlign: 'center',
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute', //Here is the trick
          bottom: 20,
        }}>
        Sign out
      </Text>
    </View>
  );
};

export default HomeScreen;
