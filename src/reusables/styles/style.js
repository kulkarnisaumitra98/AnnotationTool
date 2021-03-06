import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';

export const marginStyles = StyleSheet.create({

  mtsb: { marginTop: StatusBar.currentHeight },

  m_0: { margin: 0 },
  m_2: { margin: 2 },
  m_4: { margin: 4 },
  m_8: { margin: 8 },
  m_12: { margin: 12 },
  m_16: { margin: 16 },
  m_20: { margin: 20 },
  m_24: { margin: 24 },
  m_32: { margin: 32 },
  m_48: { margin: 48 },

  ml_0: { marginLeft: 0 },
  ml_2: { marginLeft: 2 },
  ml_4: { marginLeft: 4 },
  ml_8: { marginLeft: 8 },
  ml_12: { marginLeft: 12 },
  ml_16: { marginLeft: 16 },
  ml_20: { marginLeft: 20 },
  ml_24: { marginLeft: 24 },
  ml_32: { marginLeft: 32 },
  ml_48: { marginLeft: 48 },

  mr_0: { marginRight: 0 },
  mr_2: { marginRight: 2 },
  mr_4: { marginRight: 4 },
  mr_8: { marginRight: 8 },
  mr_12: { marginRight: 12 },
  mr_16: { marginRight: 16 },
  mr_20: { marginRight: 20 },
  mr_24: { marginRight: 24 },
  mr_32: { marginRight: 32 },
  mr_48: { marginRight: 48 },

  mt_0: { marginTop: 0 },
  mt_2: { marginTop: 2 },
  mt_4: { marginTop: 4 },
  mt_8: { marginTop: 8 },
  mt_12: { marginTop: 12 },
  mt_16: { marginTop: 16 },
  mt_20: { marginTop: 20 },
  mt_24: { marginTop: 24 },
  mt_32: { marginTop: 32 },
  mt_48: { marginTop: 48 },

  mb_0: { marginBottom: 0 },
  mb_2: { marginBottom: 2 },
  mb_4: { marginBottom: 4 },
  mb_8: { marginBottom: 8 },
  mb_12: { marginBottom: 12 },
  mb_16: { marginBottom: 16 },
  mb_20: { marginBottom: 20 },
  mb_24: { marginBottom: 24 },
  mb_32: { marginBottom: 32 },
  mb_48: { marginBottom: 48 },

  mtb_0: { marginTop: 0, marginBottom: 0 },
  mtb_2: { marginTop: 2, marginBottom: 2 },
  mtb_4: { marginTop: 4, marginBottom: 4 },
  mtb_8: { marginTop: 8, marginBottom: 8 },
  mtb_12: { marginTop: 12, marginBottom: 12 },
  mtb_16: { marginTop: 16, marginBottom: 16 },
  mtb_20: { marginTop: 20, marginBottom: 20 },
  mtb_24: { marginTop: 24, marginBottom: 24 },
  mtb_32: { marginTop: 32, marginBottom: 32 },
  mtb_48: { marginTop: 48, marginBottom: 48 },

  mlr_0: { marginLeft: 0, marginRight: 0 },
  mlr_2: { marginLeft: 2, marginRight: 2 },
  mlr_4: { marginLeft: 4, marginRight: 4 },
  mlr_8: { marginLeft: 8, marginRight: 8 },
  mlr_12: { marginLeft: 12, marginRight: 12 },
  mlr_16: { marginLeft: 16, marginRight: 16 },
  mlr_20: { marginLeft: 20, marginRight: 20 },
  mlr_24: { marginLeft: 24, marginRight: 24 },
  mlr_32: { marginLeft: 32, marginRight: 32 },
  mlr_48: { marginLeft: 48, marginRight: 48 },
});

