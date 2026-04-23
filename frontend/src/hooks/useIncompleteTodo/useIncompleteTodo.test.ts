import { renderHook, act } from '@testing-library/react';
import { useIncompleteTodo } from './useIncompleteTodo';
import { expect, vi, Mock } from 'vitest';

// グローバルな `fetch` をモック
vi.stubGlobal('fetch', vi.fn());
const mockFetch = fetch as Mock;

describe('useIncompleteTodoのテスト', () => {

  it('incompleteTodoが成功する場合の動作を確認', async () => {
    // 初期のTodoリスト
    const mockTodos = [
      { id: '1', todo: 'Test Todo 1', isCompleted: true, createdAt: '2022-01-01' },
      { id: '2', todo: 'Test Todo 2', isCompleted: true, createdAt: '2022-02-01' },
    ];

    // `fetch` のモックを設定 (成功のケース)
    mockFetch.mockResolvedValueOnce({
      status: 200,
      json: async () => ({ success: true }),
    });

    const { result } = renderHook(() => useIncompleteTodo());

    const { incompleteTodo, loading } = result.current;

    expect(loading).toBe(false); // 初期ローディングは false であることを確認

    let fetchResult;
    await act(async () => {
      fetchResult = await incompleteTodo('1', mockTodos);
    });

    // 成功した場合、新しいTodoリストの `isCompleted` が `false` になっていることを確認
    expect(fetchResult).toEqual({
      isSuccess: true,
      newTodos: [
        { id: '1', todo: 'Test Todo 1', isCompleted: false, createdAt: '2022-01-01' },
        { id: '2', todo: 'Test Todo 2', isCompleted: true, createdAt: '2022-02-01' },
      ],
    });
    expect(loading).toBe(false); // ローディングが false に戻ることを確認
  });

  it('fetch のステータスコードが 200 以外なら isSuccess: false を返す', async () => {
    // `fetch` が 200 以外のステータスコードで返される場合
    mockFetch.mockResolvedValueOnce({
      status: 500,
      json: async () => ({ error: 'Internal Server Error' }),
    });

    const { result } = renderHook(() => useIncompleteTodo());

    const { incompleteTodo, loading } = result.current;

    let fetchResult;
    await act(async () => {
      fetchResult = await incompleteTodo('1', [
        { id: '1', todo: 'Test Todo 1', isCompleted: true, createdAt: '2022-01-01' },
      ]);
    });

    // ステータスコードが200以外の場合、`isSuccess: false` が返されることを確認
    expect(fetchResult).toEqual({ isSuccess: false });
    expect(loading).toBe(false); // ローディングが false に戻ることを確認
  });

  it('fetch が reject（ネットワークエラー）したら isSuccess: false を返す', async () => {
    // `fetch` がネットワークエラーで失敗する場合
    mockFetch.mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHook(() => useIncompleteTodo());

    const { incompleteTodo, loading } = result.current;

    let fetchResult;
    await act(async () => {
      fetchResult = await incompleteTodo('1', [
        { id: '1', todo: 'Test Todo 1', isCompleted: true, createdAt: '2022-01-01' },
      ]);
    });

    // ネットワークエラーが発生した場合、`isSuccess: false` が返されることを確認
    expect(fetchResult).toEqual({ isSuccess: false });
    expect(loading).toBe(false); // ローディングが false に戻ることを確認
  });

});
