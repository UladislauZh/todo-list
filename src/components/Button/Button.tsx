import classes from "./Button.module.css";

// css modules

type PropsButtonType = {
  title: string;
  onClick: () => void;
};

export const Button = ({ title, onClick }: PropsButtonType) => {
  return (
    <button className={classes.btn} onClick={onClick}>
      {title}
    </button>
  );
};
