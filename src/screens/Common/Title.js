import React from 'react';
import MyText from '../../reusables/components/Texts/MyText';
import { borderStyles } from '../../reusables/styles/style';
import { textStyles } from '../../reusables/styles/textStyles';

const Title = ({ title }) => (
  <MyText style={[textStyles.header, borderStyles.bw_0]}>
    {title}
  </MyText>
);

export default Title;
