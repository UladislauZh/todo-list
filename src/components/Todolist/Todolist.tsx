import { useState } from "react";
import { FilterValues, Task } from "../../App";
import { Button } from "../Button/Button";

type PropsTodolistType = {
  title: string;
  tasks: Task[];
  deleteTask: (taskId: string) => void;
  changeFilter: (filter: FilterValues) => void;
  createTask: (title: string) => void;
};

export const Todolist = ({
  title,
  tasks,
  deleteTask,
  changeFilter,
  createTask,
}: PropsTodolistType) => {
  //контролируемый инпут
  const [taskTitle, setTaskTitle] = useState("");

  const createTaskHandler = () => {
    createTask(taskTitle);
    setTaskTitle("");
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={(event) => {
            setTaskTitle(event.currentTarget.value);
          }}
          onKeyDown={(event) => console.log(event.key)}
        />
        <Button title='+' onClick={createTaskHandler} />
      </div>
      {/* Проверка на таски */}
      {tasks.length === 0 ? (
        <p>No Tasks</p>
      ) : (
        <ul>
          {/* Мапим таски на колво */}
          {tasks.map((t) => {
            return (
              <li key={t.id}>
                <input type='checkbox' checked={t.isDone} /> <span>{t.title}</span>
                <Button onClick={() => deleteTask(t.id)} title='X' />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button title='All' onClick={() => changeFilter("All")} />
        <Button title='Active' onClick={() => changeFilter("Active")} />
        <Button title='Completed' onClick={() => changeFilter("Completed")} />
      </div>
    </div>
  );
};
