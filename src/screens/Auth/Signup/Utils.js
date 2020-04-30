/* eslint-disable no-case-declarations */
/* eslint-disable no-nested-ternary */
import { axiosPost } from '../../Common/Utils/axiosConfig';
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

export const validate = async (field, value, fields, forcedTyped) => {
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
      // const data = {};
      const response = await axiosPost('username_exist/', {
        username: value,
      });
      newField = {
        value,
        typed: forcedTyped || false,
        err: {
          err: !result || response.data.result,
          value: result
            ? !response.data.result
              ? ''
              : 'Username Exist'
            : 'Invalid Username Not Allowed',
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

    case 'all': {
      // Validate all
      result = /^[A-Z]/i.test(newFields.name.value);
      newField = {
        value: newFields.name.value,
        typed: forcedTyped || false,
        err: {
          err: !result,
          value: result ? '' : 'Invalid Name Not Allowed',
        },
      };

      newFields.name = newField;

      result = isEmpty(newFields.password.value);

      newField = {
        value: newFields.password.value,
        typed: forcedTyped || false,
        err: {
          err: result,
          value: result ? 'Empty Password Not Allowed' : '',
        },
      };

      if (
        newFields.confPassword.value
				&& newFields.confPassword.value !== newFields.password.value
      ) {
        newFields.confPassword.err = {
          err: true,
          value: 'Passwords dont match',
        };
      }

      newFields.password = newField;


      result = /^[A-Z]/i.test(newFields.username.value);
      // const data = {};
      const { data, err, status } = await axiosPost('username_exist/', {
        username: newFields.username.value,
      });

      newField = {
        value,
        typed: forcedTyped || false,
        err: {
          err: !result || data.result,
          value: result
            ? !data.result
              ? ''
              : 'Username Exist'
            : 'Invalid Username Not Allowed',
        },
      };

      newFields.username = newField;

      result = newFields.confPassword.value === newFields.password.value
				&& !isEmpty(newFields.password.value);
      newField = {
        value,
        typed: forcedTyped || false,
        err: {
          err: !result,
          value: result ? 'Passwords Match' : 'Passwords Dont Match',
        },
      };

      newFields.confPassword = newField;

      return newFields;
    }

    default: return newFields;
  }

  newFields[field] = newField;

  return newFields;
};
