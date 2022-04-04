import React from "react";
import { Gif, Image } from "../../Types/types";
import "./gifPicker.scss";
interface GifPickerProps {
    gifs: Gif[];
    containerWidth: number;
    countOfImagesInARow: number;
    handleGifClick: (image: Image) => void;
}
const GifPicker = ({
    gifs,
    containerWidth,
    countOfImagesInARow,
    handleGifClick,
}: GifPickerProps) => {
    const handleClick = (image: Image) => {
        return () => {
            handleGifClick(image);
        };
    };

    const handleKeyPress = (
        event: React.KeyboardEvent<HTMLImageElement>,
        image: Image
    ) => {
        if (event.code === "Enter") {
            handleGifClick(image);
        }
    };

    const createRowWithImages = (
        gifs: Gif[],
        containerWidth: number,
        numberOfRow: number
    ) => {
        const widthOfPictures = gifs.reduce(
            (acc, gif) => Number(gif.image.width) + acc,
            0
        );

        return (
            <div className="row">
                {gifs.map((gif, idx) => (
                    <img
                        tabIndex={numberOfRow * countOfImagesInARow + idx + 2}
                        key={gif.id}
                        src={gif.image.url}
                        width={
                            (Number(gif.image.width) / widthOfPictures) *
                            (containerWidth - 80)
                        }
                        height="128px"
                        onClick={handleClick(gif.image)}
                        onKeyDown={(event) => handleKeyPress(event, gif.image)}
                    />
                ))}
            </div>
        );
    };

    const createLayout = (countOfImagesInARow: number) => {
        const countOfRows = Math.ceil(gifs.length / countOfImagesInARow);
        const rows = [];
        for (let i = 0; i < countOfRows - 1; ++i) {
            rows.push(
                createRowWithImages(
                    gifs.slice(
                        i * countOfImagesInARow,
                        (i + 1) * countOfImagesInARow
                    ),
                    containerWidth,
                    i
                )
            );
        }
        return rows;
    };
    return (
        <div
            className="gifPicker"
            style={{ width: containerWidth - 32 + "px" }}
        >
            <div className="gifPicker__wrapper">
                {createLayout(countOfImagesInARow).map((row, idx) => (
                    <React.Fragment key={idx}>{row}</React.Fragment>
                ))}
            </div>
        </div>
    );
};
export default GifPicker;
