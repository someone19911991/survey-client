import React, { FC } from "react";
import { ISurvey } from "../../types";
import { questions } from "../../consts";
import {Wrapper, Answer, Question} from "./AnsweredQuestions.styled";

interface IAnsweredQuestionsProps {
    answeredQuestions: ISurvey;
}

const AnsweredQuestions: FC<IAnsweredQuestionsProps> = ({
    answeredQuestions,
}) => {
    const answersAndQuestions = questions.map((q) => {
        let answer =
            answeredQuestions[q.fieldName as keyof typeof answeredQuestions];
        if (!answer) {
            answer = q.multiple
                ?.map(
                    (item) => {
                        return answeredQuestions[item.fieldName as keyof typeof answeredQuestions]
                    }
                )
                .join(", ") as string;
        }
        return { question: q.question, answer };
    });
    return (
        <div>
            {answersAndQuestions.map((item) => (
                <Wrapper
                    key={item.question}
                >
                    <Question>{item.question}</Question>
                    <Answer>{item.answer}</Answer>
                </Wrapper>
            ))}
        </div>
    );
};

export default AnsweredQuestions;
