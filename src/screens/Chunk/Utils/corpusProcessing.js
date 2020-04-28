/* eslint-disable camelcase */
import React from 'react';
import { Text } from 'react-native';


export const getListItemCorpus = (textStyle, fields) => {
  let index = 0;
  const { corpus, pronoun_off_start } = fields;

  const texts = corpus.split(' ').map((item, i) => {
    if (index === pronoun_off_start) {
      index += item.length + 1;

      return (
        <Text key={i}>
          <Text style={[{ backgroundColor: 'yellow' }, textStyle]}>{item}</Text>
          {' '}
        </Text>
      );
    }

    index += item.length + 1;

    return (
      <Text key={index} style={textStyle}>
        {item}
        {' '}
      </Text>
    );
  });

  return texts;
};


export const getSelectedCorpus = (textStyle, fields, setWord) => {
  let index = 0;
  const { corpus, pronoun_off_start } = fields;

  const texts = corpus.split(' ').map((item, i) => {
    if (index === pronoun_off_start) {
      index += item.length + 1;

      return (
        <Text key={i}>
          <Text style={[{ backgroundColor: 'yellow' }, textStyle]}>{item}</Text>
          {' '}
        </Text>
      );
    }

    index += item.length + 1;

    return (
      <Text
        onPress={setWord(item, `${index - item.length - 1}, ${index}`, i)}
        key={index}
        style={textStyle}
      >
        {item}
        {' '}
      </Text>
    );
  });

  return texts;
};


export const highlightWord = (
  chunk,
  value,
  offset,
  index,
  color,
  op,
) => {
  // update the handle press method of all other mini chunks
  const updatedChunk = [...chunk];
  updatedChunk[index] = (
    <Text key={index}>
      <Text style={{ fontSize: 24, backgroundColor: color }}>
        {value}
      </Text>
      {' '}
    </Text>
  );
  console.log(op, 'oppppp');

  return updatedChunk;
};
