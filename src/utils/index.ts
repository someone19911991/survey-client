import { ISurvey } from "../types/index";

export const getModalTitle = () => {
    const survey = localStorage.getItem("survey");
    let openModal: boolean;
    let _modalTitle: string;
    if (!survey) {
        openModal = true;
        _modalTitle =
            "Do you want to continue the survey after leaving the site and returning again?";
    } else {
        openModal = true;
        _modalTitle = "Do you want to continue an incomplete survey?";
    }
    return { _modalTitle, openModal };
};

export const getLSQuestions = (survey: string) => {
        const lsAnsweredQuestions = JSON.parse(survey) as ISurvey;
        const answeredQuestionsEntries = Object.entries(lsAnsweredQuestions);
        const lsAnsweredQuestionsLength =
            Object.keys(lsAnsweredQuestions).length;
        const qIndex =
            lsAnsweredQuestionsLength > 5
                ? lsAnsweredQuestionsLength - 2
                : lsAnsweredQuestionsLength;
    return { lsAnsweredQuestions, lsAnsweredQuestionsLength, qIndex, answeredQuestionsEntries };
};

export const addUpdateQuestion = (
    answer: string | string[],
    question: string | string[],
    survey: ISurvey
) => {
    if (Array.isArray(question) && Array.isArray(answer)) {
        question.forEach((questionItem, questionIndex) => {
            if (survey[questionItem as keyof typeof survey]) {
                survey[questionItem as keyof typeof survey] =
                    answer[questionIndex];
            } else {
                survey[questionItem as keyof typeof survey] =
                    answer[questionIndex];
            }
        });
    } else {
        survey[question as keyof typeof survey] = answer as string;
    }
    return survey;
};
