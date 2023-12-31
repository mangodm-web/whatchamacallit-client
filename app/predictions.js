import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";

import { startRecording, stopRecording } from "../utils/audioRecorder";
import { CONFIG } from "../constants/config";

export default function PredictionsScreen() {
  const [recording, setRecording] = useState(undefined);
  const [recordedText, setRecordedText] = useState("");
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const recordingButtonImageSource = recording
    ? require("../assets/active-recording.gif")
    : require("../assets/inactive-recording.png");

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  function handlePress(rank) {
    const isToRouteToFeedback = rank === 5;
    const result = rank <= 3 ? "success" : "error";
    const pathname = isToRouteToFeedback ? "/feedback" : "/results";

    const commonFeedback = {
      description: recordedText,
      modelPredictions: questionAnswers,
      modelVersion: CONFIG.API_MODEL_LATEST_VERSION,
    };

    const feedback = isToRouteToFeedback
      ? { ...commonFeedback, userInput: "", correctPredictionIndex: -1 }
      : {
          ...commonFeedback,
          userInput: "",
          correctPredictionIndex: rank <= SUCCESS_RANK ? rank : -1,
        };

    router.push({
      pathname,
      params: {
        result,
        feedback: JSON.stringify(feedback),
      },
    });

    setRecordedText("");
    setQuestionAnswers([]);
  }

  return (
    <SafeAreaView className="flex-1 flex flex-col p-4 bg-white">
      <View className="w-full h-1/6">
        <Text
          className={`p-3 ${
            recordedText.length < 100 ? "text-lg" : "text-sm"
          } text-center italic rounded-xl`}
        >
          {recordedText && `"${recordedText}"`}
        </Text>
      </View>
      <View className="w-full h-4/6">
        {questionAnswers.length > 0 &&
          questionAnswers.map((questionAnswer) => {
            const { rank, text } = questionAnswer;

            return (
              <Pressable
                key={rank}
                className={`p-5 m-3 ${
                  rank < 4 ? "bg-[#fdc365]" : "bg-gray-200"
                } rounded-xl`}
                onPress={() => handlePress(rank)}
              >
                <Text className="text-gray-700 font-medium">{text}</Text>
              </Pressable>
            );
          })}
      </View>
      <View className="w-full h-1/6 items-center justify-center">
        {questionAnswers.length === 0 && !error && (
          <Text className="text-gray-500">
            Press a button below to record the description.
          </Text>
        )}
        {error && <Text className="text-red-500">{error}</Text>}
        <Pressable
          className="mb-5"
          onPress={() => {
            if (recording) {
              stopRecording(
                recording,
                setQuestionAnswers,
                setRecordedText,
                setLoading,
                setError
              );

              setRecording(undefined);
            } else {
              startRecording(setRecording);
            }
          }}
        >
          {loading ? (
            <Image
              className="w-28 h-28 rounded-full"
              source={require("../assets/loading.gif")}
            />
          ) : (
            <Image
              className="w-28 h-28 rounded-full"
              source={recordingButtonImageSource}
            />
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
