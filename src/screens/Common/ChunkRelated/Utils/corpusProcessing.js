/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
import { getOperationBgColor } from './general';


export const processCorpusWords = (fields, wordData, completed) => {
  // console.log(fields);
  let index = 0;
  let { corpus, pronoun_off_start } = fields;

  if (completed) {
    pronoun_off_start = corpus[1];
    corpus = corpus[0];
  }


  const processedWords = corpus.split(' ').map((item, idx) => {
    if (index === pronoun_off_start) {
      const returnItem = { word: item, offset: index, color: 'yellow' };
      index += item.length + 1;
      return returnItem;
    }

    if (wordData) {
      for (let j = 0; j < wordData.length; j += 1) {
        if (wordData[j].index === idx) {
          const returnItem = {
            word: item,
            offset: index,
            color: getOperationBgColor(wordData[j].op),
          };
          index += item.length + 1;
          return returnItem;
        }
      }
    }

    const returnItem = { word: item, offset: index };
    index += item.length + 1;
    return returnItem;
  });

  return processedWords;
};
