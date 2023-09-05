import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View, SafeAreaView, Pressable } from "react-native";

import { MESSAGES } from "../constants/messages";
import { NUMBER } from "../constants/number";
import { SAMPLE_QUESTION_ANSWERS } from "../constants/sampleQuestionAnswers";
import { getRandomElements } from "../utils/getRandomElements";

export default function IntroScreen() {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [sampleQuestionAnswers, setSampleQuestionAnswers] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const NUMBER_WELCOME_MESSAGES = 1;
    const NUMBER_SAMPLE_QUESTIONS = 3;

    const randomWelcomeMessage = getRandomElements(
      MESSAGES.WELCOME_MESSAGE,
      NUMBER_WELCOME_MESSAGES
    );
    const randomSampleQuestionAnswers = getRandomElements(
      SAMPLE_QUESTION_ANSWERS,
      NUMBER_SAMPLE_QUESTIONS
    );

    setWelcomeMessage(randomWelcomeMessage[0].message);
    setSampleQuestionAnswers(randomSampleQuestionAnswers);
  }, []);

  function renderSampleQuestion({ id, description, answer }) {
    return (
      <View key={id} className="p-3 bg-[#fdc365] rounded-xl">
        <View className="flex-row items-center space-x-1">
          <Text className="text-lg text-gray-700 font-semibold">{answer}</Text>
        </View>
        <Text className="text-gray-700 font-medium">{description}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 flex mx-3">
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/bot.png")}
            className={"w-32 h-32 mt-3"}
            testID="bot-image"
          />
        </View>
        <View className="space-y-2 p-3 mt-1 bg-white border border-slate-300 rounded-lg">
          <Text className="text-center text-base">{welcomeMessage}</Text>
        </View>
        {sampleQuestionAnswers.length > NUMBER.EMPTY_ARRAY_LENGTH && (
          <View className="space-y-4 mt-3">
            <Text className="my-3 text-md text-gray-700 font-semibold">
              Need inspiration? See these examples:
            </Text>
            {sampleQuestionAnswers.map(renderSampleQuestion)}
          </View>
        )}
        <View className="flex-row justify-center">
          <Pressable
            onPress={() => router.push("/predictions")}
            className="w-40 p-4 mt-5 bg-gray-200 rounded-full"
          >
            <Text className="text-center" testID="mic-icon">
              <FontAwesome5 name="microphone" size={24} color="black" />
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
