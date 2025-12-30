import React, { useEffect, useState } from "react";
import bg from "../../assets/background.png";
import AdminNavbar from "../../components/AdminNavbar";
import { getAllStudents } from "../../services/studentServices";
import { toast } from "react-toastify";

function Students() {
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    fetchAllStudents();
  }, []);

  async function fetchAllStudents() {
    setLoading(true);
    try {
      const res = await getAllStudents();

      if (res.data.status === "success") {
        setStudents(res.data.data);
        setAllStudents(res.data.data);
      } else {
        setStudents([]);
        setAllStudents([]);
      }
    } catch (error) {
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  }

  
  function applyFilters(clickedFrom) {
    if (name.trim() === "" && courseName.trim() === "") {
      toast.warn("Please enter student name or course name");
      return;
    }

    if (clickedFrom === "name" && name.trim() === "") {
      toast.warn("Please enter student name");
      return;
    }

    if (clickedFrom === "course" && courseName.trim() === "") {
      toast.warn("Please enter course name");
      return;
    }

    const filtered = allStudents.filter((s) => {
      const matchName =
        name.trim() === "" ||
        s.name.toLowerCase().includes(name.toLowerCase());

      const matchCourse =
        courseName.trim() === "" ||
        (s.course_name &&
          s.course_name.toLowerCase().includes(courseName.toLowerCase()));

      return matchName && matchCourse;
    });

    setStudents(filtered);
  }

  function resetFilter() {
    setCourseName("");
    setName("");
    setStudents(allStudents);
  }

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <AdminNavbar />

      <div className="px-6 py-10 flex justify-center">
        <div className="w-full max-w-7xl bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-8">

          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            All Students
          </h2>

          <div className="flex gap-4 mb-6 flex-wrap">
            <input
              type="text"
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded-md"
            />

            <button
              onClick={() => applyFilters("name")}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Filter Name
            </button>

            <input
              type="text"
              placeholder="Course Name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="p-2 border rounded-md"
            />

            <button
              onClick={() => applyFilters("course")}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Filter Course
            </button>

            <button
              onClick={resetFilter}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Reset
            </button>
          </div>

          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-3 text-left">Reg No</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Course Name</th>
                  <th className="p-3 text-left">Mobile</th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="5" className="text-center p-4">
                      Loading....
                    </td>
                  </tr>
                )}

                {!loading && students.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center p-4">
                      No students found
                    </td>
                  </tr>
                )}

                {!loading &&
                  students.map((s, index) => {
                    let rowClass = index % 2 === 0 ? "bg-white/40" : "bg-white/20";

                    return (
                      <tr key={s.reg_no} className={rowClass}>
                        <td className="p-3">{s.reg_no}</td>
                        <td className="p-3">{s.name}</td>
                        <td className="p-3">{s.email}</td>
                        <td className="p-3 font-medium text-blue-800">
                          {s.course_name || "N/A"}
                        </td>
                        <td className="p-3">{s.mobile_no}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Students;
