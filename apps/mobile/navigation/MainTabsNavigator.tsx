import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { HomeScreen } from '../screens/home/HomeScreen';
import { RecordsStackNavigator } from './RecordsStackNavigator';
import { MyQRCodeScreen } from '../screens/qr/MyQRCodeScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { theme } from '../theme';
import { Icon } from '../components/common/Icon';

export type MainTabParamList = {
  Home: undefined;
  Records: undefined;
  QRCode: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function TabIcon({ focused, icon, isCenter }: { focused: boolean; icon: 'home' | 'file-text' | 'qr' | 'user'; isCenter?: boolean }) {
  if (isCenter) {
    return (
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: theme.colors.accent,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -24,
          ...theme.shadows.lg,
        }}
      >
        <Icon name="qr" size={28} color={theme.colors.white} strokeWidth={1.8} />
      </View>
    );
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <Icon
        name={icon}
        size={22}
        color={focused ? theme.colors.accent : theme.colors.textSecondary}
        strokeWidth={focused ? 2.2 : 1.6}
      />
      <View
        style={{
          width: 4,
          height: 4,
          borderRadius: 2,
          backgroundColor: focused ? theme.colors.accent : 'transparent',
          marginTop: 2,
        }}
      />
    </View>
  );
}

export function MainTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          height: 72,
          paddingBottom: 8,
          paddingTop: 8,
          shadowColor: theme.colors.textPrimary,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.04,
          shadowRadius: 12,
          elevation: 8,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="home" />,
        }}
      />
      <Tab.Screen
        name="Records"
        component={RecordsStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="file-text" />,
        }}
      />
      <Tab.Screen
        name="QRCode"
        component={MyQRCodeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="qr" isCenter />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="user" />,
        }}
      />
    </Tab.Navigator>
  );
}
