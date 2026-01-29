import { Bookmark, Heart, MessageCircle } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export interface Post {
  _id: string;
  title: string;
  coverImage: string;
  reads: number;
  createdAt: string;
  authorDetails: {
    _id: string;
    userId: string;
    name: string;
    profilePhoto: string;
  };
  likesCount: number;
  commentsCount: number;
  isBookmarked?: boolean;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm mx-4 border border-gray-100">
      {/* Header */}
      <View className="flex-row items-center mb-3">
        <Image 
          source={{ uri: post.authorDetails.profilePhoto }} 
          className="w-10 h-10 rounded-full mr-3 bg-gray-200"
        />
        <View>
          <Text className="text-text font-bold text-sm">{post.authorDetails.name}</Text>
          <Text className="text-muted text-xs">@{post.authorDetails.userId}</Text>
        </View>
      </View>

      {/* Content */}
      <Text className="text-text font-semibold text-lg mb-3 leading-6">
        {post.title}
      </Text>
      
      <Image 
        source={{ uri: post.coverImage }} 
        className="w-full h-48 rounded-xl mb-4 bg-gray-200"
        resizeMode="cover"
      />

      {/* Footer */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity className="flex-row items-center gap-1.5">
            <Heart size={20} color="#64748B" />
            <Text className="text-muted text-sm font-medium">{post.likesCount}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center gap-1.5">
            <MessageCircle size={20} color="#64748B" />
            <Text className="text-muted text-sm font-medium">{post.commentsCount}</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Bookmark 
              size={20} 
              color={post.isBookmarked ? "#2563EB" : "#64748B"} 
              fill={post.isBookmarked ? "#2563EB" : "transparent"}
            />
          </TouchableOpacity>
        </View>

        <Text className="text-muted text-xs font-medium">{post.reads} reads</Text>
      </View>
    </View>
  );
}
