/* eslint-disable no-nested-ternary */
import React from 'react';
import TextAlert from '../../../reusables/components/Texts/AlertText';
import UnderlinedLinkText from '../../../reusables/components/Texts/UnderlinedLinkText';

const EndComponent = ({
  end,
  isData,
  handlePress,
}) => (!end ? (
  isData ? (
    <UnderlinedLinkText
      text="Load More Chunks"
      handlePress={handlePress}
    />
  ) : (
    <TextAlert text="No annotations, Get to work!!!" type="error" />
  )
) : null);

export default EndComponent;
