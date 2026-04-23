import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import TodoPage from './TodoPage';
import { TodoType } from '../../../types/TodoType';
import * as fetchHook from '../../../hooks/useFetchTodos/useFetchTodos';
import * as addHook from '../../../hooks/useAddTodo/useAddTodo';
import * as deleteHook from '../../../hooks/useDeleteTodo/useDeleteTodo';
import * as updateHook from '../../../hooks/useUpdateTodo/useUpdateTodo';
import * as completeHook from '../../../hooks/useCompletedTodo/useCompletedTodo';
import * as incompleteHook from '../../../hooks/useIncompleteTodo/useIncompleteTodo';

describe('TodoPage', () => {
  it('TodoPageコンポーネントが正しくレンダリングされ、TODOリストが表示されること', async () => {
    const mockTodos: TodoType[] = [
      {
        id: '1',
        todo: 'Test Todo 1',
        isCompleted: false,
        createdAt: '2023-01-01',
      },
      {
        id: '2',
        todo: 'Test Todo 2',
        isCompleted: false,
        createdAt: '2023-01-02',
      },
      {
        id: '3',
        todo: 'Test Todo 3',
        isCompleted: true,
        createdAt: '2023-01-03',
      },
    ];

    const fetchTodosMock = vi.fn().mockResolvedValue({
      isSuccess: true,
      fetchTodos: mockTodos,
    });
    vi.spyOn(fetchHook, 'useFetchTodos').mockReturnValue({
      fetchTodos: fetchTodosMock,
      loading: false,
    });

    const { getByText } = render(<TodoPage />);

    // Todoリストが表示されることを確認
    await waitFor(() => {
      expect(fetchTodosMock).toHaveBeenCalled();
      expect(getByText(mockTodos[0].todo)).toBeInTheDocument();
      expect(getByText(mockTodos[1].todo)).toBeInTheDocument();
    });
  });

  it('新しいTODOが追加されること', async () => {
    const returnData = {
      id: '3',
      todo: 'New Todo Item',
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };

    const addTodoMock = vi.fn().mockResolvedValue({
      isSuccess: true,
      newTodo: returnData,
    });

    const useAddTodoSpy = vi.spyOn(addHook, 'useAddTodo');
    useAddTodoSpy.mockReturnValue({
      loading: false,
      addTodo: addTodoMock,
    });

    const { getByRole, getByText } = render(<TodoPage />);

    // 入力欄とボタンを取得
    const addButton = getByRole('button', { name: /add todo/i });
    const textField = getByRole('textbox');
    fireEvent.change(textField, { target: { value: returnData.todo } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(addTodoMock).toHaveBeenCalled();
      expect(getByText(returnData.todo)).toBeInTheDocument();
    });
  });

  it('TODOが削除されること', async () => {
    const deleteTodoMock = vi
      .fn()
      .mockImplementation(async (id: string, todos: TodoType[]) => ({
        isSuccess: true,
        newTodos: todos.filter((t) => t.id !== id),
      }));
    vi.spyOn(deleteHook, 'useDeleteTodo').mockReturnValue({
      deleteTodo: deleteTodoMock,
      loading: false,
    });

    const { getAllByRole, queryByText } = render(<TodoPage />);

    await waitFor(() => {
      const deleteButtons = getAllByRole('button', { name: /delete todo/i });
      fireEvent.click(deleteButtons[0]);
    });

    expect(queryByText('Test Todo 1')).not.toBeInTheDocument();
  });

  it('TODOが更新されること', async () => {
    const updateTodoMock = vi
      .fn()
      .mockImplementation(async (id: string, updateTodo: string) => ({
        isSuccess: true,
        newTodos: [
          {
            id,
            todo: updateTodo,
            isCompleted: false,
            createdAt: new Date().toISOString(),
          },
        ],
      }));

    vi.spyOn(updateHook, 'useUpdateTodo').mockReturnValue({
      updateTodo: updateTodoMock,
      loading: false,
    });

    const { getAllByRole, getByText, getByDisplayValue } = render(<TodoPage />);

    // 「edit todo」ボタンが表示されるまで待機
    await waitFor(() => {
      const updateButtons = getAllByRole('button', { name: /edit todo/i });
      fireEvent.click(updateButtons[0]); // 最初の「edit todo」ボタンをクリック
    });
    const editTextField = getByDisplayValue('Test Todo 1');
    fireEvent.change(editTextField, { target: { value: 'Updated Todo' } });
    const saveButtons = getAllByRole('button', { name: /save todo/i });
    fireEvent.click(saveButtons[0]);
    await waitFor(() => {
      expect(updateTodoMock).toHaveBeenCalled();
      expect(getByText('Updated Todo')).toBeInTheDocument();
    });
  });

  it('TODOが未完了状態に変更されること', async () => {
    const completedTodoMock = vi
      .fn()
      .mockImplementation(async (id: string, todos: TodoType[]) => ({
        isSuccess: true,
        newTodos: todos.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: true } : todo
        ),
      }));
    vi.spyOn(completeHook, 'useCompletedTodo').mockReturnValue({
      completedTodo: completedTodoMock,
      loading: false,
    });

    const { getAllByRole, getByRole } = render(<TodoPage />);

    await waitFor(() => {
      const completedButtons = getAllByRole('button', {
        name: /complete todo/i,
      });
      fireEvent.click(completedButtons[0]);
      expect(completedTodoMock).toHaveBeenCalled();
    });

    const incompleteTodo = getAllByRole('button', { name: /incomplete todo/i });
    expect(incompleteTodo[0]).toBeInTheDocument();
  });

  it('TODOが完了状態に変更されること', async () => {
    const incompleteTodoMock = vi
      .fn()
      .mockImplementation(async (id: string, todos: TodoType[]) => ({
        isSuccess: true,
        newTodos: todos.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: true } : todo
        ),
      }));
    vi.spyOn(incompleteHook, 'useIncompleteTodo').mockReturnValue({
      incompleteTodo: incompleteTodoMock,
      loading: false,
    });

    const { getAllByRole, getByRole, getByText } = render(<TodoPage />);

    await waitFor(() => {
      const incompleteButtons = getAllByRole('button', {
        name: /incomplete todo/i,
      });
      fireEvent.click(incompleteButtons[0]);
      expect(incompleteTodoMock).toHaveBeenCalled();
    });

    const completedTodo = getAllByRole('button', { name: /complete todo/i });
    expect(completedTodo[0]).toBeInTheDocument();
  });

  it('スナップショットが一致すること', async () => {
    const { asFragment } = render(<TodoPage />);
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
