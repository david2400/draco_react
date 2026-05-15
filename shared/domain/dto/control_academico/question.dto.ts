import { QuestionType } from "@/modules/control_academico/questions";

export interface ICreateQuestion {
    question_text: string;
    question_type: QuestionType;
    options?: string;
    correct_answer?: string;
    max_score: string;
    theme_id: string;
    difficulty: string;
}


export interface IUpdateQuestion extends ICreateQuestion {
    id: number;
}