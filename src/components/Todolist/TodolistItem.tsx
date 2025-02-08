import { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValues, Task, Todolist } from "../../App";
import { Button } from "../Button/Button";

type PropsTodolistType = {
  todolist: Todolist;
  tasks: Task[];
  deleteTask: (todolistId: string, taskId: string) => void;
  changeFilter: (todolistId: string, filter: FilterValues) => void;
  createTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void;
  deleteTodolist: (todolistId: string) => void;
};

export const TodolistItem = ({
  todolist: { title, filter, id },
  tasks,
  deleteTask,
  changeFilter,
  createTask,
  changeTaskStatus,
  deleteTodolist,
}: PropsTodolistType) => {
  //ошибка при создании пустой таски
  const [error, setError] = useState<string | null>(null);
  //контролируемый инпут
  const [taskTitle, setTaskTitle] = useState("");

  const createTaskHandler = () => {
    const trimmedTitle = taskTitle.trim();
    if (trimmedTitle !== "") {
      createTask(id, trimmedTitle);
      setTaskTitle("");
    } else {
      setError("Title is required");
    }
  };

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
    setError(null);
  };

  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      createTaskHandler();
    }
  };

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(id, filter);
  };

  //удаление тудушки
  const deleteTodolistHandler = () => {
    deleteTodolist(id);
  };

  return (
    <div>
      <div className='container'>
        <h3>{title}</h3>
        <Button title='X' onClick={deleteTodolistHandler} />
      </div>

      <div>
        <input
          className={error ? "error" : ""}
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
        />
        <Button title='+' onClick={createTaskHandler} />
        {error && <div className={"error-message"}>{error}</div>}
      </div>
      {/* Проверка на таски */}
      {tasks.length === 0 ? (
        <p>No Tasks</p>
      ) : (
        <ul>
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

            return (
              <li key={t.id}>
                <input type='checkbox' checked={t.isDone} onChange={changeTaskStatusHandler} />
                <span>{t.title}</span>
                <Button onClick={deleteTaskHandler} title='X' />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          className={filter === "All" ? "active-filter" : ""}
          title='All'
          onClick={() => changeFilterHandler("All")}
        />
        <Button
          className={filter === "Active" ? "active-filter" : ""}
          title='Active'
          onClick={() => changeFilterHandler("Active")}
        />
        <Button
          className={filter === "Completed" ? "active-filter" : ""}
          title='Completed'
          onClick={() => changeFilterHandler("Completed")}
        />
      </div>
    </div>
  );
};
