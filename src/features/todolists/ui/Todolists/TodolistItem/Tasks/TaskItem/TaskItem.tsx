import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { Checkbox } from "@mui/material"
import ListItem from "@mui/material/ListItem"
import { ChangeEvent } from "react"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, Task } from "@/features/todolists/model/tasks-reducer"
import { Todolist } from "@/features/todolists/model/todolists-reducer"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { getListItemSx } from "./TaskItem.styles"

type Props = {
  t: Task
  todolist: Todolist
}

export const TaskItem = ({ t, todolist }: Props) => {
  const { id } = todolist

  const dispatch = useAppDispatch()
  // Минирефакторинг удаления таски
  const deleteTask = () => {
    dispatch(deleteTaskAC({ todolistId: id, taskId: t.id }))
  }
  //статус таски
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
    dispatch(changeTaskStatusAC({ todolistId: id, taskId: t.id, isDone: newStatusValue }))
  }

  // изменение таски
  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId: id, taskId: t.id, title }))
  }

  return (
    <ListItem sx={getListItemSx(t.isDone)}>
      <div>
        <Checkbox checked={t.isDone} onChange={changeTaskStatus} />
        <EditableSpan value={t.title} onChange={changeTaskTitle} />
      </div>
      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
