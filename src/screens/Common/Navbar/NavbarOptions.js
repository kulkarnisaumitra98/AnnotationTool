import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenContext from '../../../contexts/ScreenContext';
import UserContext from '../../../contexts/UserContext';
import RowContainer from '../../../reusables/components/Containers/RowContainer';
import SelectHighlight from '../../../reusables/components/HOCs/SelectHighlight';
import MyText from '../../../reusables/components/Texts/MyText';
import { BLUE_BUTTON, WHITE } from '../../../reusables/styles/colors';
import { textStyles } from '../../../reusables/styles/textStyles';
import NavButton from './NavButton';

const NavbarOptions = ({
  selected,
  renderComponents,
}) => {
  const { setScreen } = useContext(ScreenContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setScreen(selected);
    // console.log(selected);
  }, [selected]);

  return (
    <View style={styles.container}>
      <MyText style={[textStyles.header, styles.header]}>
        {user ? `Welcome, ${user.name}` : 'Loading...'}
      </MyText>
      <RowContainer>
        {renderComponents(NavButton)}
      </RowContainer>
    </View>
  );
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
