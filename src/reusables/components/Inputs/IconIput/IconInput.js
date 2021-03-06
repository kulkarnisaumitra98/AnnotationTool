import React from 'react';
import {
  Image, View, StyleSheet, TextInput, Text,
} from 'react-native';
import { getSquare } from '../../../styles/style';

const iconWidth = 15;

const IconInput = ({
  textInputStyle,
  config,
  title,
  titleStyle,
  containerStyle,

  iconSize,
  iconSource,
  iconStyle,
  iconContStyle,

  iconRightSource,
  iconRightStyle,
  iconRightContStyle,
}) => (
  <View style={[styles.container, containerStyle]}>
    {title ? <Text style={[styles.title, titleStyle]}>{title}</Text> : null}
    <View style={styles.searchBox}>
      {iconSource ? (
        <View style={[styles.iconCont, iconContStyle]}>
          <Image
            style={[styles.icon, iconStyle, getSquare(iconSize)]}
            resizeMode="contain"
            source={iconSource}
          />
        </View>
      ) : null}
      <TextInput style={[styles.inputContainer, textInputStyle]} {...config} />
      {iconRightSource ? (
        <View style={[styles.iconCont, iconRightContStyle]}>
          <Image
            style={[styles.icon, iconRightStyle, getSquare(iconSize)]}
            resizeMode="contain"
            source={iconRightSource}
          />
        </View>
      ) : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 16,
    position: 'relative',
  },

  searchBox: {
    width: '100%',
    position: 'relative',
    flexDirection: 'row',
    elevation: 2,
    padding: 2,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,

    borderRadius: 4,

    backgroundColor: '#fff',

    borderWidth: 0,
  },

  title: {
    fontSize: 12,
    fontFamily: 'sans-serif',
    color: '#2b2d38',
    marginBottom: 8,
  },

  inputContainer: {
    flex: 1,
    letterSpacing: 0.3,
    textAlignVertical: 'center',
    fontSize: 12,
    borderWidth: 0,
  },

  icon: {
    width: iconWidth,
  },

  iconCont: {
    borderWidth: 0,
    paddingRight: 8,
    paddingLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconInput;
