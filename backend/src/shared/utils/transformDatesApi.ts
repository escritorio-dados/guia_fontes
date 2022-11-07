import { TransformFnParams } from 'class-transformer';

export function transformDatesApi(value: TransformFnParams) {
  if (value == null || value.value == null) {
    return null;
  }

  return new Date(value.value);
}
