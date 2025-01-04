import { useState } from "react";
import "./App.css";
import { Todolist } from "./components/Todolist/Todolist";

export type PropsTasksType = {
  //***
  id: number;
  title: string;
  isDone: boolean;
};

export const App = () => {
  const [tasks, setTasks] = useState<PropsTasksType[]>([
    //***
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "Redux", isDone: false },
  ]);

  const deleteTasks = (id: number) => {
    const filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(filteredTasks);
  };

  return (
    <div className='app'>
      <Todolist
        title='My Todo-List'
        tasks={tasks}
        date='05.01.2025'
        deleteTask={deleteTasks}
      />
    </div>
  );
};
