export type CategoryId =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'api'
  | 'authentication'
  | 'security'
  | 'testing'
  | 'deployment';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type Importance = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Rule {
  id: string;
  title: string;
  category: CategoryId;
  shortDescription: string;
  fullExplanation: string;
  whyItMatters: string;
  goodExample: string;
  badExample: string;
  checklist: string[];
  commonMistakes: string[];
  difficulty: Difficulty;
  importance: Importance;
}

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  color: string;
  gradient: [string, string];
  description: string;
  ruleCount: number;
}

export interface ChecklistProgress {
  [ruleId: string]: boolean;
}

export interface SavedRule {
  [ruleId: string]: boolean;
}

export interface AppSettings {
  darkMode: boolean;
  notificationsEnabled: boolean;
}

export type RootStackParamList = {
  MainTabs: undefined;
  Category: { categoryId: CategoryId; categoryName: string };
  RuleDetail: { ruleId: string };
};

export type TabParamList = {
  Home: undefined;
  Checklist: undefined;
  Architecture: undefined;
  Settings: undefined;
};
