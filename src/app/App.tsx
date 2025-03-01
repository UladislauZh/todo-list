import "./App.css";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
} from "../../src/model/todolists-reducer";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  deleteTaskAC,
} from "../../src/model/tasks-reducer";
import { CreateItemForm } from "../components/CreateItem/CreateItemForm";
import { TodolistItem } from "../components/Todolist/TodolistItem";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { useAppDispatch } from "../common/hooks/useAppDispatch";

import { selectTodolists } from "../model/todolists-selectors";
import { selectTasks } from "../model/tasks-selectors";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type Todolist = {
  id: string;
  title: string;
  filter: FilterValues;
};

export type TasksState = {
  [key: string]: Task[];
};

export type FilterValues = "All" | "Active" | "Completed";

export const App = () => {
  // dispatch({ type: "increment" });

  const todolists = useAppSelector(selectTodolists);
  const tasks = useAppSelector(selectTasks);

  const dispatch = useAppDispatch();

  const deleteTask = (todolistId: string, taskId: string) => {
    dispatch(deleteTaskAC(taskId, todolistId));
  };

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id: todolistId, filter }));
  };

  const createTask = (todolistId: string, title: string) => {
    dispatch(createTaskAC(todolistId, title));
  };

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    dispatch(changeTaskStatusAC(todolistId, taskId, isDone));
  };

  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistAC({ id: todolistId }));
  };

  const createTodolist = (title: string) => {
    dispatch(createTodolistAC(title));
  };

  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC(todolistId, taskId, title));
  };

  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatch(changeTodolistTitleAC({ id: todolistId, title }));
  };

  return (
    <div className='app'>
      <CreateItemForm onCreateItem={createTodolist} />
      {todolists.map((todolist) => {
        const todolistTasks = tasks[todolist.id];
        let filteredTasks = todolistTasks;
        if (todolist.filter === "Active") {
          filteredTasks = todolistTasks.filter((task) => !task.isDone);
        }
        if (todolist.filter === "Completed") {
          filteredTasks = todolistTasks.filter((task) => task.isDone);
        }
        return (
          <TodolistItem
            changeTodolistTitle={changeTodolistTitle}
            changeTaskTitle={changeTaskTitle}
            key={todolist.id}
            todolist={todolist}
            tasks={filteredTasks}
            deleteTask={deleteTask}
            changeFilter={changeFilter}
            createTask={createTask}
            changeTaskStatus={changeTaskStatus}
            deleteTodolist={deleteTodolist}
          />
        );
      })}
    </div>
  );
};
