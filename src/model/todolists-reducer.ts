import { FilterValues, Todolist } from "../App";

const initialState: Todolist[] = [];

type Actions =
  | DeleteTodolistAction
  | CreateTodolistAction
  | changeTodolistTitleAction
  | changeTodolistFilterAction;

export const todolistReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
  switch (action.type) {
    case "delete_todolist": {
      return state.filter((todolist) => todolist.id !== action.payload.id); // логика удаления тудулиста
    }
    case "create_todolist": {
      const newTodolist: Todolist = {
        id: action.payload.id,
        title: action.payload.title,
        filter: "All",
      };
      return [newTodolist, ...state];
    }
    case "change_todolist": {
      return state.map((todolist) =>
        todolist.id === action.payload.id ? { ...todolist, title: action.payload.title } : todolist
      );
    }
    case "change_filter_todolist": {
      return state.map((todolist) => {
        return todolist.id === action.payload.id
          ? { ...todolist, filter: action.payload.filter }
          : todolist;
      });
    }
    default:
      return state;
  }
};

export const deleteTodolistAC = (id: string) => {
  return { type: "delete_todolist", payload: { id } } as const;
};

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>;

export const createTodolistAC = (title: string, id: string) => {
  return { type: "create_todolist", payload: { id, title } } as const;
};

export type CreateTodolistAction = ReturnType<typeof createTodolistAC>;

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "change_todolist", payload } as const;
};

export type changeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>;

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValues }) => {
  return { type: "change_filter_todolist", payload } as const;
};

export type changeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>;

//State - данные, которые меняются в процессе взаимодействия с приложением.

//Action - объект, у которого, есть как минимум свойство type. По нему программа понимает, как менять state. Action можно назвать инструкцией, в которой указано, что необходимо сделать.
