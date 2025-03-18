
import { BsFillTrashFill } from 'react-icons/bs'

function Course({ course, handleUnitChange, handleGradeChange, handleDeleteCourse, handleCourseTitleChange }) {
    return (
      <div className="results">
        {/* Course Title */}
        <div className="course-name">
          <p className="p">Course Name</p>
          <input
            className="course-name"
            placeholder={"E.g GEG 111"}
            value={course?.title}
            onChange={(e) => handleCourseTitleChange(e.target.value)}
          />
        </div>
        {/* Grade, dropdown */}
        <div>
          <p className="p">Grade</p>
          <select
            className="w-16 text-center"
            value={course?.grade}
            onChange={(e) => handleGradeChange(e.target.value)}
          >
            <option value={5}>A</option>
            <option value={4}>B</option>
            <option value={3}>C</option>
            <option value={2}>D</option>
            <option value={1}>E</option>
            <option value={0}>F</option>
          </select>
        </div>
        <div className="small">
          <p className="p">Units</p>
          <input
            placeholder="E.g 5"
            step={1}
            min={0}
            value={course?.unit}
            type="number"
            onInput={(e) => handleUnitChange(e.target.value)}
          />
        </div>
        <div className="trash-course">
          <button onClick={handleDeleteCourse}>
            <BsFillTrashFill />
          </button>
        </div>
      </div>
    ) 

}

export default Course