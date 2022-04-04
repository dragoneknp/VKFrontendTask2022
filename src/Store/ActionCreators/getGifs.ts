import axios from "axios";
import { Gif } from "../../Types/types";
import {
    gifsFetchingStart,
    gifsFetchingFailed,
    gifsFetchingSuccess,
} from "../Slices/gifsSlice";
import { AppDispatch } from "../store";

export const getGifs = (query: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(gifsFetchingStart());
        const response: any = await axios.get(
            `https://api.giphy.com/v1/gifs/search?api_key=yT0hiEVc5wFXU2FxH82OSiD7e6QFmFDI&q=${query}&limit=20&offset=0&rating=g&lang=en`
        );
        if (!response.data.data.length) {
            throw new Error("Nothing found");
        }
        const result: Gif[] = response.data.data.map((gif: any) => {
            return {
                id: gif.id,
                url: gif.url,
                title: gif.title,
                image: {
                    height: gif.images.original.height,
                    width: gif.images.original.width,
                    url: gif.images.original.url,
                },
            };
        });

        dispatch(gifsFetchingSuccess(result));
    } catch (e: any) {
        dispatch(gifsFetchingFailed(e.message));
    }
};
