import styled from "styled-components";

export const ModalWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 100vh;
`;

export const ModalContent = styled.div`
    width: 50%;
    max-width: 1000px;
    min-width: 300px;
    background-color: #fff;
    padding: 20px;
    max-height: 90%;
    overflow-y: scroll;
`