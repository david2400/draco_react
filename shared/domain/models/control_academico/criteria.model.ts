import { ICreateCriterion } from "../../dto/control_academico/criteria.dto";

export interface ICriterion {
    id: number
    name: string;
    description: string;
    weight: string;
    notes_template: string;
    impact: "core" | "support";
};