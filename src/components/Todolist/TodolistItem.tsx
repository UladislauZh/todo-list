import { ChangeEvent } from "react";
import { EditableSpan } from "./EditableSpan";
import { FilterValues } from "@/app/App";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { containerSx, getListItemSx } from "./TodolistItem.styles";
import Button from "@mui/material/Button";
import { Checkbox } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { CreateItemForm } from "../CreateItem/CreateItemForm";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { selectTasks } from "@/model/tasks-selectors";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  deleteTodolistAC,
  Todolist,
} from "@/model/todolists-reducer";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  deleteTaskAC,
} from "@/model/tasks-reducer";

type PropsTodolistType = {
  todolist: Todolist;
};

export const TodolistItem = (props: PropsTodolistType) => {
  const {
    todolist: { id, title, filter },
  } = props;

  const dispatch = useAppDispatch();

  const tasks = useAppSelector(selectTasks);

  const todolistTasks = tasks[id];
  let filteredTasks = todolistTasks;
  if (filter === "Active") {
    filteredTasks = todolistTasks.filter((t) => !t.isDone);
  }
  if (filter === "Completed") {
    filteredTasks = todolistTasks.filter((t) => t.isDone);
  }

  const changeFilter = (filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id, filter }));
  };

  //удаление тудушки
  const deleteTodolist = () => {
    dispatch(deleteTodolistAC({ id }));
  };

  //создание таски
  const createTask = (title: string) => {
    dispatch(createTaskAC({ todolistId: id, title: title }));
  };
  // console.log("tasks", tasks);

  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleAC({ id, title }));
  };
  return (
    <div>
      <div className='container'>
        <h3>
          <EditableSpan value={title} onChange={changeTodolistTitle} />
        </h3>
        <IconButton onClick={deleteTodolist}>
          <DeleteIcon />
        </IconButton>
      </div>
      <CreateItemForm onCreateItem={createTask} />
      {/* Проверка на таски */}
      {filteredTasks.length === 0 ? (
        <p>No Tasks</p>
      ) : (
        <List>
          {/* Мапим таски на колво */}
          {filteredTasks.map((t) => {
            // Минирефакторинг удаления таски

            const deleteTask = () => {
              dispatch(deleteTaskAC({ todolistId: id, taskId: t.id }));
            };
            //статус таски
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked;
              dispatch(
                changeTaskStatusAC({ todolistId: id, taskId: t.id, isDone: newStatusValue })
              );
            };

            // изменение таски
            const changeTaskTitle = (title: string) => {
              dispatch(changeTaskTitleAC({ todolistId: id, taskId: t.id, title }));
            };

            return (
              <ListItem key={t.id} sx={getListItemSx(t.isDone)}>
                <div>
                  <Checkbox checked={t.isDone} onChange={changeTaskStatus} />
                  <EditableSpan value={t.title} onChange={changeTaskTitle} />
                </div>
                <IconButton onClick={deleteTask}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      )}
      <Box sx={containerSx}>
        <Button
          variant={filter === "All" ? "outlined" : "text"}
          color={"inherit"}
          onClick={() => changeFilter("All")}
        >
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
    </div>
  );
};
