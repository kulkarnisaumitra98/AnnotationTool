import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import RowContainer from '../../reusables/components/Containers/RowContainer';
import { dimensionStyles } from '../../reusables/styles/style';
import Title from '../Common/Title';

const Nav = ({ setCorporaToggle }) => (
  <RowContainer contStyle={dimensionStyles.w_100}>
    <TouchableOpacity onPress={() => setCorporaToggle(false)}>
      <Title title="Chunks" />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setCorporaToggle(true)}>
      <Text>Completed Chunks</Text>
    </TouchableOpacity>
  </RowContainer>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default Nav;
