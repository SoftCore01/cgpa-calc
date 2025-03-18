function CourseObject(title, unit, grade) {
  this.title = title;
  this.unit = unit;
  this.grade = grade;
}

const calculateCGPA = (semesters) => {
  let totalUnits = 0;
  let totalGrades = 0;

  semesters.forEach((semester) => {
    semester.courses.forEach((course) => {
      const unit = parseInt(course.unit);
      const grade = parseInt(course.grade);

      totalUnits += unit;
      totalGrades += unit * grade;
    });
  });

  let CGPA = (totalGrades / totalUnits).toFixed(2);
  return {
    CGPA: isNaN(CGPA) ? 0 : CGPA,
    totalUnits: totalUnits,
  };
};

const calculateGPA = (semesters, semesterIndex) => {
    let totalUnits = 0;
    let totalGrades = 0;

    const semester = semesters[semesterIndex];
    semester.courses.forEach(course => {
        const unit = parseInt(course.unit);
        const grade = parseInt(course.grade);

        totalUnits += unit;
        totalGrades += unit * grade;
    })

    let gpa = (totalGrades / totalUnits).toFixed(2)
    return isNaN(gpa) ? 0 : gpa
}

export {CourseObject, calculateCGPA, calculateGPA}