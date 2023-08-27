import { SafeAreaView, Text, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 flex justify-around p-4 bg-white">
      <View className="flex-1 items-center justify-center bg-white">
        <Text>Test</Text>
      </View>
    </SafeAreaView>
  );
}
