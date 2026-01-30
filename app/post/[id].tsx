import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Bookmark, Heart, MessageCircle } from 'lucide-react-native';
import React from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import RenderHtml from 'react-native-render-html'; // Properly render HTML content

const MOCK_DATA = {
  likesCount: 2,
  author: {
    userId: "dinesh_ar",
    name: "dinesh arekar",
    profilePhoto: "https://i.pravatar.cc/150?img=12"
  },
  postContent: {
    title: "Tech Fiesta 2025 – Unleash the Innovator in You!",
    discription: "<h2>Tech Fiesta 2025 – Unleash the Innovator in You! 🎉</h2><p>Get ready, Pillaians! 🚀 Our annual tech extravaganza, <strong>Tech Fiesta 2025</strong>, is here to inspire, challenge, and connect you with the best in the world of technology.</p><ul><li><h3>Hackathon</h3><p>Showcase your coding skills in a 24-hour hackathon!</p></li><li><h3>Tech Talks</h3><p>Learn from industry experts.</p></li><li><h3>Workshops</h3><p>Hands-on sessions on React, Tailwind and Node.</p></li></ul><p><strong>Date:</strong> 15-16 Feb 2025</p>",
    coverImage: "https://i.pravatar.cc/500?img=20",
    reads: 10
  }
};

export default function PostDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const tagsStyles = {
    h2: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#1e293b', // slate-800
    },
    h3: {
      fontSize: 18,
      fontWeight: '600',
      marginTop: 10,
      marginBottom: 6,
      color: '#334155', // slate-700
    },
    p: {
      fontSize: 16,
      lineHeight: 24,
      color: '#475569', // slate-600
      marginBottom: 10,
    },
    li: {
      fontSize: 16,
      lineHeight: 24,
      color: '#475569',
      marginBottom: 4,
    },
    strong: {
      fontWeight: 'bold',
      color: '#0f172a', // slate-900
    },
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Cover Image */}
        <View className="relative w-full h-64">
           <Image 
            source={{ uri: MOCK_DATA.postContent.coverImage }} 
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Back Button */}
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="absolute top-12 left-4 bg-white/80 p-2 rounded-full shadow-sm backdrop-blur-md"
          >
            <ArrowLeft size={24} color="#1e293b" />
          </TouchableOpacity>
        </View>

        <View className="px-5 py-6">
          {/* Title */}
          <Text className="text-2xl font-bold text-slate-900 leading-tight mb-4">
            {MOCK_DATA.postContent.title}
          </Text>

          {/* Author Row */}
          <View className="flex-row items-center mb-6">
            <Image 
              source={{ uri: MOCK_DATA.author.profilePhoto }} 
              className="w-10 h-10 rounded-full border border-gray-200"
            />
            <View className="ml-3">
              <Text className="text-base font-semibold text-slate-800">
                {MOCK_DATA.author.name}
              </Text>
              <Text className="text-sm text-slate-500">
                @{MOCK_DATA.author.userId}
              </Text>
            </View>
          </View>
          
          {/* Divider */}
          <View className="h-[1px] bg-slate-100 w-full mb-6" />

          {/* Content */}
          <View>
            <RenderHtml
              contentWidth={width - 40} // 40 = padding horizontal (px-5 * 2)
              source={{ html: MOCK_DATA.postContent.discription }}
              tagsStyles={tagsStyles}
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Row */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 flex-row justify-between items-center shadow-lg pb-8">
        <View className="flex-row items-center space-x-6 gap-6">
          <TouchableOpacity className="flex-row items-center gap-1.5">
            <Heart size={24} color="#ef4444" strokeWidth={2} />
            <Text className="text-slate-700 font-medium text-base">{MOCK_DATA.likesCount}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center gap-1.5">
            <MessageCircle size={24} color="#64748b" strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity>
             <Bookmark size={24} color="#64748b" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View>
          <Text className="text-slate-500 text-sm font-medium">
            {MOCK_DATA.postContent.reads} reads
          </Text>
        </View>
      </View>
    </View>
  );
}
