import {SubmitHandler} from 'react-hook-form';
import {FormBrand} from '@modules/administre/brand/scenes/formBrand';
import {IFormAddProps, IFormProps, IFormUpdateProps} from '@repo/ui/form/models/form.interface';
import {validationBrand} from '../schemas/brand.schema';
import {IBrandAddRequest} from '../models/brand.interface';

const FormBase = ({initialValues, onSubmit, validationSchema}: IFormProps<any>) => {
  return (
    <FormBrand
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    ></FormBrand>
  );
};

export const AddBrand = () => {
  const initialValues: IBrandAddRequest = {
    name: '',
    slug: '',
    description: '',
  };
  console.log(typeof initialValues);
  const onSubmit: SubmitHandler<IBrandAddRequest> = async (brand: IBrandAddRequest, event) => {
    console.log(brand);
    console.log(event);
    console.log(event?.target);
    try {
      console.log(event?.target.reset());
    } catch (e) {}

    // console.log(event?.target.onreset());
  };

  const validationSchema = validationBrand();

  return (
    <FormBase
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    />
  );
};

export const UpdateBrand = ({}: IFormUpdateProps) => {
  const initialValues: IBrandAddRequest = {
    name: '',
    description: '',
    slug: '',
  };

  const onSubmit: SubmitHandler<IBrandAddRequest> = async (brand: IBrandAddRequest, event) => {
    console.log(brand);
    console.log(event);
    console.log(event?.target);

    console.log(event?.target.reset());
    // console.log(event?.target.onreset());
  };
  const validationSchema = validationBrand();

  return (
    <FormBase
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    />
  );
};
