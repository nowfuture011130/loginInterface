import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/paramList';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
type ScreenProp = NativeStackNavigationProp<RootStackParamList, 'ConfrimEmail'>;

function ConfirmEmailScreen({navigation, route}: any): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues: {username: route.params}});
  //const navigation = useNavigation<ScreenProp>();
  const ConfirmPress = async (data: any) => {
    try {
      await Auth.confirmSignUp(data.username, data.code);
      navigation.navigate('SignIn');
    } catch (e: any) {
      Alert.alert(e.message);
    }
  };
  const BackToSignInPress = () => {
    console.log('BackToSignInPress');
    navigation.navigate('SignIn');
  };
  const ResendPress = async (data: any) => {
    try {
      await Auth.resendSignUp(data.username);
      Alert.alert('Success', 'Code was resent to your email');
    } catch (e: any) {
      Alert.alert(e.message);
    }
    console.log('Resend');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>
        <CustomInput
          name="username"
          control={control}
          placeholder="Enter your username"
          secureTextEntry={false}
          rules={{}}
        />
        <CustomInput
          name="code"
          control={control}
          placeholder="Enter your confirmation code"
          secureTextEntry
          rules={{}}
        />
        <CustomButton
          onPress={handleSubmit(ConfirmPress)}
          text="Confirm"
          type="Blue"
          bgColor=""
          fgColor=""
        />
        <CustomButton
          onPress={handleSubmit(ResendPress)}
          text="Resend code"
          type="White"
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051c60',
    margin: 30,
  },
  text: {color: 'gray', marginVertical: 10},
  link: {color: '#fdb075'},
});

export default ConfirmEmailScreen;
