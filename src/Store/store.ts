import { configureStore } from "@reduxjs/toolkit";
import { gifsReducer } from "./Slices/gifsSlice";
import { messagesReducer } from "./Slices/messagesSlice";

export const store = configureStore({
    reducer: {
        gifs: gifsReducer,
        messages: messagesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
