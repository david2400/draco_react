/**
 * Exams Module - Main barrel export
 */

// Types
export * from './types';

// Schemas
export { validationExam, examSchema } from './schemas/exam.schema';
export type { ExamSchemaInput } from './schemas/exam.schema';

// Components
export { QuestionBankPicker } from './components/question-bank-picker';
export { QuestionBankPickerV2 } from './components/QuestionBankPickerV2';
export { CriteriaPicker } from './components/criteria-picker';
export { ExamQuestionPreview } from './components/ExamQuestionPreview';
export { ExamPreview } from './components/ExamPreview';

// Forms
export { RegisterExamForm, UpdateExamForm } from './components/form';

// Scenes
export { FormExam } from './scenes/formExam';
export { TableExam } from './scenes/tableExam';
