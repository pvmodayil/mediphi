import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MediPhiIDRevealScreen } from '../screens/onboarding/MediPhiIDRevealScreen';

export type OnboardingStackParamList = {
  MediPhiIDReveal: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MediPhiIDReveal" component={MediPhiIDRevealScreen} />
    </Stack.Navigator>
  );
}
