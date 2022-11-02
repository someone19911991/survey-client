import React, {FC, PropsWithChildren} from "react";
import { createPortal } from "react-dom";
import { ModalContent, ModalWrapper } from "./Modal.styled";
import { SButton } from "../../Survey/Survey.styled";
import styled from "styled-components";

const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
`;

type ModalBtnProps = {btnType?: string};

const ModalBtn = styled(SButton)<ModalBtnProps>`
    background-color: ${(props) => props.btnType === "danger" && "var(--pink)"};
    color: #fff;
    &:hover{    
        outline: ${(props) => props.btnType === "danger" ? "1px solid var(--pink)" : "1px solid teal"};
        color: ${(props) => props.btnType === "danger" && "var(--pink)"};
    }
`;

const ModalTitle = styled.h2`
    text-align: center;
    color: var(--blue);
`

interface ModalProps{
    modalTitle?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

const Modal:FC<PropsWithChildren<ModalProps>> = ({children, onConfirm, onCancel, modalTitle}) => {
    const portalElement = document.getElementById("portal");
    if (portalElement) {
        return createPortal(
            <ModalWrapper>
                <ModalContent>
                    <ModalTitle>{modalTitle}</ModalTitle>
                    {children}
                    <BtnContainer>
                        <ModalBtn onClick={onCancel} btnType="danger">No</ModalBtn>
                        <ModalBtn onClick={onConfirm}>Yes</ModalBtn>
                    </BtnContainer>
                </ModalContent>
            </ModalWrapper>,
            portalElement
        );
    }

    return <></>;
};

export default Modal;
