import { useState } from "react";

export default function Dropdown({ type, text, setSelected, selected}) {
  const [selectState, setSelectState] = useState(false);
    return selectState ? (
      <>
        <label htmlFor={type} className="dropdown">
          {text}:
          <select
            disabled
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            name={type}
            id={type}
          >
            <option value={5}>5 {type}</option>
            <option value={4}>4 {type}</option>
          </select>
        </label>
      </>
    ) : (
      <>
        <label htmlFor={type} className="dropdown">
          {text}:
          <select
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
              setSelectState(true);
            }}
            name={type}
            id={type}
          >
            <option value={5}>5 {type}</option>
            <option value={4}>4 {type}</option>
          </select>
        </label>
      </>
    );
    
}
