import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";

import { MESSAGES } from "../constants/messages";
import { getRandomElements } from "../utils/getRandomElements";

export default function ResultsScreen() {
  const { result } = useLocalSearchParams();
  const [resultMessage, setResultMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const messages =
      result === "success"
        ? MESSAGES.PREDICTION_SUCCESS_MESSAGE
        : MESSAGES.PREDICTION_ERROR_MESSAGE;

    const randomResultMessage = getRandomElements(messages, 1);

    if (randomResultMessage.length > 0) {
      setResultMessage(randomResultMessage[0].message);
    }
  }, [result]);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 flex mx-5">
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/bot.png")}
            className={"w-32 h-32 mt-3"}
          />
        </View>
        <View className="space-y-2 p-4 mt-1 bg-white border border-slate-300 rounded-lg">
          <Text className="text-center">{resultMessage}</Text>
        </View>
        <View className="flex-row justify-center">
          <Pressable
            onPress={() => router.push("/predictions")}
            className="w-40 p-3 mt-5 bg-gray-200 rounded-full"
          >
            <Text className="text-center">
              <FontAwesome5 name="microphone" size={24} color="black" />
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
