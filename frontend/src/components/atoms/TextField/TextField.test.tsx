import { render, screen, fireEvent } from '@testing-library/react';
import TextField from './TextField';
import { describe, it, expect } from 'vitest';

describe('TextField コンポーネント', () => {
  it('正しくレンダリングされること', () => {
    render(<TextField label="Test Label" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('プレースホルダーが表示されること', () => {
    render(<TextField placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('入力ができること', () => {
    render(<TextField label="Test Input" />);
    const input = screen.getByLabelText('Test Input');
    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(input).toHaveValue('Hello');
  });

  it('disabled の場合、入力ができないこと', () => {
    render(<TextField label="Disabled Input" disabled />);
    const input = screen.getByLabelText('Disabled Input');
    expect(input).toBeDisabled();
  });

  it('error プロパティが適用されること', () => {
    render(<TextField label="Error Input" error />);
    const input = screen.getByLabelText('Error Input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('helperText が表示されること', () => {
    render(<TextField label="Input with Helper" helperText="This is a helper text" />);
    expect(screen.getByText('This is a helper text')).toBeInTheDocument();
  });

  it('スナップショットテスト', () => {
    const { asFragment } = render(<TextField label="Snapshot Test" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
