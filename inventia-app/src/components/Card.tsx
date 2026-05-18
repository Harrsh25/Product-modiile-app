import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '../theme/colors';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
}

export const Card: React.FC<Props> = ({ children, style, padding = 16 }) => (
  <View style={[styles.card, { padding }, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
});
