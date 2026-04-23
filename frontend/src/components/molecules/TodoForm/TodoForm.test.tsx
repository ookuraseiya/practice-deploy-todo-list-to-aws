import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoForm from './TodoForm';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('TodoForm コンポーネント', () => {
  it('フォームが正しくレンダリングされる', async () => {
    const handleAdd = vi.fn();
    render(<TodoForm onAdd={handleAdd} disabled={false} />);

    const textFieldLabel = await screen.findByText('New Todo');
    expect(textFieldLabel).toBeInTheDocument();
  });

  it('入力したデータが送信され、onAdd が呼ばれる', async () => {
    const handleAdd = vi.fn();
    render(<TodoForm onAdd={handleAdd} disabled={false} />);

    const textField =  screen.getByRole('textbox');

    // 入力値を設定
    await userEvent.type(textField, 'Buy milk');
  
    // フォームを送信
    await userEvent.click(screen.getByRole('button', { name: /add todo/i }));
  
    // onAdd が呼ばれたことを確認
    expect(handleAdd).toHaveBeenCalledWith({ todo: 'Buy milk' });
  });

  it('送信後にフォームがリセットされる', async () => {
    const handleAdd = vi.fn();
    render(<TodoForm onAdd={handleAdd} disabled={false} />);

    const textField =  screen.getByRole('textbox');
    fireEvent.change(textField, { target: { value: 'Test Reset' } });
    fireEvent.click(screen.getByRole('button', { name: /add todo/i }));

    await waitFor(() => {
      expect(textField).toHaveValue('');
    });
  });

  it('disabled の場合、入力と送信が無効になる', () => {
    const handleAdd = vi.fn();
    render(<TodoForm onAdd={handleAdd} disabled={true} />);

    const textField =  screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /add todo/i });

    expect(textField).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it('スナップショットテスト', () => {
    const handleAdd = vi.fn();
    const { asFragment } = render(<TodoForm onAdd={handleAdd} disabled={false} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
