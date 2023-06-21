import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import Logo from '../../../assets/images/favicon.png';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import SocialSignInButtons from '../../components/socialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/paramList';
import {Auth} from 'aws-amplify';
import {API} from 'aws-amplify';
import {useForm} from 'react-hook-form';
import {UsernamePasswordOpts} from '@aws-amplify/auth/lib-esm/types';
type ScreenProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

function SignInScreen(): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [loading, setLoading] = useState(false);

  const {height} = useWindowDimensions();
  const navigation = useNavigation<ScreenProp>();
  const signInPress = async (data: any) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await Auth.signIn(data.username, data.password);
    } catch (e: any) {
      if (e.message == 'User is not confirmed.') {
        await Auth.resendSignUp(data.username);
        navigation.navigate('ConfrimEmail', data.username);
      } else Alert.alert(e.message);
    }
    setLoading(false);
    // console.log('sign in');
    // navigation.navigate('Home');
  };
  const signUpPress = () => {
    console.log('sign up');
    navigation.navigate('SignUp');
  };
  const forgotPasswordPress = () => {
    console.log('forgot password');
    navigation.navigate('ForgotPassword');
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={(styles.logo, {height: height * 0.21})}
          resizeMode="contain"
        />
        <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{required: 'Username is required'}}
          secureTextEntry={false}
        />
        <CustomInput
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{}}
        />
        <CustomButton
          onPress={handleSubmit(signInPress)}
          text={loading ? 'Loading...' : 'Sign In'}
          type="Blue"
          bgColor=""
          fgColor=""
        />
        <CustomButton
          onPress={forgotPasswordPress}
          text="Forgot Password?"
          type="Gray"
          bgColor=""
          fgColor=""
        />
        <SocialSignInButtons />
        <CustomButton
          onPress={signUpPress}
          text="Don't have an account? Create one"
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
    flex: 1,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
