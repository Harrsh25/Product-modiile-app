import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  Dimensions, FlatList, Modal, ScrollView,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AvatarGroup } from '../components/Avatar';
import { StatusBadge } from '../components/StatusBadge';
import { ALL_MODULES, PROJECTS } from '../data/mockData';
import { Colors } from '../theme/colors';
import { Project, ProjectStatus } from '../types';

const { width } = Dimensions.get('window');
type Filter = 'All' | ProjectStatus;
const FILTERS: Filter[] = ['All', 'Active', 'Priority', 'Completed', 'Not Started'];

export const ProjectsScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [showModules, setShowModules] = useState(false);
  const [selectedModule, setSelectedModule] = useState('Projects');

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter(p => p.status === activeFilter);
  }, [activeFilter]);

  const stats = {
    total:    PROJECTS.length,
    active:   PROJECTS.filter(p => p.status === 'Active').length,
    done:     PROJECTS.filter(p => p.status === 'Completed').length,
    overdue:  PROJECTS.filter(p => p.status === 'Overdue').length,
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Projects</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="search-outline" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addBtn}>
            <Ionicons name="add" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Filter Tabs ── */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContent}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, activeFilter === f && styles.filterTabActive]}
            onPress={() => setActiveFilter(f)}
          >
            <Text style={[styles.filterTabText, activeFilter === f && styles.filterTabTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ── Stats Row ── */}
      <View style={styles.statsRow}>
        <StatBubble icon="layers-outline"    value={stats.total}  label="Total"   color={Colors.primary}   />
        <StatBubble icon="play-circle-outline" value={stats.active} label="Active"  color={Colors.success}   />
        <StatBubble icon="checkmark-circle-outline" value={stats.done}  label="Done"    color={Colors.teal}      />
        <StatBubble icon="alert-circle-outline" value={stats.overdue} label="Overdue" color={Colors.error}     />
      </View>

      {/* ── Project List ── */}
      <FlatList
        data={filtered}
        keyExtractor={p => p.id}
        renderItem={({ item }) => <ProjectCard project={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="folder-open-outline" size={40} color={Colors.border} />
            <Text style={styles.emptyText}>No projects found</Text>
          </View>
        }
      />

      {/* ── All Modules Modal ── */}
      <Modal visible={showModules} animationType="slide" transparent onRequestClose={() => setShowModules(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowModules(false)}>
          <View style={styles.modalSheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>All Modules</Text>
              <TouchableOpacity onPress={() => setShowModules(false)}>
                <Ionicons name="close" size={22} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <View style={styles.moduleGrid}>
              {ALL_MODULES.map((m) => {
                const isSelected = m.name === selectedModule;
                return (
                  <TouchableOpacity
                    key={m.id}
                    style={[styles.moduleItem, isSelected && styles.moduleItemSelected]}
                    onPress={() => setSelectedModule(m.name)}
                    activeOpacity={0.75}
                  >
                    {m.badge && (
                      <View style={styles.moduleBadge}>
                        <Text style={styles.moduleBadgeText}>{m.badge}</Text>
                      </View>
                    )}
                    <View style={[styles.moduleIcon, { backgroundColor: `${m.color}18` }, isSelected && { backgroundColor: `${m.color}25` }]}>
                      <Ionicons name={m.icon as any} size={22} color={m.color} />
                    </View>
                    <Text style={[styles.moduleName, isSelected && { color: Colors.primary }]} numberOfLines={1}>{m.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <TouchableOpacity style={styles.customiseRow}>
              <Ionicons name="grid-outline" size={18} color={Colors.primary} />
              <Text style={styles.customiseText}>Customize Modules</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.primary} style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

// ─── Project Card ─────────────────────────────────────────────────────────────
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={cardStyles.card}>
      <View style={cardStyles.topRow}>
        <View style={cardStyles.titleArea}>
          <Text style={cardStyles.projectName}>{project.name}</Text>
          <StatusBadge status={project.status} size="sm" />
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={18} color={Colors.textMuted} />
        </TouchableOpacity>
      </View>

      <View style={cardStyles.infoRow}>
        <View style={cardStyles.infoItem}>
          <Ionicons name="people-outline" size={12} color={Colors.textMuted} />
          <Text style={cardStyles.infoText}>{project.members.length} Total projects</Text>
        </View>
        <View style={cardStyles.infoItem}>
          <Ionicons name="calendar-outline" size={12} color={Colors.textMuted} />
          <Text style={cardStyles.infoText}>{project.startDate} - {project.endDate}</Text>
        </View>
      </View>

      <View style={cardStyles.progressRow}>
        <AvatarGroup users={project.members} size={26} max={3} />
        <View style={cardStyles.progressRight}>
          <Text style={cardStyles.progressPct}>{project.progress}%</Text>
          <View style={cardStyles.progressTrack}>
            <View style={[
              cardStyles.progressFill,
              { width: `${project.progress}%`,
                backgroundColor: project.progress === 100 ? Colors.success :
                  project.progress > 60 ? Colors.primary : Colors.warning }
            ]} />
          </View>
        </View>
      </View>

      <TouchableOpacity style={cardStyles.showMore} onPress={() => setExpanded(e => !e)}>
        <Text style={cardStyles.showMoreText}>
          {expanded ? 'Hide project details' : 'Show more projects'}
        </Text>
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={12} color={Colors.primary} />
      </TouchableOpacity>

      {expanded && (
        <View style={cardStyles.expandedContent}>
          <View style={cardStyles.taskStats}>
            <Text style={cardStyles.taskStatText}>{project.completedTasks}/{project.totalTasks} tasks completed</Text>
            <Text style={cardStyles.taskStatText}>{project.description}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const cardStyles = StyleSheet.create({
  card: { backgroundColor: Colors.surface, borderRadius: 14, borderWidth: 1, borderColor: Colors.border, padding: 14, marginBottom: 10 },
  topRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  titleArea: { flex: 1, gap: 4 },
  projectName: { fontSize: 15, fontWeight: '800', color: Colors.textPrimary },
  infoRow: { flexDirection: 'row', gap: 14, marginBottom: 10 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  infoText: { fontSize: 11, color: Colors.textMuted },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  progressRight: { flex: 1 },
  progressPct: { fontSize: 12, fontWeight: '700', color: Colors.textSecondary, marginBottom: 4, textAlign: 'right' },
  progressTrack: { height: 6, backgroundColor: Colors.border, borderRadius: 3 },
  progressFill: { height: 6, borderRadius: 3 },
  showMore: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 10, paddingTop: 8, borderTopWidth: 1, borderTopColor: Colors.borderLight },
  showMoreText: { fontSize: 12, color: Colors.primary, fontWeight: '600' },
  expandedContent: { marginTop: 8 },
  taskStats: { gap: 4 },
  taskStatText: { fontSize: 12, color: Colors.textSecondary },
});

// ─── Stat Bubble ─────────────────────────────────────────────────────────────
const StatBubble = ({ icon, value, label, color }: { icon: string; value: number; label: string; color: string }) => (
  <View style={bubbleStyles.item}>
    <View style={[bubbleStyles.iconBg, { backgroundColor: `${color}15` }]}>
      <Ionicons name={icon as any} size={18} color={color} />
    </View>
    <Text style={[bubbleStyles.value, { color }]}>{value}</Text>
    <Text style={bubbleStyles.label}>{label}</Text>
  </View>
);
const bubbleStyles = StyleSheet.create({
  item: { flex: 1, alignItems: 'center', gap: 3 },
  iconBg: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  value: { fontSize: 18, fontWeight: '900' },
  label: { fontSize: 11, color: Colors.textMuted, fontWeight: '600' },
});

// ─── Main Styles ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  headerActions: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  searchBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.surfaceAlt, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.border },
  addBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },

  filterScroll: { backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.border },
  filterContent: { paddingHorizontal: 14, paddingVertical: 8, gap: 6 },
  filterTab: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: Colors.border },
  filterTabActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterTabText: { fontSize: 13, color: Colors.textSecondary, fontWeight: '600' },
  filterTabTextActive: { color: '#FFFFFF' },

  statsRow: { flexDirection: 'row', backgroundColor: Colors.surface, paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: Colors.border },

  listContent: { paddingHorizontal: 14, paddingTop: 12, paddingBottom: 24 },
  empty: { alignItems: 'center', paddingTop: 60, gap: 10 },
  emptyText: { fontSize: 14, color: Colors.textMuted },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: Colors.overlay, justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: Colors.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingBottom: 32, maxHeight: '85%' },
  sheetHandle: { width: 40, height: 4, backgroundColor: Colors.border, borderRadius: 2, alignSelf: 'center', marginTop: 10, marginBottom: 4 },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14 },
  sheetTitle: { fontSize: 17, fontWeight: '800', color: Colors.textPrimary },
  moduleGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  moduleItem: { width: '25%', alignItems: 'center', padding: 10, borderRadius: 12, position: 'relative' },
  moduleItemSelected: { borderWidth: 1.5, borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  moduleBadge: { position: 'absolute', top: 6, right: 6, width: 16, height: 16, borderRadius: 8, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  moduleBadgeText: { fontSize: 9, color: '#fff', fontWeight: '800' },
  moduleIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  moduleName: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600', textAlign: 'center' },
  customiseRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 14, borderTopWidth: 1, borderTopColor: Colors.border, marginTop: 4 },
  customiseText: { fontSize: 14, color: Colors.primary, fontWeight: '700' },
});
