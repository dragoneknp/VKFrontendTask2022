import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/useRedux";
import { getCurrentGifs, getMessages } from "../../Store/selectors";
import { getGifs } from "../../Store/ActionCreators/getGifs";
import Input from "../Input/input";
import "./chat.scss";
import GifPicker from "../GifPicker/gifPicker";
import { useDebounce } from "../../Hooks/useDebounce";
import { addMessage } from "../../Store/Slices/messagesSlice";
import { Image } from "../../Types/types";
import Loader from "../Loader/loader";
import useWindowDimensions from "../../Hooks/useWindowDimensions";
const Chat = () => {
    const [inputValue, changeValue] = useState<string>("");
    const [isPopupOpened, changeOpened] = useState<boolean>(false);

    const { width, height } = useWindowDimensions();

    const dispatch = useAppDispatch();
    const debouncedSearchValue = useDebounce(inputValue, 750);
    const { gifs, isLoading, error } = useAppSelector(getCurrentGifs);
    const { messages } = useAppSelector(getMessages);

    useEffect(() => {
        if (inputValue.startsWith("/gif ")) {
            const query = inputValue.split(" ").slice(1).join(" ");
            if (query.trim() !== "") {
                changeOpened(true);
                dispatch(getGifs(query));
            }
        } else {
            changeOpened(false);
        }
    }, [debouncedSearchValue]);

    const handleSubmit = (text: string) => {
        dispatch(addMessage(text));
        changeOpened(false);
        changeValue("");
    };

    const handleGifClick = (image: Image) => {
        dispatch(addMessage(image));
        changeOpened(false);
        changeValue("");
    };

    return (
        <main
            className="chat"
            style={{
                width: `${width > 700 ? 600 : 300}px`,
            }}
        >
            <div className="chat__messages">
                <div className="chat__listOfMessages chat-listOfMessages">
                    {messages.map((item) => (
                        <div
                            className="chat-listOfMessages-message"
                            key={item.id}
                        >
                            <span className="chat-listOfMessages-message__text">
                                {typeof item.message === "string" ? (
                                    item.message
                                ) : (
                                    <img src={item.message.url} />
                                )}
                            </span>
                            <span className="chat-listOfMessages-message__date">
                                {item.date}
                            </span>
                        </div>
                    ))}
                </div>
                <div
                    className={`chat__popup ${
                        isPopupOpened ? "opened" : "closed"
                    }`}
                    style={{ height: `${height > 500 ? 280 : 140}px` }}
                >
                    {isLoading ? (
                        <div
                            style={{
                                width: `${width > 700 ? 568 : 268}px`,
                                textAlign: "center",
                            }}
                        >
                            <Loader></Loader>
                        </div>
                    ) : (
                        <GifPicker
                            gifs={gifs}
                            containerWidth={width > 700 ? 600 : 300}
                            countOfImagesInARow={width > 700 ? 3 : 2}
                            handleGifClick={handleGifClick}
                        />
                    )}
                    {error ? (
                        <div
                            style={{
                                width: `${width > 700 ? 568 : 268}px`,
                                textAlign: "center",
                            }}
                        >
                            К сожалению по вашему запросу ничего не найдено :(
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <div className="chat__input">
                <Input
                    onSubmit={handleSubmit}
                    inputValue={inputValue}
                    changeValue={changeValue}
                />
            </div>
        </main>
    );
};
export default Chat;
