import { ChangeEvent } from "react";
import { FilterValues, Task, Todolist } from "../../App";
import { Button } from "../Button/Button";
import { CreateItemForm } from "../CreateItem/CreateItemForm";
import { EditableSpan } from "./EditableSpan";

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

export const TodolistItem = ({
  todolist: { title, filter, id },
  tasks,
  deleteTask,
  changeFilter,
  changeTaskStatus,
  deleteTodolist,
  createTask,
  changeTaskTitle,
  changeTodolistTitle,
}: PropsTodolistType) => {
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

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(id, title);
  };
  return (
    <div>
      <div className='container'>
        <h3>
          <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        </h3>
        <Button title='X' onClick={deleteTodolistHandler} />
      </div>
      <div>
        <CreateItemForm onCreateItem={createTaskHandler} />
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
            // изменение таски
            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle(id, t.id, title);
            };

            return (
              <li key={t.id}>
                <input type='checkbox' checked={t.isDone} onChange={changeTaskStatusHandler} />
                <EditableSpan value={t.title} onChange={changeTaskTitleHandler} />
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
