import ProfileView from '@/components/ProfileView';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';

export default function UserDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { user: currentUser } = useAuth();
  
  const userId = typeof id === 'string' ? id : id?.[0];
  const isCurrentUser = currentUser?._id === userId;

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1" edges={['top']}>
        {userId && <ProfileView userId={userId} isCurrentUser={isCurrentUser} showBackButton={true} />}
      </SafeAreaView>
    </View>
  );
}
