import PostCard, { Post } from '@/components/PostCard';
import React from 'react';
import { FlatList, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        "_id": "677ea22700456ca5c386c36f",
        "title": "Exploring the Power of WebSockets in Real-Time Applications!",
        "coverImage": "https://res.cloudinary.com/dllphjlv3/image/upload/v1736352294/twzwjsjhaffoze60zhzw.webp",
        "reads": 5,
        "createdAt": "2025-01-08T16:04:55.291Z",
        "authorDetails": {
            "_id": "user_002",
            "userId": "pranay_gharat",
            "name": "Pranay Gharat",
            "profilePhoto": "https://i.pravatar.cc/150?img=2"
        },
        "likesCount": 2,
        "commentsCount": 1
    },
    {
        "_id": "677e9e1f158e362dafdfd20c",
        "title": "Tech Fiesta 2025 – Unleash the Innovator in You!",
        "coverImage": "https://res.cloudinary.com/dllphjlv3/image/upload/v1736351262/e6ogr9pudb2zhripgllc.jpg",
        "reads": 10,
        "createdAt": "2025-01-08T15:47:43.521Z",
        "authorDetails": {
            "_id": "user_003",
            "userId": "nitesh_gharat",
            "name": "Nitesh Gharat",
            "profilePhoto": "https://i.pravatar.cc/150?img=3"
        },
        "likesCount": 2,
        "commentsCount": 0
    },
    {
        "_id": "677e9d44b4334b067fc56c1d",
        "title": "Mastering React Hooks",
        "coverImage": "https://res.cloudinary.com/dllphjlv3/image/upload/v1736351044/w233gudknw1btrvm9lrt.jpg",
        "reads": 3,
        "createdAt": "2025-01-08T15:44:04.954Z",
        "authorDetails": {
            "_id": "user_004",
            "userId": "vishwas_babar",
            "name": "Vishwas Babar",
            "profilePhoto": "https://i.pravatar.cc/150?img=4"
        },
        "likesCount": 2,
        "commentsCount": 0
    },
    {
        "_id": "677e9b3dafa4011845f16c69",
        "title": "5 Must-Know JavaScript Tricks for Web Developers",
        "coverImage": "https://res.cloudinary.com/dllphjlv3/image/upload/v1736350524/qzkykwnd3rcbzkwmd30o.webp",
        "reads": 4,
        "createdAt": "2025-01-08T15:35:25.287Z",
        "authorDetails": {
            "_id": "user_001",
            "userId": "raj_naik",
            "name": "Raj Naik",
            "profilePhoto": "https://i.pravatar.cc/150?img=1"
        },
        "likesCount": 1,
        "commentsCount": 0
    }
];

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1" edges={['top']}>
        <FlatList
          data={MOCK_POSTS}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <PostCard post={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 16, paddingBottom: 100 }}
        />
      </SafeAreaView>
    </View>
  );
}
