/* eslint-disable import/prefer-default-export */
import { Alert, Platform } from 'react-native';

export const sendAlert = (message, title = '', onOk, onCancel) => {
  if (Platform.OS === 'web') {
    alert(message);
    onOk();
  } else {
    Alert.alert(title, message, onOk, onCancel);
  }
};
