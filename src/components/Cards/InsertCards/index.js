import React, { useContext, useLayoutEffect, useState } from "react";
import { GameContext } from "../../../services/context";
import {
  Animated,
  Image,
  Dimensions,
  PanResponder,
  Text,
  View,
  StyleSheet,
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

  let TextLeftAnimatedStyle = {
    opacity: leftOpacity,
  };

  let TextRightAnimatedStyle = {
    opacity: rightOpacity,
  };

  // Card Flip!
  const animateImage = new Animated.Value(0);
  let CurrentValueImage = 0;

  animateImage.addListener(({ value }) => {
    CurrentValueImage = value;
  });

  const frontInterpolate = animateImage.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = animateImage.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  const flipCardAnimation = () => {
    if (CurrentValueImage >= 90) {
      Animated.timing(animateImage, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animateImage, {
        toValue: 180,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

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
          flipCardAnimation()
          setTimeout(() => {
            dispatch({
              type: "Next",
              payload: {
                fase: dialogos[state.fase].esquerda.buscar,
              },
            });
            position.setValue({ x: 0, y: 0 });
          }, 300);
        });
      } else if (gestureState.dx < -120) {
        Animated.timing(position, {
          toValue: { x: -ScreenWidth - 100, y: gestureState.dy },
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          flipCardAnimation()
          setTimeout(() => {
            dispatch({
              type: "Next",
              payload: {
                fase: dialogos[state.fase].direita.buscar,
              },
            });
            position.setValue({ x: 0, y: 0 });
          }, 300);
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
    <>
      <View
        style={{
          height: ScreenHeight - 345,
          width: ScreenWidth - 60,
          position: "absolute",
        }}
      >
        <Animated.View
          style={[
            styles.flipCard,
            frontAnimatedStyle,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <View
            style={{
              height: ScreenHeight - 345,
              width: ScreenWidth - 60,
              backgroundColor: "black",
            }}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.flipCard,
            styles.flipCardBack,
            backAnimatedStyle,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Image
            source={dialogos[state.fase].personagemImagem}
            style={{
              resizeMode: "cover",
              height: ScreenHeight - 345,
              width: ScreenWidth - 60,
            }}
          />
        </Animated.View>
      </View>

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
          }}
        >
          <Animated.View
            style={[
              {
                maxWidth: ScreenWidth / 2 - 30,
                paddingTop: 2,
                paddingLeft: 2,
              },
              TextLeftAnimatedStyle,
            ]}
          >
            <Text
              style={[
                {
                  fontSize: 17,
                  color: "white",
                },
              ]}
            >
              {dialogos[state.fase].direita.dialogo}
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              {
                maxWidth: ScreenWidth / 2 - 30,
                paddingTop: 2,
                paddingRight: 2,
              },
              TextRightAnimatedStyle,
            ]}
          >
            <Text
              style={[
                {
                  fontSize: 17,
                  color: "white",
                },
              ]}
            >
              {dialogos[state.fase].esquerda.dialogo}
            </Text>
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
    </>
  );
};

const styles = StyleSheet.create({
  flipCard: {
    flex: 1,
    resizeMode: "cover",
    backfaceVisibility: "hidden",
  },
  flipCardBack: {
    position: "absolute",
  },
});

export default InsertCards;
