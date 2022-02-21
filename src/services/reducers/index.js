import React from "react";

export const initialState = {
  audio: 0,
};

export const initialGameState = {
  fase: 0
}

export const GameReducer = (state, action) => {
  switch (action.type) {
    case "Next":
      return {...state, fase: action.payload.fase}
      break;
  
    default:
      return { ...state }
      break;
  }
}

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "initial":
      return { ...state, audio: action.payload.audio };
      break;

    default:
      return { ...state };
      break;
  }
};
