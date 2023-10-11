/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Avatar} from 'react-native-paper';
import GlobalStyles from '../../styles/Style';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export function ProfileScreen({props}: any) {
  const [hasAvatar, setHasAvatar] = React.useState(props);
  return (
    <SafeAreaView>
      {hasAvatar ? (
        // No token found, user isn't signed in
        <Avatar.Image
          size={128}
          style={[GlobalStyles.center]}
          source={require('../../assets/images/avatar.webp')}
        />
      ) : (
        // User is signed in
        <Avatar.Image
          size={128}
          style={[GlobalStyles.center]}
          source={require('../../assets/images/defaultAvatar.webp')}
        />
      )}
    </SafeAreaView>
  );
}

export default ProfileScreen;
