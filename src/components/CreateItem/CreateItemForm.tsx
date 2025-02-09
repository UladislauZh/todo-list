import { ChangeEvent, useState, KeyboardEvent } from "react";
import { Button } from "../Button/Button";

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
      <input
        className={error ? "error" : ""}
        value={title}
        onChange={changeItemTitleHandler}
        onKeyDown={createItemOnEnterHandler}
      />
      <Button title='+' onClick={createItemHandler} />
      {error && <div className={"error-message"}>{error}</div>}
    </div>
  );
};
