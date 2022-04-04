import { RootState } from "./store";

export const getCurrentGifs = (state: RootState) => state.gifs;

export const getMessages = (state: RootState) => state.messages;
