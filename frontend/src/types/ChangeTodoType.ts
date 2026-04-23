export type ChangeTodoType = {
  todo: string;
  editTodoName: string;
};

export const isChangeTodoType = (item: unknown): item is ChangeTodoType => {
  const { todo, editTodoName } = item as ChangeTodoType;
  return (
    item !== null &&
    typeof todo === 'string' &&
    typeof editTodoName === 'string'
  );
};
