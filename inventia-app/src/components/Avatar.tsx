import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { User } from '../types';

interface Props {
  user: User;
  size?: number;
  style?: object;
}

export const Avatar: React.FC<Props> = ({ user, size = 32, style }) => (
  <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: user.color }, style]}>
    <Text style={[styles.initials, { fontSize: size * 0.35 }]}>{user.initials}</Text>
  </View>
);

interface AvatarGroupProps {
  users: User[];
  size?: number;
  max?: number;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({ users, size = 28, max = 4 }) => {
  const shown = users.slice(0, max);
  const extra = users.length - max;
  return (
    <View style={styles.group}>
      {shown.map((u, i) => (
        <View key={u.id} style={[styles.groupItem, { marginLeft: i === 0 ? 0 : -(size * 0.3) }]}>
          <Avatar user={u} size={size} style={styles.bordered} />
        </View>
      ))}
      {extra > 0 && (
        <View style={[styles.extra, { width: size, height: size, borderRadius: size / 2, marginLeft: -(size * 0.3) }]}>
          <Text style={[styles.extraText, { fontSize: size * 0.33 }]}>+{extra}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: { alignItems: 'center', justifyContent: 'center' },
  initials: { color: '#FFFFFF', fontWeight: '700' },
  group: { flexDirection: 'row', alignItems: 'center' },
  groupItem: { zIndex: 1 },
  bordered: { borderWidth: 2, borderColor: '#FFFFFF' },
  extra: {
    backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#FFFFFF',
  },
  extraText: { color: '#6B7280', fontWeight: '700' },
});
