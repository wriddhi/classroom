import { useState, useEffect, FC } from "react";
import LoadingDots from "./loading-dots";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  title: string;
  icon?: JSX.Element;
  loading?: boolean;
  onClick: () => Promise<any> | void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({type="button", title, icon, loading, onClick, disabled }) => {
  const [load, setLoad] = useState<boolean>(false);

  const handleClick = async () => {
    setLoad(true);
    await onClick();
    setLoad(false);
  };

  useEffect(() => {
    if(loading==undefined) return;
    setLoad(loading);
  }, [loading]);

  return (
    <button 
    type={type}
    className={`p-2 bg-primary hover:-translate-y-1 transition-all capitalize focus:bg-primary text-btn text-lg w-full max-w-[10rem] h-10 flex justify-center items-center gap-2 disabled:bg-emerald-800`}
    disabled={disabled || load}
    onClick={handleClick}>
      {!load ? title : <LoadingDots />}
      {icon}
    </button>
  );
};

export default Button;
