import React, { forwardRef } from "react";
import {SelectWrapper, SSelect} from "./Select.styled";

interface ISelectProps {
    items: string[];
}

const Select = forwardRef<HTMLSelectElement, ISelectProps>((props, ref) => {
    return (
        <SelectWrapper>
            <SSelect ref={ref} {...props}>
                {Array.isArray(props.items) &&
                    props.items.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
            </SSelect>
        </SelectWrapper>
    );
});

export default Select;
