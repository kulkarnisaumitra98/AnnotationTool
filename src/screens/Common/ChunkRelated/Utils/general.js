import { BLUE_BUTTON, TEXT_BLACK } from '../../../../reusables/styles/colors';

export const operationToWord = (operation) => {
  switch (operation) {
    case 0:
      return 'A';
    case 1:
      return 'B';
    default:
      return 'C';
  }
};

export const getNextOperation = (data) => {
  let index = 0;
  const taskArr = Object.keys(data);
  for (let i = 0; i < taskArr.length - 1; i += 1) {
    if (data[taskArr[i]].value !== 'None') index += 1;
    else {
      return index;
    }
  }

  return data.gender ? index + 1 : index;
};


export const getOperationName = (operation) => {
  switch (operation) {
    case 0:
      return 'Select Correct Noun';
    case 1:
      return 'Select Misleading Noun';
    case 2:
      return 'Select Gender';
    default:
      return 'Error';
  }
};

export const getOperationColor = (operation) => {
  switch (operation) {
    case 0:
      return 'green';
    case 1:
      return 'red';
    case 2:
      return BLUE_BUTTON;
    case 3:
      return 'green';
    default:
      return TEXT_BLACK;
  }
};
