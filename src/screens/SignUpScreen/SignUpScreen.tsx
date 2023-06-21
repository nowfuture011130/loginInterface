import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import SocialSignInButtons from '../../components/socialSignInButtons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/paramList';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
type ScreenProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
function SignUpScreen(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation<ScreenProp>();
  const RegisterPress = async (data: any) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const {username, password, email, name} = data;
      const responcd = await Auth.signUp({
        username,
        password,
        attributes: {email, name},
      });
      navigation.navigate('ConfrimEmail', username);
    } catch (e: any) {
      if (
        e.message ==
        'PreSignUp failed with error Email already exists in user pool.'
      ) {
        Alert.alert('Email has been registered');
      } else {
        Alert.alert(e.message);
      }
    }
    setLoading(false);
  };
  const signInPress = () => {
    console.log('sign in');
    navigation.navigate('SignIn');
  };
  const TermsofUsePress = () => {
    console.log('TermsofUsePress');
  };
  const PrivacyPolicyPress = () => {
    console.log('PrivacyPolicyPress');
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create Account</Text>
        <CustomInput
          name="name"
          control={control}
          placeholder="name"
          rules={{
            required: 'name is required',
          }}
        />
        <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Username should be max 24 characters long',
            },
          }}
        />
        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
        />
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
        <CustomInput
          name="password-repeat"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            validate: (value: any) => value === pwd || 'Password do not match',
          }}
        />
        <CustomButton
          onPress={handleSubmit(RegisterPress)}
          text={loading ? 'Loading...' : 'Register'}
          type="Blue"
          bgColor=""
          fgColor=""
        />
        <Text style={styles.text}>
          By registering, you confirm that you accept our
          <Text style={styles.link} onPress={TermsofUsePress}>
            {' '}
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={PrivacyPolicyPress}>
            Privacy Policy
          </Text>
        </Text>
        <SocialSignInButtons />
        <CustomButton
          onPress={signInPress}
          text="Have an account? Sign in"
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051c60',
    margin: 10,
  },
  text: {color: 'gray', marginVertical: 10},
  link: {color: '#fdb075'},
});

export default SignUpScreen;
