import PostCard, { Post } from '@/components/PostCard';
import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetBookmarks } from '../../hooks/api/post/use-get-bookmarks';

export default function BookmarkScreen() {
  const { data, isLoading, isRefetching, refetch } = useGetBookmarks();
  
  const rawBookmarks = data?.data?.bookmarkPosts || [];

  // Map the backend's BookmarkPostElement structure into the generic 'Post' type for PostCard
  const mappedBookmarks: Post[] = rawBookmarks.map((item) => ({
    _id: item.bookmarkPost._id,
    title: item.bookmarkPost.title,
    coverImage: item.bookmarkPost.coverImage,
    reads: item.bookmarkPost.reads,
    createdAt: item.bookmarkPost.createdAt,
    authorDetails: {
      _id: item.bookmarkPost.author,
      userId: item.userId,
      name: item.name,
      profilePhoto: item.profilePhoto,
    },
    likesCount: item.likesCount,
    commentsCount: item.commentsCount,
    isBookmarked: true, // We know these are bookmarked
  }));

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading && !isRefetching) {
    return (
      <View className="flex-1 bg-background">
        <StatusBar barStyle="dark-content" />
        <SafeAreaView className="flex-1" edges={['top']}>
          <View className="px-4 py-2 border-b border-gray-100 bg-white mb-2">
            <Text className="text-xl font-bold text-text">Bookmarks</Text>
          </View>
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#2563EB" />
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="px-4 py-2 border-b border-gray-100 bg-white mb-2">
            <Text className="text-xl font-bold text-text">Bookmarks</Text>
        </View>
        <FlatList
          data={mappedBookmarks}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <PostCard post={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 16, paddingBottom: 100 }}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} colors={["#2563EB"]} />
          }
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center mt-20">
              <Text className="text-muted text-base">You haven't bookmarked any posts yet.</Text>
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
}
