import { useAppSelector } from "@/common/hooks/useAppSelector";
import { selectTodolists } from "@/model/todolists-selectors";
import { TodolistItem } from "@/components/Todolist/TodolistItem";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists);

  return todolists.map((todolist) => {
    return (
      <Grid>
        <Paper sx={{ p: "0 20px 20px 20px" }}>
          <TodolistItem key={todolist.id} todolist={todolist} />
        </Paper>
      </Grid>
    );
  });
};
