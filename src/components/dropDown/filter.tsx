import { useState } from "react";
import "./filter.scss";
import { AiFillCaretDown } from "react-icons/ai";
const Filter = ({
  initialValue,
  options,
  onSelectOption,
  width,
}: {
  initialValue: string;
  options: string[];
  onSelectOption: (option: string) => void;
  width: string;
}) => {
  const [isContentVisible, setContentVisible] = useState(false);

  return (
    <div
      style={{ width: width }}
      className="dropdown"
      onMouseEnter={() => setContentVisible(true)}
      onMouseLeave={() => setContentVisible(false)}
    >
      <div className="dropdown-select">
        <span>{initialValue}</span>
        <span>
          <AiFillCaretDown />
        </span>
      </div>
      <div
        // onMouseLeave={() => setContentVisible(false)}
        style={{ visibility: isContentVisible ? "visible" : "hidden" }}
        className={"dropdown-content"}
      >
        {options.map((option) => (
          <div
            className="dropdown-content-options"
            key={option}
            onClick={() => {
              setContentVisible(false);
              onSelectOption(option);
            }}
          >
            <span>{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
