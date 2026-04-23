import { isArrayOfType } from './typeGuard';

export type TodoType = {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: string;
};

export const isTodoType = (item: unknown): item is TodoType => {
  const { id, todo, isCompleted, createdAt } = item as TodoType;
  return (
    item !== null &&
    typeof id === 'string' &&
    typeof todo === 'string' &&
    typeof isCompleted === 'boolean' &&
    typeof createdAt === 'string'
  );
};

export const isTodoArrayType = (items: unknown): items is TodoType[] => {
  return isArrayOfType(items, isTodoType);
};
