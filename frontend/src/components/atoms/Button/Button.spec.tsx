import { render, fireEvent } from '@testing-library/react';
import Button from './Button'; // コンポーネントのパスに合わせて修正

describe('Button コンポーネント', () => {
  it('子要素が正しくレンダリングされること', () => {
    const { getByText } = render(<Button>Click Me</Button>);
    const buttonElement = getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
  });

  it('MuiButton のプロパティが正しく適用されること', () => {
    const { getByText } = render(
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    );
    const buttonElement = getByText('Click Me');
    
    // MuiButton の `variant` や `color` が適用されていることを確認
    expect(buttonElement).toHaveClass('MuiButton-contained'); // MuiButton のクラス名に基づいて確認
    expect(buttonElement).toHaveClass('MuiButton-colorPrimary');
  });

  it('クリック時に onClick ハンドラーが呼ばれること', () => {
    const handleClick = vi.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click Me</Button>
    );
    const buttonElement = getByText('Click Me');
    
    // ボタンがクリックされたときに handleClick が呼ばれるか確認
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('レンダリングが一致すること（スナップショットテスト）', () => {
    const { asFragment } = render(<Button>Click Me</Button>);
    expect(asFragment()).toMatchSnapshot();
  });
});
