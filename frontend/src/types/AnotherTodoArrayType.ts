import { isArrayOfType } from './typeGuard';

export type AnotherTodoType = {
  id: string;
  todo: string;
  created_at: string;
  completed: number;
};

export const isAnotherTodoType = (item: unknown): item is AnotherTodoType => {
  const { id, todo, created_at, completed } = item as AnotherTodoType;
  return (
    item !== null &&
    typeof id === 'string' &&
    typeof todo === 'string' &&
    typeof created_at === 'string' &&
    typeof completed === 'number'
  );
};

export const isAnotherTodoArrayType = (
  items: unknown
): items is AnotherTodoType[] => {
  return isArrayOfType(items, isAnotherTodoType);
};
