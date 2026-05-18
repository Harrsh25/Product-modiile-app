import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Gradients } from '../theme/colors';

interface Props {
  completed: number;
  total: number;
}

export const ProgressSummary: React.FC<Props> = ({ completed, total }) => {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const remaining = total - completed;

  const getEncouragement = () => {
    if (percent === 100) return 'Expert! All rules mastered 🏆';
    if (percent >= 75) return 'Almost there! Keep going!';
    if (percent >= 50) return 'Halfway through — great work!';
    if (percent >= 25) return 'Good progress! Keep reading.';
    return 'Start completing rules below!';
  };

  return (
    <LinearGradient
      colors={['#6C63FF', '#4ECDC4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.topRow}>
        <View>
          <Text style={styles.label}>OVERALL PROGRESS</Text>
          <Text style={styles.encouragement}>{getEncouragement()}</Text>
        </View>
        <View style={styles.percentCircle}>
          <Text style={styles.percentText}>{percent}%</Text>
        </View>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <StatItem icon="checkmark-circle" value={completed} label="Completed" />
        <View style={styles.statDivider} />
        <StatItem icon="time-outline" value={remaining} label="Remaining" />
        <View style={styles.statDivider} />
        <StatItem icon="list-outline" value={total} label="Total Rules" />
      </View>

      {/* Progress bar */}
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${percent}%` }]} />
      </View>
    </LinearGradient>
  );
};

const StatItem = ({ icon, value, label }: { icon: string; value: number; label: string }) => (
  <View style={styles.statItem}>
    <Ionicons name={icon as any} size={16} color="rgba(255,255,255,0.8)" />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  encouragement: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    maxWidth: 200,
  },
  percentCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  percentText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 22,
  },
  statLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '500',
  },
  barTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
});
