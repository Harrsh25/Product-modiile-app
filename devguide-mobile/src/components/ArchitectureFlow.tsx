import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../theme/colors';

interface ArchNode {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  bg: string;
  details: string[];
}

const NODES: ArchNode[] = [
  {
    icon: 'phone-portrait-outline',
    title: 'Mobile App',
    subtitle: 'React Native / Expo',
    color: '#6C63FF',
    bg: 'rgba(108,99,255,0.15)',
    details: ['Renders UI', 'Manages local state', 'Calls REST API', 'Stores tokens securely'],
  },
  {
    icon: 'git-network-outline',
    title: 'REST API',
    subtitle: 'HTTPS + JSON',
    color: '#4ECDC4',
    bg: 'rgba(78,205,196,0.15)',
    details: ['Versioned routes (/v1)', 'JWT-protected endpoints', 'Validated requests', 'Consistent response format'],
  },
  {
    icon: 'server-outline',
    title: 'Backend Server',
    subtitle: 'Node.js + Express',
    color: '#FFD166',
    bg: 'rgba(255,209,102,0.15)',
    details: ['Route → Controller → Service', 'Business logic layer', 'Error handling middleware', 'Rate limiting'],
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'Auth Service',
    subtitle: 'JWT + bcrypt',
    color: '#45B7D1',
    bg: 'rgba(69,183,209,0.15)',
    details: ['Issues signed JWTs', 'Verifies tokens on requests', 'Hashes passwords with bcrypt', 'Refresh token rotation'],
  },
  {
    icon: 'cylinder-outline',
    title: 'Database',
    subtitle: 'MongoDB / PostgreSQL',
    color: '#F7A93E',
    bg: 'rgba(247,169,62,0.15)',
    details: ['Stores users, rules, checklist', 'Indexed queries', 'Versioned migrations', 'Managed with backups'],
  },
  {
    icon: 'cloud-outline',
    title: 'Cloud Hosting',
    subtitle: 'Railway / AWS / Render',
    color: '#FF6B9D',
    bg: 'rgba(255,107,157,0.15)',
    details: ['Auto-scaling', 'CI/CD deployments', 'Environment variables', 'Logging & monitoring'],
  },
];

const ArrowDown = () => (
  <View style={styles.arrowContainer}>
    <View style={styles.arrowLine} />
    <View style={styles.arrowHead} />
  </View>
);

export const ArchitectureFlow: React.FC = () => {
  return (
    <View style={styles.container}>
      {NODES.map((node, index) => (
        <View key={node.title}>
          <ArchNodeCard node={node} />
          {index < NODES.length - 1 && <ArrowDown />}
        </View>
      ))}
    </View>
  );
};

const ArchNodeCard = ({ node }: { node: ArchNode }) => (
  <View style={[styles.nodeCard, { borderColor: `${node.color}30`, backgroundColor: node.bg }]}>
    <View style={styles.nodeHeader}>
      <View style={[styles.nodeIconBg, { backgroundColor: `${node.color}25` }]}>
        <Ionicons name={node.icon as any} size={22} color={node.color} />
      </View>
      <View style={styles.nodeTitles}>
        <Text style={[styles.nodeTitle, { color: node.color }]}>{node.title}</Text>
        <Text style={styles.nodeSubtitle}>{node.subtitle}</Text>
      </View>
    </View>
    <View style={styles.detailsList}>
      {node.details.map((d) => (
        <View key={d} style={styles.detailRow}>
          <View style={[styles.detailDot, { backgroundColor: node.color }]} />
          <Text style={styles.detailText}>{d}</Text>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  nodeCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
  },
  nodeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 12,
  },
  nodeIconBg: {
    width: 46,
    height: 46,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeTitles: {
    flex: 1,
  },
  nodeTitle: {
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 20,
  },
  nodeSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '500',
    marginTop: 1,
  },
  detailsList: {
    gap: 5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  detailText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  arrowContainer: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  arrowLine: {
    width: 2,
    height: 18,
    backgroundColor: Colors.surfaceBorder,
    borderRadius: 1,
  },
  arrowHead: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.surfaceBorder,
  },
});
