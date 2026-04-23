import { render, fireEvent, screen } from '@testing-library/react';
import TodoItem from './TodoItem'; // コンポーネントのパスに合わせて修正
import { vi } from 'vitest';

const mockTodo = {
  id: '1',
  todo: 'Test Todo',
  isCompleted: false,
  createdAt: new Date().toISOString(),
};

describe('TodoItem コンポーネント', () => {
  it('Todo が正しくレンダリングされること', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onDelete={vi.fn()}
        onComplete={vi.fn()}
        onIncomplete={vi.fn()}
        onUpdate={vi.fn()}
        disabled={false}
      />
    );

    // Todo テキストが表示されているか確認
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('編集モードでフォームが表示されること', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onDelete={vi.fn()}
        onComplete={vi.fn()}
        onIncomplete={vi.fn()}
        onUpdate={vi.fn()}
        disabled={false}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /edit todo/i }));
    const textField =  screen.getByRole('textbox');
    const saveButton = screen.getByRole('button', { name: /save todo/i });
    const cancelButton = screen.getByRole('button', { name: /cancel todo/i });

    // スナップショットを保存・比較（編集モード）
    // expect(asFragment()).toMatchSnapshot();

    // // 編集フォームが表示されているか確認
    expect(textField).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('完了状態が変更できること', () => {
    const handleComplete = vi.fn();
    render(
      <TodoItem
        todo={mockTodo}
        onDelete={vi.fn()}
        onComplete={handleComplete}
        onIncomplete={vi.fn()}
        onUpdate={vi.fn()}
        disabled={false}
      />
    );

    // 完了ボタンをクリック
    fireEvent.click(screen.getByRole('button', { name: /complete todo/i }));

    // onComplete が呼ばれることを確認
    expect(handleComplete).toHaveBeenCalledWith(mockTodo.id);
  });

  it('削除ボタンが正しく動作すること', () => {
    const handleDelete = vi.fn();
    render(
      <TodoItem
        todo={mockTodo}
        onDelete={handleDelete}
        onComplete={vi.fn()}
        onIncomplete={vi.fn()}
        onUpdate={vi.fn()}
        disabled={false}
      />
    );

    // 削除ボタンをクリック
    fireEvent.click(screen.getByRole('button', { name: /delete todo/i }));

    // onDelete が呼ばれることを確認
    expect(handleDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  it('disabled が true の場合、完了・編集・削除ボタンが無効になること', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onDelete={vi.fn()}
        onComplete={vi.fn()}
        onIncomplete={vi.fn()}
        onUpdate={vi.fn()}
        disabled={true}
      />
    );

    const editButton = screen.getByRole('button', { name: /edit todo/i });
    const deleteButton = screen.getByRole('button', { name: /delete todo/i });
    const completeButton = screen.getByRole('button', { name: /complete todo/i });

    expect(editButton).toBeDisabled();
    expect(deleteButton).toBeDisabled();
    expect(completeButton).toBeDisabled();
  });

  it('スナップショットテスト', () => {
    const { asFragment } = 
      render(
        <TodoItem
          todo={mockTodo}  
          onDelete={vi.fn()}
          onComplete={vi.fn()}
          onIncomplete={vi.fn()}
          onUpdate={vi.fn()} 
          disabled={false} 
        />
      );
    expect(asFragment()).toMatchSnapshot();
  });
});
