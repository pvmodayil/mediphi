import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { LoadingScreen } from '../components/common/LoadingScreen';
import { AuthStackNavigator } from './AuthStackNavigator';
import { OnboardingStackNavigator } from './OnboardingStackNavigator';
import { MainTabsNavigator } from './MainTabsNavigator';

export type RootStackParamList = {
  Auth: undefined;
  Onboarding: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { user, loading, onboardingComplete } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthStackNavigator} />
        ) : !onboardingComplete ? (
          <Stack.Screen name="Onboarding" component={OnboardingStackNavigator} />
        ) : (
          <Stack.Screen name="Main" component={MainTabsNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
