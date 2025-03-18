import "./styles/app.css"
import { useState, useEffect } from "react";
import Dropdown from "./components/Dropdown";
import SemesterButton from "./components/old comps/SemesterButton";
import Progressbar from "./components/Progressbar";
import Semester from "./components/old comps/Semester";
import { CourseObject, calculateCGPA, calculateGPA } from "./utils";



function App() {
  const [activeSemesterID, setActiveSemester] = useState(0);

  const [semesters, setSemesters] = useState(new Array(10).fill({courses: [new CourseObject("", 0, 5)]}));
  const localStorageKey = "results";

  useEffect(() => {
    let results = localStorage.getItem(localStorageKey);
    if (results !== null) {
      /* If so load it into result variable */
      results = JSON.parse(results);
    } else if (results === null || results.length < 0) {
    /* If not create a new semester variable and pass it to results */
      results = [ new Array(10).fill({courses: [new CourseObject("", 0, 5)]})];
    }

    /* Pass results update semesters array with value of results */
    setSemesters(results);
  }, []);

  /* Whenever semesters array is updated pass the semesters data into browser memory */
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(semesters));
  }, [semesters]);


  const addCourse = (semesterIndex, course) => {
    const newSemesters = [...semesters];
    newSemesters[semesterIndex].courses.push(course);

    setSemesters(newSemesters);

    return newSemesters;
  };


  const addSemester = () => {
    const newSemesters = [...semesters];
    newSemesters.push({ courses: [new CourseObject("", 0, 5)] });
    setSemesters(newSemesters);

    setActiveSemester(newSemesters.length - 1);
  };


  const checkIfSemesterActive = (semesterIndex) => {
    return semesterIndex === activeSemesterID;
  };


  const handleUnitChange = (semesterIndex, courseIndex, unit) => {
    const newSemesters = [...semesters];
    let semester = newSemesters[semesterIndex];

    semester.courses[courseIndex].unit = parseInt(unit);
    setSemesters(newSemesters);
  };


  const handleCourseTitleChange = (semesterIndex, courseIndex, title) => {
    const newSemesters = [...semesters];
    let semester = newSemesters[semesterIndex];

    semester.courses[courseIndex].title = title;

    setSemesters(newSemesters);
  };


  const handleGradeChange = (semesterIndex, courseIndex, grade) => {
    const newSemesters = [...semesters];
    let semester = newSemesters[semesterIndex];

    semester.courses[courseIndex].grade = grade;

    setSemesters(newSemesters);
  };

  const handleDeleteCourse = (semesterIndex, courseIndex) => {
    const newSemesters = [...semesters];
    let semester = newSemesters[semesterIndex];

    semester.courses.splice(courseIndex, 1);

    setSemesters(newSemesters);
  };

  const handleClearCourses = (semesterIndex) => {
    const newSemesters = [...semesters];
    let semester = newSemesters[semesterIndex];

    semester.courses = [];

    setSemesters(newSemesters);
  };

  const handleDeleteSemester = (semesterIndex) => {
    if (semesters.length === 1) {
      handleClearCourses(semesterIndex);
      return;
    }
    const newSemesters = [...semesters];
    newSemesters.splice(semesterIndex, 1);

    if (semesterIndex <= activeSemesterID) {
      setActiveSemester(Math.max(activeSemesterID - 1, 0));
    }
    setSemesters(newSemesters);
    
  };

  const cgpa = calculateCGPA(semesters)
  const gpa = calculateGPA(semesters, activeSemesterID)

  return (
    <>
      <header>
        <a href="#" className="header-link">
          <h2>CGPA Calculator</h2>
        </a>
      </header>
      <main>
        <div className="progress-container">
          <Progressbar  value={gpa} textInfo={"GPA"} />
          <Progressbar value={cgpa.CGPA} textInfo={"CGPA"} />
        </div>
        <div className="semester-results">
          <div className="semester-bar">
            <button onClick={addSemester} className="add-semester">
              Add Semester
            </button>
            {semesters.map((semester, index) => {
              return (
                <SemesterButton
                  key={index}
                  active={checkIfSemesterActive(index)}
                  value={index + 1}
                  handleClick={() => setActiveSemester(index)}
                  handDeleteSemester={() => handleDeleteSemester(index)}
                />
              );
            })}
          </div>
        </div>
          {semesters.length > 0 && (
            <Semester
              courses={semesters[activeSemesterID].courses}
              id={activeSemesterID}
              addCourse={addCourse}
              handleGradeChange={handleGradeChange}
              handleUnitChange={handleUnitChange}
              handleCourseTitleChange={handleCourseTitleChange}
              handleClearCourses={() => handleClearCourses(activeSemesterID)}
              handleDeleteCourse={handleDeleteCourse}
            />
          )}
      </main>
    </>
  );
}

export default App
