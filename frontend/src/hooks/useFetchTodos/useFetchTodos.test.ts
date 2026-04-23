import { renderHook, act } from '@testing-library/react';
import { useFetchTodos } from './useFetchTodos';
import { expect, vi, Mock } from 'vitest';

vi.stubGlobal('fetch', vi.fn());
const mockFetch = fetch as Mock;

describe('useFetchTodosのテスト', () => {
  it('fetchTodosが成功する場合の動作を確認', async () => {
    const mockDates = {
      todos: [
        {
          id: '1',
          todo: 'Test Todo 1',
          completed: 1,
          created_at: '2022-01-01',
        },
        {
          id: '2',
          todo: 'Test Todo 2',
          completed: 0,
          created_at: '2022-02-01',
        },
      ],
    };

    const responseMockDates = [
      {
        id: '1',
        todo: 'Test Todo 1',
        isCompleted: true,
        createdAt: '2022-01-01',
      },
      {
        id: '2',
        todo: 'Test Todo 2',
        isCompleted: false,
        createdAt: '2022-02-01',
      },
    ];

    mockFetch.mockResolvedValueOnce({
      status: 200,
      json: async () => mockDates,
    });

    const { result } = renderHook(() => useFetchTodos());

    const { fetchTodos, loading } = result.current;

    expect(loading).toBe(false);

    let fetchResult;
    await act(async () => {
      fetchResult = await fetchTodos();
    });

    expect(fetchResult).toEqual({
      isSuccess: true,
      fetchTodos: responseMockDates,
    });
    expect(loading).toBe(false);
  });

  test('fetch が失敗して例外を投げる場合は isSuccess: false を返す', async () => {
    mockFetch.mockResolvedValueOnce({
      status: 200,
      json: async () => ({ todos: 'invalid data' }),
    });

    const { result } = renderHook(() => useFetchTodos());

    const { fetchTodos, loading } = result.current;

    let fetchResult;
    await act(async () => {
      fetchResult = await fetchTodos();
    });

    expect(fetchResult).toEqual({ isSuccess: false });
    expect(loading).toBe(false);
  });

  test('fetch のステータスコードが 200 以外なら isSuccess: false を返す', async () => {
    mockFetch.mockResolvedValueOnce({
      status: 500,
      json: async () => ({ error: 'Internal Server Error' }),
    });

    const { result } = renderHook(() => useFetchTodos());

    const { fetchTodos, loading } = result.current;

    let fetchResult;
    await act(async () => {
      fetchResult = await fetchTodos();
    });

    expect(fetchResult).toEqual({ isSuccess: false });
    expect(loading).toBe(false);
  });

  test('fetch が reject（ネットワークエラー）したら isSuccess: false を返す', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHook(() => useFetchTodos());

    const { fetchTodos, loading } = result.current;

    let fetchResult;
    await act(async () => {
      fetchResult = await fetchTodos();
    });

    expect(fetchResult).toEqual({ isSuccess: false });
    expect(loading).toBe(false);
  });
});


// import { renderHook } from '@testing-library/react';
// import { useFetchTodos } from './useFetchTodos';
// import { expect, vi, Mock } from 'vitest';

// // APIのレスポンスのモックを作成
// vi.stubGlobal('fetch', vi.fn());

// const mockFetch = fetch as Mock;

// describe('useFetchTodosのテスト', () => {
//   it('fetchTodosが成功する場合の動作を確認', async () => {
//     // モックレスポンスの設定
//     const mockDates = {
//       todos: [
//         {
//           id: '1',
//           todo: 'Test Todo 1',
//           completed: 1,
//           created_at: '2022-01-01',
//         },
//         {
//           id: '2',
//           todo: 'Test Todo 2',
//           completed: 0,
//           created_at: '2022-02-01',
//         },
//       ],
//     };

//     const responseMockDates = [
//       {
//         id: '1',
//         todo: 'Test Todo 1',
//         isCompleted: true,
//         createdAt: '2022-01-01'
//       },
//       {
//         id: '2',
//         todo: 'Test Todo 2',
//         isCompleted: false,
//         createdAt: '2022-02-01'
//       }
//     ];

//     // `fetch` が返すレスポンスをモック これがないと { isSuccess: false } が返る
//     mockFetch.mockResolvedValueOnce({
//       status: 200,
//       json: async () => mockDates,
//     });

//     // `useFetchTodos` フックをテスト
//     const { result } = renderHook(() => useFetchTodos());

//     const { fetchTodos, loading } = result.current;

//     expect(loading).toBe(false); // 初期ローディングは false であることを確認

//     const fetchResult = await await fetchTodos();

//     // 返された値をチェック
//     expect(fetchResult).toEqual({
//       isSuccess: true,
//       fetchTodos: responseMockDates
//     });
//     expect(loading).toBe(false);
//   });

//   test('fetch が失敗して例外を投げる場合は isSuccess: false を返す', async () => {
//     mockFetch.mockResolvedValueOnce({
//       status: 200,
//       json: async () => ({ todos: 'invalid data' }), // 不正な形式
//     });
  
//     // `useFetchTodos` フックをテスト
//     const { result } = renderHook(() => useFetchTodos());

//     const { fetchTodos, loading } = result.current;

//     const fetchResult = await await fetchTodos();
  
//     expect(fetchResult).toEqual({ isSuccess: false });
//     expect(loading).toBe(false);
//   });

//   test('fetch のステータスコードが 200 以外なら isSuccess: false を返す', async () => {
//     mockFetch.mockResolvedValueOnce({
//       status: 500,
//       json: async () => ({ error: 'Internal Server Error' }),
//     });
  
//     // `useFetchTodos` フックをテスト
//     const { result } = renderHook(() => useFetchTodos());

//     const { fetchTodos, loading } = result.current;
  
//     const fetchResult = await await fetchTodos();
  
//     expect(fetchResult).toEqual({ isSuccess: false });
//     expect(loading).toBe(false);
//   });

//   test('response.todos が不正な形式なら isSuccess: false を返す', async () => {
//     mockFetch.mockRejectedValueOnce(new Error('Network Error'));

//     const { result } = renderHook(() => useFetchTodos());

//     const { fetchTodos, loading } = result.current;

//     const fetchResult = await await fetchTodos();
  
//     expect(fetchResult).toEqual({ isSuccess: false });
//     expect(loading).toBe(false);
//   });
// });
