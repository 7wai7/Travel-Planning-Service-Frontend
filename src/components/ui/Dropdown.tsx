import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, type JSX } from "react";

interface Props {
  icon?: (isHide: boolean) => JSX.Element;
  className?: string;
  children: JSX.Element;
}

function Dropdown({ icon, className = "", children }: Props) {
  const [isHide, setIsHide] = useState(true);

  return (
    <div className={`relative ${className}`} onClick={() => setIsHide(!isHide)}>
      <button className="w-8 h-8 flex items-center justify-center">
        {icon ? (
          icon(isHide)
        ) : isHide ? (
          <ChevronUp color="black" />
        ) : (
          <ChevronDown color="black" />
        )}
      </button>
      {!isHide && <nav className="absolute bottom-full right-0 rounded-xl bg-white shadow-(--shadow)">{children}</nav>}
    </div>
  );
}

export default Dropdown;
