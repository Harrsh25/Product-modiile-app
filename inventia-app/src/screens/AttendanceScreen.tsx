import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions, ScrollView, StyleSheet, Text,
  TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBadge } from '../components/StatusBadge';
import {
  ATTENDANCE_HISTORY, ATTENDANCE_SUMMARY, CALENDAR_DOT_MAP,
} from '../data/mockData';
import { Colors } from '../theme/colors';
import { AttendanceDay, AttendanceStatus } from '../types';

const { width } = Dimensions.get('window');
const DAY_HEADERS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const DOT_COLOR: Record<AttendanceStatus, string> = {
  Present:  Colors.attPresent,
  Late:     Colors.attLate,
  Absent:   Colors.attAbsent,
  Graced:   Colors.attGraced,
  'Half Day': Colors.warning,
  Off:      Colors.attOff,
  Holiday:  Colors.attOff,
};

function buildCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export const AttendanceScreen: React.FC = () => {
  const today = new Date(2026, 4, 19); // May 19, 2026
  const [activeTab, setActiveTab] = useState<'Calendar' | 'Leave'>('Calendar');
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(4); // May = 4
  const [historyExpanded, setHistoryExpanded] = useState(true);

  const cells = buildCalendarDays(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(v => v - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(v => v + 1); }
    else setViewMonth(m => m + 1);
  };

  const isToday = (d: number | null) =>
    d !== null && d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Attendance</Text>
        <Text style={styles.headerSub}>Track your daily attendance</Text>
      </View>

      {/* ── Tabs ── */}
      <View style={styles.tabs}>
        {(['Calendar', 'Leave'] as const).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, activeTab === t && styles.tabActive]}
            onPress={() => setActiveTab(t)}
          >
            <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {activeTab === 'Calendar' ? (
          <>
            {/* ── Month Navigation ── */}
            <View style={styles.monthNav}>
              <TouchableOpacity onPress={prevMonth} style={styles.monthNavBtn}>
                <Ionicons name="chevron-back" size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
              <Text style={styles.monthTitle}>{MONTH_NAMES[viewMonth]} {viewYear}</Text>
              <TouchableOpacity onPress={nextMonth} style={styles.monthNavBtn}>
                <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* ── Calendar Grid ── */}
            <View style={styles.calendarCard}>
              {/* Day headers */}
              <View style={styles.calHeader}>
                {DAY_HEADERS.map((d) => (
                  <Text key={d} style={styles.calHeaderText}>{d}</Text>
                ))}
              </View>

              {/* Cells */}
              <View style={styles.calGrid}>
                {cells.map((day, idx) => {
                  const dotStatus = day ? CALENDAR_DOT_MAP[day] : undefined;
                  const dotColor  = dotStatus ? DOT_COLOR[dotStatus] : undefined;
                  return (
                    <View key={idx} style={styles.calCell}>
                      {day !== null && (
                        <>
                          <View style={[styles.dayCircle, isToday(day) && styles.dayCircleToday]}>
                            <Text style={[styles.dayText, isToday(day) && styles.dayTextToday]}>{day}</Text>
                          </View>
                          {dotColor && <View style={[styles.dot, { backgroundColor: dotColor }]} />}
                        </>
                      )}
                    </View>
                  );
                })}
              </View>

              {/* ── Legend ── */}
              <View style={styles.legend}>
                {[
                  { label: 'Present', color: Colors.attPresent },
                  { label: 'Late',    color: Colors.attLate    },
                  { label: 'Absent',  color: Colors.attAbsent  },
                  { label: 'Graced',  color: Colors.attGraced  },
                  { label: 'Off/Holiday', color: Colors.attOff },
                ].map((l) => (
                  <View key={l.label} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: l.color }]} />
                    <Text style={styles.legendText}>{l.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* ── Summary Stats ── */}
            <View style={styles.summaryRow}>
              <SummaryStatCard value={ATTENDANCE_SUMMARY.present} label="Present"  change="+7% vs last" color={Colors.primary}  />
              <SummaryStatCard value={ATTENDANCE_SUMMARY.leave}   label="Leave"    change="-0% vs last"  color={Colors.secondary} />
              <SummaryStatCard value={ATTENDANCE_SUMMARY.absent}  label="Absent"   change="+10% vs last" color={Colors.error}    />
              <SummaryStatCard value={ATTENDANCE_SUMMARY.graced}  label="Graced"   change="-20% vs last" color={Colors.warning}  />
            </View>

            {/* ── Attendance History ── */}
            <View style={styles.historyCard}>
              <TouchableOpacity style={styles.historyHeader} onPress={() => setHistoryExpanded(e => !e)}>
                <Text style={styles.historyTitle}>Attendance History</Text>
                <Ionicons name={historyExpanded ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.textSecondary} />
              </TouchableOpacity>

              {historyExpanded && ATTENDANCE_HISTORY.map((day) => (
                <AttendanceRow key={day.date} day={day} />
              ))}
            </View>
          </>
        ) : (
          <LeaveTab />
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Summary Stat Card ──────────────────────────────────────────────────────
const SummaryStatCard = ({ value, label, change, color }: {
  value: number; label: string; change: string; color: string;
}) => (
  <View style={summaryStyles.card}>
    <Text style={[summaryStyles.value, { color }]}>{value}</Text>
    <Text style={summaryStyles.label}>{label}</Text>
    <Text style={summaryStyles.change}>{change}</Text>
  </View>
);
const summaryStyles = StyleSheet.create({
  card: { flex: 1, backgroundColor: Colors.surface, borderRadius: 10, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: Colors.border, marginHorizontal: 2 },
  value: { fontSize: 20, fontWeight: '900' },
  label: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600', marginTop: 2 },
  change: { fontSize: 9, color: Colors.textMuted, marginTop: 2, textAlign: 'center' },
});

// ─── Attendance Row ──────────────────────────────────────────────────────────
const AttendanceRow: React.FC<{ day: AttendanceDay }> = ({ day }) => {
  const d = new Date(day.date);
  const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()];
  const dayNum = d.getDate();
  const monthName = MONTH_NAMES[d.getMonth()];

  return (
    <View style={rowStyles.container}>
      <View style={rowStyles.dateCol}>
        <Text style={rowStyles.dayName}>{dayName} {dayNum}</Text>
        <Text style={rowStyles.monthName}>{monthName}</Text>
      </View>
      <View style={rowStyles.timesCol}>
        {day.checkIn ? (
          <>
            <View style={rowStyles.timeRow}>
              <Text style={rowStyles.timeLabel}>↑ Check In</Text>
              <Text style={rowStyles.timeValue}>{day.checkIn}</Text>
            </View>
            <View style={rowStyles.timeRow}>
              <Text style={rowStyles.timeLabel}>↓ Check Out</Text>
              <Text style={rowStyles.timeValue}>{day.checkOut ?? '---'}</Text>
            </View>
          </>
        ) : (
          <Text style={rowStyles.noData}>— Check In  — Check Out</Text>
        )}
      </View>
      <View style={rowStyles.statusCol}>
        <StatusBadge status={day.status} size="sm" />
        {day.checkIn && (
          <TouchableOpacity style={rowStyles.noteBtn}>
            <Ionicons name="document-text-outline" size={14} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const rowStyles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.borderLight, gap: 8 },
  dateCol: { width: 64 },
  dayName: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary },
  monthName: { fontSize: 11, color: Colors.textMuted, marginTop: 1 },
  timesCol: { flex: 1 },
  timeRow: { flexDirection: 'row', gap: 4, alignItems: 'center', marginBottom: 2 },
  timeLabel: { fontSize: 10, color: Colors.textMuted, width: 68 },
  timeValue: { fontSize: 12, color: Colors.textPrimary, fontWeight: '600' },
  noData: { fontSize: 12, color: Colors.textMuted },
  statusCol: { alignItems: 'flex-end', gap: 4 },
  noteBtn: { padding: 4 },
});

