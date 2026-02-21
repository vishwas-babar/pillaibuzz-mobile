import PostCard from '@/components/PostCard';
import { Pencil } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserPosts } from '../../hooks/api/post/use-user-posts';
import { useUserDetails } from '../../hooks/api/user/use-user-details';
import { useAuth } from '../../hooks/useAuth';

export default function ProfileScreen() {
  const { user: currentUser } = useAuth();
  const userId = currentUser?._id;

  const { data: userDetailsResponse, isLoading: isUserLoading, refetch: refetchUser, isRefetching: isRefetchingUser } = useUserDetails(userId);
  const { data: userPostsResponse, isLoading: isPostsLoading, refetch: refetchPosts, isRefetching: isRefetchingPosts } = useUserPosts(userId);

  const userDetails = userDetailsResponse?.data;
  const userPosts = userPostsResponse?.posts || [];

  const isLoading = isUserLoading || isPostsLoading;
  const isRefreshing = isRefetchingUser || isRefetchingPosts;

  const onRefresh = () => {
    if (userId) {
      refetchUser();
      refetchPosts();
    }
  };

  const renderHeader = () => {
    if (!userDetails) return null;

    return (
      <View className="items-center mb-6 pt-4 px-4 bg-white pb-6 border-b border-gray-100">
        <View className="relative">
          <Image 
            source={{ uri: userDetails.profilePhoto || userDetails.profilePhotoPublic_id || 'https://via.placeholder.com/150' }} 
            className="w-24 h-24 rounded-full bg-gray-200 border-2 border-white shadow-sm"
          />
          <TouchableOpacity className="absolute bottom-0 right-0 bg-primary p-2 rounded-full border border-white shadow-sm">
            <Pencil size={14} color="white" />
          </TouchableOpacity>
        </View>
        
        <Text className="text-text text-xl font-bold mt-3">{userDetails.name}</Text>
        <Text className="text-muted text-sm">@{userDetails.userId}</Text>
        <Text className="text-gray-600 text-sm mt-1">{userDetails.role || userDetails.userType}</Text>
      </View>
    );
  };

  if (isLoading && !isRefreshing) {
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
        <FlatList
          data={userPosts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <PostCard post={item} />}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={["#2563EB"]} />
          }
          ListEmptyComponent={
            <View className="flex-1 items-center mt-10">
              <Text className="text-muted">No posts yet</Text>
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
}
