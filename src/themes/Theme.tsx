import {MD3LightTheme as LightTheme} from 'react-native-paper';
import {MD3DarkTheme as DarkTheme} from 'react-native-paper';
import {transparent} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export const light_theme = {
  ...LightTheme,
  colors: {
    primary: 'rgb(82, 86, 169)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(225, 224, 255)',
    onPrimaryContainer: 'rgb(9, 7, 100)',
    secondary: 'rgb(89, 84, 168)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(227, 223, 255)',
    onSecondaryContainer: 'rgb(20, 4, 99)',
    tertiary: 'rgb(138, 81, 0)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(255, 220, 189)',
    onTertiaryContainer: 'rgb(44, 22, 0)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(28, 27, 31)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(28, 27, 31)',
    surfaceVariant: 'rgb(228, 225, 236)',
    onSurfaceVariant: 'rgb(70, 70, 79)',
    outline: 'rgb(119, 118, 128)',
    outlineVariant: 'rgb(199, 197, 208)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(49, 48, 52)',
    inverseOnSurface: 'rgb(243, 239, 244)',
    inversePrimary: 'rgb(192, 193, 255)',
    elevation: {
      level0: transparent,
      level1: 'rgb(246, 243, 251)',
      level2: 'rgb(241, 238, 248)',
      level3: 'rgb(236, 233, 246)',
      level4: 'rgb(234, 231, 245)',
      level5: 'rgb(231, 228, 243)',
    },
    surfaceDisabled: 'rgba(28, 27, 31, 0.12)',
    onSurfaceDisabled: 'rgba(28, 27, 31, 0.38)',
    backdrop: 'rgba(48, 48, 56, 0.4)',
    quaternary: 'rgb(123, 88, 0)',
    onQuaternary: 'rgb(255, 255, 255)',
    quaternaryContainer: 'rgb(255, 222, 165)',
    onQuaternaryContainer: 'rgb(39, 25, 0)',
    quinary: 'rgb(0, 104, 123)',
    onQuinary: 'rgb(255, 255, 255)',
    quinaryContainer: 'rgb(173, 236, 255)',
    onQuinaryContainer: 'rgb(0, 31, 38)',
  },
};

export const dark_theme = {
  ...DarkTheme,
  colors: {
    primary: 'rgb(192, 193, 255)',
    onPrimary: 'rgb(35, 36, 120)',
    primaryContainer: 'rgb(58, 61, 143)',
    onPrimaryContainer: 'rgb(225, 224, 255)',
    secondary: 'rgb(196, 192, 255)',
    onSecondary: 'rgb(42, 34, 119)',
    secondaryContainer: 'rgb(65, 59, 142)',
    onSecondaryContainer: 'rgb(227, 223, 255)',
    tertiary: 'rgb(255, 184, 111)',
    onTertiary: 'rgb(74, 41, 0)',
    tertiaryContainer: 'rgb(105, 60, 0)',
    onTertiaryContainer: 'rgb(255, 220, 189)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(28, 27, 31)',
    onBackground: 'rgb(229, 225, 230)',
    surface: 'rgb(28, 27, 31)',
    onSurface: 'rgb(229, 225, 230)',
    surfaceVariant: 'rgb(70, 70, 79)',
    onSurfaceVariant: 'rgb(199, 197, 208)',
    outline: 'rgb(145, 143, 154)',
    outlineVariant: 'rgb(70, 70, 79)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(229, 225, 230)',
    inverseOnSurface: 'rgb(49, 48, 52)',
    inversePrimary: 'rgb(82, 86, 169)',
    elevation: {
      level0: transparent,
      level1: 'rgb(36, 35, 42)',
      level2: 'rgb(41, 40, 49)',
      level3: 'rgb(46, 45, 56)',
      level4: 'rgb(48, 47, 58)',
      level5: 'rgb(51, 50, 62)',
    },
    surfaceDisabled: 'rgba(229, 225, 230, 0.12)',
    onSurfaceDisabled: 'rgba(229, 225, 230, 0.38)',
    backdrop: 'rgba(48, 48, 56, 0.4)',
    quaternary: 'rgb(246, 189, 72)',
    onQuaternary: 'rgb(65, 45, 0)',
    quaternaryContainer: 'rgb(93, 66, 0)',
    onQuaternaryContainer: 'rgb(255, 222, 165)',
    quinary: 'rgb(86, 214, 245)',
    onQuinary: 'rgb(0, 54, 65)',
    quinaryContainer: 'rgb(0, 78, 93)',
    onQuinaryContainer: 'rgb(173, 236, 255)',
  },
};

export const agendaTheme = {
  calendarBackground: 'white',
  agendaKnobColor: '#5D6BB0',
  dotColor: '#5D6BB0',
  indicatorColor: '#5D6BB0',
  selectedDayBackgroundColor: '#5D6BB0',
  todayTextColor: '#5D6BB0',
  agendaTodayColor: '#5D6BB0',
};
