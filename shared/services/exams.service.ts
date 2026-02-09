import type {ICreateExams, IUpdateExams} from '@/shared/domain/dto/control_academico/exams.dto';
import type {IExams} from '@/shared/domain/models/control_academico/exams.model';
import {examsRepository} from './exams.repository';

export const examsService = {
  async createExam(payload: ICreateExams): Promise<IExams> {
    return examsRepository.create(payload);
  },

  async updateExam(payload: IUpdateExams): Promise<IExams> {
    return examsRepository.update(payload);
  },

  async getExamById(id: number): Promise<IExams> {
    return examsRepository.getById(id);
  },
};
