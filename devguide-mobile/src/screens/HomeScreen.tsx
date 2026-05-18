import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryCard } from '../components/CategoryCard';
import { ProgressSummary } from '../components/ProgressSummary';
import { CATEGORIES, RULES } from '../data/developerRules';
import { fetchCategories } from '../services/api';
import { Colors } from '../theme/colors';
import { Category, CategoryId, ChecklistProgress } from '../types';
import { getChecklistProgress } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

const QUICK_LINKS: { icon: string; label: string; category: CategoryId }[] = [
  { icon: 'flash-outline', label: 'Critical', category: 'security' },
  { icon: 'star-outline', label: 'New Rules', category: 'deployment' },
  { icon: 'flame-outline', label: 'Popular', category: 'api' },
];

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [progress, setProgress] = useState<ChecklistProgress>({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    const [cats, prog] = await Promise.all([fetchCategories(), getChecklistProgress()]);
    setCategories(cats);
    setProgress(prog);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  // Recalculate when screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getChecklistProgress().then(setProgress);
    });
    return unsubscribe;
  }, [navigation]);

  const completedCount = Object.values(progress).filter(Boolean).length;
  const totalRules = RULES.length;

  const getCompletedForCategory = (categoryId: CategoryId) =>
    RULES.filter((r) => r.category === categoryId && progress[r.id]).length;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading DevGuide...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back 👋</Text>
            <Text style={styles.appName}>DevGuide</Text>
            <Text style={styles.appNameAccent}>Mobile</Text>
          </View>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="notifications-outline" size={22} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* ── Subtitle ── */}
        <Text style={styles.subtitle}>
          Developer rules · Backend flow · Database · APIs · Deployment
        </Text>

        {/* ── Progress Summary ── */}
        <ProgressSummary completed={completedCount} total={totalRules} />

        {/* ── Quick Links ── */}
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickLinksScroll}>
          {QUICK_LINKS.map((link) => {
            const cat = categories.find((c) => c.id === link.category);
            return (
              <TouchableOpacity
                key={link.label}
                style={[styles.quickLink, { borderColor: `${cat?.color ?? Colors.primary}40` }]}
                onPress={() => cat && navigation.navigate('Category', { categoryId: cat.id, categoryName: cat.name })}
                activeOpacity={0.8}
              >
                <Ionicons name={link.icon as any} size={16} color={cat?.color ?? Colors.primary} />
                <Text style={[styles.quickLinkText, { color: cat?.color ?? Colors.primary }]}>{link.label}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={[styles.quickLink, { borderColor: `${Colors.secondary}40` }]}
            onPress={() => {}}
            activeOpacity={0.8}
          >
            <Ionicons name="bookmark-outline" size={16} color={Colors.secondary} />
            <Text style={[styles.quickLinkText, { color: Colors.secondary }]}>Saved</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* ── Category Grid ── */}
        <Text style={styles.sectionTitle}>Browse Categories</Text>

        <View style={styles.categoryGrid}>
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              completedCount={getCompletedForCategory(cat.id)}
              onPress={() => navigation.navigate('Category', { categoryId: cat.id, categoryName: cat.name })}
            />
          ))}
        </View>

        {/* ── Featured Rule Banner ── */}
        <Text style={styles.sectionTitle}>Rule of the Day</Text>
        <FeaturedRuleBanner onPress={() => navigation.navigate('RuleDetail', { ruleId: 'sec-001' })} />

        <View style={styles.bottomPad} />
      </ScrollView>
    </SafeAreaView>
  );
};

const FeaturedRuleBanner = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
    <LinearGradient colors={['#F7444E', '#FF6B9D']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.banner}>
      <View style={styles.bannerIcon}>
        <Ionicons name="lock-closed-outline" size={28} color="#FFFFFF" />
      </View>
      <View style={styles.bannerContent}>
        <Text style={styles.bannerCategory}>SECURITY</Text>
        <Text style={styles.bannerTitle}>Validate & Sanitise All Inputs</Text>
        <Text style={styles.bannerDesc} numberOfLines={2}>
          Prevent SQL injection and XSS by validating types and sanitising all user inputs.
        </Text>
      </View>
      <Ionicons name="arrow-forward-circle" size={28} color="rgba(255,255,255,0.7)" />
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  loadingContainer: {
    flex: 1, backgroundColor: Colors.background,
    alignItems: 'center', justifyContent: 'center', gap: 12,
  },
  loadingText: { color: Colors.textSecondary, fontSize: 14 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 12,
    marginBottom: 6,
  },
  greeting: { fontSize: 13, color: Colors.textMuted, fontWeight: '500', marginBottom: 2 },
  appName: { fontSize: 32, fontWeight: '900', color: Colors.textPrimary, lineHeight: 34 },
  appNameAccent: { fontSize: 32, fontWeight: '900', color: Colors.primary, lineHeight: 34, marginTop: -6 },
  headerBtn: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.surfaceBorder,
  },
  subtitle: {
    fontSize: 13, color: Colors.textMuted, marginBottom: 20,
    lineHeight: 19, fontWeight: '400',
  },
  sectionTitle: {
    fontSize: 18, fontWeight: '800', color: Colors.textPrimary,
    marginBottom: 12, marginTop: 8,
  },
  quickLinksScroll: { marginBottom: 20 },
  quickLink: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 9,
    backgroundColor: Colors.surface, borderRadius: 12,
    borderWidth: 1, marginRight: 8,
  },
  quickLinkText: { fontSize: 13, fontWeight: '700' },
  categoryGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'space-between', gap: 0,
    marginBottom: 8,
  },
  banner: {
    borderRadius: 20, padding: 18,
    flexDirection: 'row', alignItems: 'center', gap: 14,
  },
  bannerIcon: {
    width: 52, height: 52, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  bannerContent: { flex: 1 },
  bannerCategory: {
    fontSize: 10, fontWeight: '800',
    color: 'rgba(255,255,255,0.7)', letterSpacing: 1.2, marginBottom: 3,
  },
  bannerTitle: { fontSize: 15, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 },
  bannerDesc: { fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 17 },
  bottomPad: { height: 20 },
});
