import { BottomSheetBackdrop, BottomSheetModal, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Bookmark, Heart, MessageCircle, Send, ThumbsUp, X } from 'lucide-react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import RenderHtml from 'react-native-render-html'; // Properly render HTML content
import { useAddComment } from '../../hooks/api/post/use-add-comment';
import { useLikePost } from '../../hooks/api/post/use-like-post';
import { usePostComments } from '../../hooks/api/post/use-post-comments';
import { usePostDetails } from '../../hooks/api/post/use-post-details';
import { useCurrentUser } from '../../hooks/api/user/use-current-user';
import { DetailedComment } from '../../types/post';

export default function PostDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [commentText, setCommentText] = useState("");

  const { data: currentUserData } = useCurrentUser();
  const currentUser = currentUserData?.data;

  const { data: postDetailsResponse, isLoading } = usePostDetails(id as string);
  const postData = postDetailsResponse || null;

  const { data: commentsResponse, isLoading: isLoadingComments } = usePostComments(id as string);
  const comments = commentsResponse?.comments || [];

  const { mutate: addComment, isPending: isAddingComment } = useAddComment();
  const { mutate: likePost, isPending: isLikingPost } = useLikePost();

  const handleAddComment = () => {
    if (!commentText.trim() || !currentUser) return;
    
    addComment({
      postId: id as string,
      content: commentText.trim(),
      currentUser: currentUser,
    });
    setCommentText(''); // clear input immediately 
  };

  const handleLikePost = () => {
    if (!currentUser || isLikingPost) return;
    likePost(id as string);
  };

  // Bottom Sheet Hooks & Refs
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['70%', '95%'], []); // Increased default height to accommodate the input and comments

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const tagsStyles: any = {
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

  if (isLoading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!postData) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text className="text-muted">Post not found</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4 p-2 bg-primary rounded-lg">
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Cover Image */}
        <View className="relative w-full h-64">
           <Image 
            source={{ uri: postData.postContent.coverImage }} 
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
            {postData.postContent.title}
          </Text>

          {/* Author Row */}
          <View className="flex-row items-center mb-6">
            <Image 
              source={{ uri: postData.author.profilePhoto || 'https://via.placeholder.com/150' }} 
              className="w-10 h-10 rounded-full border border-gray-200"
            />
            <View className="ml-3">
              <Text className="text-base font-semibold text-slate-800">
                {postData.author.name}
              </Text>
              <Text className="text-sm text-slate-500">
                @{postData.author.userId}
              </Text>
            </View>
          </View>
          
          {/* Divider */}
          <View className="h-[1px] bg-slate-100 w-full mb-6" />

          {/* Content */}
          <View>
            <RenderHtml
              contentWidth={width - 40} // 40 = padding horizontal (px-5 * 2)
              source={{ html: postData.postContent.discription }}
              tagsStyles={tagsStyles}
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Row */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 flex-row justify-between items-center shadow-lg pb-8">
        <View className="flex-row items-center space-x-6 gap-6">
          <TouchableOpacity className="flex-row items-center gap-1.5" onPress={handleLikePost}>
            <Heart size={24} color="#ef4444" strokeWidth={2} />
            <Text className="text-slate-700 font-medium text-base">{postData.likesCount}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center gap-1.5" onPress={handlePresentModalPress}>
            <MessageCircle size={24} color="#64748b" strokeWidth={2} />
            <Text className="text-slate-700 font-medium text-base">{comments.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity>
             <Bookmark size={24} color="#64748b" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View>
          <Text className="text-slate-500 text-sm font-medium">
            {postData.postContent.reads} reads
          </Text>
        </View>
      </View>

      {/* Comments Bottom Sheet */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView className="flex-1 pt-2 pb-6 flex-col">
          {/* Header */}
          <View className="flex-row items-center justify-between px-5 mb-4 border-b border-gray-100 pb-4">
            <Text className="text-lg font-bold text-slate-900">
              Comments ({comments.length})
            </Text>
            <TouchableOpacity onPress={handleCloseModalPress} className="bg-gray-100 rounded-full p-1.5">
              <X size={20} color="#64748b" />
            </TouchableOpacity>
          </View>

          {/* Input Area */}
          <View className="px-5 mb-4 flex-row items-center space-x-3 gap-3">
             <View className="flex-1 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 flex-row items-center">
                <BottomSheetTextInput 
                  className="flex-1 text-slate-800 text-base"
                  placeholder="add your thoughts here"
                  placeholderTextColor="#94a3b8"
                  value={commentText}
                  onChangeText={setCommentText}
                />
             </View>
             <TouchableOpacity 
                className={`rounded-xl w-12 h-12 items-center justify-center shadow-sm ${!commentText.trim() || isAddingComment ? 'bg-blue-400' : 'bg-blue-600'}`}
                onPress={handleAddComment}
                disabled={!commentText.trim() || isAddingComment}
             >
                {isAddingComment ? <ActivityIndicator size="small" color="white" /> : <Send size={20} color="white" />}
             </TouchableOpacity>
          </View>

          <View className="h-[1px] bg-slate-100 w-full mb-4" />
          
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
            {isLoadingComments ? (
              <ActivityIndicator size="small" color="#2563EB" className="mt-4" />
            ) : comments.length > 0 ? (
              comments.map((item: DetailedComment) => {
                const comment = item.comments;
                return (
                  <View key={comment._id} className="mb-6 flex-row w-full">
                    {/* Avatar */}
                    <Image 
                      source={{ uri: comment.authorProfilePhoto || 'https://via.placeholder.com/150' }} 
                      className="w-10 h-10 rounded-full bg-slate-200 mr-3 shrink-0"
                    />
                    
                    <View className="flex-1">
                      {/* Comment Bubble */}
                      <View className="bg-[#E2E8F0] rounded-2xl rounded-tl-sm px-4 py-3 pb-4">
                        <View className="mb-2">
                           <Text className="font-medium text-slate-900 text-base leading-tight">{comment.authorName}</Text>
                           <Text className="text-xs text-slate-500">@{comment.authorUserId}</Text>
                        </View>
                        <Text className="text-slate-800 text-base leading-5">
                          {comment.content}
                        </Text>
                      </View>

                      {/* Action Row */}
                      <View className="flex-row items-center mt-2 px-1">
                         <Text className="text-slate-600 text-sm">Like</Text>
                         <Text className="text-slate-900 text-base mx-2 font-bold">&bull;</Text>
                         <View className="flex-row items-center gap-1.5">
                           <View className="bg-blue-600 rounded-full p-1 border border-blue-600 shadow-sm">
                              <ThumbsUp size={12} color="white" fill="white" />
                           </View>
                           <Text className="text-slate-700 text-xs font-medium">{comment.likes.length}</Text>
                         </View>
                      </View>
                    </View>
                  </View>
                );
              })
            ) : (
              <View className="py-10 items-center justify-center">
                <Text className="text-slate-500 font-medium">No comments yet. Be the first!</Text>
              </View>
            )}
          </ScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}
