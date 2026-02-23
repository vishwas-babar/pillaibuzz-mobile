import ProfileView from '@/components/ProfileView';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { LogOut } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, Alert, StatusBar, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';

export default function ProfileScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user: currentUser, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const performLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      await logout();
      queryClient.clear();
      router.replace('/(auth)/login');
    } catch {
      Alert.alert('Logout failed', 'Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleLogoutPress = () => {
    Alert.alert('Logout', 'Do you want to logout from your account?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => void performLogout() },
    ]);
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="absolute right-4 top-3 z-20">
          <TouchableOpacity
            onPress={handleLogoutPress}
            disabled={isLoggingOut}
            accessibilityRole="button"
            accessibilityLabel="Logout"
            className={`rounded-full w-10 h-10 items-center justify-center ${isLoggingOut ? 'bg-red-400' : 'bg-red-500'}`}
          >
            {isLoggingOut ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <LogOut size={18} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
        {currentUser?._id && <ProfileView userId={currentUser._id} isCurrentUser={true} showBackButton={false} />}
      </SafeAreaView>
    </View>
  );
}
