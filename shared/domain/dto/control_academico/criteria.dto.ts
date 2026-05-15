export interface ICreateCriterion {
    name: string;
    description: string;
    weight: string;
    notes_template: string;
}

export interface IUpdateCriterion extends ICreateCriterion {
    id: number
}
