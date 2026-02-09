import { IBaseEntity } from "@/lib/entitys/base.entity";

export interface IExams extends IBaseEntity {
    id: number;
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