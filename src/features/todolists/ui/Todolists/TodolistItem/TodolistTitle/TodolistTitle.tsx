import DeleteIcon from "@mui/icons-material/Delete";
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import {
  changeTodolistTitleAC,
  deleteTodolistAC,
  Todolist,
} from "@/features/todolists/model/todolists-reducer";
import styles from "./TodolistTitle.module.css";

type Props = {
  todolist: Todolist;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist;

  const dispatch = useAppDispatch();

  //удаление тудушки
  const deleteTodolist = () => {
    dispatch(deleteTodolistAC({ id }));
  };

  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleAC({ id, title }));
  };

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
      </h3>
      <IconButton onClick={deleteTodolist}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
