import {SubmitHandler} from 'react-hook-form';
import {validation} from '../schemas/login.schemas';
import {ILogin} from '../models/login';
import {FormLogin} from '@modules/auth/login/scenes';

export const Login = () => {
  const initialValues: ILogin = {
    username: '',
    password: '',
  };

  const onSubmit: SubmitHandler<ILogin> = async (category: ILogin, event) => {
    console.log(category);
    console.log(event);
    console.log(event?.target);

    console.log(event?.target.reset());
    // console.log(event?.target.onreset());
  };

  const validationSchema = validation();

  return (
    <FormLogin
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    ></FormLogin>
  );
};
