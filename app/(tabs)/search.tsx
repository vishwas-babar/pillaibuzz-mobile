import PostCard, { Post } from '@/components/PostCard';
import { Search as SearchIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Image, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SearchTab = 'users' | 'posts';

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
}

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Raj Naik',
    username: 'raj_naik',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isFollowing: false,
  },
  {
    id: '2',
    name: 'Pranay Gharat',
    username: 'pranay_gharat',
    avatar: 'https://i.pravatar.cc/150?img=2',
    isFollowing: true,
  },
  {
    id: '3',
    name: 'Nitesh Gharat',
    username: 'nitesh_gharat',
    avatar: 'https://i.pravatar.cc/150?img=3',
    isFollowing: false,
  },
  {
    id: '4',
    name: 'Vishwas Babar',
    username: 'vishwas_babar',
    avatar: 'https://i.pravatar.cc/150?img=4',
    isFollowing: false,
  },
];

const MOCK_POSTS: Post[] = [
  {
    "_id": "677ea336158e362dafdfd314",
    "title": "Introduction to RESTful APIs: Building Scalable Web Applications",
    "coverImage": "https://res.cloudinary.com/dllphjlv3/image/upload/v1736352566/olkoge6jk5rgjrnaerjf.webp",
    "reads": 19,
    "createdAt": "2025-01-08T16:09:26.875Z",
    "authorDetails": {
        "_id": "user_001",
        "userId": "raj_naik",
        "name": "Raj Naik",
        "profilePhoto": "https://i.pravatar.cc/150?img=1"
    },
    "likesCount": 3,
    "commentsCount": 2
  },
  {
    "_id": "677e9d44b4334b067fc56c1d",
    "title": "Mastering React Hooks",
    "coverImage": "https://res.cloudinary.com/dllphjlv3/image/upload/v1736351044/w233gudknw1btrvm9lrt.jpg",
    "reads": 3,
    "createdAt": "2025-01-08T15:44:04.954Z",
    "authorDetails": {
        "_id": "user_002",
        "userId": "pranay_gharat",
        "name": "Pranay Gharat",
        "profilePhoto": "https://i.pravatar.cc/150?img=2"
    },
    "likesCount": 2,
    "commentsCount": 0
  }
];

export default function SearchScreen() {
  const [activeTab, setActiveTab] = useState<SearchTab>('users');
  const [searchQuery, setSearchQuery] = useState('');

  const renderUserItem = ({ item }: { item: User }) => (
    <View className="flex-row items-center justify-between p-4 bg-white border-b border-gray-100">
      <View className="flex-row items-center">
        <Image 
          source={{ uri: item.avatar }} 
          className="w-12 h-12 rounded-full bg-gray-200"
        />
        <View className="ml-3">
          <Text className="text-text font-bold text-base">{item.name}</Text>
          <Text className="text-muted text-sm">@{item.username}</Text>
        </View>
      </View>
      <TouchableOpacity 
        className={`px-4 py-1.5 rounded-full border ${item.isFollowing ? 'bg-transparent border-gray-300' : 'bg-primary border-primary'}`}
      >
        <Text className={`text-sm font-semibold ${item.isFollowing ? 'text-gray-600' : 'text-white'}`}>
          {item.isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
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
          <FlatList
            data={MOCK_USERS}
            keyExtractor={(item) => item.id}
            renderItem={renderUserItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        ) : (
          <FlatList
            data={MOCK_POSTS}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <PostCard post={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 16, paddingBottom: 100 }}
          />
        )}

      </SafeAreaView>
    </View>
  );
}
