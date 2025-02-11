import { useReducer } from "react";
import "./App.css";
import { TodolistItem } from "./components/Todolist/TodolistItem";
import { v1 } from "uuid";
import { CreateItemForm } from "./components/CreateItem/CreateItemForm";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
  todolistReducer,
} from "./model/todolists-reducer";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  deleteTaskAC,
  tasksReducer,
} from "./model/tasks-reducer";

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
  // dispatch({ type: "increment" });

  const [todolists, dispatchToTodolists] = useReducer(todolistReducer, [
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ]);

  const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
    // /** Берем таски тудулиста по его `id`: */
    // const todolistTasks = tasks[todolistId];
    // /** Удаляем нужную таску: */
    // const newTodolistTasks = todolistTasks.filter((task) => task.id !== taskId);
    // /** Перезаписываем массив тасок нужного тудулиста на новый (отфильтрованный): */
    // tasks[todolistId] = newTodolistTasks;
    // /** Устанавливаем в state копию объекта, чтобы React отреагировал перерисовкой: */
    // setTasks({ ...tasks });
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
