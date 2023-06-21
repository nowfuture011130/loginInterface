import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import {RootStackParamList} from '../../navigation/paramList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
type ScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;
function ForgotPasswordScreen(): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const navigation = useNavigation<ScreenProp>();
  const SendPress = async (data: any) => {
    try {
      await Auth.forgotPassword(data.username);
      navigation.navigate('NewPassword', data.username);
    } catch (e: any) {
      Alert.alert(e.message);
    }
  };
  const BackToSignInPress = () => {
    navigation.navigate('SignIn');
    console.log('BackToSignInPress');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <View style={styles.LayCenter}>
          <Text style={styles.title}>Reset your password</Text>
        </View>
        <Text style={styles.text}>Username</Text>
        <View style={styles.LayCenter}>
          <CustomInput
            name="username"
            control={control}
            placeholder="Enter your username"
            rules={{}}
          />
          <CustomButton
            onPress={handleSubmit(SendPress)}
            text="Send"
            type="Blue"
            bgColor=""
            fgColor=""
          />
          <CustomButton
            onPress={BackToSignInPress}
            text="Back to Sign in"
            type="Gray"
            bgColor=""
            fgColor=""
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 40,
  },
  LayCenter: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051c60',
    margin: 30,
  },
  text: {
    color: 'black',
    alignItems: 'flex-start',
    direction: 'rtl',
    fontSize: 18,
  },
  link: {color: '#fdb075'},
});

export default ForgotPasswordScreen;
