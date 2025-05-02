import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { Tasks } from "./Tasks/Tasks"
import { FilterButtons } from "./FilterButtons/FilterButtons"
import { Todolist } from "@/features/todolists/model/todolists-reducer"
import { createTaskAC } from "@/features/todolists/model/tasks-reducer"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"

type PropsTodolistType = {
  todolist: Todolist
}

export const TodolistItem = ({ todolist }: PropsTodolistType) => {
  const { id } = todolist

  const dispatch = useAppDispatch()

  //создание таски
  const createTask = (title: string) => {
    dispatch(createTaskAC({ todolistId: id, title: title }))
  }
  // console.log("tasks", tasks);

  return (
    <div>
      <TodolistTitle todolist={todolist} />

      <CreateItemForm onCreateItem={createTask} />

      <Tasks todolist={todolist} />

      <FilterButtons todolist={todolist} />
    </div>
  )
}
