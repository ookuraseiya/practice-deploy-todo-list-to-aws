import { StoryFn, Meta } from '@storybook/react';
import TodoPage from './TodoPage';
import { TodoType } from '../../../types/TodoType';

export default {
  title: 'Pages/TodoPage',
  component: TodoPage,
  decorators: [
    (Story) => (
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => <TodoPage {...args} />;

const defaultTodos: TodoType[] = [
  { id: '1', todo: 'Buy groceries', isCompleted: false, createdAt: new Date().toISOString() },
  { id: '2', todo: 'Walk the dog', isCompleted: true, createdAt: new Date().toISOString() },
];

export const Default = Template.bind({});
Default.args = {};

export const LoadingState = Template.bind({});
LoadingState.parameters = {
  msw: {
    handlers: [
      {
        path: '/api/todos',
        method: 'GET',
        delay: 1000,
        response: () => ({ isSuccess: false, fetchTodos: [] }),
      },
    ],
  },
};

export const EmptyState = Template.bind({});
EmptyState.parameters = {
  msw: {
    handlers: [
      {
        path: '/api/todos',
        method: 'GET',
        response: () => ({ isSuccess: true, fetchTodos: [] }),
      },
    ],
  },
};

export const WithTodos = Template.bind({});
WithTodos.parameters = {
  msw: {
    handlers: [
      {
        path: '/api/todos',
        method: 'GET',
        response: () => ({ isSuccess: true, fetchTodos: defaultTodos }),
      },
    ],
  },
};

export const AddTodoSuccess = Template.bind({});
AddTodoSuccess.parameters = {
  msw: {
    handlers: [
      {
        path: '/api/todos',
        method: 'POST',
        response: (req: { body?: string }) => ({
          isSuccess: true,
          newTodo: {
            id: Math.random().toString(36).substring(7),
            todo: req.body ? JSON.parse(req.body).todo : 'New Todo',
            isCompleted: false,
            createdAt: new Date().toISOString(),
          },
        }),
      },
      {
        path: '/api/todos',
        method: 'GET',
        response: () => ({ isSuccess: true, fetchTodos: defaultTodos }),
      },
    ],
  },
};

export const DeleteTodoSuccess = Template.bind({});
DeleteTodoSuccess.parameters = {
  msw: {
    handlers: [
      {
        path: `/api/todos/${defaultTodos[0].id}`,
        method: 'DELETE',
        response: () => ({ isSuccess: true, newTodos: defaultTodos.slice(1) }),
      },
      {
        path: '/api/todos',
        method: 'GET',
        response: () => ({ isSuccess: true, fetchTodos: defaultTodos }),
      },
    ],
  },
};
