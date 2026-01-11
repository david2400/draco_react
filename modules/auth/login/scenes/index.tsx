import { useState } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import {LockClosedIcon} from '@heroicons/react/20/solid';
import { FormField } from "@/components/form/scenes/form-field";
import { useForm } from "react-hook-form";
import { IFormProps } from "@/components/form/models/form.interface";
import {Buttons} from '@repo/ui/buttons/scenes/index';
export const FormLogin = ({
  initialValues,
  validationSchema,
  onSubmit,
}: IFormProps<any>) => {
  const intl = useTranslations("Form");
  const intLogin = useTranslations("RegisterUser");
  const [checked, setChecked] = useState<boolean>(false);

  type LoginInputs = z.infer<typeof validationSchema>;

  const {
    register,
    setError,
    formState: { isSubmitted, errors },
    handleSubmit,
  } = useForm<LoginInputs>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  });

  return (
    <section className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col justify-center">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <p className="mt-2 text-center text-sm text-gray-600">
            start your 14-day free trial
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-8 my-4">
            <FormField
              id="username"
              label={intLogin("username")}
              error={errors}
              {...register("username", { required: true, maxLength: 20 })}
            ></FormField>

            <FormField
              id="password"
              label={intLogin("username")}
              error={errors}
              {...register("password", { required: true, maxLength: 20 })}
            ></FormField>

            <div className="flex gap-2">
              {/* <Radio
                    name='description'
                    label={'@material-tailwind/react, packed with rich components and widgets.'}
                  /> */}
            </div>
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
            <div className="flex flex-col w-full gap-2">
              <Buttons
                type="submit"
                // label={intl.formatMessage({id: 'signIn'})}
                className="w-full"
                // icon={<LockClosedIcon className='h-5 w-5' aria-hidden='true' />}
              >
                logear
              </Buttons>
              <Buttons
                // color='yellow'
                // label={intl.formatMessage({id: 'register'})}
                className="w-full"
                // icon={<LockClosedIcon className='h-5 w-5' aria-hidden='true' />}
              >
                logear
              </Buttons>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
