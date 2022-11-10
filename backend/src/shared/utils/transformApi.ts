import { TransformFnParams } from 'class-transformer';

export function transformDatesApi(value: TransformFnParams) {
  if (value == null || value.value == null) {
    return null;
  }

  return new Date(value.value);
}

export function transformBooleanApi(value: TransformFnParams) {
  if (value != null && value.value === 'true') {
    return true;
  }

  return false;
}
