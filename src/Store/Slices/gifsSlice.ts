import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gif } from "../../Types/types";

interface GifsSliceProps {
    isLoading: boolean;
    error: string;
    gifs: Gif[];
}

const initialState: GifsSliceProps = {
    isLoading: false,
    error: "",
    gifs: [],
};

export const gifsSlice = createSlice({
    name: "gifs",
    initialState,
    reducers: {
        gifsFetchingStart(state) {
            state.error = "";
            state.isLoading = true;
            state.gifs = [];
        },
        gifsFetchingSuccess(state, action: PayloadAction<Gif[]>) {
            state.error = "";
            state.isLoading = false;
            state.gifs = action.payload;
        },
        gifsFetchingFailed(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isLoading = false;
            state.gifs = [];
        },
    },
});
export const { gifsFetchingStart, gifsFetchingFailed, gifsFetchingSuccess } =
    gifsSlice.actions;

export const gifsReducer = gifsSlice.reducer;