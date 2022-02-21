import React from "react";
import { StatusBar } from "react-native";
import { GameProvider } from "../../services/context";
import { Container, Header, Main, Footer } from "./style";
import Cards from "../Cards";

export default () => {
  return (
    <GameProvider>
      <Container>
        <StatusBar backgroundColor={"black"} barStyle="light-content" />
        <Header></Header>
        <Main>
          <Cards />
        </Main>
        <Footer></Footer>
      </Container>
    </GameProvider>
  );
};
