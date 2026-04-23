import { renderHook, act } from '@testing-library/react';
import { useAddTodo } from './useAddTodo';
import { expect, vi, Mock } from 'vitest';

// APIのレスポンスのモックを作成
vi.stubGlobal('fetch', vi.fn());

const mockFetch = fetch as Mock;

const mockAddTodoValue = 'add test' as string;

describe('useAddTodoのテスト', () => {
  it('addTodosが成功する場合の動作を確認', async () => {
    const mockTodo = {
      id: '1',
      todo: 'add test',
      isCompleted: false,
      createdAt: '2024-01-01',
    };
  
    // fetchのモック設定
    mockFetch.mockResolvedValueOnce({
      status: 200,
      json: async () => mockTodo,
    });
  
    // `useAddTodo` フックをテスト
    const { result } = renderHook(() => useAddTodo());

    const { addTodo, loading } = result.current;
  
    expect(loading).toBe(false); // 初期ローディングは false であることを確認
  
    let fetchResult;
    await act(async () => {
      fetchResult = await addTodo(mockAddTodoValue);
    });
  
    // 返された値をチェック
    expect(fetchResult).toEqual({
      isSuccess: true,
      newTodo: mockTodo,
    });
  
    // ローディングが false に戻ることを確認
    expect(loading).toBe(false);
    // const mockTodo = {
    //   id: '1',
    //   todo: 'add test',
    //   isCompleted: false,
    //   createdAt: '2024-01-01',
    // };

    // mockFetch.mockResolvedValueOnce({
    //   status: 200,
    //   json: async () => mockTodo,
    // });

    // // `useFetchTodos` フックをテスト
    // const { result } = renderHook(() => useAddTodo());
    
    // const { addTodo, loading } = result.current;
    
    // expect(loading).toBe(false); // 初期ローディングは false であることを確認
    
    // const fetchResult = await addTodo();

    // // 返された値をチェック
    // expect(fetchResult).toEqual({
    //   isSuccess: true,
    //   newTodo: mockTodo
    // });
    // expect(loading).toBe(false); // ローディングが false に戻ることを確認
  });

  test('request.todos が不正な形式なら isSuccess: false を返す', async () => {
    const invalidTodo = { todos: 'invalid data' };
    mockFetch.mockResolvedValueOnce({
      status: 200,
      json: async () => invalidTodo
    });
    
    const { result } = renderHook(() => useAddTodo());

    const { addTodo, loading } = result.current;
    
    let fetchResult;
    await act(async () => {
      fetchResult = await addTodo(mockAddTodoValue);
    });
    
    expect(fetchResult).toEqual({ isSuccess: false });
    expect(loading).toBe(false);
  });

  test('fetch のステータスコードが 200 以外なら isSuccess: false を返す', async () => {
    mockFetch.mockResolvedValueOnce({
      status: 500,
      json: async () => ({ error: 'Internal Server Error' }),
    });
    
    const { result } = renderHook(() => useAddTodo());

    const { addTodo, loading } = result.current;
    
    let fetchResult;
    await act(async () => {
      fetchResult = await addTodo(mockAddTodoValue);
    });
    
    expect(fetchResult).toEqual({ isSuccess: false });
    expect(loading).toBe(false);
  });

  test('fetch が失敗して例外を投げる場合は isSuccess: false を返す', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network Error'));
   
    const { result } = renderHook(() => useAddTodo());

    const { addTodo, loading } = result.current;
    
    let fetchResult;
    await act(async () => {
      fetchResult = await addTodo(mockAddTodoValue);
    });
   
    expect(fetchResult).toEqual({ isSuccess: false });
    expect(loading).toBe(false);
  });
});
