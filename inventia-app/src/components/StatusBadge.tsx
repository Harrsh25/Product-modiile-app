import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../theme/colors';
import { AssignmentStatus, AttendanceStatus, ProjectStatus } from '../types';

type AnyStatus = AssignmentStatus | ProjectStatus | AttendanceStatus | 'Pending' | 'Approved' | 'Rejected';

const STATUS_CONFIG: Record<string, { bg: string; text: string; dot: string }> = {
  'Not Started': { bg: '#F3F4F6', text: '#6B7280', dot: '#9CA3AF' },
  'Ongoing':     { bg: '#EEF1FE', text: '#4A6CF7', dot: '#4A6CF7' },
  'Completed':   { bg: '#F0FDF4', text: '#16A34A', dot: '#22C55E' },
  'Overdue':     { bg: '#FEF2F2', text: '#DC2626', dot: '#EF4444' },
  'On Hold':     { bg: '#FFFBEB', text: '#D97706', dot: '#F59E0B' },
  'Active':      { bg: '#EEF1FE', text: '#4A6CF7', dot: '#4A6CF7' },
  'Priority':    { bg: '#FAF5FF', text: '#7C3AED', dot: '#8B5CF6' },
  'Present':     { bg: '#F0FDF4', text: '#16A34A', dot: '#22C55E' },
  'Late':        { bg: '#FFFBEB', text: '#D97706', dot: '#F59E0B' },
  'Absent':      { bg: '#FEF2F2', text: '#DC2626', dot: '#EF4444' },
  'Half Day':    { bg: '#FFF7ED', text: '#C2410C', dot: '#F97316' },
  'Off':         { bg: '#F3F4F6', text: '#6B7280', dot: '#9CA3AF' },
  'Holiday':     { bg: '#F3F4F6', text: '#6B7280', dot: '#9CA3AF' },
  'Graced':      { bg: '#F0FDF4', text: '#16A34A', dot: '#22C55E' },
  'Pending':     { bg: '#FFFBEB', text: '#D97706', dot: '#F59E0B' },
  'Approved':    { bg: '#F0FDF4', text: '#16A34A', dot: '#22C55E' },
  'Rejected':    { bg: '#FEF2F2', text: '#DC2626', dot: '#EF4444' },
  'Leave':       { bg: '#F3EFFE', text: '#7C3AED', dot: '#8B5CF6' },
  'Expense':     { bg: '#FFF7ED', text: '#C2410C', dot: '#F97316' },
  'Attendance':  { bg: '#EEF1FE', text: '#4A6CF7', dot: '#4A6CF7' },
};

interface Props {
  status: AnyStatus;
  size?: 'sm' | 'md';
  showDot?: boolean;
}

export const StatusBadge: React.FC<Props> = ({ status, size = 'md', showDot = true }) => {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG['Not Started'];
  const isSmall = size === 'sm';

  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }, isSmall && styles.badgeSm]}>
      {showDot && <View style={[styles.dot, { backgroundColor: cfg.dot }, isSmall && styles.dotSm]} />}
      <Text style={[styles.text, { color: cfg.text }, isSmall && styles.textSm]}>{status}</Text>
    </View>
  );
};

// Pill-style type badge (Subtask / Task)
interface TypeBadgeProps { type: string }
const TYPE_COLOR: Record<string, { bg: string; text: string }> = {
  Subtask: { bg: '#EEF1FE', text: '#4A6CF7' },
  Task:    { bg: '#F0FDF4', text: '#16A34A' },
  Issue:   { bg: '#FEF2F2', text: '#DC2626' },
  Bug:     { bg: '#FFF7ED', text: '#C2410C' },
};
export const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const cfg = TYPE_COLOR[type] ?? TYPE_COLOR.Task;
  return (
    <View style={[styles.typeBadge, { backgroundColor: cfg.bg }]}>
      <Text style={[styles.typeText, { color: cfg.text }]}>{type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeSm: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  dotSm: { width: 5, height: 5, borderRadius: 2.5 },
  text: { fontSize: 12, fontWeight: '600' },
  textSm: { fontSize: 11 },
  typeBadge: {
    paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: 4, alignSelf: 'flex-start',
  },
  typeText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.3 },
});
