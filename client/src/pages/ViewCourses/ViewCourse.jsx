import { useLocation } from "react-router";

function ViewCourse() {
  const { state } = useLocation();
  const course_id = state?.course_id;

  if (!course_id) {
    return <p>No course selected.</p>;
  }

  return (
    <div>
      <h1>Course Details</h1>
      <p>Selected Course ID: {course_id}</p>
    </div>
  );
}

export default ViewCourse;
