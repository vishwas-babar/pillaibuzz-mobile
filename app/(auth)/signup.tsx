import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Signup() {
  const router = useRouter();
  const [focusedField, setFocusedField] = React.useState<string | null>(null);

  const getBorderColor = (fieldName: string) => {
    return focusedField === fieldName ? 'border-primary' : 'border-border';
  };

  const getIconColor = (fieldName: string) => {
    return focusedField === fieldName ? '#2563EB' : '#64748B'; // primary vs muted color
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center p-6"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
          
          <View className="bg-surface p-6 rounded-2xl shadow-lg w-full max-w-md self-center">
            
            {/* Header */}
            <View className="mb-6 items-center">
              <Text className="text-muted text-base">Welcome to</Text>
              <Text className="text-primary text-2xl font-bold mb-4">PillaiBuzz</Text>
              
              <TouchableOpacity className="flex-row items-center justify-center bg-white border border-border py-2.5 px-4 rounded-full w-full shadow-sm">
                <AntDesign name="google" size={18} color="black" style={{ marginRight: 8 }} />
                <Text className="text-text font-medium text-sm">Continue with Google</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center mb-5">
              <View className="flex-1 h-[1px] bg-border" />
              <Text className="mx-3 text-muted text-xs">Or sign up with email</Text>
              <View className="flex-1 h-[1px] bg-border" />
            </View>

            {/* Profile Section */}
            <View className="items-center mb-6 relative">
              <TouchableOpacity className="relative">
                <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center border-2 border-dashed border-gray-300">
                  <Feather name="user" size={32} color="#9CA3AF" />
                </View>
                <View className="absolute bottom-0 right-0 bg-primary p-1.5 rounded-full border-2 border-surface">
                  <Ionicons name="camera" size={14} color="white" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Form Fields */}
            <View className="space-y-3 gap-2">
              {/* Full Name */}
              <View className={`flex-row items-center border rounded-xl px-3 h-12 bg-gray-50 ${getBorderColor('fullName')}`}>
                <Feather name="user" size={18} color={getIconColor('fullName')} style={{ marginRight: 8 }} />
                <TextInput 
                  placeholder="Full Name" 
                  placeholderTextColor="#94A3B8"
                  className="flex-1 text-text text-sm h-full"
                  onFocus={() => setFocusedField('fullName')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>

              {/* Username */}
              <View className={`flex-row items-center border rounded-xl px-3 h-12 bg-gray-50 ${getBorderColor('username')}`}>
                <Feather name="at-sign" size={18} color={getIconColor('username')} style={{ marginRight: 8 }} />
                <TextInput 
                  placeholder="User ID / Username" 
                  placeholderTextColor="#94A3B8"
                  className="flex-1 text-text text-sm h-full"
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>

              {/* Email */}
              <View className={`flex-row items-center border rounded-xl px-3 h-12 bg-gray-50 ${getBorderColor('email')}`}>
                <Feather name="mail" size={18} color={getIconColor('email')} style={{ marginRight: 8 }} />
                <TextInput 
                  placeholder="Email Address" 
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  className="flex-1 text-text text-sm h-full"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>

              {/* Password */}
              <View className={`flex-row items-center border rounded-xl px-3 h-12 bg-gray-50 ${getBorderColor('password')}`}>
                <Feather name="lock" size={18} color={getIconColor('password')} style={{ marginRight: 8 }} />
                <TextInput 
                  placeholder="Password" 
                  placeholderTextColor="#94A3B8"
                  secureTextEntry
                  className="flex-1 text-text text-sm h-full"
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* Action */}
            <TouchableOpacity 
              className="bg-primary py-3.5 rounded-full mt-6 shadow-md active:bg-blue-700"
              onPress={() => router.replace('/(tabs)/home')}
            >
              <Text className="text-surface text-center font-bold text-base">Signup</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View className="flex-row justify-center mt-5">
              <Text className="text-muted text-sm">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                <Text className="text-primary font-bold text-sm">Login now</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
