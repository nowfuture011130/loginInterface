import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import CustomButton from '../customButton/customButton';
import {Amplify, Auth, Hub} from 'aws-amplify';
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
import awsConfig from '../../aws-exports';
Amplify.configure(awsConfig);

const socialSignInButtons = () => {
  const signInWithFacebook = () => {
    console.log('signInWithFacebook');
  };
  const signInWithApple = () => {
    console.log('signInWithApple');
  };

  const signInWithGoogle = async () => {
    try {
      Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Google,
      }).then(user => console.log('user data: ' + user));
    } catch (e: any) {
      console.log(e);
    }

    console.log('signInWithGoogle');
  };
  return (
    <>
      <CustomButton
        onPress={signInWithFacebook}
        text="Sign In with Facebook"
        type="Custom"
        bgColor="#e7eaf4"
        fgColor="#4765a9"
      />
      <CustomButton
        onPress={signInWithGoogle}
        text="Sign In with Google"
        type="Custom"
        bgColor="#fae9ea"
        fgColor="#dd4d44"
      />
      <CustomButton
        onPress={signInWithApple}
        text="Sign In with Apple"
        type="Custom"
        bgColor="#e3e3e3"
        fgColor="#363636"
      />
    </>
  );
};

export default socialSignInButtons;
