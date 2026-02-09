export interface ICreateTheme {
    name: string;
    subject: string;
    difficulty: string;
    description: string;
    tags: string;
}

export interface IUpdateTheme extends ICreateTheme {
    id: number
}
