import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import TodoTemplate from './TodoTemplate';
import { TodoType } from '../../../types/TodoType';

// TodoTypeのサンプルデータ
const mockTodos: TodoType[] = [
  {
    id: '1',
    todo: 'テストTodo',
    isCompleted: false,
    createdAt: Date.now().toString(),
  },
];

// 関数のモック
const mockOnAddTodo = vi.fn();
const mockOnDeleteTodo = vi.fn();
const mockOnCompleteTodo = vi.fn();
const mockOnIncompleteTodo = vi.fn();
const mockOnUpdateTodo = vi.fn();

describe('TodoTemplateコンポーネントのテスト', () => {
  it('TodoTemplateが正しくレンダリングされること', () => {
    render(
      <TodoTemplate
        todos={mockTodos}
        onAddTodo={mockOnAddTodo}
        onDeleteTodo={mockOnDeleteTodo}
        onCompleteTodo={mockOnCompleteTodo}
        onIncompleteTodo={mockOnIncompleteTodo}
        onUpdateTodo={mockOnUpdateTodo}
        loading={false}
      />
    );

    // タイトルが表示されているか確認
    expect(screen.getByText('TodoList')).toBeInTheDocument();
  });

  it('新しいTodoを追加するためのフォームが機能すること', async () => {
    render(
      <TodoTemplate
        todos={mockTodos}
        onAddTodo={mockOnAddTodo}
        onDeleteTodo={mockOnDeleteTodo}
        onCompleteTodo={mockOnCompleteTodo}
        onIncompleteTodo={mockOnIncompleteTodo}
        onUpdateTodo={mockOnUpdateTodo}
        loading={false}
      />
    );

    const textField =  screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add todo/i });

    // フォームの入力フィールドにテキストを入力
    fireEvent.change(textField, { target: { value: '新しいTodo' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockOnAddTodo).toHaveBeenCalledWith({ todo: '新しいTodo' });
    });
  });

  it('Todoを削除した後、TodoListから削除されること', async () => {
    render(
      <TodoTemplate
        todos={mockTodos}
        onAddTodo={mockOnAddTodo}
        onDeleteTodo={mockOnDeleteTodo}
        onCompleteTodo={mockOnCompleteTodo}
        onIncompleteTodo={mockOnIncompleteTodo}
        onUpdateTodo={mockOnUpdateTodo}
        loading={false}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete todo/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockOnDeleteTodo).toHaveBeenCalledWith(mockTodos[0].id);
    });
  });

  it('スナップショットが一致すること', () => {
    const { asFragment } = render(
      <TodoTemplate
        todos={mockTodos}
        onAddTodo={mockOnAddTodo}
        onDeleteTodo={mockOnDeleteTodo}
        onCompleteTodo={mockOnCompleteTodo}
        onIncompleteTodo={mockOnIncompleteTodo}
        onUpdateTodo={mockOnUpdateTodo}
        loading={false}
      />
    );

    // スナップショットが保存されることを確認
    expect(asFragment()).toMatchSnapshot();
  });
});
