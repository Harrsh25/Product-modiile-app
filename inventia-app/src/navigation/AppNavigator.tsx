import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Modal, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { ALL_MODULES } from '../data/mockData';
import { AttendanceScreen } from '../screens/AttendanceScreen';
import { AssignmentsScreen } from '../screens/AssignmentsScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { MoreScreen } from '../screens/MoreScreen';
import { ProjectsScreen } from '../screens/ProjectsScreen';
import { Colors } from '../theme/colors';
import { TabParamList } from '../types';

const Tab = createBottomTabNavigator<TabParamList>();

type TabIcon = 'home' | 'home-outline' | 'briefcase' | 'briefcase-outline' |
  'calendar' | 'calendar-outline' | 'folder' | 'folder-outline' |
  'grid' | 'grid-outline';

const TAB_CONFIG: Record<keyof TabParamList, { label: string; active: TabIcon; inactive: TabIcon }> = {
  Dashboard: { label: 'Home',      active: 'home',       inactive: 'home-outline'       },
  MyWork:    { label: 'My Work',   active: 'briefcase',  inactive: 'briefcase-outline'  },
  Attend:    { label: 'Attend',    active: 'calendar',   inactive: 'calendar-outline'   },
  Projects:  { label: 'Projects',  active: 'folder',     inactive: 'folder-outline'     },
  More:      { label: 'More',      active: 'grid',       inactive: 'grid-outline'       },
};

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => {
          const cfg = TAB_CONFIG[route.name as keyof TabParamList];
          return {
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.textMuted,
            tabBarLabelStyle: styles.tabLabel,
            tabBarItemStyle: styles.tabItem,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? cfg.active : cfg.inactive}
                size={22}
                color={color}
              />
            ),
            tabBarLabel: cfg.label,
          };
        }}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen
          name="MyWork"
          component={AssignmentsScreen}
          options={{
            tabBarBadge: undefined,
          }}
        />
        <Tab.Screen
          name="Attend"
          component={AttendanceScreen}
          options={{ tabBarBadge: 1 }}
        />
        <Tab.Screen name="Projects" component={ProjectsScreen} />
        <Tab.Screen name="More"     component={MoreScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 60,
    paddingBottom: 6,
    paddingTop: 4,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  tabItem: {
    paddingVertical: 0,
  },
});