// ─── Leave Tab placeholder ───────────────────────────────────────────────────
const LeaveTab = () => (
  <View style={{ alignItems: 'center', paddingTop: 60, gap: 12 }}>
    <Ionicons name="calendar-clear-outline" size={48} color={Colors.border} />
    <Text style={{ fontSize: 15, color: Colors.textMuted }}>No leave records for this period</Text>
    <TouchableOpacity style={{ backgroundColor: Colors.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}>
      <Text style={{ color: '#fff', fontWeight: '700' }}>Apply for Leave</Text>
    </TouchableOpacity>
  </View>
);

// ─── Main Styles ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { backgroundColor: Colors.surface, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  headerSub: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  tabs: { flexDirection: 'row', backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.border },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: Colors.primary },
  tabText: { fontSize: 14, fontWeight: '600', color: Colors.textMuted },
  tabTextActive: { color: Colors.primary },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 14, paddingTop: 12 },

  monthNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  monthNavBtn: { width: 32, height: 32, borderRadius: 8, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.border },
  monthTitle: { fontSize: 15, fontWeight: '800', color: Colors.textPrimary },

  calendarCard: { backgroundColor: Colors.surface, borderRadius: 14, borderWidth: 1, borderColor: Colors.border, padding: 12, marginBottom: 12 },
  calHeader: { flexDirection: 'row', marginBottom: 8 },
  calHeaderText: { flex: 1, textAlign: 'center', fontSize: 10, fontWeight: '700', color: Colors.textMuted, letterSpacing: 0.3 },
  calGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  calCell: { width: `${100 / 7}%`, alignItems: 'center', paddingVertical: 4 },
  dayCircle: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  dayCircleToday: { backgroundColor: Colors.primary },
  dayText: { fontSize: 13, color: Colors.textPrimary, fontWeight: '600' },
  dayTextToday: { color: '#FFFFFF', fontWeight: '800' },
  dot: { width: 5, height: 5, borderRadius: 2.5, marginTop: 1 },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: Colors.border },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 10, color: Colors.textMuted, fontWeight: '500' },

  summaryRow: { flexDirection: 'row', gap: 4, marginBottom: 12 },

  historyCard: { backgroundColor: Colors.surface, borderRadius: 14, borderWidth: 1, borderColor: Colors.border, overflow: 'hidden', marginBottom: 12 },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14 },
  historyTitle: { fontSize: 14, fontWeight: '800', color: Colors.textPrimary },
});