export const paddingStyles = StyleSheet.create({
  p_0: { padding: 0 },
  p_2: { padding: 2 },
  p_4: { padding: 4 },
  p_8: { padding: 8 },
  p_12: { padding: 12 },
  p_16: { padding: 16 },
  p_20: { padding: 20 },
  p_24: { padding: 24 },
  p_32: { padding: 32 },
  p_48: { padding: 48 },

  pl_0: { paddingLeft: 0 },
  pl_2: { paddingLeft: 2 },
  pl_4: { paddingLeft: 4 },
  pl_8: { paddingLeft: 8 },
  pl_12: { paddingLeft: 12 },
  pl_16: { paddingLeft: 16 },
  pl_20: { paddingLeft: 20 },
  pl_24: { paddingLeft: 24 },
  pl_32: { paddingLeft: 32 },
  pl_48: { paddingLeft: 48 },

  pr_0: { paddingRight: 0 },
  pr_2: { paddingRight: 2 },
  pr_4: { paddingRight: 4 },
  pr_8: { paddingRight: 8 },
  pr_12: { paddingRight: 12 },
  pr_16: { paddingRight: 16 },
  pr_20: { paddingRight: 20 },
  pr_24: { paddingRight: 24 },
  pr_32: { paddingRight: 32 },
  pr_48: { paddingRight: 48 },

  pt_0: { paddingTop: 0 },
  pt_2: { paddingTop: 2 },
  pt_4: { paddingTop: 4 },
  pt_8: { paddingTop: 8 },
  pt_12: { paddingTop: 12 },
  pt_16: { paddingTop: 16 },
  pt_20: { paddingTop: 20 },
  pt_24: { paddingTop: 24 },
  pt_32: { paddingTop: 32 },
  pt_48: { paddingTop: 48 },

  pb_0: { paddingBottom: 0 },
  pb_2: { paddingBottom: 2 },
  pb_4: { paddingBottom: 4 },
  pb_8: { paddingBottom: 8 },
  pb_12: { paddingBottom: 12 },
  pb_16: { paddingBottom: 16 },
  pb_20: { paddingBottom: 20 },
  pb_24: { paddingBottom: 24 },
  pb_32: { paddingBottom: 32 },
  pb_48: { paddingBottom: 48 },

  ptb_0: { paddingTop: 0, paddingBottom: 0 },
  ptb_2: { paddingTop: 2, paddingBottom: 2 },
  ptb_4: { paddingTop: 4, paddingBottom: 4 },
  ptb_8: { paddingTop: 8, paddingBottom: 8 },
  ptb_12: { paddingTop: 12, paddingBottom: 12 },
  ptb_16: { paddingTop: 16, paddingBottom: 16 },
  ptb_20: { paddingTop: 20, paddingBottom: 20 },
  ptb_24: { paddingTop: 24, paddingBottom: 24 },
  ptb_32: { paddingTop: 32, paddingBottom: 32 },
  ptb_48: { paddingTop: 48, paddingBottom: 48 },

  plr_0: { paddingLeft: 0, paddingRight: 0 },
  plr_2: { paddingLeft: 2, paddingRight: 2 },
  plr_4: { paddingLeft: 4, paddingRight: 4 },
  plr_8: { paddingLeft: 8, paddingRight: 8 },
  plr_12: { paddingLeft: 12, paddingRight: 12 },
  plr_16: { paddingLeft: 16, paddingRight: 16 },
  plr_20: { paddingLeft: 20, paddingRight: 20 },
  plr_24: { paddingLeft: 24, paddingRight: 24 },
  plr_32: { paddingLeft: 32, paddingRight: 32 },
  plr_48: { paddingLeft: 48, paddingRight: 48 },
});

export const dimensionStyles = StyleSheet.create({
  w_100: { width: '100%' },
  w_50: { width: '50%' },
  h_100: { height: '100%' },
  dw: { width: Dimensions.get('window').width },
});

export const borderStyles = StyleSheet.create({
  bw_0: { borderWidth: 0 },
  bw_05: { borderWidth: 0.5 },
  bw_1: { borderWidth: 1 },
  bw_2: { borderWidth: 2 },
  bw_3: { borderWidth: 3 },
});

export const positionStyles = StyleSheet.create({
  jcc: { justifyContent: 'center' },
  jcfs: { justifyContent: 'flex-start' },
  jcfe: { justifyContent: 'flex-end' },
  jcsa: { justifyContent: 'space-around' },
  jcsb: { justifyContent: 'space-between' },

  alc: { alignItems: 'center' },
  alfs: { alignItems: 'flex-start' },
  alfe: { alignItems: 'flex-end' },

  fdr: { flexDirection: 'row' },
  fdc: { flexDirection: 'column' },
  fdrr: { flexDirection: 'row-reverse' },
  fdcr: { flexDirection: 'column-reverse' },
});

export const getSquare = (size) => ({ width: size, height: size });

export const getReponsesivePaddingUnit = (value) => (Platform.OS === 'web' ? value * 3 : value);


// const screenWidth = Dimensions.get('window').width;

// console.log(screenWidth, PixelRatio.getPixelSizeForLayoutSize(4));

// if (screenWidth > 1024 && screenWidth <= 1400) { return value * 3; }
// if (screenWidth > 900 && screenWidth <= 1024) return value * 3;
// if (screenWidth > 768 && screenWidth <= 900) return value * 3;
// if (screenWidth > 360 && screenWidth <= 768) return value * 2.5;
// if (screenWidth > 250 && screenWidth <= 360) return value;
