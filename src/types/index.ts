export enum QuestionTypes {
    textInput = "textInput",
    numberInput = "numberInput",
    radio = "radio",
    select = "select",
    multiple = "multiple",
    date = "date",
    email = "email"
}

export interface IQuestion {
    question: string;
    fieldName: string;
    currentValue?: string | string[] | number;
    type: QuestionTypes;
    inputLabel?: string;
    multiple?: Omit<IQuestion, "question">[];
    rules?: any;
}

export type ISurvey = { [key: string]: string };

export type ErrorType = {message: string};