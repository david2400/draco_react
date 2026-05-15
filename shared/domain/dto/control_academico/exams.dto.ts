export interface ICreateExams {
    nombre: string;
    code: string;
    subject: string;
    grade_level: string;
    scheduled_date: string;
    duration: string;
    instructions: string;
    question_ids: string[];
    criteria_ids: string[];
}


export interface IUpdateExams extends ICreateExams {
    id: number;
}
