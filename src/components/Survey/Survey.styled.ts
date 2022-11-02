import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    min-width: 300px;
    height: 100vh;
    margin: 0 auto;
    padding: 10px;
    background-color: var(--blue);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const SButton = styled.button`
    padding: 10px 15px;
    color: #fff;
    background-color: teal;
    outline: 0;
    border: 0;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    margin: 10px 0;
    &:hover {
        color: teal;
        background-color: #fff;
        cursor: pointer;
    }
`;

export const ErrorMsg = styled.p`
    color: var(--dark-red);
    height: 20px;
    width: 100%;
    font-weight: bold;
`;

export const QuestionTitle = styled.h2`
    color: var(--white);
`;

export const Error = styled.h2`
    color: var(--dark-red);
     text-align: center;
`
export const ErrCloseBtn = styled.button`
    margin-left: 100px,
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 20px;
    line-height: 30px;
    outline: 0;
    border: 0;
    color: var(--dark-grey);
    background-color: transparent;
    cursor: pointer;
`

export const ErrorWrapper = styled.div`
    display: flex;
    max-width: 1000px;
    justify-content: space-between;
    align-items: center;
    padding: 0
`;

export const Form = styled.form`
    padding: 10px;
    width: 100%;
`;
