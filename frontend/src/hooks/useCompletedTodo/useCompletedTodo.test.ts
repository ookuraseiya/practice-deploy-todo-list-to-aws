import { renderHook, act } from '@testing-library/react';
import { useCompletedTodo } from './useCompletedTodo';
import { expect, vi, Mock } from 'vitest';

// APIのレスポンスのモックを作成
vi.stubGlobal('fetch', vi.fn());

const mockFetch = fetch as Mock;

describe('useCompletedTodoのテスト', () => {
  const mockTodos = [
    {
      id: '1',
      todo: 'Test Todo 1',
      isCompleted: false,
      createdAt: '2022-01-01',
    },
    {
      id: '2',
      todo: 'Test Todo 2',
      isCompleted: false,
      createdAt: '2022-02-01',
    },
  ];

  it('completedTodoが成功する場合の動作を確認', async () => {
    const mockResponse = { id: '1' };

    // `fetch` が成功したレスポンスを返すようにモック
    mockFetch.mockResolvedValueOnce({
      status: 200,
      json: async () => mockResponse,
    });

    // `useCompletedTodo` フックをテスト
    const { result } = renderHook(() => useCompletedTodo());

    const { completedTodo, loading } = result.current;

    expect(loading).toBe(false); // 初期ローディングは false であることを確認

    let fetchResult;
    await act(async () => {
      fetchResult = await completedTodo('1', mockTodos);
    });

    // 返された値をチェック
    expect(fetchResult).toEqual({
      isSuccess: true,
      newTodos: [
        { id: '1', todo: 'Test Todo 1', isCompleted: true, createdAt: '2022-01-01' },
        { id: '2', todo: 'Test Todo 2', isCompleted: false, createdAt: '2022-02-01' },
      ],
    });
    expect(loading).toBe(false); // ローディングが false に戻ることを確認
  });

  it('fetch が失敗して例外を投げる場合', async () => {
    // `fetch` が失敗したレスポンスを返すようにモック
    mockFetch.mockResolvedValueOnce({
      status: 500,
      json: async () => ({ error: 'Internal Server Error' }),
    });

    // `useCompletedTodo` フックをテスト
    const { result } = renderHook(() => useCompletedTodo());

    const { completedTodo, loading } = result.current;

    expect(loading).toBe(false); // 初期ローディングは false であることを確認

    let fetchResult;
    await act(async () => {
      fetchResult = await completedTodo('1', mockTodos);
    });

    // 返された値をチェック
    expect(fetchResult).toEqual({ isSuccess: false });
    expect(loading).toBe(false); // ローディングが false に戻ることを確認
  });

  it('fetch のステータスコードが 200 以外なら isSuccess: false を返す', async () => {
    // `fetch` がステータスコード200以外を返すようにモック
    mockFetch.mockResolvedValueOnce({
      status: 500,
      json: async () => ({ error: 'Internal Server Error' }),
    });

    // `useCompletedTodo` フックをテスト
    const { result } = renderHook(() => useCompletedTodo());

    const { completedTodo, loading } = result.current;

    expect(loading).toBe(false); // 初期ローディングは false であることを確認

    let fetchResult;
    await act(async () => {
      fetchResult = await completedTodo('1', mockTodos);
    });

    // 返された値をチェック
    expect(fetchResult).toEqual({ isSuccess: false });
    expect(loading).toBe(false); // ローディングが false に戻ることを確認
  });
});
