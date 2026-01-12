'use client';

import {ChangeEvent, useEffect, useMemo, useState} from 'react';
import classNames from 'classnames';
import {Controller, useFormContext} from 'react-hook-form';
import {SearchByPictureComponentData} from '@repo/ui/dynamic-form';

interface PhotoUploaderProps {
  fieldName: string;
  config: SearchByPictureComponentData;
  isLoading?: boolean;
  submitLabel?: string;
  loadingLabel?: string;
  onSubmit?: () => void;
}

interface ValidationResult {
  files: File[];
  previews: string[];
  error?: string;
}

const parseMaxFileSize = (value?: string): number | null => {
  if (!value) return null;
  const match = value.match(/(\d+)(kb|mb|b)?/i);
  if (!match) return Number(value);
  const size = Number(match[1]);
  const unit = match[2]?.toLowerCase();
  switch (unit) {
    case 'kb':
      return size * 1024;
    case 'mb':
      return size * 1024 * 1024;
    case 'b':
    default:
      return size;
  }
};

export const PhotoUploader = ({
  fieldName,
  config,
  isLoading,
  submitLabel = 'Subir foto',
  loadingLabel = 'Subiendo...',
  onSubmit,
}: PhotoUploaderProps) => {
  const {control} = useFormContext();
  const [localError, setLocalError] = useState<string | undefined>();
  const [isValidating, setIsValidating] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const maxFileSize = useMemo(() => parseMaxFileSize(config.maxFileSize), [config.maxFileSize]);
  const defaultError = config.errorMessage ?? 'No se pudo subir la foto.';
  const emptyError = config.emptyErrorMessage ?? 'Para continuar, sube al menos una foto.';

  useEffect(() => {
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const validateDimensions = (file: File): Promise<string | null> => {
    return new Promise(resolve => {
      if (!config.dimensions?.width && !config.dimensions?.height) {
        resolve(null);
        return;
      }

      const url = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        URL.revokeObjectURL(url);
        const {width, height} = image;
        const minWidth = config.dimensions?.width?.[0];
        const maxWidth = config.dimensions?.width?.[1];
        const minHeight = config.dimensions?.height?.[0];
        const maxHeight = config.dimensions?.height?.[1];

        if ((minWidth && width < minWidth) || (minHeight && height < minHeight)) {
          resolve(config.validationsErrorBeforeUpload?.small ?? defaultError);
          return;
        }

        if ((maxWidth && width > maxWidth) || (maxHeight && height > maxHeight)) {
          resolve(config.validationsErrorBeforeUpload?.large ?? defaultError);
          return;
        }

        resolve(null);
      };
      image.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(config.validationsErrorBeforeUpload?.default ?? defaultError);
      };
      image.src = url;
    });
  };

  const validateFiles = async (files: File[]): Promise<ValidationResult> => {
    if (!files.length) {
      return {files: [], previews: [], error: config.validationsErrorBeforeUpload?.default ?? defaultError};
    }

    const acceptedFiles: File[] = [];
    const previewUrls: string[] = [];

    for (const file of files) {
      if (config.disabled) {
        return {
          files: [],
          previews: [],
          error: config.validationsErrorBeforeUpload?.default ?? defaultError,
        };
      }

      if (config.extensions?.length && !config.extensions.includes(file.type)) {
        return {
          files: [],
          previews: [],
          error: config.validationsErrorBeforeUpload?.extension ?? defaultError,
        };
      }

      if (maxFileSize && file.size > maxFileSize) {
        return {
          files: [],
          previews: [],
          error: config.validationsErrorBeforeUpload?.maxSize ?? defaultError,
        };
      }

      const dimensionError = await validateDimensions(file);
      if (dimensionError) {
        return {
          files: [],
          previews: [],
          error: dimensionError,
        };
      }

      acceptedFiles.push(file);
      previewUrls.push(URL.createObjectURL(file));
    }

    return {files: acceptedFiles, previews: previewUrls};
  };

  const handleInputChange = async (
    event: ChangeEvent<HTMLInputElement>,
    onChange: (value: File[]) => void,
  ) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = '';
    setIsValidating(true);
    const result = await validateFiles(files);
    setIsValidating(false);

    if (!result.files.length && result.error) {
      setLocalError(result.error);
      setPreviews(prev => {
        prev.forEach(url => URL.revokeObjectURL(url));
        return [];
      });
      onChange([]);
      return;
    }

    setLocalError(undefined);
    setPreviews(prev => {
      prev.forEach(url => URL.revokeObjectURL(url));
      return result.previews;
    });
    onChange(result.files);
  };

  return (
    <Controller
      name={fieldName}
      control={control}
      defaultValue={[]}
      rules={{
        validate: value => {
          if (config.isUploadRequired && (!value || value.length === 0)) {
            return emptyError;
          }
          return true;
        },
      }}
      render={({field, fieldState}) => {
        const errorMessage = fieldState.error?.message ?? localError;
        const buttonLabel = isLoading ? loadingLabel : submitLabel;

        return (
          <div className='space-y-4'>
            <div
              className={classNames(
                'relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition',
                {
                  'border-indigo-400 bg-indigo-50/60': !errorMessage,
                  'border-red-400 bg-red-50/60': Boolean(errorMessage),
                  'opacity-70': isLoading || config.disabled || isValidating,
                },
              )}
            >
              <input
                id={`${fieldName}-uploader`}
                type='file'
                accept={config.extensions?.join(',')}
                multiple
                disabled={isLoading || config.disabled || isValidating}
                className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
                onChange={event => handleInputChange(event, value => field.onChange(value))}
                onBlur={field.onBlur}
              />
              <div className='flex flex-col items-center gap-2'>
                <span className='flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600'>📷</span>
                <p className='text-base font-semibold text-slate-900'>Arrastra o haz clic para subir fotos</p>
                {config.requirements ? (
                  <p className='max-w-lg text-sm text-slate-600'>{config.requirements}</p>
                ) : null}
              </div>
              <button
                type='button'
                className='mt-4 inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300'
                disabled={isLoading || config.disabled || isValidating}
                onClick={onSubmit}
              >
                {isLoading || isValidating ? (
                  <span className='flex items-center gap-2'>
                    <span className='h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white'></span>
                    {buttonLabel}
                  </span>
                ) : (
                  buttonLabel
                )}
              </button>
            </div>

            {previews.length ? (
              <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'>
                {previews.map(url => (
                  <figure
                    key={url}
                    className='relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm'
                  >
                    <img src={url} alt='Previsualización' className='h-full w-full object-cover' />
                  </figure>
                ))}
              </div>
            ) : null}

            {errorMessage ? <p className='text-sm font-medium text-red-600'>{errorMessage}</p> : null}
          </div>
        );
      }}
    />
  );
};
