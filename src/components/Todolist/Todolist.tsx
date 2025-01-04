import { useState } from "react";
import { Button } from "../Button/Button";
import classes from "./Todolist.module.css";
import { PropsTasksType } from "../../App";

type PropsTodolistType = {
  title: string;
  tasks: PropsTasksType[]; //***
  date: string;
  deleteTask: (id: number) => void;
};

export const Todolist = ({
  title,
  tasks,
  date,
  deleteTask,
}: PropsTodolistType) => {
  const [inputArea, setInputArea] = useState("");

  console.log(inputArea);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setInputArea(e.target.value);

  return (
    <div className={classes.divToDoList}>
      <h1 className={classes.headerText}>{title}</h1>
      <div className={classes.divWrapper}>
        <textarea
          className={classes.textareaLimit}
          value={inputArea}
          onChange={handleTextAreaChange}
          name='todolist'
          id='todolist'
        />
        <Button title='X' onClick={() => {}} />
      </div>
      {tasks.length === 0 ? (
        <p className={classes.headerText}>None</p>
      ) : (
        <ul className={classes.ulWrapper}>
          {tasks.map((tasks) => {
            return (
              <li className={classes.liNoDot} key={tasks.id}>
                <span>{tasks.title}</span>
                <input type='checkbox' checked={tasks.isDone} />
                <Button
                  onClick={() => {
                    deleteTask(tasks.id);
                  }}
                  title='X'
                />
              </li>
            );
          })}
        </ul>
      )}
      <>
        <Button title='All' onClick={() => {}} />
        <Button title='All' onClick={() => {}} />
        <Button title='All' onClick={() => {}} />
      </>
      <div>{date}</div>
    </div>
  );
};
