import { AntDesign, Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
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

            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-[1px] bg-border" />
              <Text className="mx-3 text-muted text-xs">or</Text>
              <View className="flex-1 h-[1px] bg-border" />
            </View>

            {/* Form Fields */}
            <View className="space-y-4 gap-2">

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
              className="bg-primary py-3.5 rounded-full mt-8 shadow-md active:bg-blue-700"
              onPress={() => router.replace('/(tabs)/home')}
            >
              <Text className="text-surface text-center font-bold text-base">Login</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-muted text-sm">Don't have account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                <Text className="text-primary font-bold text-sm">signup now</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
