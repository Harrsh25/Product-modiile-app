import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../theme/colors';
import { CategoryId, Rule } from '../types';

interface Props {
  rule: Rule;
  isCompleted: boolean;
  categoryColor: string;
  categoryGradient: [string, string];
  onToggle: () => void;
}

const CATEGORY_ICON_MAP: Record<CategoryId, string> = {
  frontend: 'layers-outline',
  backend: 'server-outline',
  database: 'cylinder-outline',
  api: 'git-network-outline',
  authentication: 'shield-checkmark-outline',
  security: 'lock-closed-outline',
  testing: 'checkmark-circle-outline',
  deployment: 'rocket-outline',
};

export const ChecklistItem: React.FC<Props> = ({
  rule, isCompleted, categoryColor, categoryGradient, onToggle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, isCompleted && styles.containerCompleted]}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={isCompleted ? [Colors.success, '#4ECDC4'] : [Colors.surface, Colors.surface]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.checkBtn}
      >
        {isCompleted
          ? <Ionicons name="checkmark" size={16} color="#FFFFFF" />
          : <View style={[styles.emptyCheck, { borderColor: categoryColor }]} />}
      </LinearGradient>

      <View style={styles.content}>
        <Text style={[styles.title, isCompleted && styles.titleDone]} numberOfLines={1}>
          {rule.title}
        </Text>
        <Text style={styles.category}>{rule.category.charAt(0).toUpperCase() + rule.category.slice(1)}</Text>
      </View>

      <View style={[styles.categoryIcon, { backgroundColor: `${categoryColor}20` }]}>
        <Ionicons
          name={CATEGORY_ICON_MAP[rule.category] as any}
          size={14}
          color={categoryColor}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    gap: 12,
  },
  containerCompleted: {
    borderColor: 'rgba(38,194,129,0.3)',
    backgroundColor: 'rgba(38,194,129,0.05)',
  },
  checkBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  emptyCheck: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    lineHeight: 19,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: Colors.textMuted,
  },
  category: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '500',
    marginTop: 1,
  },
  categoryIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});
