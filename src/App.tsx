import { useState } from "react";
import "./App.css";
import { TodolistItem } from "./components/Todolist/TodolistItem";
import { v1 } from "uuid";

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
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ]);

  const [tasks, setTasks] = useState<TasksState>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

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

  return (
    <div className='app'>
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
