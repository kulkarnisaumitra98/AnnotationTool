export const getInitialWord = (color) => ({
  value: 'None', offset: 'None', index: null, color,
});

export const getWordData = (value, offset, index, color) => ({
  value,
  offset,
  index,
  color,
});
