import React, { createContext, useReducer } from "react";
import {
  initialState,
  UserReducer,
  GameReducer,
  initialGameState,
} from "../reducers";

export const UserContext = createContext({});

export const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GameReducer, initialGameState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
