import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import ProductList from './src/components/ProductList';
import { COLORS } from './src/constants/theme';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: COLORS.primary,
    primaryContainer: COLORS.primaryLight,
    secondary: COLORS.primary,
    tertiary: COLORS.primaryLighter,
    background: COLORS.background,
    surface: COLORS.white,
    surfaceVariant: COLORS.background,
    error: COLORS.error,
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1, backgroundColor: COLORS.background }}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
        <ProductList />
      </View>
    </PaperProvider>
  );
}
