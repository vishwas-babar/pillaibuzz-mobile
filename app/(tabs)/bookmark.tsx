import PostCard, { Post } from '@/components/PostCard';
import React from 'react';
import { FlatList, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BOOKMARKED_POSTS: Post[] = [
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
        "commentsCount": 2,
        "isBookmarked": true
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
        "commentsCount": 0,
        "isBookmarked": true
    }
];

export default function BookmarkScreen() {
  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="px-4 py-2 border-b border-gray-100 bg-white mb-2">
            <Text className="text-xl font-bold text-text">Bookmarks</Text>
        </View>
        <FlatList
          data={BOOKMARKED_POSTS}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <PostCard post={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 16, paddingBottom: 100 }}
        />
      </SafeAreaView>
    </View>
  );
}
