import PostCard from '@/components/PostCard';
import { useRouter } from 'expo-router';
import { Search as SearchIcon } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSearchPosts } from '../../hooks/api/post/use-search-posts';
import { useSearchUsers } from '../../hooks/api/user/use-search-users';
import { SearchUser } from '../../types/user';

type SearchTab = 'users' | 'posts';

export default function SearchScreen() {
  const [activeTab, setActiveTab] = useState<SearchTab>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const router = useRouter();

  // Debounce the search query to avoid spamming the API
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const { data: usersData, isFetching: isFetchingUsers } = useSearchUsers(debouncedQuery);
  const { data: postsData, isFetching: isFetchingPosts } = useSearchPosts(debouncedQuery);

  const users = usersData?.users || [];
  const posts = postsData?.posts || [];

  const renderUserItem = ({ item }: { item: SearchUser }) => (
    <TouchableOpacity 
      onPress={() => router.push(`/user/${item._id}`)}
      className="flex-row items-center justify-between p-4 bg-white border-b border-gray-100"
    >
      <View className="flex-row items-center flex-1 pr-4">
        <Image 
          source={{ uri: item.profilePhoto || 'https://via.placeholder.com/150' }} 
          className="w-12 h-12 rounded-full bg-gray-200"
        />
        <View className="ml-3 flex-1">
          <Text className="text-text font-bold text-base" numberOfLines={1}>{item.name}</Text>
          <Text className="text-muted text-sm" numberOfLines={1}>@{item.userId}</Text>
        </View>
      </View>
      {/* <TouchableOpacity 
        className="px-4 py-1.5 rounded-full border bg-primary border-primary"
      >
        <Text className="text-sm font-semibold text-white">
          Follow
        </Text>
      </TouchableOpacity> */}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1" edges={['top']}>
        
        {/* Header Section */}
        <View className="bg-white px-4 pt-2 pb-4 shadow-sm z-10">
          {/* Search Input */}
          <View className="flex-row items-center bg-gray-100 rounded-full px-4 h-12 mb-4">
            <SearchIcon size={20} color="#9CA3AF" />
            <TextInput 
              className="flex-1 ml-3 text-text text-base"
              placeholder="Search users or posts"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Toggle Tabs */}
          <View className="flex-row">
            <TouchableOpacity 
              className={`flex-1 items-center pb-2 border-b-2 ${activeTab === 'users' ? 'border-primary' : 'border-transparent'}`}
              onPress={() => setActiveTab('users')}
            >
              <Text className={`text-base font-semibold ${activeTab === 'users' ? 'text-primary' : 'text-muted'}`}>
                Users
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className={`flex-1 items-center pb-2 border-b-2 ${activeTab === 'posts' ? 'border-primary' : 'border-transparent'}`}
              onPress={() => setActiveTab('posts')}
            >
              <Text className={`text-base font-semibold ${activeTab === 'posts' ? 'text-primary' : 'text-muted'}`}>
                Posts
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        {activeTab === 'users' ? (
          <View className="flex-1">
            {isFetchingUsers ? (
              <View className="py-10 flex-col items-center">
                <ActivityIndicator size="small" color="#2563EB" />
                <Text className="text-muted text-sm mt-3">Searching users...</Text>
              </View>
            ) : users.length === 0 && debouncedQuery.length > 0 ? (
              <View className="py-10 items-center">
                <Text className="text-muted">No users found for "{debouncedQuery}"</Text>
              </View>
            ) : (
              <FlatList
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={renderUserItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
              />
            )}
          </View>
        ) : (
          <View className="flex-1">
             {isFetchingPosts ? (
              <View className="py-10 flex-col items-center">
                <ActivityIndicator size="small" color="#2563EB" />
                <Text className="text-muted text-sm mt-3">Searching posts...</Text>
              </View>
            ) : posts.length === 0 && debouncedQuery.length > 0 ? (
              <View className="py-10 items-center">
                <Text className="text-muted">No posts found for "{debouncedQuery}"</Text>
              </View>
            ) : (
              <FlatList
                data={posts}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <PostCard post={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 16, paddingBottom: 100 }}
              />
            )}
          </View>
        )}

      </SafeAreaView>
    </View>
  );
}
