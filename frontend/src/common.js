import {Alert, Platform} from 'react-native';
// import dotenv from 'dotenv';
// import {server_ip, server_port, env} from 'dotenv'
// const server =
//   Platform.OS === 'ios' ? 'http://localhost:8888' : 'http://10.0.2.2:8888';
const server = 'http://192.168.2.10:8888';
// const server = {process.env.server_ip} + ':' + {process.env.server_port};

const showError = error => {
  if (error.response && error.response.data) {
    // Alert.alert('Oops... There was a problem!', error.response.data);
    console.log(error.response.data);
  } else {
    // Alert.alert('Oops... There was a problem!', error);
    console.log(error.response.data);
  }
};

const showSuccess = message => {
  Alert.alert('Success!', message);
};

export {server, showError, showSuccess};
