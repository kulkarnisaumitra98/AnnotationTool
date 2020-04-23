export const getInputFieldConfig = (placeholder, rest) => ({
  value: '',
  err: '',
  config: { placeholder, placeholderTextColor: '#888', ...rest },
});

export const getFields = (config) => {
  const fields = {
    name: getInputFieldConfig('Username', { autoFocus: true, ...config }),
    username: getInputFieldConfig('Password', config),
  };

  return fields;
};

export const validate = (field, value) => '';
