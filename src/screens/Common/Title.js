import React from 'react';
import MyText from '../../reusables/components/Texts/MyText';
import { borderStyles } from '../../reusables/styles/style';
import { textStyles } from '../../reusables/styles/textStyles';

const Title = ({ title, textStyle }) => (
  <MyText style={[textStyles.header, borderStyles.bw_0, textStyle]}>
    {title}
  </MyText>
);

export default Title;
