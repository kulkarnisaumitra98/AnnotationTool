/* eslint-disable camelcase */
import React from 'react';
import { Text } from 'react-native';


export const getListItemCorpus = (textStyle, fields, completed) => {
  let index = 0;
  const {
    corpus,
    pronoun_off_start,
  } = fields;

  const texts = corpus.split(' ').map((item, i) => {
    if (index === pronoun_off_start) {
      index += item.length + 1;

      return (
        <Text key={i}>
          <Text style={[{ backgroundColor: 'yellow' }, textStyle]}>{item}</Text>
        </Text>
      );
    }

    if (completed) {
      const { correct_noun_off_start, mislead_noun_off_start } = fields;

      index += item.length + 1;

      if (index === correct_noun_off_start) {
        return (
          <Text key={index} style={textStyle}>
            {item}
          </Text>
        );
      }
      if (index === mislead_noun_off_start) {
        return (
          <Text key={index} style={textStyle}>
            {item}
          </Text>
        );
      }

      return (
        <Text key={index} style={textStyle}>
          {item}
        </Text>
      );
    }

    index += item.length + 1;

    return (
      <Text key={index} style={textStyle}>
        {item}
      </Text>
    );
  });

  return texts;
};


export const getSelectedCorpus = (textStyle, fields, setWord, words) => {
  let index = 0;
  const { corpus, pronoun_off_start } = fields;

  const texts = corpus.split(' ').map((item, i) => {
    if (index === pronoun_off_start) {
      index += item.length + 1;

      return (
        <Text key={i}>
          <Text style={[{ backgroundColor: 'yellow' }, textStyle]}>{item}</Text>
        </Text>
      );
    }

    index += item.length + 1;

    if (words) {
      const wordKeys = Object.keys(words);
      for (let j = 0; j < wordKeys.length; j += 1) {
        if (words[wordKeys[j]].index === i) {
          return (
            <Text key={index} style={[textStyle, { backgroundColor: words[wordKeys[j]].color }]}>
              {item}

            </Text>
          );
        }
      }
    }

    return (
      <Text
        onPress={setWord(item, `${index - item.length - 1}, ${index - 1}`, i)}
        key={index}
        style={textStyle}
      >
        {item}
      </Text>
    );
  });

  return texts;
};
