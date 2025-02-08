type PropsButtonType = {
  title: string;
  onClick: () => void;
  className?: string;
};

export const Button = ({ title, onClick, className }: PropsButtonType) => {
  return (
    <button className={className} onClick={onClick}>
      {title}
    </button>
  );
};
