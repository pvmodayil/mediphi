import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { HomeScreen } from '../screens/home/HomeScreen';
import { RecordsStackNavigator } from './RecordsStackNavigator';
import { MyQRCodeScreen } from '../screens/qr/MyQRCodeScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { theme } from '../theme';

export type MainTabParamList = {
  Home: undefined;
  Records: undefined;
  QRCode: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function TabIcon({ focused, label, isCenter }: { focused: boolean; label: string; isCenter?: boolean }) {
  if (isCenter) {
    return (
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: theme.colors.accent,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -20,
          shadowColor: theme.colors.textPrimary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 6,
        }}
      >
        <Text style={{ color: theme.colors.white, fontSize: 24, fontWeight: '700' }}>
          QR
        </Text>
      </View>
    );
  }

  return (
    <Text
      style={{
        color: focused ? theme.colors.accent : theme.colors.textSecondary,
        fontSize: 12,
        fontWeight: focused ? '600' : '400',
      }}
    >
      {label}
    </Text>
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
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="Home" />,
        }}
      />
      <Tab.Screen
        name="Records"
        component={RecordsStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="Records" />,
        }}
      />
      <Tab.Screen
        name="QRCode"
        component={MyQRCodeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="QR" isCenter />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="Profile" />,
        }}
      />
    </Tab.Navigator>
  );
}
