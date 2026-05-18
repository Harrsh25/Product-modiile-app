import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppSettings, ChecklistProgress, SavedRule } from '../types';

const KEYS = {
  CHECKLIST_PROGRESS: '@devguide/checklist_progress',
  SAVED_RULES: '@devguide/saved_rules',
  APP_SETTINGS: '@devguide/settings',
} as const;

// ─── Checklist Progress ──────────────────────────────────────────────────────

export const getChecklistProgress = async (): Promise<ChecklistProgress> => {
  try {
    const raw = await AsyncStorage.getItem(KEYS.CHECKLIST_PROGRESS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const setRuleCompleted = async (
  ruleId: string,
  completed: boolean
): Promise<ChecklistProgress> => {
  const progress = await getChecklistProgress();
  const updated = { ...progress, [ruleId]: completed };
  await AsyncStorage.setItem(KEYS.CHECKLIST_PROGRESS, JSON.stringify(updated));
  return updated;
};

export const resetChecklistProgress = async (): Promise<void> => {
  await AsyncStorage.removeItem(KEYS.CHECKLIST_PROGRESS);
};

// ─── Saved Rules ─────────────────────────────────────────────────────────────

export const getSavedRules = async (): Promise<SavedRule> => {
  try {
    const raw = await AsyncStorage.getItem(KEYS.SAVED_RULES);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const toggleSavedRule = async (ruleId: string): Promise<boolean> => {
  const saved = await getSavedRules();
  const isNowSaved = !saved[ruleId];
  const updated = { ...saved, [ruleId]: isNowSaved };
  if (!isNowSaved) delete updated[ruleId];
  await AsyncStorage.setItem(KEYS.SAVED_RULES, JSON.stringify(updated));
  return isNowSaved;
};

// ─── App Settings ────────────────────────────────────────────────────────────

const DEFAULT_SETTINGS: AppSettings = {
  darkMode: true,
  notificationsEnabled: false,
};

export const getSettings = async (): Promise<AppSettings> => {
  try {
    const raw = await AsyncStorage.getItem(KEYS.APP_SETTINGS);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const updateSettings = async (
  updates: Partial<AppSettings>
): Promise<AppSettings> => {
  const current = await getSettings();
  const updated = { ...current, ...updates };
  await AsyncStorage.setItem(KEYS.APP_SETTINGS, JSON.stringify(updated));
  return updated;
};
