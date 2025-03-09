import { ChangeEvent, useState, KeyboardEvent } from "react";

import { TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";

type Props = {
  onCreateItem: (title: string) => void;
};

export const CreateItemForm = ({ onCreateItem }: Props) => {
  //ошибка при создании пустой таски
  const [error, setError] = useState<string | null>(null);
  //контролируемый инпут
  const [title, setTitle] = useState("");

  const createItemHandler = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle !== "") {
      onCreateItem(trimmedTitle);
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setError(null);
  };

  const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      createItemHandler();
    }
  };

  return (
    <div>
      <TextField
        label={"Enter a title"}
        variant={"outlined"}
        value={title}
        size={"small"}
        error={!!error}
        helperText={error}
        onChange={changeItemTitleHandler}
        onKeyDown={createItemOnEnterHandler}
      />
      <IconButton onClick={createItemHandler} color={"primary"}>
        <AddBoxIcon />
      </IconButton>
    </div>
  );
};
