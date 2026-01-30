import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import 'react-native-reanimated';
import '../global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().catch(console.warn);

export default function RootLayout() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    // Hide the native splash screen immediately, so our custom one takes over
    const prepare = async () => {
      try {
        await SplashScreen.hideAsync(); 
      } catch (e) {
        console.warn(e);
      } finally {
        // Show our custom splash for 2.5 seconds
        setTimeout(() => {
          setIsShowSplash(false);
        }, 2500);
      }
    };

    prepare();
  }, []);

  if (isShowSplash) {
    return (
      <View className="flex-1 bg-white items-center justify-center relative">
        <Image 
          source={require('../assets/images/pillai-splash.png')}
          className="w-full h-full absolute"
          resizeMode="cover"
        />
        <View className="absolute top-1/4 items-center w-full"> 
           {/* Custom Title Overlay */}
           <Text className="text-4xl font-extrabold text-[#741110] tracking-wider drop-shadow-md">
             PillaiBuzz
           </Text>
           <Text className="text-lg font-medium text-slate-700 mt-2">
             Campus Connect
           </Text>
        </View>
      </View>
    );
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="post/[id]" options={{ headerShown: false, presentation: 'card' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

