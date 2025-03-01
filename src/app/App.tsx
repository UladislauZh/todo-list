import { useReducer } from "react";
import "./App.css";
import { v1 } from "uuid";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
  todolistsReducer,
} from "../../src/model/todolists-reducer";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  deleteTaskAC,
  tasksReducer,
} from "../../src/model/tasks-reducer";
import { CreateItemForm } from "../components/CreateItem/CreateItemForm";
import { TodolistItem } from "../components/Todolist/TodolistItem";
import { useSelector } from "react-redux";

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

  const todolists = useSelector(todolistsReducer, []);

  const [tasks, dispatchTasks] = useSelector(tasksReducer, {});

  //Удаление таски 1 вариант
  const deleteTask = (todolistId: string, taskId: string) => {
    const action = deleteTaskAC(taskId, todolistId);
    dispatchTasks(action);
  };

  //Фильтрация тасок

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    dispatchToTodolists(changeTodolistFilterAC({ id: todolistId, filter }));
  };

  //создание таски 2 вариант

  const createTask = (todolistId: string, title: string) => {
    // const newTask = { id: v1(), title, isDone: false };
    // const newTasks = { ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] };
    // setTasks(newTasks);
    const action = createTaskAC(todolistId, title);
    dispatchTasks(action);
  };

  //статус таски 3 вариант

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    // setTasks({
    //   ...tasks,
    //   [todolistId]: tasks[todolistId].map((task) =>
    //     task.id == taskId ? { ...task, isDone } : task
    //   ),
    // });
    const action = changeTaskStatusAC(todolistId, taskId, isDone);
    dispatchTasks(action);
  };

  //удаление тудушки

  const deleteTodolist = (todolistId: string) => {
    const action = deleteTodolistAC(todolistId);
    dispatchToTodolists(action);
    delete tasks[todolistId];
    dispatchTasks(action);
  };

  //создание тудушки

  const createTodolist = (title: string) => {
    const todolistId = v1();
    const action = createTodolistAC(title, todolistId);
    dispatchToTodolists(action);
    dispatchTasks(action);
  };

  //изменение такси по клику

  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    // setTasks({
    //   ...tasks,
    //   [todolistId]: tasks[todolistId].map((task) =>
    //     task.id === taskId ? { ...task, title } : task
    //   ),
    // });

    const action = changeTaskTitleAC(todolistId, taskId, title);
    dispatchTasks(action);
  };

  //изменение тудулист

  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatchToTodolists(changeTodolistTitleAC({ id: todolistId, title }));
    // setTodolists(
    //   todolists.map((todolist) => (todolist.id === todolistId ? { ...todolist, title } : todolist))
    // );
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
