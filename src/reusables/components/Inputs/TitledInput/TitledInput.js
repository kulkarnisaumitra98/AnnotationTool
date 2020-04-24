import React, { useContext, useRef } from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import KeyboardViewContext from '../../../../contexts/KeyboardViewContext';
import { SUCCESS_TEXT } from '../../../styles/colors';
import { dimensionStyles } from '../../../styles/style';
import MyText from '../../Texts/MyText';


const RED = 'red';

const TitledInput = ({
  containerStyle,
  titleStyle,
  textInputStyle,
  config,
  title,
  err,

  mode,
}) => {
  const ipRef = useRef(null);
  const responsive = dimensionStyles.dw.width <= 400;

  let context;

  if (responsive) { context = useContext(KeyboardViewContext); }

  return (
    <View style={[styles.container, containerStyle]}>
      {title ? <Text style={[styles.title, titleStyle]}>{title}</Text> : null}
      <TextInput
        ref={ipRef}
        style={[
				  styles.inputContainer,
				  textInputStyle,
				  config.value ? { borderColor: err ? RED : SUCCESS_TEXT } : null,
        ]}
        {...config}
        onFocus={() => { if (context) context.toggleMode(mode, ipRef); }}
      />
      {err && config.value ? (
        <MyText style={[styles.alert, { color: RED }]} text={err}>
          {err}
        </MyText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 16,
    borderWidth: 0,
    marginBottom: 8,
  },

  inputContainer: {
    borderRadius: 4,
    width: '100%',
    textAlignVertical: 'center',
    padding: Platform.OS === 'web' ? 12 : 4,
    paddingLeft: Platform.OS === 'web' ? 12 : 8,
    fontSize: Platform.OS === 'web' ? 14 : 12,
    borderColor: '#888',
    borderWidth: 0.5,
    backgroundColor: '#f0f0f0',
  },

  title: {
    fontSize: 12,
    fontFamily: 'sans-serif',
    color: '#2b2d38',
    marginBottom: 8,
  },

  alert: {
    marginTop: 2,
    fontSize: 11.5,
    position: 'absolute',
    bottom: 0,
  },

  alertText: {
    fontSize: 11.5,
  },
});

export default TitledInput;
