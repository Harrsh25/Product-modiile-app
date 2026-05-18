import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  FlatList, StyleSheet, Text, TextInput,
  TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBadge, TypeBadge } from '../components/StatusBadge';
import { ASSIGNMENTS } from '../data/mockData';
import { Colors } from '../theme/colors';
import { Assignment, AssignmentStatus } from '../types';

const STATUS_FILTERS: Array<AssignmentStatus | 'All'> = ['All', 'Not Started', 'Ongoing', 'Completed'];

export const AssignmentsScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [statusFilter, setStatusFilter] = useState<AssignmentStatus | 'All'>('All');
  const [selectedProject, setSelectedProject] = useState('All Projects');

  const filtered = useMemo(() => {
    return ASSIGNMENTS.filter((a) => {
      const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.parentTask.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || a.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const stats = useMemo(() => ({
    total:      ASSIGNMENTS.length,
    notStarted: ASSIGNMENTS.filter(a => a.status === 'Not Started').length,
    ongoing:    ASSIGNMENTS.filter(a => a.status === 'Ongoing').length,
    completed:  ASSIGNMENTS.filter(a => a.status === 'Completed').length,
    overdue:    ASSIGNMENTS.filter(a => a.status === 'Overdue').length,
  }), []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Assignments</Text>
        <TouchableOpacity style={styles.projectDropdown}>
          <Text style={styles.projectDropdownText}>{selectedProject}</Text>
          <Ionicons name="chevron-down" size={14} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* ── View toggle + search ── */}
      <View style={styles.toolbar}>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.viewBtn, viewMode === 'list' && styles.viewBtnActive]}
            onPress={() => setViewMode('list')}
          >
            <Ionicons name="list-outline" size={16} color={viewMode === 'list' ? Colors.primary : Colors.textMuted} />
            <Text style={[styles.viewBtnText, viewMode === 'list' && styles.viewBtnTextActive]}>List View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewBtn, viewMode === 'card' && styles.viewBtnActive]}
            onPress={() => setViewMode('card')}
          >
            <Ionicons name="grid-outline" size={16} color={viewMode === 'card' ? Colors.primary : Colors.textMuted} />
            <Text style={[styles.viewBtnText, viewMode === 'card' && styles.viewBtnTextActive]}>Card View</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={16} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search assignments..."
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={16} color={Colors.textSecondary} />
          <Text style={styles.filterBtnText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {/* ── Column headers ── */}
      <View style={styles.colHeader}>
        <Text style={[styles.colHeaderText, { flex: 2 }]}>ASSIGNMENT</Text>
        <Text style={styles.colHeaderText}>DUE / STATUS</Text>
      </View>

      {/* ── Assignment List ── */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AssignmentRow item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="clipboard-outline" size={40} color={Colors.border} />
            <Text style={styles.emptyText}>No assignments found</Text>
          </View>
        }
      />

      {/* ── Bottom Stats Bar ── */}
      <View style={styles.statsBar}>
        {[
          { value: stats.total,      label: '',           color: Colors.textPrimary },
          { value: stats.ongoing,    label: '',           color: Colors.primary     },
          { value: stats.notStarted, label: '',           color: Colors.warning     },
          { value: stats.completed,  label: '',           color: Colors.success     },
        ].map((s, i) => (
          <View key={i} style={styles.statItem}>
            <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const AssignmentRow: React.FC<{ item: Assignment }> = ({ item }) => (
  <TouchableOpacity style={styles.row} activeOpacity={0.75}>
    <View style={styles.rowLeft}>
      <TypeBadge type={item.type} />
      <Text style={styles.rowTitle}>{item.title}</Text>
      <Text style={styles.rowParent} numberOfLines={1}>{item.parentTask}</Text>
    </View>
    <View style={styles.rowRight}>
      <Text style={styles.rowDate}>{item.dueDate}</Text>
      <StatusBadge status={item.status} size="sm" />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, backgroundColor: Colors.surface,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: 17, fontWeight: '800', color: Colors.textPrimary },
  projectDropdown: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 10, paddingVertical: 6, backgroundColor: Colors.surfaceAlt,
    borderRadius: 8, borderWidth: 1, borderColor: Colors.border,
  },
  projectDropdownText: { fontSize: 12, color: Colors.textSecondary, fontWeight: '600' },

  toolbar: {
    flexDirection: 'row', paddingHorizontal: 16, paddingTop: 10, backgroundColor: Colors.surface,
  },
  viewToggle: { flexDirection: 'row', gap: 4 },
  viewBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: Colors.border,
  },
  viewBtnActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  viewBtnText: { fontSize: 12, color: Colors.textMuted, fontWeight: '600' },
  viewBtnTextActive: { color: Colors.primary },

  searchRow: {
    flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingVertical: 10,
    backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  searchBox: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: Colors.surfaceAlt, borderRadius: 10, paddingHorizontal: 12,
    borderWidth: 1, borderColor: Colors.border,
  },
  searchInput: { flex: 1, fontSize: 14, color: Colors.textPrimary, paddingVertical: 8 },
  filterBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 12, paddingVertical: 8, backgroundColor: Colors.surfaceAlt,
    borderRadius: 10, borderWidth: 1, borderColor: Colors.border,
  },
  filterBtnText: { fontSize: 13, color: Colors.textSecondary, fontWeight: '600' },

  colHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 8,
    backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  colHeaderText: { fontSize: 10, color: Colors.textMuted, fontWeight: '700', letterSpacing: 0.5 },

  listContent: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 80 },
  separator: { height: 1, backgroundColor: Colors.borderLight },

  row: {
    flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between',
    backgroundColor: Colors.surface, paddingVertical: 10, paddingHorizontal: 2,
  },
  rowLeft: { flex: 1, paddingRight: 12 },
  rowTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, marginTop: 4, lineHeight: 20 },
  rowParent: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  rowRight: { alignItems: 'flex-end', gap: 4, flexShrink: 0 },
  rowDate: { fontSize: 11, color: Colors.textMuted, fontWeight: '500' },

  empty: { alignItems: 'center', paddingTop: 60, gap: 10 },
  emptyText: { fontSize: 14, color: Colors.textMuted },

  statsBar: {
    flexDirection: 'row', backgroundColor: Colors.surface,
    borderTopWidth: 1, borderTopColor: Colors.border,
    paddingVertical: 10, paddingHorizontal: 16,
    position: 'absolute', bottom: 0, left: 0, right: 0,
    justifyContent: 'space-around',
  },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '800' },
});
