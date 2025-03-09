import List from "@mui/material/List";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { Todolist } from "@/features/todolists/model/todolists-reducer";
import { selectTasks } from "@/features/todolists/model/tasks-selectors";
import { TaskItem } from "./TaskItem/TaskItem";

type Props = { todolist: Todolist };

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist;

  const tasks = useAppSelector(selectTasks);

  const todolistTasks = tasks[id];
  let filteredTasks = todolistTasks;
  if (filter === "Active") {
    filteredTasks = todolistTasks.filter((t) => !t.isDone);
  }
  if (filter === "Completed") {
    filteredTasks = todolistTasks.filter((t) => t.isDone);
  }

  return (
    <>
      {/* Проверка на таски */}
      {filteredTasks.length === 0 ? (
        <p>No Tasks</p>
      ) : (
        <List>
          {/* Мапим таски на колво */}
          {filteredTasks.map((t) => (
            <TaskItem key={t.id} t={t} todolist={todolist} />
          ))}
        </List>
      )}
    </>
  );
};
