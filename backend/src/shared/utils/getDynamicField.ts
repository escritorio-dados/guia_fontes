interface IObject {
  [key: string]: any;
}

interface IGetDynamicField {
  fields: string[];
  object: IObject;
}

export function getDynamicField({ fields, object }: IGetDynamicField) {
  return fields.reduce((value, current) => {
    return value[current];
  }, object);
}
