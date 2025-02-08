import { useState } from "react";
import "./App.css";
import { Todolist } from "./components/Todolist/Todolist";
import { v1 } from "uuid";

export type PropsTasksType = {};

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValues = "All" | "Active" | "Completed";

export const App = () => {
  const [filter, setFilter] = useState<FilterValues>("All");

  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
  ]);

  //Удаление таски
  const deleteTask = (taskId: string) => {
    const filteredTasks = tasks.filter((t) => {
      return t.id !== taskId;
    });
    setTasks(filteredTasks);
  };

  //Фильтрация тасок

  const changeFilter = (filter: FilterValues) => {
    setFilter(filter);
  };

  let filteredTasks = tasks;
  if (filter === "Active") {
    filteredTasks = tasks.filter((t) => t.isDone === false);
  }
  if (filter === "Completed") {
    filteredTasks = tasks.filter((t) => t.isDone === true);
  }

  //создание таски

  const createTask = (title: string) => {
    const newTask = { id: v1(), title, isDone: false };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  return (
    <div className='app'>
      <Todolist
        title='What to learn'
        tasks={filteredTasks}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
        createTask={createTask}
      />
    </div>
  );
};
