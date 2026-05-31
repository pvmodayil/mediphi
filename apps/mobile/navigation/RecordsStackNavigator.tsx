import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecordsListScreen } from '../screens/records/RecordsListScreen';
import { RecordDetailScreen } from '../screens/records/RecordDetailScreen';

export type RecordsStackParamList = {
  RecordsList: undefined;
  RecordDetail: { recordId: string };
};

const Stack = createNativeStackNavigator<RecordsStackParamList>();

export function RecordsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecordsList" component={RecordsListScreen} />
      <Stack.Screen name="RecordDetail" component={RecordDetailScreen} />
    </Stack.Navigator>
  );
}
