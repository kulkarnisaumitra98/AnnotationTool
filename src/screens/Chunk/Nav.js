import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import RowContainer from '../../reusables/components/Containers/RowContainer';
import { dimensionStyles } from '../../reusables/styles/style';
import Title from '../Common/Title';

const Nav = ({ completedChunks }) => (
  <RowContainer contStyle={dimensionStyles.w_100}>
    <Title title="Chunks" />
    <TouchableOpacity onPress={completedChunks}>
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
