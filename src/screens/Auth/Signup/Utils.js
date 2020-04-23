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

export const validate = (field, value) => {
  const a = false;
  switch (field) {
    case 'name':
      if (a) return '';
      return 'Username Exist';

    default:
      return true;
  }
};
