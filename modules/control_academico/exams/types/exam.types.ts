/**
 * Exam Types - Tipos para exámenes
 */

import type { Question } from '../../questions/types';

// Estado del examen
export type ExamStatus = 'draft' | 'scheduled' | 'active' | 'completed' | 'archived';

// Nivel de grado
export type GradeLevel = string;

// Criterio de evaluación
export interface EvaluationCriteria {
  id: string;
  name: string;
  description?: string;
  weight: number;
  maxScore: number;
}

// Pregunta dentro de un examen (con metadatos adicionales)
export interface ExamQuestion {
  id: string;
  question: Question;
  order: number;
  points: number;
  isRequired: boolean;
}

// Configuración de tiempo del examen
export interface ExamTimeConfig {
  duration: number; // en minutos
  scheduledDate: string;
  startTime?: string;
  endTime?: string;
  allowLateSubmission?: boolean;
  lateSubmissionPenalty?: number; // porcentaje
}

// Configuración de intentos
export interface ExamAttemptConfig {
  maxAttempts: number;
  showResultsAfterSubmit: boolean;
  showCorrectAnswers: boolean;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
}

// Examen base
export interface ExamBase {
  id: string;
  name: string;
  code: string;
  subject: string;
  gradeLevel: GradeLevel;
  instructions?: string;
  status: ExamStatus;
  timeConfig: ExamTimeConfig;
  attemptConfig?: ExamAttemptConfig;
  createdAt?: string;
  updatedAt?: string;
}

// Examen completo con preguntas y criterios
export interface Exam extends ExamBase {
  questions: ExamQuestion[];
  criteria: EvaluationCriteria[];
  totalPoints: number;
}

// Input para crear examen
export interface CreateExamInput {
  name: string;
  code: string;
  subject: string;
  gradeLevel: string;
  scheduledDate: string;
  duration: string;
  instructions?: string;
  questionIds: string[];
  criteriaIds: string[];
}

// Input para actualizar examen
export interface UpdateExamInput extends Partial<CreateExamInput> {
  id: string;
}

// Respuesta de estudiante a un examen
export interface ExamSubmission {
  id: string;
  examId: string;
  studentId: string;
  answers: ExamAnswer[];
  startedAt: string;
  submittedAt?: string;
  score?: number;
  maxScore: number;
  status: 'in_progress' | 'submitted' | 'graded';
}

// Respuesta individual a una pregunta del examen
export interface ExamAnswer {
  questionId: string;
  value: unknown;
  points?: number;
  feedback?: string;
  isCorrect?: boolean;
}

// Resultado del examen
export interface ExamResult {
  examId: string;
  studentId: string;
  score: number;
  maxScore: number;
  percentage: number;
  grade?: string;
  feedback?: string;
  questionResults: QuestionResult[];
}

// Resultado por pregunta
export interface QuestionResult {
  questionId: string;
  isCorrect: boolean;
  pointsEarned: number;
  maxPoints: number;
  feedback?: string;
}
