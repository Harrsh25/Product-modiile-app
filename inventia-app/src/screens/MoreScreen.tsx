import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Modal, ScrollView, StyleSheet, Text,
  TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '../components/Avatar';
import { ALL_MODULES, CURRENT_USER } from '../data/mockData';
import { Colors } from '../theme/colors';

export const MoreScreen: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState('');

  const quickModules = ALL_MODULES.slice(0, 8);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* Profile banner */}
        <View style={styles.profileBanner}>
          <Avatar user={CURRENT_USER} size={52} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{CURRENT_USER.name}</Text>
            <Text style={styles.profileRole}>{CURRENT_USER.role}</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="pencil-outline" size={16} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* All Modules Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Modules</Text>
        </View>
        <View style={styles.moduleGrid}>
          {ALL_MODULES.map((m) => {
            const isSelected = m.name === selectedModule;
            return (
              <TouchableOpacity
                key={m.id}
                style={[styles.moduleItem, isSelected && styles.moduleItemSelected]}
                onPress={() => setSelectedModule(m.name === selectedModule ? '' : m.name)}
                activeOpacity={0.75}
              >
                <View style={[styles.moduleIcon, { backgroundColor: `${m.color}15` }]}>
                  <Ionicons name={m.icon as any} size={24} color={m.color} />
                </View>
                <Text style={styles.moduleName} numberOfLines={1}>{m.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.customiseRow}>
          <Ionicons name="grid-outline" size={18} color={Colors.primary} />
          <Text style={styles.customiseText}>Customize Modules</Text>
          <Ionicons name="chevron-forward" size={16} color={Colors.primary} style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        {/* Settings */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Settings</Text>
        </View>
        {[
          { icon: 'notifications-outline', label: 'Notifications', color: Colors.primary },
          { icon: 'lock-closed-outline',   label: 'Privacy',       color: Colors.secondary },
          { icon: 'help-circle-outline',   label: 'Help & Support', color: Colors.success },
          { icon: 'log-out-outline',       label: 'Sign Out',      color: Colors.error },
        ].map((item) => (
          <TouchableOpacity key={item.label} style={styles.settingRow} activeOpacity={0.75}>
            <View style={[styles.settingIcon, { backgroundColor: `${item.color}15` }]}>
              <Ionicons name={item.icon as any} size={18} color={item.color} />
            </View>
            <Text style={styles.settingLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
          </TouchableOpacity>
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: 16, paddingBottom: 24 },

  profileBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: Colors.surface, borderRadius: 14, padding: 14,
    marginTop: 14, marginBottom: 4, borderWidth: 1, borderColor: Colors.border,
  },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary },
  profileRole: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  editBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },

  sectionHeader: { paddingVertical: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: Colors.textPrimary },

  moduleGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    backgroundColor: Colors.surface, borderRadius: 14, borderWidth: 1, borderColor: Colors.border, overflow: 'hidden',
  },
  moduleItem: { width: '25%', alignItems: 'center', padding: 14 },
  moduleItemSelected: { backgroundColor: Colors.primaryLight },
  moduleIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  moduleName: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600', textAlign: 'center' },

  customiseRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: Colors.surface,
    borderRadius: 14, borderWidth: 1, borderColor: Colors.border, padding: 14, marginTop: 8,
  },
  customiseText: { fontSize: 14, color: Colors.primary, fontWeight: '700' },

  settingRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: Colors.surface, borderRadius: 12, padding: 14,
    marginBottom: 8, borderWidth: 1, borderColor: Colors.border,
  },
  settingIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  settingLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
});
