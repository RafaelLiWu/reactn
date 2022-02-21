import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProvider } from "../../services/context";
import Preload from "../../components/Preload";
import Game from "../../components/Game";
import { Text, View } from "react-native";

const Stack = createStackNavigator();

const Final = () => {
  return(
    <View>
      <Text> Well, You are the best, that is the final! </Text>
    </View>
  )
}

export default () => {
  return (
    <UserProvider>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Preload"
      >
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Final" component={Final}/>
      </Stack.Navigator>
    </UserProvider>
  );
};
