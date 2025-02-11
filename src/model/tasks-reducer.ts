import { v1 } from "uuid";
import type { TasksState } from "../App";

const initialState: TasksState = {};

type Actions =
  | DeleteTodolistAction
  | CreateTodolistAction
  | DeleteTaskAction
  | CreateTaskAction
  | ChangeTaskStatusAction
  | ChangeTaskTitleAction;

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
  switch (action.type) {
    case "create_todolist": {
      const { id } = action.payload;
      return { ...state, [id]: [] };
    }
    case "delete_todolist": {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    case "delete_task": {
      const { taskId, todolistId } = action.payload;
      const todolistTasks = state[todolistId];
      const newTodolistTasks = todolistTasks.filter((task) => task.id !== taskId);
      state[todolistId] = newTodolistTasks;
      return { ...state };
      // return { ...state, [todolistId]: state[todolistId].filter((task) => task.id !== taskId) };
    }
    case "create_task": {
      const { id, title } = action.payload;
      // const newTask = { id: v1(), title, isDone: false };
      // return { ...state, [id]: [newTask, ...state[id]] };
      const newTask = { id: v1(), title, isDone: false };
      const newTasks = { ...state, [id]: [newTask, ...state[id]] };
      return newTasks;
    }
    case "change_task_status": {
      const { todolistId, taskId, isDone } = action.payload;
      return {
        ...state,
        [todolistId]: state[todolistId].map((task) =>
          task.id == taskId ? { ...task, isDone } : task
        ),
      };
    }
    case "change_task_title": {
      const { todolistId, taskId, title } = action.payload;
      return {
        ...state,
        [todolistId]: state[todolistId].map((task) =>
          task.id === taskId ? { ...task, title } : task
        ),
      };
    }
    default:
      return state;
  }
};

export const deleteTodolistAC = (id: string) => {
  return { type: "delete_todolist", payload: { id } } as const;
};

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>;

export const createTodolistAC = (id: string, title: string) => {
  return { type: "create_todolist", payload: { title, id } } as const;
};

export type CreateTodolistAction = ReturnType<typeof createTodolistAC>;

export const deleteTaskAC = (taskId: string, todolistId: string) => {
  return { type: "delete_task", payload: { taskId, todolistId } } as const;
};

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>;

export const createTaskAC = (id: string, title: string) => {
  return { type: "create_task", payload: { id, title } } as const;
};

export type CreateTaskAction = ReturnType<typeof createTaskAC>;

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
  return { type: "change_task_status", payload: { todolistId, taskId, isDone } } as const;
};

export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>;

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
  return { type: "change_task_title", payload: { todolistId, taskId, title } } as const;
};

export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>;
