import { FilterValues, Todolist } from "../app/App";
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

const initialState: Todolist[] = [];

export const todolistsReducer = createReducer(initialState, (builder) => {
  //По рекомендации rtk используются мутабельные изменения
  builder
    .addCase(deleteTodolistAC, (state, action) => {
      const index = state.findIndex((todolist) => todolist.id !== action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    })
    .addCase(createTodolistAC, (state, action) => {
      state.push({ ...action.payload, filter: "All" });
    })
    .addCase(changeTodolistTitleAC, (state, action) => {
      const index = state.findIndex((todolist) => todolist.id !== action.payload.id);
      if (index !== -1) {
        state[index].title = action.payload.title;
      }
    })
    .addCase(changeTodolistFilterAC, (state, action) => {
      const todolist = state.find((todolist) => todolist.id !== action.payload.id);
      if (todolist) {
        todolist.filter = action.payload.filter;
      }
    });
});

// export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
//   switch (action.type) {
//     case "delete_todolist": {
//       return state.filter((todolist) => todolist.id !== action.payload.id);
//     }
//     case "create_todolist": {
//       const newTodolist: Todolist = {
//         id: action.payload.id,
//         title: action.payload.title,
//         filter: "All",
//       };
//       return [newTodolist, ...state];
//     }
//     case "change_todolist": {
//       return state.map((todolist) =>
//         todolist.id === action.payload.id ? { ...todolist, title: action.payload.title } : todolist
//       );
//     }
//     case "change_filter_todolist": {
//       return state.map((todolist) => {
//         return todolist.id === action.payload.id
//           ? { ...todolist, filter: action.payload.filter }
//           : todolist;
//       });
//     }
//     default:
//       return state;
//   }
// };

export const deleteTodolistAC = createAction<{ id: string }>("todolists/deleteTodolist");
// export const deleteTodolistAC = (id: string) => {
//   return { type: "delete_todolist", payload: { id } } as const;
// };

export const createTodolistAC = createAction("todolists/createTodolist", (title: string) => {
  return { payload: { title, id: nanoid() } };
});
// export const createTodolistAC = (title: string) => {
//   return { type: "create_todolist", payload: { id: v1() , title } } as const;
// };

export const changeTodolistTitleAC = createAction<{ id: string; title: string }>(
  "todolists/changeTodolistTitle"
);
// export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
//   return { type: "change_todolist", payload } as const;
// };

export const changeTodolistFilterAC = createAction<{ id: string; filter: FilterValues }>(
  "todolists/changeTodolistFilter"
);
// export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValues }) => {
//   return { type: "change_filter_todolist", payload } as const;
// };

export type changeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>;
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>;
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>;
export type changeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>;

//State - данные, которые меняются в процессе взаимодействия с приложением.

//Action - объект, у которого, есть как минимум свойство type. По нему программа понимает, как менять state. Action можно назвать инструкцией, в которой указано, что необходимо сделать.
