import PostCard, { Post } from '@/components/PostCard';
import { Pencil } from 'lucide-react-native';
import React from 'react';
import { FlatList, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PROFILE_DATA = {
  "_id": "66111975df4122f9aadadafc",
  "userId": "robert_downey",
  "email": "robert112@gmail.com",
  "name": "Robert Downey Jr.",
  "profilePhoto": "https://res.cloudinary.com/dllphjlv3/image/upload/v1712396661/o7pk52lppcjroddhxh3d.jpg",
  "role": "tony stark"
};

const USER_POSTS: Post[] = [
  {
    "_id": "66158d7c0cfdc75996ea5d5c",
    "title": "I am Iron Man.",
    "coverImage": "https://images.unsplash.com/photo-1626278664285-f796b96180af?q=80&w=2787&auto=format&fit=crop",
    "reads": 3000,
    "createdAt": "2024-04-10T12:00:00.000Z",
    "authorDetails": {
        "_id": PROFILE_DATA._id,
        "userId": PROFILE_DATA.userId,
        "name": PROFILE_DATA.name,
        "profilePhoto": PROFILE_DATA.profilePhoto
    },
    "likesCount": 1500,
    "commentsCount": 450
  },
  {
    "_id": "666eb5482a4afafca127f6af",
    "title": "Avengers Assemble!",
    "coverImage": "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2940&auto=format&fit=crop",
    "reads": 5000,
    "createdAt": "2024-06-15T10:30:00.000Z",
    "authorDetails": {
        "_id": PROFILE_DATA._id,
        "userId": PROFILE_DATA.userId,
        "name": PROFILE_DATA.name,
        "profilePhoto": PROFILE_DATA.profilePhoto
    },
    "likesCount": 2300,
    "commentsCount": 890
  },
  {
    "_id": "670b4cd2810ed13c83c63b7e",
    "title": "Working on the new suit mark 85.",
    "coverImage": "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?q=80&w=2787&auto=format&fit=crop",
    "reads": 1200,
    "createdAt": "2024-10-12T09:15:00.000Z",
    "authorDetails": {
        "_id": PROFILE_DATA._id,
        "userId": PROFILE_DATA.userId,
        "name": PROFILE_DATA.name,
        "profilePhoto": PROFILE_DATA.profilePhoto
    },
    "likesCount": 850,
    "commentsCount": 120
  }
];

export default function ProfileScreen() {
  const renderHeader = () => (
    <View className="items-center mb-6 pt-4 px-4 bg-white pb-6 border-b border-gray-100">
      <View className="relative">
        <Image 
          source={{ uri: PROFILE_DATA.profilePhoto }} 
          className="w-24 h-24 rounded-full bg-gray-200 border-2 border-white shadow-sm"
        />
        <TouchableOpacity className="absolute bottom-0 right-0 bg-primary p-2 rounded-full border border-white shadow-sm">
          <Pencil size={14} color="white" />
        </TouchableOpacity>
      </View>
      
      <Text className="text-text text-xl font-bold mt-3">{PROFILE_DATA.name}</Text>
      <Text className="text-muted text-sm">@{PROFILE_DATA.userId}</Text>
      <Text className="text-gray-600 text-sm mt-1">{PROFILE_DATA.role}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1" edges={['top']}>
        <FlatList
          data={USER_POSTS}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <PostCard post={item} />}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </SafeAreaView>
    </View>
  );
}
