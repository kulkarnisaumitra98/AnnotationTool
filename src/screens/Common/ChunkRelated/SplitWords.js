import React from 'react';
import { Text } from 'react-native';
import useRenderCount from '../useRenderCount';

const SplitWords = ({ processedWords, handlePressWord }) => {
  useRenderCount();
  return (
    <>
      {processedWords.map((item, index) => (
        <Text
          key={index}
          style={[
				  { fontSize: 24, marginRight: 8 },
				  { backgroundColor: item.color },
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
};

export default SplitWords;
