export const guardRuntimeError = (typeGuard: () => boolean) => {
  try {
    return typeGuard();
  } catch {
    return false;
  }
};

export const isArrayOfType = <T>(
  array: unknown,
  typeGuard: (data: unknown) => data is T
): array is readonly T[] => {
  return guardRuntimeError(
    () => Array.isArray(array) && array.every(typeGuard)
  );
};
