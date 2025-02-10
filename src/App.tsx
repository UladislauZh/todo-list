import { useReducer, useState } from "react";
import "./App.css";
import { TodolistItem } from "./components/Todolist/TodolistItem";
import { v1 } from "uuid";
import { CreateItemForm } from "./components/CreateItem/CreateItemForm";
import { createTodolistAC, todolistReducer } from "./model/todolists-reducer";

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
  dispatch({ type: "increment" });

  const [todolists, dispatchToTodolists] = useReducer(todolistReducer, []);

  const [tasks, setTasks] = useState<TasksState>({});

  //Удаление таски 1 вариант
  const deleteTask = (todolistId: string, taskId: string) => {
    /** Берем таски тудулиста по его `id`: */
    const todolistTasks = tasks[todolistId];
    /** Удаляем нужную таску: */
    const newTodolistTasks = todolistTasks.filter((task) => task.id !== taskId);
    /** Перезаписываем массив тасок нужного тудулиста на новый (отфильтрованный): */
    tasks[todolistId] = newTodolistTasks;
    /** Устанавливаем в state копию объекта, чтобы React отреагировал перерисовкой: */
    setTasks({ ...tasks });
  };

  //Фильтрация тасок

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    const newTodolists = todolists.map((todolist) => {
      return todolist.id === todolistId ? { ...todolist, filter } : todolist;
    });
    setTodolists(newTodolists);
  };

  //создание таски 2 вариант

  const createTask = (todolistId: string, title: string) => {
    const newTask = { id: v1(), title, isDone: false };
    const newTasks = { ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] };
    setTasks(newTasks);
  };

  //статус таски 3 вариант

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((task) =>
        task.id == taskId ? { ...task, isDone } : task
      ),
    });
  };

  //удаление тудушки

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter((todolist) => todolist.id !== todolistId));
    /** Удаляем таски нужного тудулиста из стейта тасок: */
    delete tasks[todolistId];
    /** Устанавливаем в state копию объекта: */
    setTasks({ ...tasks });
  };

  //создание тудушки

  const createTodolist = (title: string) => {
    const action = createTodolistAC(title);
    dispatchToTodolists(action);
    setTasks({ ...tasks, [action.payload.id]: [] });
    // const todolistId = v1();
    // const newTodolist: Todolist = { id: todolistId, title, filter: "All" };
    // setTodolists([newTodolist, ...todolists]);
    // setTasks({ ...tasks, [todolistId]: [] });
  };

  //изменение такси по клику

  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((task) =>
        task.id === taskId ? { ...task, title } : task
      ),
    });
  };

  //изменение тудулист

  const changeTodolistTitle = (todolistId: string, title: string) => {
    setTodolists(
      todolists.map((todolist) => (todolist.id === todolistId ? { ...todolist, title } : todolist))
    );
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
