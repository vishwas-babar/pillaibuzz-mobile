import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotifications } from '../../hooks/api/user/use-notifications';
import { UserNotification } from '../../types/user';

const formatRelativeTime = (dateString: string) => {
  const timestamp = new Date(dateString).getTime();
  if (Number.isNaN(timestamp)) return '';

  const diffMs = Date.now() - timestamp;
  const isFuture = diffMs < 0;
  const absSeconds = Math.floor(Math.abs(diffMs) / 1000);

  const formatValue = (value: number, unit: string) =>
    isFuture ? `in ${value}${unit}` : `${value}${unit} ago`;

  if (absSeconds < 60) return isFuture ? 'soon' : 'just now';

  const absMinutes = Math.floor(absSeconds / 60);
  if (absMinutes < 60) return formatValue(absMinutes, 'm');

  const absHours = Math.floor(absMinutes / 60);
  if (absHours < 24) return formatValue(absHours, 'h');

  const absDays = Math.floor(absHours / 24);
  if (absDays < 7) return formatValue(absDays, 'd');

  const absWeeks = Math.floor(absDays / 7);
  if (absWeeks < 5) return formatValue(absWeeks, 'w');

  const absMonths = Math.floor(absDays / 30);
  if (absMonths < 12) return formatValue(absMonths, 'mo');

  const absYears = Math.floor(absDays / 365);
  return formatValue(absYears, 'y');
};

export default function NotificationsScreen() {
  const router = useRouter();
  const { data, isLoading, isRefetching, isError, error, refetch } = useNotifications();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const notifications = useMemo(
    () =>
      (data?.notifications ?? []).slice().sort((a, b) => {
        const first = new Date(a.notifications.createdAt).getTime() || 0;
        const second = new Date(b.notifications.createdAt).getTime() || 0;
        return second - first;
      }),
    [data]
  );

  const handleNotificationPress = (item: UserNotification) => {
    if (item.notifications.post_id) {
      router.push(`/post/${item.notifications.post_id}`);
      return;
    }

    if (item.userDetails?._id) {
      router.push(`/user/${item.userDetails._id}`);
    }
  };

  const renderItem = ({ item }: { item: UserNotification }) => {
    const notification = item.notifications;
    const displayName = item.userDetails?.name || item.userDetails?.userId || notification.userId;
    const profilePhoto =
      item.userDetails?.profilePhoto ||
      notification.userProfilePhoto ||
      'https://via.placeholder.com/150';
    const isUnread = !notification.readStatus;
    const canNavigate = Boolean(notification.post_id || item.userDetails?._id);

    return (
      <TouchableOpacity
        onPress={() => handleNotificationPress(item)}
        disabled={!canNavigate}
        activeOpacity={0.8}
        className={`flex-row items-center p-4 border-b border-gray-100 ${isUnread ? 'bg-blue-50' : 'bg-white'}`}
      >
        <Image source={{ uri: profilePhoto }} className="w-12 h-12 rounded-full mr-3 bg-gray-200" />
        <View className="flex-1">
          <Text className="text-text font-normal text-base leading-5">
            <Text className="font-bold">{displayName}</Text> {notification.message}
          </Text>
          <Text className="text-muted text-xs mt-1">{formatRelativeTime(notification.createdAt)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading && !isRefetching) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="px-4 py-3 border-b border-gray-100 bg-white">
          <Text className="text-xl font-bold text-text">Notifications</Text>
        </View>
        {isError && notifications.length === 0 ? (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-muted text-center mb-4">
              {error?.message || 'Failed to load notifications'}
            </Text>
            <TouchableOpacity onPress={() => refetch()} className="px-5 py-2 rounded-full bg-primary">
              <Text className="text-white font-semibold">Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item, index) => item.notifications?._id || `${item._id}-${index}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              colors={['#2563EB']}
            />
          }
          ListEmptyComponent={
            <View className="items-center justify-center pt-10 px-6">
              <Text className="text-muted text-center">No notifications yet</Text>
            </View>
          }
        />
        )}
      </SafeAreaView>
    </View>
  );
}
