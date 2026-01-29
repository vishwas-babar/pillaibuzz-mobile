import React from 'react';
import { FlatList, Image, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Notification {
  id: string;
  message: string;
  userName: string;
  userProfilePhoto: string;
  notificationType: "likePost" | "commentPost" | "createPost";
  createdAt: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    message: 'liked your post',
    userName: 'raj naik',
    userProfilePhoto: 'https://i.pravatar.cc/150?img=1',
    notificationType: 'likePost',
    createdAt: '2 mins ago',
  },
  {
    id: '2',
    message: 'commented on your post: "Great insights!"',
    userName: 'pranay gharat',
    userProfilePhoto: 'https://i.pravatar.cc/150?img=2',
    notificationType: 'commentPost',
    createdAt: '1 hour ago',
  },
  {
    id: '3',
    message: 'started following you',
    userName: 'nitesh gharat',
    userProfilePhoto: 'https://i.pravatar.cc/150?img=3',
    notificationType: 'createPost', // Using createPost type as generic/follow for now based on prompt constraints
    createdAt: '3 hours ago',
  },
  {
    id: '4',
    message: 'posted a new photo',
    userName: 'vishwas babar',
    userProfilePhoto: 'https://i.pravatar.cc/150?img=4',
    notificationType: 'createPost',
    createdAt: '1 day ago',
  },
  {
    id: '5',
    message: 'liked your comment',
    userName: 'raj naik',
    userProfilePhoto: 'https://i.pravatar.cc/150?img=1',
    notificationType: 'likePost',
    createdAt: '2 days ago',
  },
  {
    id: '6',
    message: 'mentioned you in a post',
    userName: 'pranay gharat',
    userProfilePhoto: 'https://i.pravatar.cc/150?img=2',
    notificationType: 'commentPost',
    createdAt: '3 days ago',
  }
];

export default function NotificationsScreen() {
  const renderItem = ({ item }: { item: Notification }) => (
    <View className="flex-row items-center p-4 border-b border-gray-50 bg-white">
      <Image 
        source={{ uri: item.userProfilePhoto }} 
        className="w-12 h-12 rounded-full mr-3 bg-gray-200"
      />
      <View className="flex-1">
        <Text className="text-text font-normal text-base leading-5">
          <Text className="font-bold">{item.userName}</Text> {item.message}
        </Text>
        <Text className="text-muted text-xs mt-1">{item.createdAt}</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="px-4 py-3 border-b border-gray-100 bg-white">
            <Text className="text-xl font-bold text-text">Notifications</Text>
        </View>
        <FlatList
          data={MOCK_NOTIFICATIONS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </SafeAreaView>
    </View>
  );
}
