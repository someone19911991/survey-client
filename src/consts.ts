import { IQuestion, QuestionTypes } from "./types/index";
import * as yup from "yup";

export const question_2 = ["Yes", "No", "Not sure"];
export const question_3 = [
    "PC DVD-ROM",
    "Macintosh DVD-ROM",
    "Sony PlayStation 2/Microsoft X-Box",
    "Console Top DVD player",
    "None",
    "Other",
];
export const question_4 = ["Purchase", "Rent"];
export const question_8 = ["male", "female"];
export const required_field = "This field is required";
export const no_match = "No match for this value";
export const validDateRegex =
    /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

export const questions: IQuestion[] = [
    {
        question:
            "When would you purchase a DVD player if you don't already own one?",
        fieldName: "question_1",
        currentValue: "",
        type: QuestionTypes.textInput,
        rules: yup.string().trim().required(required_field),
    },
    {
        question:
            "Would you be interested in software that allows you to have control over profanity, nudity, and violence in movies?",
        fieldName: "question_2",
        currentValue: question_2,
        type: QuestionTypes.radio,
        rules: yup
            .string()
            .oneOf(question_2, no_match)
            .typeError(required_field),
    },
    {
        question: "What type of DVD player do you own?",
        fieldName: "question_3",
        currentValue: question_3,
        type: QuestionTypes.select,
        rules: yup
            .string()
            .oneOf(question_3, no_match)
            .typeError(required_field),
    },
    {
        question: "Do you mainly purchase or rent movies you view?",
        fieldName: "question_4",
        currentValue: question_4,
        type: QuestionTypes.radio,
        rules: yup
            .string()
            .oneOf(question_4, required_field)
            .typeError(required_field),
    },
    {
        question:
            "How much do you spend renting and/or buying movies per month(in USD)?",
        fieldName: "question_5",
        currentValue: 0,
        type: QuestionTypes.numberInput,
        rules: yup
            .number()
            .required(required_field)
            .typeError("Numeric values only accepted"),
    },
    {
        question: "Type your first name, last name and email address",
        fieldName: "",
        type: QuestionTypes.multiple,
        multiple: [
            {
                fieldName: "first_name",
                inputLabel: "First name",
                currentValue: "",
                type: QuestionTypes.textInput,
                rules: yup.string().trim().required("First name is required"),
            },
            {
                fieldName: "last_name",
                inputLabel: "Last name",
                currentValue: "",
                type: QuestionTypes.textInput,
                rules: yup.string().trim().required("Last name is required"),
            },
            {
                fieldName: "email",
                inputLabel: "Email",
                currentValue: "",
                type: QuestionTypes.email,
                rules: yup
                    .string()
                    .trim()
                    .email()
                    .required("Email is required"),
            },
        ],
    },
    {
        question: "When is your birthday?",
        fieldName: "question_7",
        currentValue: "1997-12-12",
        type: QuestionTypes.date,
        rules: yup.string().matches(validDateRegex, "Invalid date"),
    },
    {
        question: "What is your gender?",
        fieldName: "question_8",
        currentValue: question_8,
        type: QuestionTypes.radio,
        rules: yup
            .string()
            .oneOf(question_8, required_field)
            .typeError(required_field),
    },
];
