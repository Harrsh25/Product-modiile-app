import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../theme/colors';
import { Difficulty, Importance, Rule } from '../types';

interface Props {
  rule: Rule;
  isCompleted: boolean;
  onPress: () => void;
}

const difficultyConfig: Record<Difficulty, { color: string; bg: string }> = {
  Beginner: { color: Colors.beginner, bg: 'rgba(38,194,129,0.12)' },
  Intermediate: { color: Colors.intermediate, bg: 'rgba(247,169,62,0.12)' },
  Advanced: { color: Colors.advanced, bg: 'rgba(247,68,78,0.12)' },
};

const importanceConfig: Record<Importance, { color: string }> = {
  Critical: { color: Colors.critical },
  High: { color: Colors.high },
  Medium: { color: Colors.medium },
  Low: { color: Colors.low },
};

export const RuleCard: React.FC<Props> = ({ rule, isCompleted, onPress }) => {
  const diff = difficultyConfig[rule.difficulty];
  const imp = importanceConfig[rule.importance];

  return (
    <TouchableOpacity style={[styles.card, isCompleted && styles.cardCompleted]} onPress={onPress} activeOpacity={0.85}>
      {/* Completion indicator stripe */}
      {isCompleted && <View style={styles.completedStripe} />}

      <View style={styles.row}>
        {/* Completion checkbox */}
        <View style={[styles.checkbox, isCompleted && styles.checkboxDone]}>
          {isCompleted && <Ionicons name="checkmark" size={13} color="#FFFFFF" />}
        </View>

        <View style={styles.content}>
          {/* Importance dot + title */}
          <View style={styles.titleRow}>
            <View style={[styles.importanceDot, { backgroundColor: imp.color }]} />
            <Text style={[styles.title, isCompleted && styles.titleCompleted]} numberOfLines={2}>
              {rule.title}
            </Text>
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {rule.shortDescription}
          </Text>

          {/* Badges */}
          <View style={styles.badges}>
            <View style={[styles.badge, { backgroundColor: diff.bg }]}>
              <Text style={[styles.badgeText, { color: diff.color }]}>{rule.difficulty}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: 'rgba(108,99,255,0.12)' }]}>
              <Text style={[styles.badgeText, { color: imp.color }]}>{rule.importance}</Text>
            </View>
          </View>
        </View>

        <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} style={styles.chevron} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  cardCompleted: {
    borderColor: 'rgba(38,194,129,0.3)',
    backgroundColor: 'rgba(38,194,129,0.05)',
  },
  completedStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: Colors.success,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    paddingLeft: 16,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  checkboxDone: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
    gap: 6,
  },
  importanceDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginTop: 5,
    flexShrink: 0,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
    lineHeight: 20,
  },
  titleCompleted: {
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 18,
    marginBottom: 10,
    marginLeft: 13,
  },
  badges: {
    flexDirection: 'row',
    gap: 6,
    marginLeft: 13,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  chevron: {
    marginLeft: 8,
    flexShrink: 0,
  },
});
