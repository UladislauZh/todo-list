import { ChangeEvent } from "react";
import { CreateItemForm } from "../CreateItem/CreateItemForm";
import { EditableSpan } from "./EditableSpan";
import { FilterValues, Task, Todolist } from "../../app/App";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { containerSx, getListItemSx } from "./TodolistItem.styles";
import Button from "@mui/material/Button";
import { Checkbox } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

type PropsTodolistType = {
  todolist: Todolist;
  tasks: Task[];
  deleteTask: (todolistId: string, taskId: string) => void;
  changeFilter: (todolistId: string, filter: FilterValues) => void;
  createTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void;
  deleteTodolist: (todolistId: string) => void;
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
  changeTodolistTitle: (todolistId: string, title: string) => void;
};

export const TodolistItem = (props: PropsTodolistType) => {
  const {
    todolist: { id, title, filter },
    tasks,
    deleteTask,
    changeFilter,
    changeTaskStatus,
    deleteTodolist,
    createTask,
    changeTaskTitle,
    changeTodolistTitle,
  } = props;

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(id, filter);
  };

  //удаление тудушки
  const deleteTodolistHandler = () => {
    deleteTodolist(id);
  };

  //создание таски
  const createTaskHandler = (title: string) => {
    createTask(id, title);
  };
  // console.log("tasks", tasks);

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(id, title);
  };
  return (
    <div>
      <div className='container'>
        <h3>
          <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        </h3>
        <IconButton onClick={deleteTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </div>
      <CreateItemForm onCreateItem={createTaskHandler} />
      {/* Проверка на таски */}
      {tasks.length === 0 ? (
        <p>No Tasks</p>
      ) : (
        <List>
          {/* Мапим таски на колво */}
          {tasks.map((t) => {
            // Минирефакторинг удаления таски
            const deleteTaskHandler = () => {
              deleteTask(id, t.id);
            };
            //статус таски
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(id, t.id, newStatusValue);
            };
            // изменение таски
            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle(id, t.id, title);
            };

            return (
              <ListItem key={t.id} sx={getListItemSx(t.isDone)}>
                <div>
                  <Checkbox checked={t.isDone} onChange={changeTaskStatusHandler} />
                  <EditableSpan value={t.title} onChange={changeTaskTitleHandler} />
                </div>
                <IconButton onClick={deleteTaskHandler}>
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
          onClick={() => changeFilterHandler("All")}
        >
          All
        </Button>
        <Button
          variant={filter === "Active" ? "outlined" : "text"}
          color={"primary"}
          onClick={() => changeFilterHandler("Active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "Completed" ? "outlined" : "text"}
          color={"secondary"}
          onClick={() => changeFilterHandler("Completed")}
        >
          Completed
        </Button>
      </Box>
    </div>
  );
};
