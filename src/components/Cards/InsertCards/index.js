import React, { useContext } from "react";
import { GameContext } from "../../../services/context";
import {
  Animated,
  Image,
  Dimensions,
  PanResponder,
  Text,
  View,
} from "react-native";

import dialogos from "../../../assets/Dialogos";

const InsertCards = () => {
  const { state, dispatch } = useContext(GameContext);
  const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

  const position = new Animated.ValueXY();
  const rotate = position.x.interpolate({
    inputRange: [-ScreenWidth / 2, 0, ScreenWidth / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });

  const rotateAndTranslate = {
    transform: [
      {
        rotate,
      },
      ...position.getTranslateTransform(),
    ],
  };

  let leftOpacity = position.x.interpolate({
    inputRange: [-ScreenWidth / 2, 0, ScreenWidth / 2],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  let rightOpacity = position.x.interpolate({
    inputRange: [-ScreenWidth / 2, 0, ScreenWidth / 2],
    outputRange: [1, 0, 0],
    extrapolate: "clamp",
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (e, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dx > 120) {
        Animated.timing(position, {
          toValue: { x: ScreenWidth + 100, y: gestureState.dy },
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          dispatch({
            type: "Next",
          });
          position.setValue({ x: 0, y: 0 });
        });
      } else if (gestureState.dx < -120) {
        Animated.timing(position, {
          toValue: { x: -ScreenWidth - 100, y: gestureState.dy },
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          dispatch({
            type: "Next",
          });
          position.setValue({ x: 0, y: 0 });
        });
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <Animated.View
      style={[
        rotateAndTranslate,
        {
          width: ScreenWidth - 60,
          height: ScreenHeight - 345,
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Animated.View
        style={{
          width: ScreenWidth - 60,
          height: null,
          position: "absolute",
          flexDirection: "row",
          justifyContent: "space-between",
          zIndex: 20,
          backgroundColor: "blue"
        }}
      >
        <Animated.View
          style={[
            {
              maxWidth: (ScreenWidth / 2) - 30,
              backgroundColor: "purple",
            },
            TextLeftAnimatedStyle
          ]}
        >
          <Text> Welcomedskdjasidakdowjediawkdoahdawdiwdwwoeqwpeoqpweowqpeoqwpeiwqeiwpoqei </Text>
        </Animated.View>

        <Animated.View
          style={[
            {
              maxWidth: (ScreenWidth / 2) - 30,
              backgroundColor: "blue"
            },
            TextRightAnimatedStyle
          ]}
        >
          <Text> Welcomedskdjasidakdowjediawkdoahdawdiwdwwoeqwpeoqpweowqpeoqwpeiwqeiwpoqei </Text>
        </Animated.View>

      </Animated.View>
      <Image
        style={{
          flex: 1,
          height: null,
          width: ScreenWidth - 60,
          resizeMode: "cover",
        }}
        source={dialogos[state.fase].personagemImagem}
      />
    </Animated.View>
  );
  // <Animated.View
  //   key={item.id}
  //   style={{
  //     flex: 1,
  //     width: ScreenWidth,
  //     height: ScreenHeight - 245,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     position: "absolute",
  //     paddingTop: 40,
  //     paddingBottom: 40,
  //   }}
  // >
  //   <Image
  //     style={{
  //       flex: 1,
  //       height: null,
  //       width: ScreenWidth - 60,
  //       resizeMode: "cover",
  //     }}
  //     source={item.image}
  //   />
  // </Animated.View>
};

export default InsertCards;
