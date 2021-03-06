import React from 'react';
import { StyleSheet, View } from 'react-native';
import { dimensionStyles } from '../../styles/style';

const RowContainer = ({
  justifyContent,
  contStyle,
  padding,
  long,
  children,
  config,
}) => (
  <View style={[
    styles.container,
    contStyle,
    padding,
    justifyContent ? { justifyContent } : null,
    long ? dimensionStyles.w_100 : null,
    { ...config },
  ]}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderWidth: 0,
    // alignItems: 'center',
    // marginBottom: 10,
  },
});

export default RowContainer;
