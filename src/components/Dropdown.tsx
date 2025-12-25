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
    <div className={`dropdown ${className}`} onClick={() => setIsHide(!isHide)}>
      <button className="dropdown-btn">
        {icon ? (
          icon(isHide)
        ) : isHide ? (
          <ChevronUp color="black" />
        ) : (
          <ChevronDown color="black" />
        )}
      </button>
      {!isHide && <nav className="dropdown-content">{children}</nav>}
    </div>
  );
}

export default Dropdown;
