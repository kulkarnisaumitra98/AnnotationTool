import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TitledInput from '../../reusables/components/Inputs/TitledInput/TitledInput';


const Form = ({
  formConfig,
  validateForm,
}) => {
  const [fields, setValue] = useState(formConfig);

  const handleTextChange = (field, value) => {
    const newFields = { ...fields };
    const newField = {
      config: { ...newFields[field].config },
      value,
      err: validateForm(field, value),
    };

    newFields[field] = newField;

    setValue(newFields);
  };

  return (
    <View style={styles.container}>
      {Object.keys(fields).map((field) => (
        <TitledInput
          key={field}
          config={{
            ...fields[field].config,
            value: fields[field].value,
            onChangeText: (value) => handleTextChange(field, value),
          }}
          err={fields[field].err}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    marginTop: 16,
  },
});

export default Form;
