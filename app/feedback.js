import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
  TextInput,
} from "react-native";

import UnifiedApiHandler from "../api/UnifiedApiHandler";
import { MESSAGES } from "../constants/messages";
import { getRandomElements } from "../utils/getRandomElements";

const apiClient = new UnifiedApiHandler();

export default function FeedbackScreen() {
  const { feedback } = useLocalSearchParams();
  const router = useRouter();

  function getInitialMessage() {
    const messages = MESSAGES.FEEDBACK_ASK_MESSAGE;
    const randomMessage = getRandomElements(messages, 1)[0]?.message || "";

    return randomMessage;
  }

  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [resultMessage, setResultMessage] = useState(getInitialMessage);

  async function handlePress() {
    const formattedFeedback = JSON.parse(feedback);

    const bodySample = {
      description: formattedFeedback.description,
      user_input: answer,
      predictions: formattedFeedback.modelPredictions,
      version_model: formattedFeedback.modelVersion,
      correct_prediction_index: formattedFeedback.correctPredictionIndex,
    };

    try {
      const response = await apiClient.createFeedback(bodySample);

      if (response.data?.status) {
        setResultMessage(
          "Thanks for helping me become smarter! \n Want to try another word?"
        );
        setSubmitted(true);
      }
    } catch (error) {
      throw error;
    }
  }

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
        <View className="flex-row items-center justify-center">
          <TextInput
            className="w-5/6 py-3 px-4 my-10 bg-gray-200 text-gray-700 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Please enter the correct word."
            value={answer}
            onChangeText={(text) => setAnswer(text)}
            editable={!submitted}
          />
          <Pressable
            className="w-1/6 py-3 px-4 bg-[#fdc365] rounded"
            onPress={handlePress}
            disabled={submitted}
          >
            <Text className="text-center text-white">
              <AntDesign name="enter" size={20} color="black" />
            </Text>
          </Pressable>
        </View>
        {submitted && (
          <View className="flex justify-center items-center w-full">
            <Pressable
              onPress={() => router.push("/predictions")}
              className="w-40 p-3 mt-5 bg-gray-200 rounded-full"
            >
              <Text className="text-center">
                <FontAwesome5 name="microphone" size={24} color="black" />
              </Text>
            </Pressable>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
