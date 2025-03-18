import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function SemesterButton({ value, handleClick, active, handDeleteSemester}) {
  const [size, setSize] = useState(window.screen.width <= 450 ? "S" : "L");

  window.addEventListener("resize", () => {
    window.screen.width <= 450 ? setSize("S") : setSize("L");
  });

  return size == "L" ? (
    <div className={`semester ${active ? "active" : ""}`} >
      <button onClick={handleClick} className="semester-button">{value} Semester</button>
      <button className="trash" onClick={handDeleteSemester}>
        {" "}
        <FaTrash />{" "}
      </button>
    </div>
  ) : (
    <div className={`semester ${active ? "active" : ""}`}  >
      <button onClick={handleClick} className="semester-button">{value}</button>
      <button className="trash" onClick={handDeleteSemester}>
        {" "}
        <FaTrash />{" "}
      </button>
    </div>
  );
  
}
