import {FormCategory} from '@modules/administre/category/scenes/formCategory';
import {IFormProps} from '@repo/ui/form/models/form.interface';
import {validationCategory} from '../schemas/category.schema';
import {SubmitHandler} from 'react-hook-form';
import { ICategoryAddRequest } from '../models/category.interface';

const FormBase = ({initialValues, onSubmit, validationSchema}: IFormProps<any>) => {
  return (
    <FormCategory
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    ></FormCategory>
  );
};

export const AddCategory = () => {
  const initialValues: ICategoryAddRequest = {
    name: '',
    description: '',
    slug: '',
  };

  const onSubmit: SubmitHandler<ICategoryAddRequest> = async (category: ICategoryAddRequest, event) => {
    console.log(category);
    console.log(event);
    console.log(event?.target);

    console.log(event?.target.reset());
    // console.log(event?.target.onreset());
  };

  const validationSchema = validationCategory();

  return (
    <FormBase
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    />
  );
};

export const UpdateCategory = () => {
  const initialValues: ICategoryAddRequest = {
    name: '',
    description: '',
    slug: '',
  };

  const onSubmit: SubmitHandler<ICategoryAddRequest> = async (category: ICategoryAddRequest, event) => {
    console.log(category);
    console.log(event);
    console.log(event?.target);

    console.log(event?.target.reset());
    // console.log(event?.target.onreset());
  };

  const validationSchema = validationCategory();

  return (
    <FormBase
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    />
  );
};
