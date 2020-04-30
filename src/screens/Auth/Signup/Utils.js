import { isEmpty } from '../../Common/Utils/general';

export const getInputFieldConfig = (placeholder, rest) => ({
  value: '',
  err: '',
  config: { placeholder, placeholderTextColor: '#888', ...rest },
});

export const getFields = (config) => {
  const fields = {
    name: getInputFieldConfig('Name', config),
    username: getInputFieldConfig('Username', config),
    password: getInputFieldConfig('Password', { secureTextEntry: true, ...config }),
    confPassword: getInputFieldConfig('Confirm Password', {
      secureTextEntry: true,
      ...config,
    }),
  };

  return fields;
};

export const validate = (field, value, fields, forcedTyped) => {
  const newFields = { ...fields };
  let newField;
  let result;
  switch (field) {
    case 'name':
      result = /^[A-Z]/i.test(value);
      newField = {
        value,
        typed: forcedTyped || false,
        err: {
          err: !result,
          value: result ? '' : 'Invalid Name Not Allowed',
        },
      };
      break;

    case 'password':
      result = isEmpty(value);

      newField = {
        value,
        typed: forcedTyped || false,
        err: {
          err: result,
          value: result ? 'Empty Password Not Allowed' : '',
        },
      };

      if (
        newFields.confPassword.value
				&& newFields.confPassword.value !== value
      ) {
        newFields.confPassword.err = {
          err: true,
          value: 'Passwords dont match',
        };
      }
      break;

    case 'username':
      result = /^[A-Z]/i.test(value);
      newField = {
        value,
        typed: forcedTyped || false,
        err: {
          err: !result,
          value: result ? '' : 'Invalid Username Not Allowed',
        },
      };
      break;

    case 'confPassword':
      result = value === newFields.password.value && !isEmpty(newFields.password.value);
      newField = {
        value,
        typed: forcedTyped || false,
        err: {
          err: !result,
          value: result ? 'Passwords Match' : 'Passwords Dont Match',
        },
      };

      break;

    default:
      return null;
  }
  newFields[field] = newField;

  return newFields;
};
