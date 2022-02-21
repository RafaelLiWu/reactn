import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";

import { MainViewText, MainText, MainViewName, Container, LimitScroll } from "./style";

import { GameContext } from "../../services/context";

import dialogos from "../../assets/Dialogos";

import InsertCards from "./InsertCards";
import { useNavigation } from "@react-navigation/native";

const Cards = () => {
  const { state, dispatch } = useContext(GameContext);
  const navigation = useNavigation();

  return (
    <Container>
      {state.fase != null || state.fase != undefined ? (
        <>
          <LimitScroll>
            <MainViewText>
              <MainText>{dialogos[state.fase].texto}</MainText>
            </MainViewText>
          </LimitScroll>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <InsertCards />
          </View>
          
          <MainViewName>
            <MainText>{dialogos[state.fase].personagem}</MainText>
          </MainViewName>
        </>
      ) : (
        <View>
          <Text> Welcome, your are the best, thats is the final! </Text>
        </View>
      )}
    </Container>
  );
};

export default Cards;
