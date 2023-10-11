import { createTheme, darkColors, lightColors } from '@rneui/themed';
import { Platform } from 'react-native';

export const Theme = createTheme({
    lightColors: {
      ...Platform.select({
        default: lightColors.platform.android,
        ios: lightColors.platform.ios,
      }),
    },
    darkColors: {
        ...Platform.select({
          default: darkColors.platform.android,
          ios: darkColors.platform.ios,
        }),
      },
});
