import { View, Text, Pressable } from 'react-native';

export function ExampleThemeCard() {
  return (
    <View className="flex-1 bg-background p-4">
      <View className="bg-surface rounded-lg border border-border p-6 shadow-sm">
        {/* Header */}
        <Text className="text-text text-2xl font-bold mb-2">
          Welcome to PillaiBuzz
        </Text>
        <Text className="text-muted text-sm mb-4">
          Your campus community platform
        </Text>

        {/* Content */}
        <View className="space-y-3 mb-6">
          <Text className="text-text">
            This is an example demonstrating the custom color theme configuration.
          </Text>
          <Text className="text-muted text-sm">
            Using NativeWind with Tailwind CSS v3 for styling.
          </Text>
        </View>

        {/* Buttons */}
        <View className="flex-row gap-3">
          <Pressable className="bg-primary px-4 py-3 rounded-lg flex-1">
            <Text className="text-white text-center font-semibold">
              Primary Button
            </Text>
          </Pressable>
          
          <Pressable className="bg-secondary px-4 py-3 rounded-lg flex-1">
            <Text className="text-white text-center font-semibold">
              Secondary
            </Text>
          </Pressable>
        </View>

        {/* Info Box */}
        <View className="mt-4 bg-background border border-border rounded p-3">
          <Text className="text-muted text-xs">
            Color palette: primary, secondary, background, surface, text, muted, border
          </Text>
        </View>
      </View>
    </View>
  );
}
