import { FilterValues } from "@/app/App"
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit"

export const deleteTodolistAC = createAction<{ id: string }>("todolists/deleteTodolist")
export const createTodolistAC = createAction("todolists/createTodolist", (title: string) => {
  return { payload: { title, id: nanoid() } }
})
export const changeTodolistTitleAC = createAction<{ id: string; title: string }>("todolists/changeTodolistTitle")
export const changeTodolistFilterAC = createAction<{ id: string; filter: FilterValues }>(
  "todolists/changeTodolistFilter"
)

const initialState: Todolist[] = []

export const todolistsReducer = createReducer(initialState, (builder) => {
  //По рекомендации rtk используются мутабельные изменения
  builder
    .addCase(deleteTodolistAC, (state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    })
    .addCase(createTodolistAC, (state, action) => {
      state.push({ ...action.payload, filter: "All" })
    })
    .addCase(changeTodolistTitleAC, (state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
      console.log(state)
    })
    .addCase(changeTodolistFilterAC, (state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    })
})

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

//State - данные, которые меняются в процессе взаимодействия с приложением.

//Action - объект, у которого, есть как минимум свойство type. По нему программа понимает, как менять state. Action можно назвать инструкцией, в которой указано, что необходимо сделать.
