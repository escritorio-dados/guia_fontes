interface IObject {
  [key: string]: any;
}

export function removeEmptyFields<T extends IObject>(object: T, removeNull?: boolean) {
  const newObject: IObject = { ...object };

  Object.keys(newObject).forEach((key) => {
    if (newObject[key] === '') {
      newObject[key] = undefined;
    }

    if (removeNull != null && newObject[key] === null) {
      newObject[key] = undefined;
    }

    if (Array.isArray(newObject[key]) && newObject[key].length === 0) {
      newObject[key] = undefined;
    }
  });

  return newObject as T;
}
