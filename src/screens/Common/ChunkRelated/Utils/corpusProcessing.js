/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
import React from 'react';
import { Text } from 'react-native';
import { BagError, BagSuccess } from '../../../../reusables/styles/colors';

export const getListItemCorpus = (textStyle, fields, completed) => {
  let index = 0;
  let {
    corpus,
    pronoun_off_start,
  } = fields;

  if (Array.isArray(corpus)) {
    pronoun_off_start = corpus[1];
    corpus = corpus[0];
  }

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

      if (index === correct_noun_off_start) {
        index += item.length + 1;

        return (
          <Text
            key={index}
            style={[textStyle, { backgroundColor: BagSuccess }]}
          >
            {item}
          </Text>
        );
      }
      if (index === mislead_noun_off_start) {
        index += item.length + 1;

        return (
          <Text
            key={index}
            style={[textStyle, { backgroundColor: BagError }]}
          >
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


export const getSelectedCorpus = (textStyle, fields, setWord, words, completed) => {
  let index = 0;
  let { corpus, pronoun_off_start } = fields;

  if (completed) {
    pronoun_off_start = corpus[1];
    corpus = corpus[0];
  }

  const texts = corpus.split(' ').map((item, i) => {
    if (index === pronoun_off_start) {
      index += item.length + 1;

      return (
        <Text key={i}>
          <Text style={[{ backgroundColor: 'yellow' }, textStyle]}>{item}</Text>
        </Text>
      );
    }

    if (words) {
      const wordKeys = Object.keys(words);
      for (let j = 0; j < wordKeys.length; j += 1) {
        if (words[wordKeys[j]].index === i) {
          index += item.length + 1;

          return (
            <Text key={index} style={[textStyle, { backgroundColor: words[wordKeys[j]].color }]}>
              {item}

            </Text>
          );
        }
      }
    }

    index += item.length + 1;

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
