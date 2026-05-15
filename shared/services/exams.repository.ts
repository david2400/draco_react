import {httpClient, withApiError} from './http-client';
import type {ICreateExams, IUpdateExams} from '@/shared/domain/dto/control_academico/exams.dto';
import type {IExams} from '@/shared/domain/models/control_academico/exams.model';

const EXAMS_BASE_PATH = '/control_academico/exams';

export const examsRepository = {
  async create(payload: ICreateExams) {
    return withApiError(httpClient.post<IExams>(EXAMS_BASE_PATH, payload).then(r => r.data));
  },

  async update(payload: IUpdateExams) {
    return withApiError(
      httpClient.put<IExams>(`${EXAMS_BASE_PATH}/${payload.id}`, payload).then(r => r.data)
    );
  },

  async getById(id: number) {
    return withApiError(httpClient.get<IExams>(`${EXAMS_BASE_PATH}/${id}`).then(r => r.data));
  },
};
