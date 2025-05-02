import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { FilterValues } from "@/app/App"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { changeTodolistFilterAC, Todolist } from "@/features/todolists/model/todolists-reducer"
import { containerSx } from "@/common/styles/container.styles"

type Props = {
  todolist: Todolist
}

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilter = (filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id, filter }))
  }

  return (
    <Box sx={containerSx}>
      <Button variant={filter === "All" ? "outlined" : "text"} color={"inherit"} onClick={() => changeFilter("All")}>
        All
      </Button>
      <Button
        variant={filter === "Active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilter("Active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "Completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilter("Completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
