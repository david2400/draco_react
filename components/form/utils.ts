import React from 'react'

export function resolveErrorMessage(error: unknown, key?: string): string | undefined {
  if (!error) {
    return undefined
  }

  if (typeof error === 'string') {
    return error
  }

  if (Array.isArray(error)) {
    for (const item of error) {
      const message = resolveErrorMessage(item, key)
      if (message) {
        return message
      }
    }

    return undefined
  }

  if (typeof error === 'object') {
    const record = error as Record<string, unknown>

    if ('message' in record) {
      const value = record.message
      return typeof value === 'string' ? value : undefined
    }

    if (key && key in record) {
      return resolveErrorMessage(record[key], undefined)
    }
  }

  return undefined
}

export function useFieldIds({
  id,
  name,
}: {
  id?: string
  name?: string
}) {
  const generatedId = React.useId()
  const inputId = id ?? name ?? generatedId

  return {
    inputId,
    descriptionId: `${inputId}-description`,
    errorId: `${inputId}-error`,
  }
}
