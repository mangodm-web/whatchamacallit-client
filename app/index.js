import { useRouter } from "expo-router";
import { SafeAreaView, Image, Text, View, Pressable } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 flex justify-around p-4 bg-white">
      <View className="space-y-2">
        <Text className="text-center text-3xl font-bold">
          <Text className="text-gray-600">What</Text>
          <Text className="text-[#fdc365]">cha</Text>
          <Text className="text-gray-600">ma</Text>
          <Text className="text-[#fdc365]">call</Text>
          <Text className="text-gray-600">it?</Text>
        </Text>
        <Text className="text-center text-gray-500 font-semibold">
          A little helper that nudges lost words
        </Text>
      </View>
      <View className="flex-row justify-center">
        <Image
          source={require("../assets/logo.png")}
          className="w-72 h-72"
          testID="logo-image"
        />
      </View>
      <Pressable
        onPress={() => router.push("/intro")}
        className="p-4 mx-5 bg-[#fdc365] rounded-xl"
      >
        <Text className="text-center text-lg text-gray-600 font-bold ">
          Getting Started
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
