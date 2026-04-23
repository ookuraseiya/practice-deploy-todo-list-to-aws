import { render, fireEvent } from '@testing-library/react';
import IconButton from './IconButton'; // コンポーネントのパスに合わせて修正
import { vi } from 'vitest';

describe('IconButton コンポーネント', () => {
  it('子要素が正しくレンダリングされること', () => {
    const { getByText } = render(<IconButton>Click Me</IconButton>);
    const iconButtonElement = getByText('Click Me');
    expect(iconButtonElement).toBeInTheDocument();
  });

  it('MuiIconButton のプロパティが正しく適用されること', () => {
    const { getByText } = render(
      <IconButton color="primary">
        Click Me
      </IconButton>
    );
    const iconButtonElement = getByText('Click Me');
    
    // MuiIconButton の `color` が適用されていることを確認
    expect(iconButtonElement).toHaveClass('MuiIconButton-colorPrimary');
  });

  it('クリック時に onClick ハンドラーが呼ばれること', () => {
    const handleClick = vi.fn();
    const { getByText } = render(
      <IconButton onClick={handleClick}>Click Me</IconButton>
    );
    const iconButtonElement = getByText('Click Me');
    
    // ボタンがクリックされたときに handleClick が呼ばれるか確認
    fireEvent.click(iconButtonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('レンダリングが一致すること（スナップショットテスト）', () => {
    const { asFragment } = render(<IconButton>Click Me</IconButton>);
    expect(asFragment()).toMatchSnapshot();
  });
});
