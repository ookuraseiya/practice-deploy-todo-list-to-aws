import { renderHook, act } from '@testing-library/react';
import { useUpdateTodo } from './useUpdateTodo';
import { expect, vi, Mock } from 'vitest';
import { TodoType } from '../../types/TodoType';

// グローバルな `fetch` をモック
vi.stubGlobal('fetch', vi.fn());
const mockFetch = fetch as Mock;

describe('useUpdateTodoのテスト', () => {

  const mockTodos: TodoType[] = [
    { id: '1', todo: 'Test Todo 1', isCompleted: false, createdAt: '2022-01-01' },
    { id: '2', todo: 'Test Todo 2', isCompleted: true, createdAt: '2022-02-01' },
  ];

  it('updateTodoが成功する場合の動作を確認', async () => {
    // `fetch` のモックを設定 (成功のケース)
    mockFetch.mockResolvedValueOnce({
      status: 200,
      json: async () => ({
        id: '1',
        todo: 'Updated Todo',
        isCompleted: false,
        createdAt: '2022-01-01',
      }),
    });

    const { result } = renderHook(() => useUpdateTodo());

    const { updateTodo, loading } = result.current;

    let fetchResult;
    await act(async () => {
      fetchResult = await updateTodo(
        '1',
        'Updated Todo',
        false,
        '2022-01-01',
        mockTodos
      );
    });

    // 成功した場合、新しいTodoリストが更新されていることを確認
    expect(fetchResult).toEqual({
      isSuccess: true,
      newTodos: [
        { id: '1', todo: 'Updated Todo', isCompleted: false, createdAt: '2022-01-01' },
        { id: '2', todo: 'Test Todo 2', isCompleted: true, createdAt: '2022-02-01' },
      ],
    });
    expect(loading).toBe(false); // ローディングが false に戻ることを確認
  });

  it('fetch が失敗して例外を投げる場合は isSuccess: false を返す', async () => {
    // `fetch` がエラーを返すケース
    mockFetch.mockResolvedValueOnce({
      status: 500,
      json: async () => ({ error: 'Internal Server Error' }),
    });

    const { result } = renderHook(() => useUpdateTodo());

    const { updateTodo, loading } = result.current;

    let fetchResult;
    await act(async () => {
      fetchResult = await updateTodo(
        '1',
        'Updated Todo',
        false,
        '2022-01-01',
        mockTodos
      );
    });

    // 失敗した場合、`isSuccess: false` を返すことを確認
    expect(fetchResult).toEqual({ isSuccess: false });
    expect(loading).toBe(false); // ローディングが false に戻ることを確認
  });

  it('fetch のステータスコードが 200 以外なら isSuccess: false を返す', async () => {
    // `fetch` が 200 以外のステータスコードで返されるケース
    mockFetch.mockResolvedValueOnce({
      status: 404,
      json: async () => ({ error: 'Not Found' }),
    });

    const { result } = renderHook(() => useUpdateTodo());

    const { updateTodo, loading } = result.current;

    let fetchResult;
    await act(async () => {
      fetchResult = await updateTodo(
        '1',
        'Updated Todo',
        false,
        '2022-01-01',
        mockTodos
      );
    });

    // ステータスコードが200以外の場合、`isSuccess: false` を返すことを確認
    expect(fetchResult).toEqual({ isSuccess: false });
    expect(loading).toBe(false); // ローディングが false に戻ることを確認
  });

  it('レスポンスデータの型が正しくない場合は isSuccess: false を返す', async () => {
    // レスポンスが不正な型を返すケース
    mockFetch.mockResolvedValueOnce({
      status: 200,
      json: async () => ({
        id: '1',
        todo: 'Updated Todo',
        isCompleted: 'not-a-boolean', // 型が不正
        createdAt: '2022-01-01',
      }),
    });

    const { result } = renderHook(() => useUpdateTodo());

    const { updateTodo, loading } = result.current;

    let fetchResult;
    await act(async () => {
      fetchResult = await updateTodo(
        '1',
        'Updated Todo',
        false,
        '2022-01-01',
        mockTodos
      );
    });

    // 型が不正な場合、`isSuccess: false` を返すことを確認
    expect(fetchResult).toEqual({ isSuccess: false });
    expect(loading).toBe(false); // ローディングが false に戻ることを確認
  });

  it('fetch が reject（ネットワークエラー）したら isSuccess: false を返す', async () => {
    // `fetch` がネットワークエラーで失敗するケース
    mockFetch.mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHook(() => useUpdateTodo());

    const { updateTodo, loading } = result.current;

    let fetchResult;
    await act(async () => {
      fetchResult = await updateTodo(
        '1',
        'Updated Todo',
        false,
        '2022-01-01',
        mockTodos
      );
    });

    // ネットワークエラーが発生した場合、`isSuccess: false` を返すことを確認
    expect(fetchResult).toEqual({ isSuccess: false });
    expect(loading).toBe(false); // ローディングが false に戻ることを確認
  });

});
