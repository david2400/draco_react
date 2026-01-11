import {FieldValues, SubmitHandler} from 'react-hook-form';
import {IInputProps, IRadioProps, ISelectProps, ITextAreaProps} from './index';
import {z} from 'zod';

export interface IFormProps<T extends FieldValues> {
  initialValues: T;
  validationSchema: z.ZodSchema<T>;
  onSubmit: SubmitHandler<T>;
}

export interface IFormAddProps {
  handleClose?: (e) => void;
  refresh?: () => void;
}

export interface IFormUpdateProps {
  id: number;
  refresh?: () => void;
  handleClose?: (e) => void;
}

export interface IFormDynamicProps<T extends FieldValues> extends IFormProps<T> {
  fields: Array<IInputProps | ISelectProps<T> | IRadioProps>;
}
