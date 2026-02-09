export type QuestionType = 'multiple_choice' | 'true_false' | 'open';

export interface IQuestion {
    question_text: string;
    question_type: QuestionType;
    options?: string;
    correct_answer?: string;
    max_score: string;
    theme_id: string;
    difficulty: string;
}