import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { QuestionTypes, ISurvey, ErrorType } from "../../types/index";
import Input from "../UI/Input/Input";
import { useQuestion } from "../../hooks";
import Select from "../UI/Select/Select";
import {
    QuestionTitle,
    SButton,
    Wrapper,
    ErrorMsg,
    Error,
    ErrCloseBtn,
    ErrorWrapper
} from "./Survey.styled";
import Modal from "../UI/Modal/Modal";
import { addUpdateQuestion, getLSQuestions, getModalTitle } from "../../utils";
import AnsweredQuestions from "../AnsweredQuestions/AnsweredQuestions";
import axios from "axios";

const Survey = () => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState<ISurvey>({});
    const [confirmSurvey, setConfirmSurvey] = useState<string>("pending");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [finishSurvey, setFinishSurvey] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { question, fieldName, validationSchema, questions } =
        useQuestion(questionIndex);

    type FormTypes = {
        [fieldName: string]: typeof question.currentValue | string;
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm<FormTypes>({ resolver: yupResolver(validationSchema) });

    const onSubmit = async (data: FormTypes) => {
        let answerToPass = data[questions[questionIndex].fieldName] as
            | string
            | string[];
        let questionLabel = questions[questionIndex].fieldName as
            | string
            | string[];
        if (!answerToPass && !questionLabel) {
            questionLabel = questions[questionIndex]?.multiple?.map(
                (item) => item.fieldName
            ) as string[];
            answerToPass = questionLabel.map((item) => data[item]) as string[];
        }
        let survey = localStorage.getItem("survey");
        if (survey) {
            const parsedSurvey = JSON.parse(survey) as ISurvey;
            const updatedSurvey = addUpdateQuestion(
                answerToPass,
                questionLabel,
                parsedSurvey
            );
            localStorage.setItem("survey", JSON.stringify(updatedSurvey));
        }
        const updatedSurvey = addUpdateQuestion(answerToPass, questionLabel, {
            ...answeredQuestions,
        });
        setAnsweredQuestions(updatedSurvey);
        if (questionIndex < questions.length - 1) {
            setQuestionIndex((prev) => ++prev);
        } else {
            setModalOpen(true);
            setConfirmSurvey("pending");
            setFinishSurvey(true);
            setModalTitle("Are you sure you want to commit your answers?");
        }
    };

    const onPrev = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setQuestionIndex((prev) => --prev);
    };

    useEffect(() => {
        const survey = localStorage.getItem("survey");
        if (confirmSurvey === "confirmed") {
            if (survey) {
                const {
                    lsAnsweredQuestions,
                    qIndex,
                    answeredQuestionsEntries,
                } = getLSQuestions(survey);
                setAnsweredQuestions(lsAnsweredQuestions);
                answeredQuestionsEntries.forEach((item) => {
                    setValue(item[0], item[1]);
                });
                setQuestionIndex(qIndex);
            } else {
                localStorage.setItem("survey", JSON.stringify({}));
            }
        } else if (confirmSurvey === "rejected") {
            localStorage.removeItem("survey");
        }
    }, [confirmSurvey, setValue]);

    useEffect(() => {
        const { _modalTitle, openModal } = getModalTitle();
        setModalOpen(openModal);
        setModalTitle(_modalTitle);
    }, []);

    const onFinishSurvey = async () => {
        try {
            setLoading(true);
            await axios.post(
                "https://survey-test-task.herokuapp.com/api/survey",
                answeredQuestions
            );
            setModalOpen(false);
            setConfirmSurvey("confirmed");
            setAnsweredQuestions({});
            localStorage.removeItem("survey");
            setLoading(false);
        } catch (err) {
            setModalOpen(false);
            const error = err as ErrorType;
            setError(error.message);
        }
    };

    const onHandleError = () => {
        localStorage.removeItem('survey');
        window.location.reload()
    }

    return (
        <>
            {error && (
                <ErrorWrapper>
                    <Error>{error}</Error>
                    <ErrCloseBtn onClick={onHandleError}>
                        x
                    </ErrCloseBtn>
                </ErrorWrapper>
            )}
            {confirmSurvey === "confirmed" && finishSurvey && (
                <Wrapper>
                    <h1 style={{color: "var(--white)"}}>You have successfully completed your survey!</h1>
                </Wrapper>
            )}
            {confirmSurvey === "pending" &&
                modalOpen &&
                !finishSurvey &&
                 (
                    <Modal
                        modalTitle={modalTitle}
                        onCancel={() => {
                            setModalOpen(false);
                            setConfirmSurvey("rejected");
                        }}
                        onConfirm={() => {
                            setModalOpen(false);
                            setConfirmSurvey("confirmed");
                        }}
                    />
                )}
            {modalOpen && finishSurvey  && (
                <Modal
                    loading={loading}
                    modalTitle={modalTitle}
                    onCancel={() => {
                        setModalOpen(false);
                        setFinishSurvey(false);
                    }}
                    onConfirm={onFinishSurvey}
                >
                    <AnsweredQuestions answeredQuestions={answeredQuestions} />
                </Modal>
            )}
            {!modalOpen && !finishSurvey && (
                <Wrapper>
                    <h1 style={{ marginBottom: "50px" }}>
                        Question {questionIndex + 1}/{questions.length}
                    </h1>
                    <QuestionTitle>{question.question}</QuestionTitle>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {question.type === QuestionTypes.textInput && (
                            <Input type="text" {...register(fieldName)} />
                        )}
                        {question.type === QuestionTypes.numberInput && (
                            <Input type="number" {...register(fieldName)} />
                        )}
                        {question.type === QuestionTypes.date && (
                            <Input type="date" {...register(fieldName)} />
                        )}
                        {question.type === QuestionTypes.select && (
                            <Select
                                items={
                                    Array.isArray(question.currentValue)
                                        ? question.currentValue
                                        : []
                                }
                                {...register(fieldName)}
                            />
                        )}
                        {question.type === QuestionTypes.radio &&
                            Array.isArray(question.currentValue) &&
                            question.currentValue.map((opt) => (
                                <Input
                                    type="radio"
                                    label={opt}
                                    key={opt}
                                    value={opt}
                                    {...register(fieldName)}
                                />
                            ))}
                        {question.type === QuestionTypes.multiple &&
                            question?.multiple?.map((q) => (
                                <Fragment key={q.inputLabel}>
                                    {q.type === QuestionTypes.email && (
                                        <Input
                                            label={q.inputLabel}
                                            type="email"
                                            {...register(q.fieldName)}
                                        />
                                    )}
                                    {q.type === QuestionTypes.textInput && (
                                        <Input
                                            label={q.inputLabel}
                                            {...register(q.fieldName)}
                                        />
                                    )}
                                    <p style={{ color: "red" }}>
                                        {errors[q.fieldName]?.message}
                                    </p>
                                </Fragment>
                            ))}
                        <ErrorMsg>{errors[fieldName]?.message}</ErrorMsg>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            {questionIndex !== 0 && (
                                <SButton
                                    style={{backgroundColor: "#ffc827"}}
                                    onClick={onPrev}
                                >
                                    Prev
                                </SButton>
                            )}
                            {questionIndex <= questions.length - 1 && (
                                <SButton>
                                    {questionIndex < questions.length - 1
                                        ? "Next"
                                        : "Submit"}
                                </SButton>
                            )}
                        </div>
                    </form>
                </Wrapper>
            )}
        </>
    );
};

export default Survey;
