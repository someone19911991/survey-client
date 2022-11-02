import React, {forwardRef, useEffect, useState} from "react";
import { InputWrapper, SInput, SLabel } from "./Input.styled";

interface IInputProps {
    type?: string;
    label?: string;
    checked?: boolean;
    value?: string
}

const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
    return (
        <InputWrapper>
            {(props.type === "radio" || props.label) && (
                <SLabel htmlFor={props.label}>{props.label}</SLabel>
            )}
            <SInput id={props.label} ref={ref} {...props} />
        </InputWrapper>
    );
});

export default Input;
