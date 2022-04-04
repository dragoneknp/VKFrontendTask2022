import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gif, Image, Message } from "../../Types/types";
import { getCurrentTime } from "../../Utils/getCurrentTime";
import { v4 as uuidv4 } from "uuid";

interface MessagesSliceProps {
    messages: Message[];
}

const initialState: MessagesSliceProps = {
    messages: [],
};

export const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage(state, action: PayloadAction<Image | string>) {
            state.messages.push({
                message: action.payload,
                date: getCurrentTime(),
                id: uuidv4(),
            });
        },
    },
});
export const { addMessage } = messageSlice.actions;
export const messagesReducer = messageSlice.reducer;
