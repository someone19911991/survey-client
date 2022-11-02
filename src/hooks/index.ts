import * as yup from "yup";
import { questions } from "../consts";

export const useQuestion = (questionIndex: number) => {
    const question = questions[questionIndex];
    let fieldName = question.fieldName;
    let validationSchema: any;
    if (!fieldName && question.multiple) {
        const rulesToAdd: { [key: string]: any } = {};
        question.multiple.map((q) => {
            rulesToAdd[q.fieldName] = q.rules;
        });
        validationSchema = yup.object().shape({ ...rulesToAdd });
    } else {
        validationSchema = yup.object().shape({
            [fieldName]: question.rules,
        });
    }

    return { questions, question, fieldName, validationSchema };
};
