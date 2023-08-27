import { Stack } from "expo-router";
import "../global.css";

export default () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "", headerShown: false }} />
      <Stack.Screen name="intro" options={{ title: "" }} />
    </Stack>
  );
};
