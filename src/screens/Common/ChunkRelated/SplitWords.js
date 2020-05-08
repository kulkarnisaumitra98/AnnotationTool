import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';

const isWeb = Platform.OS === 'web';

const SplitWords = ({ processedWords, handlePressWord }) => (
  // useRenderCount();
  <>
    {processedWords.map((item, index) => (
      <Text
        key={index}
        style={[
				  { backgroundColor: item.color },
				  styles.text,
        ]}
        onPress={
					item.color
					  ? () => {}
					  : () => handlePressWord(item.word, item.offset, index)
				}
      >
        {item.word}
      </Text>
    ))}
  </>
);
const styles = StyleSheet.create({
  text: {
    fontSize: isWeb ? 24 : 20,
    marginRight: 8,
  },
});

export default SplitWords;
