export const Colors = {
  // Backgrounds
  background: '#0F1117',
  surface: '#1A1D2E',
  surfaceElevated: '#252840',
  surfaceBorder: '#2E3155',

  // Brand
  primary: '#6C63FF',
  primaryLight: '#8B85FF',
  primaryDark: '#5046E5',
  secondary: '#4ECDC4',
  secondaryLight: '#7EDDD7',
  accent: '#FF6B9D',

  // Category colors
  frontend: '#FF6B9D',
  frontendLight: '#FF8FB3',
  backend: '#4ECDC4',
  backendLight: '#7EDDD7',
  database: '#FFD166',
  databaseLight: '#FFE099',
  api: '#6C63FF',
  apiLight: '#8B85FF',
  authentication: '#45B7D1',
  authenticationLight: '#72CCE0',
  security: '#F7444E',
  securityLight: '#FA7A80',
  testing: '#26C281',
  testingLight: '#57D49D',
  deployment: '#F7A93E',
  deploymentLight: '#F9C47A',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A3B8',
  textMuted: '#6B6E85',
  textOnPrimary: '#FFFFFF',

  // Status
  success: '#26C281',
  successLight: '#E8FBF3',
  warning: '#F7A93E',
  warningLight: '#FFF8EC',
  error: '#F7444E',
  errorLight: '#FEF0F0',
  info: '#45B7D1',
  infoLight: '#EBF8FC',

  // Difficulty / Importance
  beginner: '#26C281',
  intermediate: '#F7A93E',
  advanced: '#F7444E',
  critical: '#F7444E',
  high: '#F7A93E',
  medium: '#6C63FF',
  low: '#26C281',

  // UI
  divider: '#2E3155',
  shadow: 'rgba(0,0,0,0.4)',
  overlay: 'rgba(15,17,23,0.85)',
  cardBorder: 'rgba(108,99,255,0.15)',
  progressTrack: '#2E3155',
} as const;

export const Gradients = {
  primary: ['#6C63FF', '#4ECDC4'] as [string, string],
  header: ['#1A1D2E', '#252840'] as [string, string],
  card: ['#1A1D2E', '#252840'] as [string, string],
  frontend: ['#FF6B9D', '#FF8C69'] as [string, string],
  backend: ['#4ECDC4', '#45B7D1'] as [string, string],
  database: ['#FFD166', '#F7A93E'] as [string, string],
  api: ['#6C63FF', '#8B85FF'] as [string, string],
  authentication: ['#45B7D1', '#6C63FF'] as [string, string],
  security: ['#F7444E', '#FF6B9D'] as [string, string],
  testing: ['#26C281', '#4ECDC4'] as [string, string],
  deployment: ['#F7A93E', '#FFD166'] as [string, string],
};
