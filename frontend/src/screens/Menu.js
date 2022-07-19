import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Gravatar} from 'react-native-gravatar';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {colors, fonts} from '../styles';

export default props => {
  const logout = () => {
    delete axios.defaults.headers.common['Authorization'];
    AsyncStorage.removeItem('userData');
    props.navigation.navigate('Auth');
  };

  const gravatarOptions = {
    email: props.email,
    secure: true,
  };

  return (
    <DrawerContentScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Tasks</Text>
        <Gravatar style={styles.avatar} options={gravatarOptions} />
        <View style={styles.userData}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.email}>{props.email}</Text>
        </View>
        <TouchableOpacity onPress={logout}>
          <View style={styles.logoutIcon}>
            <Icon name="sign-out" size={30} color="#800" />
          </View>
        </TouchableOpacity>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  title: {
    color: '#000',
    fontFamily: fonts.mainFont,
    fontSize: 30,
    paddingTop: Platform.OS === 'ios' ? 70 : 10,
    padding: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderColor: '#000',
    borderWidth: 3,
    borderRadius: 30,
    margin: 10,
  },
  userData: {
    marginLeft: 10,
  },
  name: {
    fontFamily: fonts.mainFont,
    fontSize: 20,
    color: colors.mainText,
    marginBottom: 5,
  },
  email: {
    fontFamily: fonts.mainFont,
    fontSize: 15,
    color: colors.subText,
  },
  logoutIcon: {
    marginLeft: 10,
    marginVertical: 10,
  },
});
