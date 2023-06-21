import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Amplify} from 'aws-amplify';
import Config from './src/aws-exports';
import Navigation from './src/navigation';

Amplify.configure(Config);
function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'F9FBFC',
  },
});

export default App;
