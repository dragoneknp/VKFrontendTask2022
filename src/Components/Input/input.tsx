import React from "react";
import "./input.scss";
interface InputProps {
    inputValue: string;
    changeValue: (value: string) => void;
    onSubmit: (text: string) => void;
}
const Input = ({ inputValue, changeValue, onSubmit }: InputProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        changeValue(event.target.value);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter") {
            onSubmit(inputValue);
        }
    };

    return (
        <div className="input">
            <input
                type="text"
                placeholder="Напишите сообщение..."
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
            />
        </div>
    );
};
export default Input;
