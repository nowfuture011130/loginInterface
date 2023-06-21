import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import {RootStackParamList} from '../../navigation/paramList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
type ScreenProp = NativeStackNavigationProp<RootStackParamList, 'NewPassword'>;
function NewPasswordScreen({route}: any): JSX.Element {
  const navigation = useNavigation<ScreenProp>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues: {username: route.params}});
  const SubmitPress = async (data: any) => {
    try {
      await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
      navigation.navigate('SignIn');
    } catch (e: any) {
      Alert.alert(e.message);
    }
  };
  const BackToSignInPress = () => {
    console.log('BackToSignInPress');
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <View style={styles.LayCenter}>
          <Text style={styles.title}>Reset your password</Text>
        </View>
        <Text style={styles.text}>Code</Text>
        <View style={styles.LayCenter}>
          <CustomInput
            name="username"
            control={control}
            placeholder="Enter your username"
            rules={{required: 'Username is required'}}
          />
          <CustomInput
            name="code"
            control={control}
            placeholder="Enter your confirmation code"
            rules={{}}
          />
        </View>
        <Text style={styles.text}>New Password</Text>
        <View style={styles.LayCenter}>
          <CustomInput
            name="password"
            control={control}
            placeholder="Password"
            secureTextEntry
            rules={{
              required: 'Password is required',
              minLength: {
                value: 7,
                message: 'Password should be at least 7 characters long',
              },
            }}
          />
          <CustomButton
            onPress={handleSubmit(SubmitPress)}
            text="Submit"
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

export default NewPasswordScreen;
