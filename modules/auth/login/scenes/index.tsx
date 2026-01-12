import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/form/scenes/form-field";
import { useForm } from "react-hook-form";
import { IFormProps } from "@/components/form/models/form.interface";
import { Buttons } from "@repo/ui/buttons/scenes/index";

export const FormLogin = ({
  initialValues,
  validationSchema,
  onSubmit,
}: IFormProps<any>) => {
  const intLogin = useTranslations("RegisterUser");
  const formCopy = useTranslations("Form");
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

  const highlights = useMemo(
    () => [
      {
        title: "Acceso seguro",
        description:
          "Autenticación moderna con cifrado TLS y monitoreo constante.",
      },
      {
        title: "Panel intuitivo",
        description:
          "Gestiona incidencias y respuestas con una sola vista colaborativa.",
      },
      {
        title: "Soporte prioritario",
        description:
          "Equipo especializado disponible 24/7 para tu organización.",
      },
    ],
    []
  );

  const socialProviders = ["Google", "Microsoft", "SSO"];

  return (
    <section className='relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16 text-white sm:px-10'>
      <div
        className='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.5),transparent_60%)]'
        aria-hidden
      />
      <div
        className='absolute -left-32 top-20 h-72 w-72 rounded-full bg-fuchsia-500/25 blur-[140px]'
        aria-hidden
      />
      <div
        className='absolute right-[-5%] bottom-10 h-64 w-64 rounded-full bg-cyan-500/20 blur-[130px]'
        aria-hidden
      />

      <div className='relative grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr]'>
        <div className='rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur-3xl sm:p-10'>
          <p className='text-xs uppercase tracking-[0.65em] text-white/70'>
            Essenza Draco
          </p>
          <h1 className='mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl'>
            Plataforma PQRS que se siente
            <span className='ml-2 bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-200 bg-clip-text text-transparent'>
              intuitiva y humana.
            </span>
          </h1>
          <p className='mt-4 text-base text-white/75 sm:text-lg'>
            Centraliza solicitudes, prioriza respuestas y crea experiencias
            memorables en todos tus canales de servicio.
          </p>

          <div className='mt-8 space-y-5'>
            {highlights.map((item) => (
              <div
                key={item.title}
                className='flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4'>
                <span className='mt-1 inline-flex h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_12px_rgba(190,242,100,0.8)]' />
                <div>
                  <p className='font-medium text-white'>{item.title}</p>
                  <p className='text-sm text-white/70'>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-8 rounded-2xl border border-white/15 bg-slate-950/50 p-4 text-sm text-white/70 shadow-lg backdrop-blur'>
            Actualizado hace 3 min · 98% de tickets resueltos a tiempo esta
            semana.
          </div>
        </div>

        <div className='relative rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur-2xl sm:p-10'>
          <div className='mb-8 space-y-2'>
            <p className='text-sm uppercase tracking-[0.3em] text-white/60'>
              {formCopy("requiredField") || "Iniciar sesión"}
            </p>
            <h2 className='text-3xl font-semibold text-white'>
              Conecta tu cuenta administrativa
            </h2>
            <p className='text-sm text-white/60'>
              Usa tus credenciales corporativas para gestionar todo el
              ecosistema Essenza.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-7'>
            <div className='space-y-5'>
              <FormField
                id='username'
                label={intLogin("name")}
                error={errors}
                className='text-white'
                {...register("username", {
                  required: true,
                  maxLength: 20,
                })}></FormField>

              <FormField
                id='password'
                label={intLogin("name") || "Contraseña"}
                error={errors}
                {...register("password", {
                  required: true,
                  maxLength: 20,
                })}></FormField>
            </div>

            <div className='flex items-center justify-between text-xs text-white/70'>
              <label className='inline-flex cursor-pointer items-center gap-2'>
                <input
                  type='checkbox'
                  className='h-4 w-4 rounded border-white/40 bg-transparent text-indigo-400 focus:ring-indigo-300'
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                />
                Recordar este dispositivo
              </label>
              <button
                type='button'
                className='font-semibold text-indigo-200 underline-offset-4 transition hover:text-indigo-50 hover:underline'>
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <Buttons
              type='submit'
              className='w-full justify-center rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 py-3 text-base font-semibold tracking-wide text-white shadow-[0_15px_45px_rgba(14,165,233,0.45)] transition hover:brightness-110'>
              {formCopy("requiredField") || "Ingresar"}
            </Buttons>

            <div className='space-y-3'>
              <div className='relative text-center text-xs uppercase tracking-[0.5em] text-white/50'>
                <span className='bg-slate-950/90 px-3'>o continúa con</span>
                <span className='absolute inset-x-0 top-1/2 -z-10 h-px w-full bg-white/15' />
              </div>

              <div className='flex flex-wrap gap-3'>
                {socialProviders.map((provider) => (
                  <button
                    key={provider}
                    type='button'
                    className='flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-white/40 hover:text-white'>
                    {provider}
                  </button>
                ))}
              </div>
            </div>

            <p className='text-center text-xs text-white/50'>
              Al continuar aceptas nuestras políticas de privacidad y el
              tratamiento de datos personales.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
