import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default class AuthOrApp extends Component {
  componentDidMount = async () => {
    const userDataJSON = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(userDataJSON);

    if (userData && userData.token) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `bearer ${userData.token}`;
      this.props.navigation.navigate('TaskList', userData);
    } else {
      this.props.navigation.navigate('Auth');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
