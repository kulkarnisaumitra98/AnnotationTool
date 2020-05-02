import React, { useContext, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenContext from '../../../contexts/ScreenContext';
import RowContainer from '../../../reusables/components/Containers/RowContainer';
import SelectHighlight from '../../../reusables/components/HOCs/SelectHighlight';
import MyText from '../../../reusables/components/Texts/MyText';
import { BLUE_BUTTON, WHITE } from '../../../reusables/styles/colors';
import { textStyles } from '../../../reusables/styles/textStyles';
import NavButton from './NavButton';

const NavbarOptions = ({
  selected,
  renderComponents,
  handlePress,
}) => {
  const ref = useRef(0);
  const { setScreen, screen } = useContext(ScreenContext);
  useEffect(() => {
    setScreen(selected);
  }, [selected]);
  useEffect(() => {
    console.log(selected, screen);
    if (ref.current) { handlePress(screen); }
    ref.current = 1;
  }, [screen]);
  return selected ? (
    <View style={styles.container}>
      <MyText style={[textStyles.header, styles.header]}>Annotation Tool</MyText>
      <RowContainer contStyle={{ flexDirection: 'row-reverse' }}>{renderComponents(NavButton)}</RowContainer>
    </View>
  ) : null;
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: BLUE_BUTTON,
    alignItems: 'center',
    padding: 8,
  },

  header: {
    marginRight: 'auto',
    color: WHITE,
    paddingLeft: 16,
  },
});

export default SelectHighlight(NavbarOptions);
