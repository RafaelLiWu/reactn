import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    if (true) navigation.navigate("Game");
  }, []);

  return <View />;
};
