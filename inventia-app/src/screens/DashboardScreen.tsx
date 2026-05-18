import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions, ScrollView, StyleSheet, Text,
  TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '../components/Avatar';
import { Card } from '../components/Card';
import {
  ALL_MODULES, ANNOUNCEMENTS, APPROVALS, ATTENDANCE_SUMMARY,
  CURRENT_USER, DASHBOARD_SUMMARY, LEAVE_BALANCES,
  PROJECTS, UPCOMING_EVENTS,
} from '../data/mockData';
import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const PERF_DATA = [
  { day: 'Mon', score: 95, color: Colors.primary },
  { day: 'Tue', score: 60, color: Colors.error },
  { day: 'Wed', score: 75, color: Colors.warning },
  { day: 'Thu', score: 85, color: Colors.success },
  { day: 'Fri', score: 90, color: Colors.primary },
];

export const DashboardScreen: React.FC = () => {
  const [activeView, setActiveView] = useState<'My View' | 'Project View'>('My View');
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  const handlePunchIn = () => {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    setCheckedIn(true);
    setCheckInTime(`${h}:${m}`);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* ── Top Header ── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.logoText}>Inventia <Text style={styles.fire}>🔥</Text></Text>
            <Text style={styles.roleText}>{CURRENT_USER.role}</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={20} color={Colors.textSecondary} />
              <View style={styles.notifDot} />
            </TouchableOpacity>
            <Avatar user={CURRENT_USER} size={36} />
          </View>
        </View>

        {/* ── Punch In Card ── */}
        <Card style={styles.punchCard} padding={0}>
          {/* Status row */}
          <View style={styles.punchTopRow}>
            <View style={styles.punchStatusLeft}>
              <View style={[styles.statusPill, { backgroundColor: checkedIn ? Colors.successLight : '#FEF2F2' }]}>
                <View style={[styles.statusDot, { backgroundColor: checkedIn ? Colors.success : Colors.error }]} />
                <Text style={[styles.statusPillText, { color: checkedIn ? Colors.successDark : Colors.error }]}>
                  {checkedIn ? 'Checked In' : 'Not Checked In'}
                </Text>
              </View>
            </View>
            <View style={styles.punchStatusRight}>
              <Ionicons name="location-outline" size={13} color={Colors.textMuted} />
              <Text style={styles.locationText}>Mumbai, MO</Text>
              <View style={[styles.statusPill, { backgroundColor: Colors.successLight, marginLeft: 6 }]}>
                <Text style={[styles.statusPillText, { color: Colors.successDark }]}>Confirmed</Text>
              </View>
            </View>
          </View>

          {/* Times */}
          <View style={styles.timesRow}>
            <View style={styles.timeCol}>
              <Text style={styles.timeLabel}>CHECK IN TIME</Text>
              <Text style={styles.timeValue}>{checkedIn && checkInTime ? checkInTime : '---:--'}</Text>
            </View>
            <View style={styles.timeDivider} />
            <View style={styles.timeCol}>
              <Text style={styles.timeLabel}>CHECK OUT TIME</Text>
              <Text style={styles.timeValue}>---:--</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.timelineLink}>
            <Ionicons name="time-outline" size={13} color={Colors.primary} />
            <Text style={styles.timelineLinkText}>View Timeline</Text>
          </TouchableOpacity>

          {/* Action buttons */}
          <View style={styles.punchBtnRow}>
            <TouchableOpacity
              style={[styles.punchBtn, checkedIn && styles.punchBtnOut]}
              onPress={handlePunchIn}
              activeOpacity={0.85}
            >
              <Ionicons name={checkedIn ? 'log-out-outline' : 'log-in-outline'} size={18} color="#FFFFFF" />
              <Text style={styles.punchBtnText}>{checkedIn ? 'Punch Out' : 'Punch In'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.qrBtn} activeOpacity={0.8}>
              <Ionicons name="qr-code-outline" size={18} color={Colors.textSecondary} />
              <Text style={styles.qrBtnText}>QR Code</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* ── Quick Actions ── */}
        <View style={styles.quickActions}>
          {[
            { icon: 'folder-outline',        label: 'Projects',       color: '#4A6CF7', bg: '#EEF1FE' },
            { icon: 'clipboard-outline',     label: 'My Assignments', color: '#8B5CF6', bg: '#FAF5FF' },
            { icon: 'receipt-outline',       label: 'Payslip',        color: '#22C55E', bg: '#F0FDF4' },
            { icon: 'checkmark-done-outline',label: 'Approvals',      color: '#F59E0B', bg: '#FFFBEB', badge: 3 },
          ].map((a) => (
            <TouchableOpacity key={a.label} style={styles.quickActionItem} activeOpacity={0.75}>
              <View style={[styles.quickActionIcon, { backgroundColor: a.bg }]}>
                <Ionicons name={a.icon as any} size={22} color={a.color} />
                {a.badge && (
                  <View style={styles.quickActionBadge}>
                    <Text style={styles.quickActionBadgeText}>{a.badge}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.quickActionLabel} numberOfLines={1}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Leave Balance + Upcoming Events (side by side) ── */}
        <View style={styles.twoCol}>
          {/* Leave Balance */}
          <Card style={styles.halfCard}>
            <View style={styles.cardRowHeader}>
              <Text style={styles.cardTitle}>Leave Balance</Text>
              <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
            </View>
            {LEAVE_BALANCES.map((lb) => (
              <View key={lb.type} style={styles.leaveRow}>
                <View style={[styles.leaveDot, { backgroundColor: lb.color }]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.leaveType} numberOfLines={1}>{lb.type}</Text>
                  <View style={styles.leaveBarTrack}>
                    <View style={[styles.leaveBarFill, { width: `${(lb.used / lb.total) * 100}%`, backgroundColor: lb.color }]} />
                  </View>
                </View>
                <Text style={styles.leaveCount}>{lb.used}/{lb.total}</Text>
              </View>
            ))}
          </Card>

          {/* Upcoming Events */}
          <Card style={styles.halfCard}>
            <View style={styles.cardRowHeader}>
              <Text style={styles.cardTitle}>Upcoming Events</Text>
              <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
            </View>
            {UPCOMING_EVENTS.slice(0, 2).map((ev) => (
              <View key={ev.id} style={styles.eventRow}>
                <View style={[styles.eventDot, { backgroundColor: ev.color }]}>
                  <Ionicons name={ev.icon as any} size={12} color="#FFFFFF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.eventTitle} numberOfLines={1}>{ev.title}</Text>
                  <Text style={styles.eventTime}>{ev.time}</Text>
                </View>
              </View>
            ))}
          </Card>
        </View>

        {/* ── My View / Project View Toggle ── */}
        <View style={styles.viewToggle}>
          {(['My View', 'Project View'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.viewTab, activeView === tab && styles.viewTabActive]}
              onPress={() => setActiveView(tab)}
            >
              <Text style={[styles.viewTabText, activeView === tab && styles.viewTabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── My Summary ── */}
        <Card style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>My Summary</Text>
          <View style={styles.summaryRow}>
            {Object.values(DASHBOARD_SUMMARY).map((item) => (
              <View key={item.label} style={styles.summaryItem}>
                <Text style={[styles.summaryValue, { color: item.color }]}>{item.value}</Text>
                {item.change ? <Text style={styles.summaryChange}>{item.change}</Text> : null}
                <Text style={styles.summaryLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* ── Today's Focus ── */}
        <Card style={styles.focusCard}>
          <Text style={styles.sectionTitle}>Today's Focus</Text>
          <View style={styles.focusRow}>
            <FocusItem
              icon="today-outline" iconColor={Colors.primary} bg={Colors.primaryLight}
              title="Now Today" value="6" label="A high prior By"
              showBar
            />
            <FocusItem
              icon="alert-circle-outline" iconColor={Colors.error} bg={Colors.errorLight}
              title="Overdue" value="+2" label="+2 since yesterday" actionLabel="Review now"
            />
          </View>
          <View style={styles.focusRow}>
            <FocusItem
              icon="checkmark-circle-outline" iconColor={Colors.success} bg={Colors.successLight}
              title="Completed" value="20%" label="This week"
              showProgress value2={20}
            />
            <FocusItem
              icon="stats-chart-outline" iconColor={Colors.warning} bg={Colors.warningLight}
              title="Productivity" value="4.2" label="Today, 7:00 AM" star label2="28 pts" tag="High"
            />
          </View>
        </Card>

        {/* ── My Productivity ── */}
        <Card>
          <View style={styles.cardRowHeader}>
            <Text style={styles.sectionTitle}>My Productivity</Text>
            <TouchableOpacity style={styles.weeklyBadge}>
              <Text style={styles.weeklyText}>Weekly performance</Text>
              <Ionicons name="chevron-down" size={12} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.prodStats}>
            <View style={styles.prodStatItem}>
              <Text style={styles.prodStatLabel}>SPEED LEVEL</Text>
              <Text style={styles.prodStatValue}>4.2</Text>
            </View>
            <View style={styles.prodStatItem}>
              <Text style={styles.prodStatLabel}>DONE RATE</Text>
              <Text style={styles.prodStatValue}>71%<Text style={styles.prodStatSub}> vs last wk</Text></Text>
            </View>
            <View style={styles.prodStatItem}>
              <Text style={styles.prodStatLabel}>VELOCITY</Text>
              <Text style={styles.prodStatValue}>38</Text>
            </View>
          </View>

          {/* Weekly bars */}
          {PERF_DATA.map((d) => (
            <View key={d.day} style={styles.perfRow}>
              <Text style={styles.perfDay}>{d.day}</Text>
              <View style={styles.perfTrack}>
                <View style={[styles.perfFill, { width: `${d.score}%`, backgroundColor: d.color }]} />
              </View>
              <Text style={styles.perfScore}>{d.score}</Text>
            </View>
          ))}
        </Card>

        {/* ── Priority Breakdown ── */}
        <Card style={styles.mt12}>
          <Text style={styles.sectionTitle}>My Productivity</Text>
          <Text style={styles.subSectionTitle}>Task priority distribution</Text>
          <View style={styles.priorityRow}>
            {/* Donut placeholder */}
            <View style={styles.donutOuter}>
              <View style={styles.donutInner}>
                <Text style={styles.donutText}>100%</Text>
              </View>
            </View>
            <View style={styles.priorityLegend}>
              {[
                { label: 'Critical', color: Colors.error,   pct: '2 (5%)' },
                { label: 'High',     color: Colors.warning,  pct: '3 (5%)' },
                { label: 'Medium',   color: Colors.primary,  pct: '2 (5%)' },
                { label: 'Low',      color: Colors.success,  pct: '0 (0%)' },
              ].map((p) => (
                <View key={p.label} style={styles.priorityItem}>
                  <View style={[styles.priorityDot, { backgroundColor: p.color }]} />
                  <Text style={styles.priorityLabel}>{p.label}</Text>
                  <Text style={styles.priorityPct}>{p.pct}</Text>
                </View>
              ))}
            </View>
          </View>
        </Card>

        {/* ── Pending Approvals ── */}
        <Card style={styles.mt12}>
          <View style={styles.cardRowHeader}>
            <View style={styles.approvalHeaderLeft}>
              <Text style={styles.sectionTitle}>Pending Approvals</Text>
              <View style={styles.approvalCountBadge}>
                <Text style={styles.approvalCountText}>{APPROVALS.length}</Text>
              </View>
            </View>
            <TouchableOpacity><Text style={styles.viewAll}>View all ›</Text></TouchableOpacity>
          </View>
          {APPROVALS.map((ap) => (
            <View key={ap.id} style={styles.approvalRow}>
              <View style={[styles.approvalAvatar, { backgroundColor: ap.color }]}>
                <Text style={styles.approvalAvatarText}>{ap.initials}</Text>
              </View>
              <View style={styles.approvalInfo}>
                <Text style={styles.approvalName}>{ap.name}</Text>
                <Text style={styles.approvalDetail}>{ap.type} · {ap.date}</Text>
              </View>
              <TouchableOpacity style={[styles.approvalActionBtn,
                ap.type === 'Leave' ? styles.leaveBtn :
                ap.type === 'Attendance' ? styles.attendBtn : styles.expBtn]}>
                <Text style={[styles.approvalActionText,
                  ap.type === 'Leave' ? { color: Colors.primary } :
                  ap.type === 'Attendance' ? { color: Colors.success } :
                  { color: Colors.warning }]}>
                  {ap.type === 'Leave' ? 'Leave' : ap.type === 'Attendance' ? 'Attendance' : 'Expense'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </Card>

        {/* ── Announcements ── */}
        <Card style={styles.mt12}>
          <View style={styles.cardRowHeader}>
            <View style={styles.announcementHeader}>
              <Ionicons name="megaphone-outline" size={16} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Company Updates</Text>
            </View>
            <TouchableOpacity><Text style={styles.viewAll}>View all</Text></TouchableOpacity>
          </View>
          {ANNOUNCEMENTS.map((an) => (
            <View key={an.id} style={styles.announcementRow}>
              <View style={[styles.announcementDot, { backgroundColor: an.color }]} />
              <View style={styles.announcementContent}>
                <Text style={styles.announcementTitle}>{an.title}</Text>
                {an.tag ? (
                  <View style={[styles.announcementTag, { backgroundColor: '#FEF2F2' }]}>
                    <Text style={[styles.announcementTagText, { color: Colors.error }]}>{an.tag}</Text>
                  </View>
                ) : null}
                <Text style={styles.announcementDate}>{an.date}ago</Text>
              </View>
            </View>
          ))}
        </Card>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Focus Item subcomponent ────────────────────────────────────────────────
const FocusItem = ({
  icon, iconColor, bg, title, value, label, showBar, showProgress, value2,
  actionLabel, star, label2, tag
}: any) => (
  <View style={focusStyles.item}>
    <View style={focusStyles.header}>
      <View style={[focusStyles.iconBg, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={14} color={iconColor} />
      </View>
      <Text style={focusStyles.title}>{title}</Text>
    </View>
    <Text style={[focusStyles.value, { color: iconColor }]}>{value}</Text>
    {showBar && (
      <View style={focusStyles.barTrack}>
        <View style={[focusStyles.barFill, { width: '60%', backgroundColor: iconColor }]} />
      </View>
    )}
    {showProgress && (
      <View style={focusStyles.progressCircle}>
        <Text style={focusStyles.progressText}>{value2}%</Text>
      </View>
    )}
    <Text style={focusStyles.label}>{label}</Text>
    {star && (
      <View style={focusStyles.starRow}>
        {[1,2,3,4,5].map(s => <Ionicons key={s} name="star" size={10} color={Colors.warning} />)}
        <Text style={focusStyles.label2}>{label2}</Text>
      </View>
    )}
    {tag && (
      <View style={[focusStyles.tag, { backgroundColor: Colors.successLight }]}>
        <Text style={[focusStyles.tagText, { color: Colors.successDark }]}>{tag}</Text>
      </View>
    )}
    {actionLabel && (
      <TouchableOpacity>
        <Text style={[focusStyles.action, { color: iconColor }]}>{actionLabel}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const focusStyles = StyleSheet.create({
  item: { flex: 1, backgroundColor: Colors.surfaceAlt, borderRadius: 10, padding: 10, margin: 4 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  iconBg: { width: 24, height: 24, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600' },
  value: { fontSize: 22, fontWeight: '800', marginBottom: 4 },
  label: { fontSize: 11, color: Colors.textMuted, lineHeight: 15 },
  barTrack: { height: 4, backgroundColor: Colors.border, borderRadius: 2, marginVertical: 4 },
  barFill: { height: 4, borderRadius: 2 },
  progressCircle: {
    width: 44, height: 44, borderRadius: 22,
    borderWidth: 4, borderColor: Colors.success,
    alignItems: 'center', justifyContent: 'center', marginVertical: 4, alignSelf: 'center',
  },
  progressText: { fontSize: 11, fontWeight: '700', color: Colors.success },
  starRow: { flexDirection: 'row', alignItems: 'center', gap: 1, marginTop: 2 },
  label2: { fontSize: 10, color: Colors.textMuted, marginLeft: 4 },
  tag: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start', marginTop: 3 },
  tagText: { fontSize: 10, fontWeight: '700' },
  action: { fontSize: 11, fontWeight: '700', marginTop: 4 },
});

// ─── Main Styles ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 14, paddingBottom: 24 },

  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  headerLeft: {},
  logoText: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
  fire: { fontSize: 18 },
  roleText: { fontSize: 12, color: Colors.textSecondary, fontWeight: '500', marginTop: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.border },
  notifDot: { position: 'absolute', top: 7, right: 7, width: 7, height: 7, borderRadius: 3.5, backgroundColor: Colors.error, borderWidth: 1.5, borderColor: '#fff' },

  // Punch card
  punchCard: { marginBottom: 14 },
  punchTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, paddingBottom: 0 },
  punchStatusLeft: {},
  punchStatusRight: { flexDirection: 'row', alignItems: 'center' },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusPillText: { fontSize: 11, fontWeight: '700' },
  locationText: { fontSize: 11, color: Colors.textMuted, marginLeft: 2, marginRight: 2 },

  timesRow: { flexDirection: 'row', padding: 12, paddingVertical: 10 },
  timeCol: { flex: 1 },
  timeDivider: { width: 1, backgroundColor: Colors.border, marginHorizontal: 8, height: '100%' },
  timeLabel: { fontSize: 9, color: Colors.textMuted, fontWeight: '700', letterSpacing: 0.5, marginBottom: 3 },
  timeValue: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary, letterSpacing: 1 },
  timelineLink: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingBottom: 8 },
  timelineLinkText: { fontSize: 12, color: Colors.primary, fontWeight: '600' },

  punchBtnRow: { flexDirection: 'row', gap: 10, padding: 12, paddingTop: 8 },
  punchBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: Colors.success, paddingVertical: 12, borderRadius: 10 },
  punchBtnOut: { backgroundColor: Colors.error },
  punchBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  qrBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: Colors.surface, paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: Colors.border },
  qrBtnText: { color: Colors.textSecondary, fontSize: 15, fontWeight: '600' },

  // Quick actions
  quickActions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  quickActionItem: { alignItems: 'center', flex: 1 },
  quickActionIcon: { width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  quickActionBadge: { position: 'absolute', top: -4, right: -4, width: 18, height: 18, borderRadius: 9, backgroundColor: Colors.error, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
  quickActionBadgeText: { fontSize: 9, color: '#fff', fontWeight: '800' },
  quickActionLabel: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600', textAlign: 'center' },

  // Two column
  twoCol: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  halfCard: { flex: 1 },

  // Leave
  leaveRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  leaveDot: { width: 8, height: 8, borderRadius: 4, flexShrink: 0 },
  leaveType: { fontSize: 11, color: Colors.textSecondary, marginBottom: 3 },
  leaveBarTrack: { height: 4, backgroundColor: Colors.border, borderRadius: 2 },
  leaveBarFill: { height: 4, borderRadius: 2 },
  leaveCount: { fontSize: 11, color: Colors.textMuted, fontWeight: '600', flexShrink: 0 },

  // Events
  eventRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  eventDot: { width: 26, height: 26, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  eventTitle: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary },
  eventTime: { fontSize: 11, color: Colors.textMuted, marginTop: 1 },

  // Card headers
  cardRowHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardTitle: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },
  viewAll: { fontSize: 12, color: Colors.primary, fontWeight: '600' },

  // View toggle
  viewToggle: { flexDirection: 'row', backgroundColor: Colors.surface, borderRadius: 10, borderWidth: 1, borderColor: Colors.border, marginBottom: 12, overflow: 'hidden' },
  viewTab: { flex: 1, paddingVertical: 9, alignItems: 'center' },
  viewTabActive: { backgroundColor: Colors.primary },
  viewTabText: { fontSize: 13, color: Colors.textSecondary, fontWeight: '600' },
  viewTabTextActive: { color: '#FFFFFF' },

  // Summary
  summaryCard: { marginBottom: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-around' },
  summaryItem: { alignItems: 'center' },
  summaryValue: { fontSize: 24, fontWeight: '900' },
  summaryChange: { fontSize: 10, color: Colors.textMuted, marginTop: 1 },
  summaryLabel: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600' },

  // Focus
  focusCard: { marginBottom: 12 },
  focusRow: { flexDirection: 'row', margin: -4, marginBottom: 0 },

  // Productivity
  weeklyBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: Colors.primaryLight, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  weeklyText: { fontSize: 11, color: Colors.primary, fontWeight: '600' },
  prodStats: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 14, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  prodStatItem: { alignItems: 'center' },
  prodStatLabel: { fontSize: 9, color: Colors.textMuted, fontWeight: '700', letterSpacing: 0.5, marginBottom: 3 },
  prodStatValue: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  prodStatSub: { fontSize: 10, color: Colors.textMuted, fontWeight: '400' },
  perfRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  perfDay: { width: 28, fontSize: 12, color: Colors.textSecondary, fontWeight: '600' },
  perfTrack: { flex: 1, height: 6, backgroundColor: Colors.border, borderRadius: 3 },
  perfFill: { height: 6, borderRadius: 3 },
  perfScore: { width: 24, fontSize: 11, color: Colors.textMuted, textAlign: 'right' },

  // Priority
  mt12: { marginTop: 12 },
  priorityRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  donutOuter: { width: 90, height: 90, borderRadius: 45, borderWidth: 16, borderColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  donutInner: { alignItems: 'center', justifyContent: 'center' },
  donutText: { fontSize: 13, fontWeight: '800', color: Colors.textPrimary },
  priorityLegend: { flex: 1, gap: 6 },
  priorityItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  priorityDot: { width: 8, height: 8, borderRadius: 4 },
  priorityLabel: { flex: 1, fontSize: 12, color: Colors.textSecondary },
  priorityPct: { fontSize: 12, color: Colors.textMuted, fontWeight: '600' },
  subSectionTitle: { fontSize: 12, color: Colors.textMuted, marginBottom: 10, marginTop: -4 },

  // Approvals
  approvalHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  approvalCountBadge: { backgroundColor: Colors.error, width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  approvalCountText: { fontSize: 11, color: '#fff', fontWeight: '800' },
  approvalRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  approvalAvatar: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  approvalAvatarText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  approvalInfo: { flex: 1 },
  approvalName: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },
  approvalDetail: { fontSize: 11, color: Colors.textMuted, marginTop: 1 },
  approvalActionBtn: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, borderWidth: 1, flexShrink: 0 },
  leaveBtn: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  attendBtn: { borderColor: Colors.success, backgroundColor: Colors.successLight },
  expBtn: { borderColor: Colors.warning, backgroundColor: Colors.warningLight },
  approvalActionText: { fontSize: 11, fontWeight: '700' },

  // Announcements
  announcementHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  announcementRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  announcementDot: { width: 8, height: 8, borderRadius: 4, marginTop: 5, flexShrink: 0 },
  announcementContent: { flex: 1 },
  announcementTitle: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary, lineHeight: 18 },
  announcementTag: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start', marginTop: 3, marginBottom: 2 },
  announcementTagText: { fontSize: 10, fontWeight: '700' },
  announcementDate: { fontSize: 11, color: Colors.textMuted },

  sectionTitle: { fontSize: 14, fontWeight: '800', color: Colors.textPrimary, marginBottom: 4 },
});
