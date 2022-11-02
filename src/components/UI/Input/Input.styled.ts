import styled from "styled-components";

export const SInput = styled.input`
    width: calc(100% - 4px);
    display: block;
    padding: 10px;
    outline: 1px solid teal;
    border: none;
    &:focus {
        outline: 2px solid teal;
    }
    &[type="radio"] {
        outline: none;  
        transform: scale(2);
        margin-left: 5px;
        width: auto;
    }
`;

export const SLabel = styled.label`
    display: block;
    margin: 15px 0;
    font-weight: bold;
`

export const InputWrapper = styled.div`
    width: 50%;
    min-width: 400px;
    max-width: 800px;
    margin: 20px 0;
`;