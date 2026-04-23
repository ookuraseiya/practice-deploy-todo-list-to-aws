import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';
import { TodoType } from '../../../types/TodoType';
import { vi } from 'vitest';

describe('TodoList コンポーネント', () => {
  const mockTodos: TodoType[] = [
    {
      id: '1',
      todo: 'Task 1',
      isCompleted: false,
      createdAt: '',
    },
    {
      id: '2',
      todo: 'Task 2',
      isCompleted: true,
      createdAt: '',
    },
  ];

  const mockOnDelete = vi.fn();
  const mockOnComplete = vi.fn();
  const mockOnIncomplete = vi.fn();
  const mockOnUpdate = vi.fn();

  it('TodoItem が正しくレンダリングされること', () => {
    render(
      <TodoList
        todos={mockTodos}
        onDelete={mockOnDelete}
        onComplete={mockOnComplete}
        onIncomplete={mockOnIncomplete}
        onUpdate={mockOnUpdate}
        disabled={false}
      />
    );

    // 各 Todo のテキストが表示されることを確認
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('イベントハンドラが適切に呼び出されること', () => {
    render(
      <TodoList
        todos={mockTodos}
        onDelete={mockOnDelete}
        onComplete={mockOnComplete}
        onIncomplete={mockOnIncomplete}
        onUpdate={mockOnUpdate}
        disabled={false}
      />
    );

    const completedButtons = screen.getAllByRole('button', {
      name: /complete todo/i,
    });
    const deleteButtons = screen.getAllByRole('button', {
      name: /delete todo/i,
    });
    const completedButton = completedButtons[0];
    const deleteButton = deleteButtons[0];

    fireEvent.click(completedButton);
    expect(mockOnComplete).toHaveBeenCalledWith(mockTodos[0].id);

    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith(mockTodos[0].id);
  });

  it('スナップショットテスト', () => {
    const { asFragment } = render(
      <TodoList
        todos={mockTodos}
        onDelete={mockOnDelete}
        onComplete={mockOnComplete}
        onIncomplete={mockOnIncomplete}
        onUpdate={mockOnUpdate}
        disabled={false}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
