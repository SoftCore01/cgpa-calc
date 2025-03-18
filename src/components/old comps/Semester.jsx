
import Course from "./Course";
import { CourseObject } from "../../utils";



function Semester(props) {
  const calculateGPA = (courses) => {
    let totalUnits = 0;
    let totalGradePoints = 0;

    courses.forEach((course) => {
      totalUnits += parseInt(course.unit);
      totalGradePoints += parseInt(course.unit) * parseInt(course.grade);
    });

    let gpa = (totalGradePoints / totalUnits).toFixed(2);

    return {gpa: isNaN(gpa) ? 0 : gpa, units: isNaN(totalUnits) ? 0: totalUnits};
  };

  const handleAddCourse = () => {
    const course = new CourseObject("", 0, 5);
    props.addCourse(props.id, course);
  };

  return (
    <div className="semester-container">
      {/* Title */}
      <div className="semester-header">
        <span className="font-bold mr-auto" style={{ color: "rgb(3,4,94)" }}>
          Semester {props.id + 1}
        </span>
        <span className="font-bold">
          Total Units: {calculateGPA(props.courses).units}
        </span>
      </div>
      {/* Courses table */}
      <div>
        <div className="course">
          {props.courses.map((course, index) => {
            return (
              <Course
                key={index}
                id={index}
                course={course}
                system={props.system}
                handleCourseTitleChange={(title) =>
                  props.handleCourseTitleChange(props.id, index, title)
                }
                handleUnitChange={(unit) =>
                  props.handleUnitChange(props.id, index, unit)
                }
                handleGradeChange={(grade) =>
                  props.handleGradeChange(props.id, index, grade)
                }
                handleDeleteCourse={() =>
                  props.handleDeleteCourse(props.id, index)
                }
              />
            );
          })}
        </div>
      </div>

      {/* Add Course and Reset all */}
      <div className="course-buttons">
        <button
          className="add-course text-white p-2 rounded font-bold"
          onClick={handleAddCourse}
        >
          Add Course
        </button>
        <button
          className="clear-all text-white p-2 rounded font-bold"
          onClick={props.handleClearCourses}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

export default Semester;
