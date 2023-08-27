import { memo } from "react";
import { View, Image } from "react-native";

const DEFAULT_IMAGE = require("../assets/bot.png");
const DEFAULT_STYLES = "w-32 h-32 mt-3";

function Avatar({ imageSrc = DEFAULT_IMAGE, styles = DEFAULT_STYLES }) {
  return (
    <View className="flex-row justify-center">
      <Image source={imageSrc} className={styles} />
    </View>
  );
}

export default memo(Avatar);
