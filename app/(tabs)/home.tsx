import PostCard from '@/components/PostCard';
import React, { useMemo } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePosts } from '../../hooks/api/post/use-posts';

export default function HomeScreen() {
  const { 
    data, 
    isLoading, 
    isFetchingNextPage, 
    hasNextPage, 
    fetchNextPage, 
    refetch, 
    isRefetching 
  } = usePosts();

  const posts = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.posts);
  }, [data]);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) return <View className="h-4" />;
    return (
      <View className="py-4 items-center justify-center">
        <ActivityIndicator size="small" color="#2563EB" />
      </View>
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
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <PostCard post={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 16, paddingBottom: 100 }}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} colors={["#2563EB"]} />
          }
          ListEmptyComponent={
            <View className="flex-1 items-center mt-10">
              <Text className="text-muted">No posts available</Text>
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
}
