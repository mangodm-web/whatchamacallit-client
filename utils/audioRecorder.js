import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

import UnifiedApiHandler from "../api/UnifiedApiHandler";

const apiClient = new UnifiedApiHandler();

const AUDIO_CONFIG = {
  extension: ".wav",
  sampleRate: 44100,
  numberOfChannels: 2,
  bitRate: 128000,
  audioQuality: 0x7f,
  outputFormat: "lpcm",
};

export async function startRecording(setRecording) {
  try {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync({
      android: AUDIO_CONFIG,
      ios: AUDIO_CONFIG,
    });

    setRecording(recording);
  } catch (error) {
    console.error("Failed to start recording", error);
  }
}

export async function stopRecording(
  recording,
  setQuestionAnswers,
  setRecordedText,
  setLoading,
  setError
) {
  try {
    setLoading(true);

    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    const fileUri = recording.getURI();
    const base64String = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const transcription = await apiClient.createTranscriptions(base64String);
    const predictions = await apiClient.createPredictions(transcription);

    const questionAnswers = [
      ...predictions,
      {
        rank: 4,
        text: "None of the above",
      },
      {
        rank: 5,
        text: "Ah-ha! I remembered!",
      },
    ];

    setRecordedText(transcription);
    setQuestionAnswers(questionAnswers);

    await FileSystem.deleteAsync(fileUri);

    setLoading(false);
    setError(null);
  } catch (error) {
    console.error("Error message", error.message);
    setLoading(false);
    setError(error.response.data.details.reason);
  }
}
